import { App, Component, ItemView, MarkdownRenderer, Notice, Plugin, PluginSettingTab, Setting, TFile, WorkspaceLeaf, moment } from 'obsidian';
import {appendReflection,choose,inFolder,safePath} from './core';
import {ReviewNavigation} from './navigation';
const VIEW='zhaohua-xishi-review';
interface Settings {folder:string;format:string;recursive:boolean;cooldown:number;todayPattern:string;heading:string;dailyMode:'core'|'custom';todayFolder:string;template:string;}
const defaults:Settings={folder:'',format:'YYYY-MM-DD',recursive:true,cooldown:7,todayPattern:'YYYY-MM-DD',heading:'朝花夕拾',dailyMode:'core',todayFolder:'',template:''};
interface Journal {file:TFile;path:string;date:string;}
export default class JournalPlugin extends Plugin {
 navigation=new ReviewNavigation();
 settings:Settings={...defaults}; history:Record<string,number>={}; drafts:Record<string,string>={}; queue:Promise<unknown>=Promise.resolve();
 async onload(){
  const raw:unknown=await this.loadData();
  const record=(value:unknown):Record<string,unknown>=>value!==null&&typeof value==='object'&&!Array.isArray(value)?value as Record<string,unknown>:{};
  const data=record(raw), settings=record(data.settings);
  for(const key of ['folder','format','todayPattern','heading','todayFolder','template'] as const)if(typeof settings[key]==='string')this.settings[key]=settings[key];
  if(settings.dailyMode==='custom')this.settings.dailyMode='custom';
  if(typeof settings.todayFolder!=='string')this.settings.todayFolder=this.settings.folder;
  if(typeof settings.recursive==='boolean')this.settings.recursive=settings.recursive;
  if(typeof settings.cooldown==='number'&&Number.isFinite(settings.cooldown)&&settings.cooldown>=0)this.settings.cooldown=settings.cooldown;
  this.history=Object.fromEntries(Object.entries(record(data.history)).filter((entry):entry is [string,number]=>typeof entry[1]==='number'&&Number.isFinite(entry[1])));
  this.drafts=Object.fromEntries(Object.entries(record(data.drafts)).filter((entry):entry is [string,string]=>typeof entry[1]==='string'));
  this.navigation=new ReviewNavigation(data.navigation,this.history);
  this.registerView(VIEW,leaf=>new ReviewView(leaf,this));
  this.addRibbonIcon('book-open','朝花夕拾',()=>{void this.open('random');});
  this.addCommand({id:'random-review',name:'随机回顾',callback:()=>{void this.open('random');}});
  this.addCommand({id:'anniversary-review',name:'往年今日',callback:()=>{void this.open('anniversary');}});
  this.addSettingTab(new SettingsTab(this.app,this));
  this.registerEvent(this.app.vault.on('rename',(file,old)=>{if(file instanceof TFile){this.navigation.rename(old,file.path);if(this.history[old]!==undefined){this.history[file.path]=this.history[old];delete this.history[old];}if(this.drafts[old]!==undefined){this.drafts[file.path]=this.drafts[old];delete this.drafts[old];}void this.persist();}}));
 }
 persist(){const save=()=>this.saveData({settings:this.settings,history:this.history,drafts:this.drafts,navigation:this.navigation.snapshot()});const task=this.queue.then(save,save);this.queue=task.catch(()=>{});return task;}
 async open(mode:'random'|'anniversary'){
  let leaf=this.app.workspace.getLeavesOfType(VIEW)[0];if(!leaf){leaf=this.app.workspace.getLeaf('tab');await leaf.setViewState({type:VIEW,active:true});}
  await this.app.workspace.revealLeaf(leaf);const view=leaf.view as ReviewView;if(!view.current||view.mode!==mode)await view.pick(mode);
 }
 journals():Journal[]{
  const folder=safePath(this.settings.folder);if(!folder)return [];
  const today=moment().format('YYYY-MM-DD');
  return this.app.vault.getMarkdownFiles().flatMap(file=>{
   if(!inFolder(file.path,folder,this.settings.recursive))return [];
   const key=this.settings.format.includes('/')?file.path.slice(folder.length+1,-3):file.basename;
   const date=moment(key,this.settings.format,true);if(!date.isValid()||date.format('YYYY-MM-DD')>=today)return [];
   return [{file,path:file.path,date:date.format('YYYY-MM-DD')}];
  });
 }
 async coreConfig(name:string):Promise<Record<string,unknown>>{
  const path=this.app.vault.configDir+'/'+name+'.json';
  if(!await this.app.vault.adapter.exists(path))return {};
  const raw:unknown=JSON.parse(await this.app.vault.adapter.read(path));
  if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('无法读取 '+name+' 配置。');
  return raw as Record<string,unknown>;
 }
 async dailyConfig(){
  if(this.settings.dailyMode==='custom')return {folder:this.settings.todayFolder,format:this.settings.todayPattern,template:this.settings.template};
  const config=await this.coreConfig('daily-notes');
  const value=(key:string,fallback:string)=>typeof config[key]==='string'?config[key]:fallback;
  return {folder:value('folder',''),format:value('format','YYYY-MM-DD')||'YYYY-MM-DD',template:value('template','')};
 }
 async templateContent(template:string,path:string,now:ReturnType<typeof moment>){
  if(!template.trim())return '';
  const templatePath=safePath(template);const file=this.app.vault.getAbstractFileByPath(templatePath.endsWith('.md')?templatePath:templatePath+'.md');
  if(!(file instanceof TFile)||file.extension!=='md')throw new Error('找不到日记模板：'+template);
  if(file.path===path)throw new Error('日记模板不能与今日日记使用同一路径。');
  const content=await this.app.vault.read(file);
  if(content.includes('<%'))throw new Error('此模板使用 Templater 动态语法，请先用 Templater 创建今日日记，再保存感想。');
  const config=await this.coreConfig('templates');
  return content.replace(/\{\{\s*(title|date|time)(?::([^}]+))?\s*\}\}/g,(_match:string,kind:string,format:string|undefined)=>{
   if(kind==='title')return path.split('/').pop()!.slice(0,-3);
   const fallback=kind==='date'?'YYYY-MM-DD':'HH:mm';const custom=config[kind+'Format'];
   return now.format(format?.trim()||(typeof custom==='string'&&custom?custom:fallback));
  });
 }
 async saveReflection(source:TFile,text:string){
  if(!text.trim())throw new Error('请先写下感想。');
  if(this.app.vault.getAbstractFileByPath(source.path)!==source)throw new Error('原日记已移动或删除，请重新打开回顾。');
  const config=await this.dailyConfig();const now=moment();
  const folder=safePath(config.folder);
  const relative=safePath(now.format(config.format));
  if(!relative)throw new Error('今天日记的路径格式不能为空。');
  const path=(folder?folder+'/':'')+relative+'.md';
  if(path===source.path)throw new Error('今天的目标路径与原日记相同，请检查路径格式。');
  const link=this.app.fileManager.generateMarkdownLink(source,path);
  const entry='回顾 '+link+'\n\n'+text.trim();
  const existing=this.app.vault.getAbstractFileByPath(path);
  const template=existing?'':await this.templateContent(config.template,path,now);
  const parts=path.split('/');parts.pop();let parent='';
  for(const part of parts){parent=parent?parent+'/'+part:part;if(!this.app.vault.getAbstractFileByPath(parent)){try{await this.app.vault.createFolder(parent);}catch(e){if(!this.app.vault.getAbstractFileByPath(parent))throw e;}}}
  let target=this.app.vault.getAbstractFileByPath(path);
  if(!target){try{return await this.app.vault.create(path,appendReflection(template,this.settings.heading,entry));}catch(e){target=this.app.vault.getAbstractFileByPath(path);if(!target)throw e;}}
  if(!(target instanceof TFile))throw new Error('目标路径不是 Markdown 文件。');
  await this.app.vault.process(target,data=>appendReflection(data,this.settings.heading,entry));return target;
 }
}
class ReviewView extends ItemView {
 current?:Journal;mode:'random'|'anniversary'='random';renderer?:Component;generation=0;saving=false;navigating=false;
 constructor(leaf:WorkspaceLeaf,private plugin:JournalPlugin){super(leaf);}
 getViewType(){return VIEW;}getDisplayText(){return '朝花夕拾';}getIcon(){return 'book-open';}
 async onOpen(){this.restore();await this.draw();}
 restore(){const all=this.plugin.journals();const valid=new Set(all.map(j=>j.path));this.plugin.navigation.prune(valid);const entry=this.plugin.navigation.current;this.current=all.find(j=>j.path===entry?.path);if(entry)this.mode=entry.mode;}
 async previous(){
  if(this.saving||this.navigating)return;this.navigating=true;
  try{const all=this.plugin.journals();this.plugin.navigation.prune(new Set(all.map(j=>j.path)));const entry=this.current?this.plugin.navigation.back():this.plugin.navigation.current;if(!entry){new Notice('没有更早的回顾记录。');return;}this.current=all.find(j=>j.path===entry.path);this.mode=entry.mode;await this.plugin.persist();await this.draw();}finally{this.navigating=false;}
 }
 async onClose(){this.generation++;this.renderer?.unload();}
 async pick(mode:'random'|'anniversary',relax=false){
  if(this.saving||this.navigating)return;this.navigating=true;this.mode=mode;
  try{
   const all=this.plugin.journals();let pool=mode==='anniversary'?all.filter(x=>x.date.slice(5)===moment().format('MM-DD')):all;
   if(mode==='anniversary'){pool=pool.sort((a,b)=>b.date.localeCompare(a.date));const next=pool.findIndex(x=>x.path===this.current?.path)+1;this.current=pool[next%pool.length];}
   else this.current=choose(pool.filter(x=>x.path!==this.current?.path||pool.length===1),this.plugin.history,Date.now(),relax?0:this.plugin.settings.cooldown);
   if(this.current){this.plugin.navigation.visit({path:this.current.path,mode});await this.plugin.persist();}
   await this.draw();
  }catch(e){new Notice(String(e));}finally{this.navigating=false;}
 }
 async draw(){
  const generation=++this.generation;this.renderer?.unload();this.renderer=new Component();this.renderer.load();
  const el=this.contentEl;el.empty();el.addClass('zhaohua-view');
  const shell=el.createDiv({cls:'zhaohua-shell'});const header=shell.createEl('header',{cls:'zhaohua-header'});header.createEl('h1',{text:'朝花夕拾'});
  const nav=header.createDiv({cls:'zhaohua-modes'});
  for(const [mode,label] of [['random','随机回顾'],['anniversary','往年今日']] as const){const toggle=this.button(nav,label,()=>this.pick(mode));toggle.setAttribute('aria-pressed',String(this.mode===mode));}
  const back=this.button(shell,'← 上一篇',()=>this.previous());back.disabled=this.current?!this.plugin.navigation.canBack:!this.plugin.navigation.current;back.addClass('zhaohua-link');
  const journal=this.current;
  if(!journal){
   const message=!this.plugin.settings.folder?'请先在设置 → 朝花夕拾中选择日记文件夹。':this.mode==='anniversary'?'往年的今天还没有日记，去随机拾起一段时光吧。':'暂无可回顾日记：可能都在冷却期内，或目录、日期格式尚未匹配。';
   shell.createEl('p',{text:message,cls:'zhaohua-empty'});
   if(this.plugin.settings.folder&&this.mode==='random')this.button(shell,'本次忽略冷却期',()=>this.pick('random',true));return;
  }
  const card=shell.createEl('article',{cls:'zhaohua-card'});const dateRow=card.createDiv({cls:'zhaohua-date-row'});const dateBlock=dateRow.createDiv();dateBlock.createEl('time',{text:moment(journal.date).format('YYYY 年 M 月 D 日'),cls:'zhaohua-date',attr:{datetime:journal.date}});dateBlock.createDiv({text:'距今 '+moment().startOf('day').diff(moment(journal.date),'days')+' 天',cls:'zhaohua-age'});
  this.button(dateRow,'打开原文 ↗',()=>this.app.workspace.getLeaf('tab').openFile(journal.file)).addClass('zhaohua-link');
  const body=card.createDiv({cls:'markdown-rendered zhaohua-body'});
  this.renderer.registerDomEvent(body,'click',(event:MouseEvent)=>{
   const target=event.target instanceof Element?event.target.closest('a.internal-link'):null;
   if(!target||!body.contains(target))return;
   const link=target.getAttribute('data-href')??target.getAttribute('href');
   if(!link)return;
   event.preventDefault();event.stopPropagation();
   void this.app.workspace.openLinkText(link,journal.file.path,event.ctrlKey||event.metaKey).catch(error=>new Notice(String(error)));
  });
  try{const raw=await this.app.vault.cachedRead(journal.file);if(generation!==this.generation)return;await MarkdownRenderer.render(this.app,raw,body,journal.path,this.renderer);if(generation!==this.generation)return;this.plugin.history[journal.path]=Date.now();await this.plugin.persist();}
  catch(e){if(generation===this.generation)body.createEl('p',{text:'无法读取日记：'+String(e)});return;}
  if(generation!==this.generation)return;
  const form=shell.createDiv({cls:'zhaohua-reflection'});const labelId='zhaohua-reflection-'+crypto.randomUUID();form.createEl('h2',{text:'今天的感想',attr:{id:labelId}});
  const input=form.createEl('textarea',{attr:{'aria-labelledby':labelId,placeholder:'再读到这里，你想写些什么？',rows:'4'}});input.value=this.plugin.drafts[journal.path]??'';
  input.addEventListener('input',()=>{this.plugin.drafts[journal.path]=input.value;void this.plugin.persist().catch(()=>new Notice('草稿保存失败，请先复制感想。'));});
  form.createEl('p',{text:'写入今天的「'+this.plugin.settings.heading+'」，附上这篇日记的链接。',cls:'zhaohua-hint'});
  const actions=form.createDiv({cls:'zhaohua-actions'});
  const save=this.button(actions,'保存感想',async()=>{
   if(this.saving||!input.value.trim())return;this.saving=true;save.disabled=true;save.textContent='正在保存…';input.disabled=true;
   try{await this.plugin.saveReflection(journal.file,input.value);input.value='';delete this.plugin.drafts[journal.path];new Notice('感想已保存到今天的日记。');try{await this.plugin.persist();}catch{new Notice('感想已写入，但草稿状态未同步，请勿重复保存。');}}
   catch(e){new Notice('保存失败：'+String(e));}finally{this.saving=false;save.disabled=!input.value.trim();save.textContent='保存感想';input.disabled=false;}
  });save.disabled=!input.value.trim();input.addEventListener('input',()=>{save.disabled=!input.value.trim();});save.addClass('mod-cta');this.button(actions,this.mode==='anniversary'?'下一年':'再来一篇',()=>this.pick(this.mode));
 }
 button(el:HTMLElement,label:string,action:()=>unknown){const button=el.createEl('button',{text:label});button.addEventListener('click',()=>{void Promise.resolve().then(action).catch(e=>new Notice(String(e)));});return button;}
}
// Keep the legacy settings API for Obsidian 1.7.2 compatibility.

class SettingsTab extends PluginSettingTab {
 constructor(app:App,private plugin:JournalPlugin){super(app,plugin);}
 display(){this.renderSettings();}
 renderSettings(){
  const el=this.containerEl;el.empty();;el.createEl('p',{text:'所有回顾记录和未保存感想均保存在本库插件数据中。首次使用请配置日记目录。'});
  const text=(name:string,desc:string,key:'folder'|'format'|'todayPattern'|'heading'|'todayFolder'|'template')=>{
   let pending=this.plugin.settings[key];
   const row=new Setting(el).setName(name).setDesc(desc).addText(t=>t.setValue(pending).onChange(v=>{pending=v;}));
   row.addButton(b=>b.setButtonText('应用').onClick(async()=>{try{
    let value=pending.trim();if(key==='folder'){value=safePath(value);if(!value)throw new Error('请选择明确的日记文件夹。');}
    if(key==='todayFolder'||key==='template')value=safePath(value);
    if((!value&&key!=='todayFolder'&&key!=='template')||/[\r\n]/.test(value))throw new Error('设置不能为空或包含换行。');
    if(key==='heading'&&value.includes('#'))throw new Error('小节名称无需添加 #。');
    if(key==='format'||key==='todayPattern'){if(!value.includes('Y')||!value.includes('M')||!value.includes('D'))throw new Error('日期格式须包含年、月、日。');if(key==='todayPattern')safePath(moment().format(value));}
    this.plugin.settings[key]=value;await this.plugin.persist();new Notice('设置已保存。');
   }catch(e){new Notice(String(e));}}));
  };
  text('日记文件夹','库内相对路径，例如 Diary。包含子文件夹时可以按年份存放日记。','folder');
  text('日记日期格式','Moment 格式。文件名示例：YYYY-MM-DD；按相对路径识别示例：YYYY/YYYY-MM-DD。无需 .md。','format');
  new Setting(el).setName('包含子文件夹').addToggle(t=>t.setValue(this.plugin.settings.recursive).onChange(async v=>{this.plugin.settings.recursive=v;await this.plugin.persist();}));
  new Setting(el).setName('日记模板').setDesc(this.plugin.settings.dailyMode==='core'?'沿用「设置 → 日记」中的目录、日期格式和模板。':'今日日记不存在时，使用下方配置创建。').addDropdown(d=>d.addOption('core','沿用 Obsidian 日记配置').addOption('custom','单独指定').setValue(this.plugin.settings.dailyMode).onChange(async value=>{this.plugin.settings.dailyMode=value==='custom'?'custom':'core';await this.plugin.persist();this.renderSettings();}));
  if(this.plugin.settings.dailyMode==='custom'){
   text('今日日记文件夹','库内相对路径；留空表示库根目录。','todayFolder');
   text('今天日记的路径格式','例如 YYYY/YYYY-MM-DD。相对于今日日记文件夹，无需 .md。','todayPattern');
   text('日记模板文件','库内 Markdown 文件路径；留空不使用模板。支持 {{title}}、{{date}}、{{time}} 及日期时间格式。','template');
  }
  text('感想小节名称','保存时追加到同名二级标题下；“回顾 [[原文]]”始终是普通正文。','heading');
  new Setting(el).setName('重复回顾冷却天数').setDesc('随机回顾排除近期已看日记；0 表示不限制。往年今日不受此限制。').addDropdown(d=>{for(const n of [0,1,3,7,14,30,90])d.addOption(String(n),String(n)+' 天');d.setValue(String(this.plugin.settings.cooldown)).onChange(async v=>{this.plugin.settings.cooldown=Number(v);await this.plugin.persist();});});
 }
}

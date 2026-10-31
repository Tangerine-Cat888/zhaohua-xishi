import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildSync} from 'esbuild';
import {createRequire} from 'node:module';
import moment from 'moment';
const localRequire=createRequire(process.cwd()+'/package.json');
class File {extension='md';basename:string;constructor(public path:string){this.basename=path.split('/').at(-1)!.slice(0,-3);}}
const output=buildSync({entryPoints:['src/main.ts'],bundle:true,write:false,platform:'node',format:'cjs',external:['obsidian']});
const bundleModule={exports:{} as any};
new Function('require','module','exports',output.outputFiles[0].text)((id:string)=>id==='obsidian'?{Plugin:class{},PluginSettingTab:class{},ItemView:class{},TFile:File,moment}:localRequire(id),bundleModule,bundleModule.exports);
const Plugin=bundleModule.exports.default;
function fixture(){
 const plugin=new Plugin();const contents=new Map<string,string>();const files=new Map<string,File>();const folders=new Set<string>();
 const add=(path:string,text='')=>{const file=new File(path);files.set(path,file);contents.set(path,text);return file;};
 plugin.app={vault:{configDir:'.obsidian',adapter:{exists:async()=>false},read:async(f:File)=>contents.get(f.path),getMarkdownFiles:()=>[...files.values()],getAbstractFileByPath:(p:string)=>files.get(p)??(folders.has(p)?{}:null),createFolder:async(p:string)=>{folders.add(p);},create:async(p:string,c:string)=>add(p,c),process:async(f:File,fn:(s:string)=>string)=>contents.set(f.path,fn(contents.get(f.path)!))},fileManager:{generateMarkdownLink:(f:File)=>`[[${f.path.slice(0,-3)}]]`}};
 plugin.settings.dailyMode='custom';plugin.settings.todayFolder='Diary';plugin.settings.folder='Diary';plugin.settings.todayPattern='YYYY/YYYY-MM-DD';return {plugin,contents,files,add};
}
test('按年目录识别真实日期，排除无效日期及今天',()=>{
 const {plugin,add}=fixture();add('Diary/2024/2024-01-17.md');add('Diary/2024/2024-02-30.md');add('Diary/'+moment().format('YYYY-MM-DD')+'.md');add('Other/2024-01-17.md');
 assert.deepEqual(plugin.journals().map((j:any)=>j.date),['2024-01-17']);
 plugin.settings.format='YYYY/YYYY-MM-DD';assert.equal(plugin.journals().length,1);
});
test('保存到当年目录，已有日记原子追加且不改变原日记',async()=>{
 const {plugin,add,contents}=fixture();const source=add('Diary/2024/2024-01-17.md','原文');
 const today='Diary/'+moment().format('YYYY/YYYY-MM-DD')+'.md';add(today,'今天正文\n\n## 明天\n计划\n');
 await plugin.saveReflection(source,'第一条感想');await plugin.saveReflection(source,'第二条感想');
 assert.equal(contents.get(source.path),'原文');assert.ok(contents.get(today)!.startsWith('今天正文\n\n## 明天\n计划'));
 assert.equal(contents.get(today)!.match(/## 朝花夕拾/g)?.length,1);assert.match(contents.get(today)!,/回顾 \[\[Diary\/2024\/2024-01-17\]\]/);
});
test('空白感想及失效原文件不会创建今天日记',async()=>{
 const {plugin,add,files}=fixture();const source=add('Diary/2024/2024-01-17.md');
 await assert.rejects(plugin.saveReflection(source,'  '));assert.equal(files.size,1);
 files.clear();await assert.rejects(plugin.saveReflection(source,'感想'));assert.equal(files.size,0);
});
test('不存在今天日记时创建，正文使用约定格式',async()=>{
 const {plugin,add,contents}=fixture();const source=add('Diary/2024/2024-01-17.md');const file=await plugin.saveReflection(source,'感想');
 assert.match(contents.get(file.path)!,/## 朝花夕拾\n\n回顾 \[\[Diary\/2024\/2024-01-17\]\]\n\n感想/);
});


test('写入失败不改原日记或现有今天日记，可重试',async()=>{
 const {plugin,add,contents}=fixture();const source=add('Diary/2024/2024-01-17.md','原文');
 const today='Diary/'+moment().format('YYYY/YYYY-MM-DD')+'.md';add(today,'今天正文');
 const process=plugin.app.vault.process;plugin.app.vault.process=async()=>{throw new Error('模拟磁盘写入失败');};
 await assert.rejects(plugin.saveReflection(source,'感想'));
 assert.equal(contents.get(today),'今天正文');assert.equal(contents.get(source.path),'原文');
 plugin.app.vault.process=process;await plugin.saveReflection(source,'感想');
 assert.match(contents.get(today)!,/感想/);
});
test('保存队列失败后仍可保存，重新加载保留草稿与历史',async()=>{
 const {plugin}=fixture();let saved:any;let fail=true;
 plugin.saveData=async(data:any)=>{if(fail){fail=false;throw new Error('模拟失败');}saved=JSON.parse(JSON.stringify(data));};
 plugin.drafts={'Diary/2024/2024-01-17.md':'尚未提交的感想'};plugin.history={'Diary/2024/2024-01-17.md':123};
 await assert.rejects(plugin.persist());await plugin.persist();
 const restored=new Plugin();restored.loadData=async()=>saved;
 for(const name of ['registerView','addRibbonIcon','addCommand','addSettingTab','registerEvent'])restored[name]=()=>{};
 restored.app={vault:{on:()=>({})}};
 await restored.onload();
 assert.deepEqual(restored.drafts,plugin.drafts);assert.deepEqual(restored.history,plugin.history);
});

test('默认继承核心日记目录、格式和模板，处理变量并保留模板小节',async()=>{
 const {plugin,add,contents}=fixture();plugin.settings.dailyMode='core';
 plugin.app.vault.adapter={exists:async()=>true,read:async(p:string)=>JSON.stringify(p.endsWith('daily-notes.json')?{folder:'Daily',format:'YYYY/YYYY-MM-DD',template:'Templates/Daily'}:{dateFormat:'YYYY/MM/DD',timeFormat:'HH:mm'})};
 const template='---\ndate: {{date}}\n---\n# {{title}}\n{{date:YYYY}} {{time:HH:mm}}\n\n## 朝花夕拾\n\n## 计划\n保留';add('Templates/Daily.md',template);
 const source=add('Diary/2024/2024-01-17.md');const result=await plugin.saveReflection(source,'新感想');
 assert.equal(result.path,'Daily/'+moment().format('YYYY/YYYY-MM-DD')+'.md');const value=contents.get(result.path)!;
 assert.ok(value.includes(moment().format('YYYY/MM/DD')));assert.ok(value.includes('# '+moment().format('YYYY-MM-DD')));assert.ok(!value.includes('{{'));assert.ok(value.indexOf('新感想')<value.indexOf('## 计划'));assert.ok(value.endsWith('保留'));assert.equal(contents.get('Templates/Daily.md'),template);
});
test('自定义模板支持根目录，已有日记不再读取模板',async()=>{
 const {plugin,add,contents}=fixture();plugin.settings.todayFolder='';plugin.settings.todayPattern='YYYY-MM-DD';plugin.settings.template='Template.md';add('Template.md','模板正文');const source=add('Diary/2024/2024-01-17.md');
 const result=await plugin.saveReflection(source,'第一次');assert.equal(result.path,moment().format('YYYY-MM-DD')+'.md');assert.ok(contents.get(result.path)!.startsWith('模板正文'));
 plugin.settings.template='不存在';await plugin.saveReflection(source,'第二次');assert.ok(contents.get(result.path)!.includes('第二次'));assert.equal(contents.get(result.path)!.match(/模板正文/g)?.length,1);
});
test('模板缺失或含动态脚本时不创建日记，读取失败可重试',async()=>{
 const {plugin,add,files}=fixture();const source=add('Diary/2024/2024-01-17.md');plugin.settings.template='Missing';await assert.rejects(plugin.saveReflection(source,'感想'),/找不到日记模板/);assert.equal(files.size,1);
 add('Missing.md','<% tp.date.now() %>');await assert.rejects(plugin.saveReflection(source,'感想'),/Templater/);assert.equal(files.size,2);
});
test('并发创建时保留已有文件内容并追加，不覆盖另一方的日记',async()=>{
 const {plugin,add,contents}=fixture();const source=add('Diary/2024/2024-01-17.md');plugin.app.vault.create=async(path:string)=>{add(path,'另一方创建的正文');throw new Error('exists');};
 const result=await plugin.saveReflection(source,'感想');assert.ok(contents.get(result.path)!.startsWith('另一方创建的正文'));assert.ok(contents.get(result.path)!.includes('感想'));
});

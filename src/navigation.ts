export interface ReviewEntry {path:string;mode:'random'|'anniversary';}
export class ReviewNavigation {
 private entries:ReviewEntry[]=[];
 private index=-1;
 constructor(raw?:unknown,legacy:Record<string,number>={}){
  if(raw&&typeof raw==='object'&&'entries' in raw&&Array.isArray(raw.entries)){
   this.entries=raw.entries.filter((v:unknown):v is ReviewEntry=>!!v&&typeof v==='object'&&'path' in v&&typeof v.path==='string'&&'mode' in v&&(v.mode==='random'||v.mode==='anniversary')).map(v=>({path:v.path,mode:v.mode}));
   const index='index' in raw&&typeof raw.index==='number'&&Number.isInteger(raw.index)?raw.index:this.entries.length-1;
   this.index=Math.max(-1,Math.min(index,this.entries.length-1));
   const excess=Math.max(0,this.entries.length-100);this.entries=this.entries.slice(excess);this.index=Math.max(this.entries.length?0:-1,this.index-excess);
  }else{
   this.entries=Object.entries(legacy).sort((a,b)=>a[1]-b[1]).slice(-100).map(([path])=>({path,mode:'random'}));this.index=this.entries.length-1;
  }
 }
 get current(){return this.entries[this.index];}
 get canBack(){return this.index>0;}
 back(){if(this.canBack)this.index--;return this.current;}
 visit(entry:ReviewEntry){if(this.current?.path===entry.path&&this.current.mode===entry.mode)return;this.entries=this.entries.slice(0,this.index+1);this.entries.push({...entry});this.entries=this.entries.slice(-100);this.index=this.entries.length-1;}
 rename(oldPath:string,newPath:string){for(const entry of this.entries)if(entry.path===oldPath)entry.path=newPath;}
 prune(valid:Set<string>){const before=this.entries.slice(0,this.index+1).filter(e=>valid.has(e.path));this.entries=this.entries.filter(e=>valid.has(e.path));this.index=before.length-1;if(this.index<0&&this.entries.length)this.index=0;}
 snapshot(){return {entries:this.entries.map(e=>({...e})),index:this.index};}
}

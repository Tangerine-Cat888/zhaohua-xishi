export function safePath(value:string):string {
 const path=value.trim().replace(/\\/g,'/');
 // Intentionally reject control characters in vault paths.
 // eslint-disable-next-line no-control-regex -- Reject control characters in user-supplied paths.
 if(path.startsWith('/') || /[:\x00-\x1f]/.test(path) || path.split('/').some(p=>p==='..'||p==='.')) throw new Error('请输入库内相对路径，不可包含 .. 或绝对路径。');
 return path.replace(/\/+$/,'').replace(/\/{2,}/g,'/');
}
export function inFolder(path:string,folder:string,recursive:boolean):boolean {
 const relative=folder ? (path.startsWith(folder+'/') ? path.slice(folder.length+1):null):path;
 return relative!==null && (recursive || !relative.includes('/'));
}
export function choose<T extends {path:string}>(items:T[],history:Record<string,number>,now:number,cooldown:number,rng= Math.random):T|undefined {
 const eligible=items.filter(x=>history[x.path]===undefined || now-history[x.path]>=cooldown*86400000);
 const unseen=eligible.filter(x=>history[x.path]===undefined);
 const pool=unseen.length?unseen:eligible;
 const weights=pool.map(x=>history[x.path]===undefined?1:Math.max(1,Math.min(365,(now-history[x.path])/86400000)));
 let target=rng()*weights.reduce((a,b)=>a+b,0);
 return pool.find((_,i)=>(target-=weights[i])<0) ?? pool[pool.length-1];
}
// Ignore headings inside frontmatter and fenced code; keep all existing sections intact.
export function appendReflection(content:string,heading:string,entry:string):string {
 const eol=content.includes('\r\n')?'\r\n':'\n';
 const lines=content.split(/\r?\n/); let fence='',front=lines[0]==='---',start=-1,end=lines.length;
 for(let i=front?1:0;i<lines.length;i++) {
  const line=lines[i]; if(front){if(line==='---'||line==='...')front=false;continue;}
  const f=line.match(/^ {0,3}(`{3,}|~{3,})/);
  if(f){if(!fence)fence=f[1];else if(f[1][0]===fence[0]&&f[1].length>=fence.length&&line.trim()===f[1])fence='';continue;}
  if(fence)continue;
  const h=line.match(/^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
  if(!h)continue;
  if(start>=0 && h[1].length<=2){end=i;break;}
  if(start<0 && h[1]==='##' && h[2].trim()===heading)start=i;
 }
 const block=entry.trim().replace(/\r?\n/g,eol);
 if(start<0)return content.replace(/\s*$/,'')+eol+eol+'## '+heading+eol+eol+block+eol;
 const before=lines.slice(0,end).join(eol).replace(/\s*$/,'');
 const after=lines.slice(end).join(eol);
 return before+eol+eol+block+eol+(after?eol+after:'');
}

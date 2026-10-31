import {build} from 'esbuild';
import {mkdir,copyFile} from 'node:fs/promises';
await build({entryPoints:['src/main.ts'],bundle:true,external:['obsidian'],platform:'browser',format:'cjs',target:'es2020',outfile:'main.js'});
await mkdir('dist/zhaohua-xishi',{recursive:true});
for(const name of ['main.js','manifest.json','styles.css','LICENSE']) await copyFile(name,`dist/zhaohua-xishi/${name}`);

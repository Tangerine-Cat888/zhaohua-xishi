import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ReviewNavigation} from '../src/navigation';
const a={path:'Diary/a.md',mode:'random' as const},b={path:'Diary/b.md',mode:'anniversary' as const};
test('重新加载后仍可返回上一篇，模式随记录恢复',()=>{const n=new ReviewNavigation();n.visit(a);n.visit(b);const restored=new ReviewNavigation(JSON.parse(JSON.stringify(n.snapshot())));assert.deepEqual(restored.current,b);assert.deepEqual(restored.back(),a);assert.equal(restored.canBack,false);});
test('后退后抽取新篇形成新分支，连续重复不增加记录',()=>{const n=new ReviewNavigation();n.visit(a);n.visit(b);n.back();n.visit(a);assert.equal(n.canBack,false);n.visit({path:'Diary/c.md',mode:'random'});assert.deepEqual(n.back(),a);});
test('改名同步，删除或更改目录后跳过无效记录',()=>{const n=new ReviewNavigation();n.visit(a);n.visit(b);n.rename(a.path,'Diary/new.md');n.prune(new Set(['Diary/new.md']));assert.equal(n.current?.path,'Diary/new.md');assert.equal(n.canBack,false);});
test('旧版记录迁移和异常持久化数据处理',()=>{const n=new ReviewNavigation(undefined,{'a.md':1,'b.md':2});assert.equal(n.current?.path,'b.md');assert.equal(n.back()?.path,'a.md');assert.equal(new ReviewNavigation({entries:[null,{},a],index:999}).current?.path,a.path);});
test('浏览记录最多保留一百条',()=>{const n=new ReviewNavigation();for(let i=0;i<120;i++)n.visit({path:i+'.md',mode:'random'});assert.equal(n.snapshot().entries.length,100);assert.equal(n.snapshot().entries[0].path,'20.md');});

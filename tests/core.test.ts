import {test} from 'node:test';
import assert from 'node:assert/strict';
import {appendReflection,choose,inFolder,safePath} from '../src/core';
test('限制路径越界及文件夹前缀碰撞',()=>{
 for(const p of ['../secret','C:/secret','/root','Diary/../secret'])assert.throws(()=>safePath(p));
 assert.equal(inFolder('Diary-old/a.md','Diary',true),false);
 assert.equal(inFolder('Diary/2024/a.md','Diary',true),true);
 assert.equal(inFolder('Diary/2024/a.md','Diary',false),false);
});
test('冷却期耗尽不偷偷重复，未读优先',()=>{
 const now=100*86400000,items=[{path:'a'},{path:'b'}];
 assert.equal(choose(items,{a:now,b:now},now,7),undefined);
 assert.equal(choose(items,{a:1},now,7,()=>0)?.path,'b');
 assert.ok(choose(items,{a:now,b:now},now,0));
});
test('感想为普通正文，追加在正确小节，不破坏下一节',()=>{
 const result=appendReflection('# 今天\n\n## 朝花夕拾\n\n旧感想\n\n## 晚餐\n面条\n','朝花夕拾','回顾 [[2024-01-17]]\n\n新感想');
 assert.match(result,/旧感想\n\n回顾 \[\[2024-01-17\]\]\n\n新感想\n\n## 晚餐\n面条/);
 assert.doesNotMatch(result,/### 回顾/);
});
test('跳过代码块和 YAML 内伪标题，保留换行格式',()=>{
 const original='---\ntitle: 日记\n---\n```md\n## 朝花夕拾\n```\n';
 assert.equal(appendReflection(original,'朝花夕拾','回顾 [[旧日记]]'),original.trimEnd()+'\n\n## 朝花夕拾\n\n回顾 [[旧日记]]\n');
 const win=appendReflection('## 朝花夕拾\r\n旧内容\r\n','朝花夕拾','回顾 [[旧日记]]\n\n感想');
 assert.equal(win.replace(/\r\n/g,'').includes('\n'),false);
});
test('同名小节首次追加，不重复创建标题',()=>{
 const first=appendReflection('正文','朝花夕拾','回顾 [[甲]]\n\n第一次');
 const second=appendReflection(first,'朝花夕拾','回顾 [[乙]]\n\n第二次');
 assert.equal(second.match(/## 朝花夕拾/g)?.length,1);
 assert.ok(second.includes('第一次'));assert.ok(second.includes('第二次'));
});

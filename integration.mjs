import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {generateKeyPairSync,sign} from 'node:crypto';
import {readFileSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {drizzle} from 'drizzle-orm/libsql';
import {createClient} from '@libsql/client';
import ts from 'typescript';
const client=createClient({url:':memory:'});
for(const statement of readFileSync('drizzle/0000_puzzling_franklin_richards.sql','utf8').split(';').map(s=>s.replace(/--> statement-breakpoint/g,'').trim()).filter(Boolean))await client.execute(statement);
const root='.test-runtime';mkdirSync(root,{recursive:true});
const files=['db/schema.ts','lib/base58.ts','lib/validation.ts','lib/payout.ts','app/page.tsx','app/api/sidequest/route.ts'];
for(const file of files){const target=root+'/'+file.replace(/\.tsx?$/,'.js');mkdirSync(target.slice(0,target.lastIndexOf('/')),{recursive:true});let content=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;content=content.replace(/from ['"]@\/([^'"]+)['"]/g,(_,path)=>`from '${new URL(root+'/'+(path==='db'?'db/index':path)+'.js',new URL('./',import.meta.url).href.replace('/tests/','/')).href}'`).replace("from './base58'","from './base58.js'");writeFileSync(target,content);}
writeFileSync(root+'/db/index.js','export function getDb(){return globalThis.__testDb;}');
const schema=await import('../'+root+'/db/schema.js');globalThis.__testDb=drizzle(client,{schema});
const {GET,POST}=await import('../'+root+'/app/api/sidequest/route.js');
function base58(bytes){const alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';let n=BigInt('0x'+Buffer.from(bytes).toString('hex'));let result='';while(n){result=alphabet[Number(n%58n)]+result;n/=58n;}for(const b of bytes){if(b!==0)break;result='1'+result;}return result;}
async function call(body,token){const r=await POST(new Request('https://sidequest.test/api/sidequest',{method:'POST',headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:JSON.stringify(body)}));return {status:r.status,...await r.json()};}
async function login(){const {publicKey,privateKey}=generateKeyPairSync('ed25519');const wallet=base58(publicKey.export({format:'der',type:'spki'}).subarray(-32));const challenge=await call({action:'challenge',wallet});assert.equal(challenge.status,200);const signed=Array.from(sign(null,Buffer.from(challenge.message),privateKey));const verified=await call({action:'verify',token:challenge.token,signature:signed});assert.equal(verified.status,200);assert.equal((await call({action:'verify',token:challenge.token,signature:signed})).status,400);return {wallet,token:verified.token};}
try{
const sponsor=await login(),tester=await login(),stranger=await login();
const {buildRewardTransaction}=await import('../'+root+'/lib/payout.js');
const {Transaction,SystemInstruction}=await import('@solana/web3.js');
const tx=buildRewardTransaction(sponsor.wallet,tester.wallet,20000000,'test-receipt','11111111111111111111111111111111',100);
const decoded=Transaction.from(tx.serialize({requireAllSignatures:false,verifySignatures:false}));
assert.equal(SystemInstruction.decodeTransfer(decoded.instructions[0]).lamports,20000000n);
assert.equal(decoded.instructions[1].data.toString(),'SideQuest:test-receipt');
assert.throws(()=>buildRewardTransaction(sponsor.wallet,sponsor.wallet,20000000,'x','11111111111111111111111111111111',100));
assert.throws(()=>buildRewardTransaction(sponsor.wallet,tester.wallet,0.2,'x','11111111111111111111111111111111',100));
const React=await import('react');const {renderToStaticMarkup}=await import('react-dom/server');const Home=(await import('../'+root+'/app/page.js')).default;const html=renderToStaticMarkup(React.createElement(Home));assert.ok(html.includes('Try an app.'));assert.ok(html.includes('Tell it like it is.'));assert.ok(html.includes('SIMULATED REWARD'));assert.ok(html.includes('No wallet needed. No SOL is sent.'));assert.ok(html.includes('/brand/sidequest-logo.png'));assert.ok(html.includes('Rewards use test SOL, not real money.'));assert.ok(html.includes('why-sidequest'));assert.ok(html.includes('/brand/solana-white.svg'));assert.ok(!html.includes('Starter Project'));
assert.equal((await call({action:'create',quest:{} })).status,400);
const q={title:'Test our onboarding',company:'Example Labs',description:'Explore the onboarding and share specific observations about what needs improvement.',url:'https://example.com',category:'Consumer',reward:20000000,slots:1,minutes:8,steps:['Try the onboarding and explain the result.','Find a confusing instruction and explain why.','Suggest an improvement with a concrete example.'],criteria:'All three tasks need specific observations. Critical feedback qualifies.'};
assert.equal((await call({action:'create',quest:{...q,url:'javascript:alert(1)'}},sponsor.token)).status,400);
const created=await call({action:'create',quest:q},sponsor.token);assert.equal(created.status,200);
const feedback={action:'submit',questId:created.id,answers:['The first screen was unclear because the button did not explain the next action.','I could not tell whether the next step would connect my wallet or send funds.','Add a clear preview of each step before asking the user to connect a wallet.'],rating:1};
assert.equal((await call(feedback,sponsor.token)).status,400);
const submitted=await call(feedback,tester.token);assert.equal(submitted.status,200);
assert.equal((await call(feedback,tester.token)).status,400);
assert.equal((await call(feedback,stranger.token)).status,400);
assert.equal((await call({action:'review',id:submitted.id,status:'approved',reason:'Specific observations provided.'},stranger.token)).status,400);
assert.equal((await call({action:'review',id:submitted.id,status:'approved',reason:'Specific critical feedback meets all three published criteria.'},sponsor.token)).status,200);
assert.equal((await call({action:'review',id:submitted.id,status:'rejected',reason:'Try to reverse the prior decision.'},sponsor.token)).status,400);
const realFetch=globalThis.fetch;let sender=stranger.wallet;const signature='3'.repeat(88);
globalThis.fetch=async()=>Response.json({result:{blockTime:Math.ceil(Date.now()/1000),meta:{err:null},transaction:{message:{instructions:[{program:'system',parsed:{type:'transfer',info:{source:sender,destination:tester.wallet,lamports:q.reward}}},{program:'spl-memo',parsed:'SideQuest:'+submitted.id}]}}}});
assert.equal((await call({action:'recordPayment',id:submitted.id,signature},sponsor.token)).status,400);
sender=sponsor.wallet;assert.equal((await call({action:'recordPayment',id:submitted.id,signature},sponsor.token)).status,200);
assert.equal((await call({action:'recordPayment',id:submitted.id,signature},sponsor.token)).status,400);
globalThis.fetch=realFetch;
const publicData=await (await GET(new Request('https://sidequest.test/api/sidequest'))).json();assert.equal(publicData.submissions.length,0);assert.equal(publicData.quests[0].remaining,0);
const ownData=await (await GET(new Request('https://sidequest.test/api/sidequest',{headers:{Authorization:'Bearer '+tester.token}}))).json();assert.equal(ownData.submissions[0].status,'paid');
console.log('PASS: wallet proof and replay, authenticated publishing, HTTPS URL, self-review, capacity, duplicate feedback, sponsor-only review, negative feedback approval, wrong-sender rejection, exact payout receipt, repeat-payment rejection, feedback privacy. RPC receipt fixtures are simulated.');
}finally{client.close();rmSync(root,{recursive:true,force:true});}

import {PublicKey,SystemProgram,Transaction,TransactionInstruction} from '@solana/web3.js';
import {Buffer} from 'buffer';
export function buildRewardTransaction(sponsor:string,tester:string,lamports:number,submissionId:string,blockhash:string,lastValidBlockHeight:number){
 if(!Number.isSafeInteger(lamports)||lamports<1000000||lamports>1000000000)throw new Error('Invalid reward amount');
 if(sponsor===tester)throw new Error('A sponsor cannot pay itself as a tester');
 return new Transaction({feePayer:new PublicKey(sponsor),blockhash,lastValidBlockHeight}).add(SystemProgram.transfer({fromPubkey:new PublicKey(sponsor),toPubkey:new PublicKey(tester),lamports}),new TransactionInstruction({keys:[],programId:new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),data:Buffer.from('SideQuest:'+submissionId,'utf8')}));
}

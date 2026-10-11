import { z } from 'zod';
import { decode58 } from './base58';
export const walletSchema=z.string().min(32).max(44).refine(v=>{try{return decode58(v).length===32;}catch{return false;}},'Invalid Solana address');
export const questSchema=z.object({title:z.string().trim().min(5).max(100),company:z.string().trim().min(2).max(60),description:z.string().trim().min(30).max(2000),url:z.string().url().max(500).refine(v=>v.startsWith('https://'),'Use an HTTPS product URL'),category:z.enum(['Consumer','DeFi','Gaming','Developer tools']),reward:z.number().int().min(1000000).max(1000000000),slots:z.number().int().min(1).max(100),minutes:z.number().int().min(2).max(60),steps:z.array(z.string().trim().min(10).max(500)).length(3),criteria:z.string().trim().min(30).max(1000)});
export const feedbackSchema=z.object({questId:z.string().uuid(),answers:z.array(z.string().trim().min(30).max(2000)).length(3),rating:z.number().int().min(1).max(5)});

import type { Database } from '@/integrations/supabase/types';
export type Profile=Database['public']['Tables']['profiles']['Row'];
export type Opportunity=Database['public']['Tables']['opportunities']['Row'];
export function skillMatch(skills:string[], required:string[]){const normalized=new Set(skills.map(s=>s.trim().toLowerCase()));const matched=required.filter(s=>normalized.has(s.trim().toLowerCase()));return {matched,score:required.length?Math.round(matched.length/required.length*100):0};}
export function profileCompletion(p:Partial<Profile>){return Math.round([p.name,p.title,p.location,p.skills?.length,p.education,p.languages,p.interests,p.preferences].filter(Boolean).length/8*100);}
export const readinessTasks=['Work authorization — official confirmation required','Professional documentation','Banking and payment readiness — provider approval required','CV preparation','Interview readiness','Credential recognition — official review required','Professional training'];
export function pageMeta(title:string,description:string){return {meta:[{title:`${title} | TalentBridge Africa`},{name:'description',content:description},{property:'og:title',content:`${title} | TalentBridge Africa`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}

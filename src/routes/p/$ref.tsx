import {createFileRoute,notFound} from '@tanstack/react-router';
import {useEffect,useState} from 'react';
import {createServerFn} from '@tanstack/react-start';
import {createClient} from '@supabase/supabase-js';
import type {Database} from '@/integrations/supabase/types';
import {PassportContent} from '@/components/workspace';
import {pageMeta} from '@/lib/talent';
const getPassport=createServerFn({method:'GET'}).inputValidator((input:{ref:string})=>input).handler(async({data})=>{const url=process.env['SUPABASE_URL'];const key=process.env['SUPABASE_PUBLISHABLE_KEY'];if(!url||!key)throw new Error('Connection unavailable');const db=createClient<Database>(url,key,{auth:{persistSession:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(key.startsWith('sb_'))h.delete('Authorization');h.set('apikey',key);return fetch(input,{...init,headers:h});}}});const r=await db.from('profiles').select('*').eq('passport_ref',data.ref).eq('shared',true).maybeSingle();return r.data;});
export const Route=createFileRoute('/p/$ref')({loader:async({params})=>{const p=await getPassport({data:{ref:params.ref}});if(!p)throw notFound();return p;},head:({loaderData})=>pageMeta(loaderData?`${loaderData.name}'s skills passport`:'Passport unavailable','A consent-shared professional skills passport from TalentBridge Africa.'),component:Passport});
function Passport(){const [origin,setOrigin]=useState('');useEffect(()=>setOrigin(window.location.origin),[]);return <main className="container-wide page-body"><PassportContent profile={Route.useLoaderData()} origin={origin}/></main>}

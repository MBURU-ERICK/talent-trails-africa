import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from '@tanstack/react-router';
import type {User} from '@supabase/supabase-js';
import {supabase} from '@/integrations/supabase/client';
const AuthContext=createContext<{user:User|null;ready:boolean}>({user:null,ready:false});
export function AuthProvider({children}:{children:ReactNode}){const [user,setUser]=useState<User|null>(null);const [ready,setReady]=useState(false);const router=useRouter();const q=useQueryClient();useEffect(()=>{supabase.auth.getUser().then(({data})=>{setUser(data.user);setReady(true)});const {data}=supabase.auth.onAuthStateChange((event,session)=>{setUser(session?.user??null);setReady(true);if(['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event)){void router.invalidate();if(event!=='SIGNED_OUT')void q.invalidateQueries();}});return ()=>data.subscription.unsubscribe();},[router,q]);return <AuthContext.Provider value={{user,ready}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);

import {createFileRoute} from '@tanstack/react-router';
import {useSuspenseQuery} from '@tanstack/react-query';
import {Workspace,workspaceOptions} from '@/components/workspace';
import {getPublicData} from '@/lib/data.functions';
import {pageMeta} from '@/lib/talent';
export const Route=createFileRoute('/_authenticated/readiness')({head:()=>pageMeta('Employment readiness','Your professional journey with TalentBridge Africa.'),loader:async({context})=>{await context.queryClient.ensureQueryData(workspaceOptions);return getPublicData();},component:Screen});
function Screen(){const {data}=useSuspenseQuery(workspaceOptions);return <Workspace view="readiness" data={data} publicData={Route.useLoaderData()}/>}

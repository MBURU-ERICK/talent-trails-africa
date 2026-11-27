import {createFileRoute,Link} from '@tanstack/react-router';
import {PageHeading,Steps} from '@/components/site';
import {pageMeta} from '@/lib/talent';
import {Button} from '@/components/ui/button';
export const Route=createFileRoute('/how-it-works')({head:()=>pageMeta('How it works','Build a passport, demonstrate your skills and connect with meaningful work.'),component:How});
function How(){return <><PageHeading title="From potential to possibility." description="A skills-first journey, designed around your professional future."/><main className="container-wide page-body"><Steps/><div className="notice mt-8">Transparent verification: Self-reported → Assessment completed → Pending review → Reviewed by platform administrator. External verification requires evidence from an authorized external verifier.</div><Button asChild><Link to="/auth">Create your skills passport →</Link></Button></main></>}

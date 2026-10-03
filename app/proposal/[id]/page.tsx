import type {Metadata} from "next";
import {notFound} from "next/navigation";
import AcceptProposal from "./AcceptProposal";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Private Proposal | Bass One Basses",robots:{index:false,follow:false},referrer:"no-referrer"};
function money(v:any,c:any){return new Intl.NumberFormat("en-US",{style:"currency",currency:c||"USD"}).format(Number(v||0))}
export default async function Proposal({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{access?:string}>}){
 const {id}=await params;const {access}=await searchParams;if(!access)notFound();
 const r=await fetch("https://wgos.app/api/public/proposals/"+encodeURIComponent(id)+"?access="+encodeURIComponent(access),{cache:"no-store"});if(!r.ok)notFound();
 const d:any=await r.json(),p=d.proposal;
 return <main className="boClient"><div className="boShell"><header className="boHero"><p>BASS ONE BASSES · PRIVATE PROPOSAL</p><h1>{p.opportunity_title||"Your Bass One Proposal"}</h1>{p.organization_name&&<span>Prepared for {p.organization_name}</span>}</header>
 {d.sections.map((s:any,i:number)=><section className="boPanel" key={i}><small>{s.section_type}</small><h2>{s.title||s.section_type}</h2><p>{typeof s.content==="string"?s.content:JSON.stringify(s.content)}</p></section>)}
 <section className="boPanel"><small>INVESTMENT</small><h2>{money(p.one_time_total,p.currency)}</h2>{d.items.map((x:any,i:number)=><div className="boLine" key={i}><span>{x.name}</span><strong>{money((Number(x.unit_amount_cents)*Number(x.quantity)+Number(x.tax_cents))/100,p.currency)}</strong></div>)}</section>
 <AcceptProposal id={id} access={access}/><footer className="boPrivateFooter">Bass One Basses · Handcrafted with purpose</footer></div></main>
}
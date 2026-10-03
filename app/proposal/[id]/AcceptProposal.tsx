"use client";
import {useState} from "react";
export default function AcceptProposal({id,access}:{id:string;access:string}){
 const [busy,setBusy]=useState(false),[done,setDone]=useState(false),[error,setError]=useState("");
 async function accept(){if(!confirm("Accept this Bass One proposal as presented?"))return;setBusy(true);setError("");try{const r=await fetch("/api/proposal/"+encodeURIComponent(id)+"/accept",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({access})});const j=await r.json();if(!r.ok||!j.ok)throw new Error(j.error||"Unable to accept proposal");setDone(true)}catch(e){setError(e instanceof Error?e.message:"Unable to accept proposal")}finally{setBusy(false)}}
 if(done)return <div className="boNotice"><strong>Proposal accepted.</strong><p>Your Bass One engagement can now move to the secure agreement step.</p></div>;
 return <div><button className="boAction" onClick={accept} disabled={busy}>{busy?"Recording acceptance…":"Accept Proposal →"}</button>{error&&<p role="alert">{error}</p>}</div>
}
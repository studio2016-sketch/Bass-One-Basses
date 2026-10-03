import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  let input:Record<string,unknown>;
  try {input=await request.json();}catch{return NextResponse.json({error:"Invalid request."},{status:400});}
  const value=(k:string)=>typeof input[k]==="string"?String(input[k]).trim():"";
  const name=value("name"),email=value("email"),interest=value("interest"),message=value("message"),phone=value("phone");
  if(!name||name.length>120||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||!interest||interest.length>120||message.length>5000) return NextResponse.json({error:"Please check the required fields."},{status:400});
  if(value("website"))return NextResponse.json({ok:true});
  try {
    const wgos=await fetch("https://wgos.app/api/public/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
      brandId:"bassOne",name,email,phone,title:"Bass One inquiry — "+interest,message,
      details:{interest,source:"bass-one-basses-site"}
    }),cache:"no-store"});
    if(!wgos.ok){
      const failure=await wgos.json().catch(()=>({}));
      return NextResponse.json({error:failure.error||"We could not submit your inquiry."},{status:502});
    }
    const key=process.env.RESEND_API_KEY,from=process.env.BASS_ONE_FROM_EMAIL;
    if(key&&from){
      const text=["New Bass One inquiry","Name: "+name,"Email: "+email,"Phone: "+(phone||"Not provided"),"Interest: "+interest,"Message: "+message].join("\n\n");
      fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({from,to:["bassoneinfo@gmail.com"],reply_to:email,subject:"Bass One inquiry — "+interest,text}),cache:"no-store"}).catch(()=>{});
    }
    return NextResponse.json({ok:true,delivery:"wgos_captured"});
  }catch{return NextResponse.json({error:"We could not submit your inquiry."},{status:502});}
}

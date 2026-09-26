import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.BASS_ONE_FROM_EMAIL;
  if (!key || !from) return NextResponse.json({error:"Online inquiry is not configured yet. Please use the email option."},{status:503});
  let input:Record<string,unknown>;
  try {input=await request.json();}catch{return NextResponse.json({error:"Invalid request."},{status:400});}
  const value=(k:string)=>typeof input[k]==="string"?String(input[k]).trim():"";
  const name=value("name"),email=value("email"),interest=value("interest"),message=value("message");
  if(!name||name.length>120||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||!interest||interest.length>120||message.length>5000) return NextResponse.json({error:"Please check the required fields."},{status:400});
  if(value("website"))return NextResponse.json({ok:true});
  const text=["New Bass One inquiry","Name: "+name,"Email: "+email,"Interest: "+interest,"Message: "+message].join("\n\n");
  try {
    const result=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({from,to:["bassoneinfo@gmail.com"],reply_to:email,subject:"Bass One inquiry — "+interest,text}),cache:"no-store"});
    if(!result.ok)return NextResponse.json({error:"We could not send your inquiry. Please use the email option."},{status:502});
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:"We could not send your inquiry. Please use the email option."},{status:502});}
}

"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const models = [
  { name: "Awesome One", series: "Professional Series", from: "$1,998", image: "https://static.wixstatic.com/media/3e9782_dda855938083440da828ab81e6f3e85f~mv2.jpeg", copy: "The essential Bass One experience: bold finish, active/passive versatility, and the comfort to play longer." },
  { name: "Incredible One", series: "Premium Series", from: "$3,148", image: "https://static.wixstatic.com/media/3e9782_91fb8dcd74cc4b9bb44b4ff7a9d04ebd~mv2.png", copy: "Maple neck, alder body back, and refined construction for demanding players." },
  { name: "Magnificent One", series: "Custom Series", from: "$5,298", image: "https://static.wixstatic.com/media/3e9782_ffe190e9d6444da08b0bea83e02bbdd1~mv2.jpg", copy: "Seven strings, mesquite neck, mahogany body back, colored wood, and gold hardware—shaped around your musical vision." },
];

function salesEmail(subject: string) {
  return `mailto:bassoneinfo@gmail.com?subject=${encodeURIComponent(subject)}`;
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Custom consultation");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const interest = String(data.get("interest") || "");
    const message = String(data.get("message") || "");
    const body = `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`;
    window.location.href = `${salesEmail(`Bass One inquiry — ${interest}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Bass One Basses",
    description: "Ergonomically enhanced, tonally dynamic electric basses handcrafted by Dr. Duane Greene.",
    url: "https://bass-one-basses.vercel.app",
    email: "bassoneinfo@gmail.com",
    address: { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" },
    sameAs: [],
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><main>
    <nav className="nav"><a className="brand" href="#top">BASS <i>ONE</i></a><div className="navlinks"><a href="#collection">Collection</a><a href="#difference">The Difference</a><a href="#heritage">Heritage</a><a href="#custom">Custom</a></div><a className="navcta" href="#consult">Begin your build</a></nav>
    <section className="hero" id="top">
      <div className="hero-glow" />
      <div className="hero-copy"><p className="eyebrow">Ergonomically enhanced · Tonally dynamic</p><h1>Built to play<br/><em>with you.</em></h1><p className="lede">Instruments of uncommon balance, sensitivity, and beauty—created so the bass never stands between the musician and the music.</p><div className="actions"><a className="button solid" href="#collection">Explore the collection</a><a className="textlink" href="#difference">Why Bass One <span>→</span></a></div></div>
      <div className="hero-image"><Image src="https://static.wixstatic.com/media/3e9782_91fb8dcd74cc4b9bb44b4ff7a9d04ebd~mv2.png" alt="Bass One custom bass" fill priority sizes="(max-width: 800px) 100vw, 52vw" /></div>
      <p className="hero-note">Austin, Texas<br/>Handcrafted with purpose</p>
    </section>

    <section className="statement"><p>“Your instrument should be the means by which you express yourself, not the barrier between your ideas and what the audience hears.”</p></section>

    <section className="section collection" id="collection"><div className="section-intro"><h2>Three expressions.<br/><em>One uncompromising standard.</em></h2><p>Every Bass One begins with a player&apos;s body and voice in mind. Choose the path that meets you where you are.</p></div><div className="model-grid">{models.map((model) => <article className="model" key={model.name}><div className="model-image"><Image src={model.image} alt={model.name} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><p className="tier">{model.series}</p><h3>{model.name}</h3><p>{model.copy}</p><div className="model-bottom"><span>From {model.from}</span><a href="#consult" onClick={() => setSelectedModel(model.name)}>Inquire <b>→</b></a></div></article>)}</div></section>

    <section className="difference" id="difference"><div className="difference-image"><Image src="https://static.wixstatic.com/media/3e9782_917aeca8e5f2458d962ae1bbdde57a7c~mv2.jpeg" alt="Bass One instrument detail" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className="difference-copy"><h2>Designed around the <em>human player.</em></h2><div className="principles"><div><h3>Balance</h3><p>Thoughtful weight distribution reduces the strain of a neck-heavy or body-heavy instrument through the longest sets and sessions.</p></div><div><h3>Natural movement</h3><p>Ergonomic neck contours and zero-fret construction are designed to meet the hand in its natural range of motion.</p></div><div><h3>Responsive tone</h3><p>Careful wood selection and studio-minded electronics help the instrument speak with a lighter, more musical touch.</p></div></div></div></section>

    <section className="heritage section" id="heritage"><div className="heritage-head"><h2>A solution born from pain,<br/><em>healing, and calling.</em></h2></div><div className="heritage-grid"><div><p>For more than thirty years, Dr. Duane Greene has played, composed, and listened closely to the obstacles bassists face: weight, fatigue, unnatural neck contours, and instruments that demand too much force to make a clear sound.</p><p>After experiencing hand and back pain in his own musical journey—and a profound healing while playing in church—he set out to build another way.</p></div><div className="quote"><p>“The easier the bass is to play, the less stress is on the hands of the player.”</p><span>Dr. Duane Greene / Founder & Luthier</span></div></div></section>

    <section className="artists section"><div className="artists-intro"><h2>Made for musicians<br/><em>who cannot compromise.</em></h2><p>Players choose Bass One for the part of the story that matters most: how an instrument feels after the first hour, the final set, and the sessions in between.</p></div><div className="testimonials"><article><p>“It&apos;s beautifully handcrafted and lightweight—and handles like a dream.”</p><span>Chris Anderson<br/><small>Bassist for Janet Jackson, Christina Aguilera, Boyz II Men, and Yolanda Adams</small></span></article><article><p>“I can stand all night and play this bass.”</p><span>Barry Jackson<br/><small>Studio and session bassist</small></span></article><article><p>“This bass is lighter than my 4-string… This Bass is a keeper.”</p><span>Drue Williams<br/><small>Founder, Boom Bass Cabinets</small></span></article></div></section>

    <section className="tone"><div><h2>Wood. Light.<br/><em>Living tone.</em></h2><p>Each material is selected for its voice as well as its visual character: the warmth of mahogany, the focus of mesquite, the detail of exotic tops, and the elegance of a finish made to last.</p></div><div className="tone-images"><Image src="https://static.wixstatic.com/media/3e9782_1ae3015e55fa4e2fb0db7f629befae78~mv2.png" alt="Bass One detail" width={360} height={520}/><Image src="https://static.wixstatic.com/media/3e9782_e654ddac6c4342f6b5efba75e4ffdd26~mv2.jpeg" alt="Bass One handcrafted instrument" width={360} height={520}/></div></section>

    <section className="custom" id="custom"><div className="custom-art"><Image src="https://static.wixstatic.com/media/3e9782_ffe190e9d6444da08b0bea83e02bbdd1~mv2.jpg" alt="Custom Bass One bass" fill sizes="(max-width: 800px) 100vw, 55vw" /></div><div><h2>Your bass.<br/><em>Your signature.</em></h2><p>A custom Bass One is a focused collaboration between player and builder. Scale, strings, woods, electronics, hardware, finish, lighting—every choice serves your sound, your hands, and the life you want the instrument to live.</p><ul><li>Single or dual-cutaway body</li><li>4–7 strings and custom scale options</li><li>Custom woods, finish, and hardware</li><li>Premium electronics, balanced XLR, and LED options</li></ul><a className="button gold" href="#consult">Start a custom consultation</a></div></section>

    <section className="order section"><div><h2>From first question<br/><em>to first note.</em></h2></div><ol><li><span>01</span><div><h3>Choose your series</h3><p>Begin with the Awesome, Incredible, or Magnificent One—or simply tell us what you need from an instrument.</p></div></li><li><span>02</span><div><h3>Speak with a Bass One specialist</h3><p>We&apos;ll clarify strings, scale, tone, visual direction, and the best starting point for your work.</p></div></li><li><span>03</span><div><h3>Confirm your build</h3><p>Receive a clear recommendation and next steps to place your order or begin the custom design process.</p></div></li></ol></section>

    <section className="consult section" id="consult"><div><h2>Let&apos;s find the bass<br/><em>that belongs in your hands.</em></h2><p>Tell us where you are in your journey. Whether you are ready to order a standard model or begin a fully custom instrument, the conversation starts here.</p><p className="sales">Sales & custom builds<br/><a href="mailto:bassoneinfo@gmail.com">bassoneinfo@gmail.com</a><br/>Austin, Texas</p></div><form onSubmit={submit}><label>Your name<input required name="name" placeholder="Your name" /></label><label>Email address<input required type="email" name="email" placeholder="you@email.com" /></label><label>I&apos;m interested in<select name="interest" value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}><option>Awesome One</option><option>Incredible One</option><option>Magnificent One</option><option>Custom consultation</option><option>Artist / dealer partnership</option></select></label><label>Tell us about your music and ideal bass<textarea name="message" rows={4} placeholder="Your sound, string count, timeline, questions…" /></label><button className="button solid" type="submit">Send inquiry</button>{sent && <p className="form-note">Your email app is opening with your inquiry ready to send.</p>}</form></section>
    <footer><a className="brand" href="#top">BASS <i>ONE</i></a><p>Handcrafted instruments for a life in music.</p><p>© {new Date().getFullYear()} Bass One Basses</p></footer>
  </main></>;
}

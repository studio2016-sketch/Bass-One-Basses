"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const models = [
  { name: "Awesome One", series: "Professional Series", from: "$1,998", image: "/awesome-one.jpg", copy: "Versatility. Comfort. Performance. Professional performance with limitless possibilities." },
  { name: "Incredible One", series: "Premium Series", from: "$3,148", image: "/incredible-one.jpg", copy: "Refinement. Character. Craftsmanship. Exceptional materials with distinctive character." },
  { name: "Magnificent One", series: "Stage and Studio Elite Series", from: "$5,298", image: "/magnificent-one.jpg", copy: "Individuality. Exclusivity. Custom expression. Masterful craftsmanship without compromise." },
];

const endorsementCards = [
  { name: "Jermaine Williams", src: "/endorsement-jermaine-williams-locked.jpeg", alt: "Jermaine Williams Bass One endorsement card", special: true },
  { name: "Barry Jackson", src: "/endorsement-barry-jackson.png", alt: "Barry Jackson Bass One endorsement card" },
  { name: "Chris Anderson", src: "/endorsement-chris-anderson.png", alt: "Chris Anderson Bass One endorsement card" },
];

const bassGallery = [
  { src: "/gallery-mr-blackman-2.jpg", alt: "Bass One Mr. Blackman custom bass" },
  { src: "/gallery-blue-piccolo.jpg", alt: "Bass One blue piccolo bass" },
  { src: "/gallery-koa-short-scale-6.jpg", alt: "Bass One Koa short-scale six-string bass" },
  { src: "/gallery-mr-blackman-card.jpg", alt: "Bass One Mr. Blackman bass presentation" },
  { src: "/gallery-black-pearl.jpg", alt: "Bass One Black Pearl custom bass" },
  { src: "/gallery-little-hannah.jpg", alt: "Bass One Little Hannah custom bass" },
  { src: "/gallery-puddin-2.jpg", alt: "Bass One Puddin custom bass" },
  { src: "/gallery-9-string-maple.jpg", alt: "Bass One nine-string maple bass" },
];


const strapProducts = [
  { name: "Baby Cheetah", src: "/strap-baby-cheetah-front.jpg", alt: "Baby Cheetah custom ergonomic Bass One bass strap" },
  { name: "Black Lizard", src: "/strap-black-lizard-front.jpg", alt: "Black Lizard custom ergonomic Bass One bass strap" },
  { name: "Black Lizard — adjustment view", src: "/strap-black-lizard-points.jpg", alt: "Black Lizard Bass One strap showing adjustment points" },
];

function salesEmail(subject: string) {
  return `mailto:bassoneinfo@gmail.com?subject=${encodeURIComponent(subject)}`;
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Custom consultation");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const model = new URLSearchParams(window.location.search).get("model"); if (model && ["Awesome One","Incredible One","Magnificent One","Custom consultation"].includes(model)) setSelectedModel(model); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const interest = String(data.get("interest") || "");
    const message = String(data.get("message") || "");
    const body = `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`;
    setSubmitting(true);
    setFormStatus("");
    try {
      const response = await fetch("/api/inquiry", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,interest,message,website:String(data.get("website")||"")})});
      if (!response.ok) throw new Error("Email service unavailable");
      setSent(true);
      setFormStatus("Thank you. Your inquiry has been sent to Bass One.");
      event.currentTarget.reset();
    } catch {
      setFormStatus("Online delivery is not available yet. Use the email link below to send your inquiry.");
    } finally { setSubmitting(false); }
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
    <nav className="nav"><a className="brand" href="#top" onClick={() => setMenuOpen(false)}><img className="brand-logo-full" src="/bass-one-logo.webp" alt="Bass One Basses" /></a><div className="navlinks"><a href="/collection">Collection</a><a href="/listening-room">Listen</a><a href="#about">About</a><a href="#difference">The Difference</a><a href="#custom">Custom</a></div><a className="navcta" href="#consult">Begin your build</a><button className={"menu-toggle"+(menuOpen?" is-open":"")} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span><span></span></button><div className={"mobile-menu"+(menuOpen?" is-open":"")} id="mobile-menu"><a href="/collection" onClick={() => setMenuOpen(false)}>Collection</a><a href="/listening-room" onClick={() => setMenuOpen(false)}>Listen</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#difference" onClick={() => setMenuOpen(false)}>The Difference</a><a href="#custom" onClick={() => setMenuOpen(false)}>Custom</a><a className="mobile-menu-cta" href="#consult" onClick={() => setMenuOpen(false)}>Begin your build</a></div></nav>
    <section className="hero brand-hero" id="top">
      <div className="brand-hero-frame">
        <Image className="brand-hero-image" src="/bass-one-home-hero.png" alt="Bass One Basses" fill priority sizes="100vw" />
      </div>
    </section>

    <section className="statement"><p>“Your instrument should be the means by which you express yourself, not the barrier between your ideas and what the audience hears.”</p></section>

    <section className="section collection" id="collection"><div className="section-intro"><h2>Three expressions.<br/><em>One uncompromising standard.</em></h2><p>Every Bass One begins with a player&apos;s body and voice in mind. Choose the path that meets you where you are.</p></div><div className="model-grid">{models.map((model) => <article className="model" key={model.name}><div className="model-image"><Image src={model.image} alt={model.name} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><p className="tier">{model.series}</p><h3>{model.name}</h3><p>{model.copy}</p><div className="model-bottom"><span>From {model.from}</span><a href="/collection">Explore <b>→</b></a><a href="#consult" onClick={() => setSelectedModel(model.name)}>Inquire <b>→</b></a></div></article>)}</div></section>

    <section className="about section" id="about">
      <div className="about-kicker"><p className="eyebrow">About Bass One Basses</p><h2>Built around the player.<br/><em>Crafted with purpose.</em></h2></div>
      <div className="about-mission">
        <p className="mission-lead">Our mission is simple: <strong>to empower every player to unlock their purest musical expression.</strong></p>
        <div className="mission-copy">
          <p>We craft beautiful, ergonomically-designed, and sonically versatile instruments that don&apos;t just respond to your touch — they partner with you in every moment of creativity.</p>
          <p>We believe that a bass should do more than make sound; it should enhance your confidence, elevate your performance, and support your artistry, whether you&apos;re laying down a precision track in the studio or commanding the stage live.</p>
          <p>Every Bass One instrument is built with premium exotic and domestic tone woods, high-end electronics, and player-focused ergonomics proven through real musician feedback and professional performance environments.</p>
          <p>Our commitment is rooted in authentic craftsmanship and the pursuit of excellence — because when a bass is perfectly balanced, visually stunning, and engineered for clarity and comfort, your music speaks louder.</p>
          <p>We design each instrument to inspire creativity, honor your individuality, and deliver the tone, the look, and the feel that set great players apart.</p>
        </div>
      </div>
      <div className="mission-close"><span>Feel the Groove. Shape the Moment.</span><strong>The Look. The Feel. The Tone.</strong><small>Crafted with purpose. Designed for players who demand more.</small></div>
    </section>

    <section className="difference" id="difference"><div className="difference-image"><Image src="/blue-led-7-string.jpg" alt="Bass One seven-string bass with blue LED fingerboard markers" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className="difference-copy"><h2>Designed around the <em>human player.</em></h2><div className="principles"><div><h3>Balance</h3><p>Thoughtful weight distribution reduces the strain of a neck-heavy or body-heavy instrument through the longest sets and sessions.</p></div><div><h3>Natural movement</h3><p>Ergonomic neck contours and zero-fret construction are designed to meet the hand in its natural range of motion.</p></div><div><h3>Responsive tone</h3><p>Careful wood selection and studio-minded electronics help the instrument speak with a lighter, more musical touch.</p></div></div></div></section>

    <section className="heritage section" id="heritage"><div className="heritage-head"><h2>A solution born from pain,<br/><em>healing, and calling.</em></h2></div><div className="heritage-grid"><div><p>For more than thirty years, Dr. Duane Greene has played, composed, and listened closely to the obstacles bassists face: weight, fatigue, unnatural neck contours, and instruments that demand too much force to make a clear sound.</p><p>After experiencing hand and back pain in his own musical journey—and a profound healing while playing in church—he set out to build another way.</p></div><div className="quote"><p>“The easier the bass is to play, the less stress is on the hands of the player.”</p><span>Dr. Duane Greene / Founder & Luthier</span></div></div></section>

    <section className="artists section" id="artists">
      <div className="artists-intro endorsements-intro">
        <p className="eyebrow">Player & specialist perspectives</p>
        <h2>Bass One<br/><em>Endorsements.</em></h2>
        <p>From musicians who live with an instrument for hours at a time to specialists focused on hand health and ergonomics, these perspectives speak to the part of the Bass One philosophy that can only be understood by experience.</p>
      </div>

      <div className="endorsement-category">
        <div className="endorsement-category-head"><p className="eyebrow">01</p><h3>Ergonomics</h3></div>

        <article className="official-endorsement">
          <div className="official-endorsement-copy">
            <p className="eyebrow">Official Endorsements</p>
            <h4>Dr. Jim King</h4>
            <p className="endorsement-role">American Society of Hand Therapists</p>
            <p>A specialist perspective on the ergonomic principles behind the Bass One playing experience.</p>
          </div>
          <video controls playsInline preload="metadata" poster="/incredible-one.jpg" src="https://www.dropbox.com/scl/fi/2ugc8z2dsqx4sdjhxzd6r/Dr.-Jim-King-Ergonomic-Endorsement.MOV?rlkey=72bylcb9rl77xuydjv1qxeolj&raw=1"/>
        </article>

        <article className="jill-endorsement">
          <div className="jill-copy">
            <p className="eyebrow">Musician ergonomics</p>
            <h4>Jill Gambaro</h4>
            <blockquote>“This neck is from a 6- String Bass? This so comfortable I could play this all night without any pain at all!”</blockquote>
            <p>Author of <em>The Truth About Carpal Tunnel Syndrome: Finding Answers, Getting Well</em>.</p>
            <a className="textlink" href="https://www.bloomsbury.com/us/truth-about-carpal-tunnel-syndrome-9781538107508/" target="_blank" rel="noreferrer">View Jill Gambaro&apos;s book →</a>
          </div>
          <div className="jill-media">
            <a className="jill-book" href="https://www.bloomsbury.com/us/truth-about-carpal-tunnel-syndrome-9781538107508/" target="_blank" rel="noreferrer">
              <img src="/jill-gambaro-book-cover.jpeg" alt="The Truth About Carpal Tunnel Syndrome by Jill Gambaro book cover"/>
            </a>
            <a className="jill-profile-link" href="https://www.goodreads.com/author/show/7786264.Jill_Gambaro" target="_blank" rel="noreferrer" aria-label="View Jill Gambaro author profile">
              <span className="jill-profile-monogram">JG</span>
              <span><strong>Jill Gambaro</strong><small>Author profile · ergonomics & repetitive-strain advocacy</small></span>
            </a>
          </div>
        </article>
      </div>

      <div className="endorsement-category artist-endorsement-category">
        <div className="endorsement-category-head"><p className="eyebrow">02</p><h3>Artist Endorsements</h3></div>
        <div className="endorsement-cards">{endorsementCards.map(card => card.special ? <figure className="endorsement-card jermaine-card" key={card.name} aria-label={card.alt}><img className="jermaine-base" src={card.src} alt={card.alt}/><div className="jermaine-middle-mask"/><img className="jermaine-slice jermaine-slice-copy" src={card.src} alt="" aria-hidden="true"/><img className="jermaine-slice jermaine-slice-photo" src={card.src} alt="" aria-hidden="true"/><span className="jermaine-name-fix">Joe L Barnes</span></figure> : <figure className="endorsement-card" key={card.name}><Image src={card.src} alt={card.alt} fill sizes="(max-width: 800px) 100vw, 33vw" /></figure>)}</div>
      </div>
    </section>

    <section className="tone wood-tone" id="woods">
      <div className="wood-tone-copy"><p className="eyebrow">Materials with purpose</p><h2>Wood. Light.<br/><em>Living tone.</em></h2><p>Explore the body, neck, and fingerboard woods available across Bass One builds. Final selections are guided by the instrument, the player, tonal goals, availability, and the custom consultation process.</p></div>
      <div className="wood-sheet-luxury body-woods-sheet"><Image src="/body-woods.webp" alt="Bass One body top and body back wood options" fill sizes="(max-width:800px) 100vw, 90vw"/></div>
      <div className="wood-sheet-pair">
        <div className="wood-sheet-luxury"><Image src="/neck-woods.webp" alt="Bass One neck wood options" fill sizes="(max-width:800px) 100vw, 45vw"/></div>
        <div className="wood-sheet-luxury"><Image src="/fingerboard-woods.webp" alt="Bass One fingerboard wood options" fill sizes="(max-width:800px) 100vw, 45vw"/></div>
      </div>
    </section>

    <section className="bass-gallery section" id="gallery"><div className="gallery-head"><p className="eyebrow">Built one instrument at a time</p><h2>The Bass One<br/><em>Gallery.</em></h2><p>A closer look at individual Bass One builds, woods, finishes, hardware choices, and custom expressions.</p></div><div className="gallery-grid">{bassGallery.map((bass,index) => <figure className={"gallery-item gallery-item-"+(index+1)} key={bass.src}><Image src={bass.src} alt={bass.alt} fill sizes="(max-width: 800px) 100vw, 33vw" /></figure>)}</div></section>

    <section className="straps section" id="straps"><div className="strap-head"><p className="eyebrow">Comfort beyond the instrument</p><h2>Custom ergonomic<br/><em>bass straps.</em></h2><p>Designed to support the player through long rehearsals, sessions, and performances, Bass One strap options extend the same player-first philosophy beyond the instrument itself. Choose a finish and configuration that complements your bass and your playing style.</p></div><div className="strap-grid">{strapProducts.map((strap,index)=><article className="strap-card" key={strap.src}><div className="strap-image"><Image src={strap.src} alt={strap.alt} fill sizes="(max-width: 800px) 100vw, 33vw"/></div><div className="strap-copy"><p className="tier">CUSTOM STRAP {String(index+1).padStart(2,"0")}</p><h3>{strap.name}</h3><a className="button gold" href={salesEmail("Bass One strap purchase inquiry — "+strap.name)}>Request purchase link</a></div></article>)}</div><div className="commerce-note"><h3>Ready to reserve a standard Bass One?</h3><p>Direct online deposit checkout is being prepared. For now, request a secure deposit link for a standard Awesome One or Incredible One. Fully custom Magnificent One builds continue through the custom consultation process.</p><div className="actions"><a className="button solid" href={salesEmail("Awesome One standard bass deposit")}>Request Awesome One deposit link</a><a className="button solid" href={salesEmail("Incredible One standard bass deposit")}>Request Incredible One deposit link</a><a className="textlink" href="#consult">Begin a custom build →</a></div></div></section>

    <section className="custom" id="custom"><div className="custom-art"><Image src="https://static.wixstatic.com/media/3e9782_ffe190e9d6444da08b0bea83e02bbdd1~mv2.jpg" alt="Custom Bass One bass" fill sizes="(max-width: 800px) 100vw, 55vw" /></div><div><h2>Your bass.<br/><em>Your signature.</em></h2><p>A custom Bass One is a focused collaboration between player and builder. Scale, strings, woods, electronics, hardware, finish, lighting—every choice serves your sound, your hands, and the life you want the instrument to live.</p><ul><li>Single or dual-cutaway body</li><li>4–7 strings and custom scale options</li><li>Custom woods, finish, and hardware</li><li>Premium electronics, balanced XLR, and LED options</li></ul><a className="button gold" href="#consult">Start a custom consultation</a></div></section>

    <section className="order section"><div><h2>From first question<br/><em>to first note.</em></h2></div><ol><li><span>01</span><div><h3>Choose your series</h3><p>Begin with the Awesome, Incredible, or Magnificent One—or simply tell us what you need from an instrument.</p></div></li><li><span>02</span><div><h3>Speak with a Bass One specialist</h3><p>We&apos;ll clarify strings, scale, tone, visual direction, and the best starting point for your work.</p></div></li><li><span>03</span><div><h3>Confirm your build</h3><p>Receive a clear recommendation and next steps to place your order or begin the custom design process.</p></div></li></ol></section>

    <section className="consult section" id="consult"><div><h2>Let&apos;s find the bass<br/><em>that belongs in your hands.</em></h2><p>Tell us where you are in your journey. Whether you are ready to order a standard model or begin a fully custom instrument, the conversation starts here.</p><p className="sales">Sales & custom builds<br/><a href="mailto:bassoneinfo@gmail.com">bassoneinfo@gmail.com</a><br/>Austin, Texas</p></div><form onSubmit={submit}><label>Your name<input required name="name" placeholder="Your name" /></label><label>Email address<input required type="email" name="email" placeholder="you@email.com" /></label><label>I&apos;m interested in<select name="interest" value={selectedModel} onChange={(event) => setSelectedModel(event.target.value)}><option>Awesome One</option><option>Incredible One</option><option>Magnificent One</option><option>Custom consultation</option><option>Artist / dealer partnership</option></select></label><label>Tell us about your music and ideal bass<textarea name="message" rows={4} placeholder="Your sound, string count, timeline, questions…" /></label><input aria-hidden="true" tabIndex={-1} autoComplete="off" name="website" style={{position:"absolute",left:"-9999px"}}/><button className="button solid" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send inquiry"}</button>{formStatus && <p className="form-note" role="status">{formStatus}</p>}<a className="textlink" href={salesEmail("Bass One ownership inquiry")}>Or contact Bass One by email →</a></form></section>
    <footer><a className="brand" href="#top"><img className="brand-logo-full footer-brand-logo" src="/bass-one-logo.webp" alt="Bass One Basses" /></a><p>Handcrafted instruments for a life in music.</p><p>© {new Date().getFullYear()} Bass One Basses</p></footer>
  </main></>;
}

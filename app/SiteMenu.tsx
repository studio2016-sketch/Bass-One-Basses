"use client";

import { useState } from "react";

export default function SiteMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <nav className="nav site-menu">
    <a className="brand" href="/" onClick={close}>
      <img className="brand-logo-full" src="/bass-one-logo.webp" alt="Bass One Basses" />
    </a>
    <div className="navlinks">
      <a href="/collection">Collection</a>
      <a href="/listening-room">Listen</a>
      <a href="/#about">About</a>
      <a href="/#difference">The Difference</a>
      <a href="/#custom">Custom</a>
    </div>
    <a className="navcta" href="/#consult">Begin your build</a>
    <button className={"menu-toggle"+(open?" is-open":"")} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-mobile-menu" onClick={() => setOpen(!open)}>
      <span></span><span></span><span></span>
    </button>
    <div className={"mobile-menu"+(open?" is-open":"")} id="site-mobile-menu">
      <a href="/collection" onClick={close}>Collection</a>
      <a href="/listening-room" onClick={close}>Listen</a>
      <a href="/#about" onClick={close}>About</a>
      <a href="/#difference" onClick={close}>The Difference</a>
      <a href="/#custom" onClick={close}>Custom</a>
      <a className="mobile-menu-cta" href="/#consult" onClick={close}>Begin your build</a>
    </div>
  </nav>;
}
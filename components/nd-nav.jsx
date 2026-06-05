"use client"

import React from "react"
import Link from "next/link"

const WHATSAPP_URL = 'https://wa.me/925812458910?text=Hi%20Northern%20Dreamscape%2C%20I%20want%20to%20plan%20a%20trip.'

const SERVICE_LINKS = [
  { href: '/accommodation', label: 'Accommodation', sub: 'Hotels · lodges · camps' },
  { href: '/vehicles',      label: 'Vehicles',       sub: '4x4 · coaster · airport pickup' },
  { href: '/guides',        label: 'Tour Guides',    sub: 'Local experts by region' },
  { href: '/restaurants',   label: 'Restaurants',    sub: 'Cuisine · group meals' },
]

const MORE_LINKS = [
  { href: '/journal',  label: 'Journal',  sub: 'Guides · field notes' },
  { href: '/about',    label: 'About',    sub: 'Our story & team' },
  { href: '/contact',  label: 'Contact',  sub: 'Get in touch' },
]

function NavDropdown({ label, links, dark }) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef(null)
  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [])
  const linkColor = dark ? 'var(--bone)' : 'var(--ink)'
  const dropBg    = dark ? 'var(--teal-900)' : 'var(--bone)'
  const borderCol = dark ? 'var(--line-light)' : 'var(--line)'
  return (
    <div className="nd-nav-dropdown" ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--ui)', fontWeight: 500, fontSize: 13.5, letterSpacing: '0.01em', color: linkColor, opacity: open ? 1 : 0.85, padding: 0 }}
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="nd-nav-dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)', width: 220, background: dropBg, border: `1px solid ${borderCol}`, boxShadow: '0 12px 40px rgba(0,0,0,0.18)', zIndex: 100, padding: '8px 0' }}>
          {links.map((s, i) => (
            <Link key={s.href} href={s.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '14px 20px', color: linkColor, textDecoration: 'none', borderBottom: i < links.length - 1 ? `1px solid ${borderCol}` : 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.06)' : 'var(--bone-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: s.sub ? 3 : 0 }}>{s.label}</div>
              {s.sub && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', opacity: 0.6, textTransform: 'uppercase' }}>{s.sub}</div>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function NdNavLight({ activePath = '' }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const primaryLinks = [
    { href: '/packages', label: 'Packages', sub: 'Ready routes' },
    { href: '/destinations', label: 'Destinations', sub: 'Where to go' },
  ]
  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav className="nd nav nav-on-light nd-desktop-nav">
        <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--display)', fontSize: 22, letterSpacing: '-0.01em', fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}>
          Northern Dreamscape
        </Link>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32, fontFamily: 'var(--ui)', fontWeight: 500, fontSize: 13.5 }}>
          <Link href="/packages" style={activePath === '/packages' ? { color: 'var(--ember)', borderBottom: '1px solid var(--ember)', paddingBottom: 4 } : { color: 'var(--ink)', opacity: 0.85, textDecoration: 'none' }}>Packages</Link>
          <Link href="/destinations" style={{ color: 'var(--ink)', opacity: 0.85, textDecoration: 'none' }}>Destinations</Link>
          <NavDropdown label="Book Services" links={SERVICE_LINKS} dark={false} />
          <NavDropdown label="More" links={MORE_LINKS} dark={false} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--ui)', fontWeight: 600, fontSize: 13, padding: '10px 18px', background: 'var(--ink)', color: 'var(--bone)', textDecoration: 'none', borderRadius: 2 }}>
            Contact Us
          </Link>
        </div>
      </nav>

      <header className="nd nd-mobile-header">
        <div className="nd-mobile-topbar">
          <Link href="/" className="nd-mobile-brand" onClick={closeMobile}>
            <span>Northern Dreamscape</span>
            <small>Local trips across Gilgit-Baltistan</small>
          </Link>
          <div className="nd-mobile-actions">
            <a className="nd-mobile-wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <button className="nd-mobile-menu-btn" type="button" aria-expanded={mobileOpen} aria-label="Open navigation menu" onClick={() => setMobileOpen((open) => !open)}>
              <span />
              <span />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="nd-mobile-drawer">
            <div className="nd-mobile-drawer-section">
              {primaryLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMobile} className={activePath === link.href ? 'active' : ''}>
                  <span>{link.label}</span>
                  <small>{link.sub}</small>
                </Link>
              ))}
            </div>
            <div className="nd-mobile-drawer-label">Book services</div>
            <div className="nd-mobile-drawer-section">
              {SERVICE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMobile}>
                  <span>{link.label}</span>
                  <small>{link.sub}</small>
                </Link>
              ))}
            </div>
            <div className="nd-mobile-drawer-label">More</div>
            <div className="nd-mobile-drawer-section compact">
              {MORE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMobile}>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

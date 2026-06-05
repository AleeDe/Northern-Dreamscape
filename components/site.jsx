"use client";

import React from "react";
import Link from "next/link";
// Northern Dreamscape — Package data
// Unsplash mountain/landscape photo IDs. If any 404, the teal fallback bg shows.

const ND_PHOTOS = {
  hero: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2200&q=80&auto=format&fit=crop',
  hunza: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1600&q=80&auto=format&fit=crop',
  k2: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80&auto=format&fit=crop',
  fairy: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1600&q=80&auto=format&fit=crop',
  skardu: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop',
  deosai: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop',
  night: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80&auto=format&fit=crop',
  ridge: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?w=1600&q=80&auto=format&fit=crop',
  lake: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80&auto=format&fit=crop',
  village: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fit=crop',
  team1: 'https://images.unsplash.com/photo-1531594896955-305e9ed5d4ea?w=400&q=80&auto=format&fit=crop',
  team2: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop',
  team3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop',
};

const WHATSAPP_URL = 'https://wa.me/925812458910?text=Hi%20Northern%20Dreamscape%2C%20I%20want%20to%20plan%20a%20trip.';

const ND_PACKAGES = [
  {
    id: 'hunza-autumn',
    title: 'Hunza Valley in Autumn',
    subtitle: 'A week of poplar gold and Karakoram silver',
    region: 'Hunza · Nagar',
    days: 7,
    nights: 6,
    difficulty: 'Easy',
    season: 'Sep – Nov',
    price: 145000,
    priceUsd: 520,
    rating: 4.9,
    reviews: 384,
    photo: ND_PHOTOS.hunza,
    spots: 6,
    badge: 'Bestseller',
    blurb: 'Apricot orchards turning amber, glacial confluences, and the slow rituals of Wakhi villages above the Hunza River.',
    highlights: ['Eagle\'s Nest sunrise', 'Attabad Lake boating', 'Khunjerab Pass day trip', 'Hopper Glacier hike'],
  },
  {
    id: 'k2-basecamp',
    title: 'K2 Base Camp Trek',
    subtitle: 'The Concordia traverse — eighteen days on glacier ice',
    region: 'Baltoro · Skardu',
    days: 18,
    nights: 17,
    difficulty: 'Strenuous',
    season: 'Jul – Aug',
    price: 695000,
    priceUsd: 2480,
    rating: 4.9,
    reviews: 142,
    photo: ND_PHOTOS.k2,
    spots: 4,
    badge: 'Signature',
    blurb: 'Four of the world\'s fourteen 8000-meter peaks visible from a single basin. The pilgrimage of serious trekkers.',
    highlights: ['Concordia campsite', 'Gondogoro La crossing', 'Trango Towers view', 'Full porter & guide team'],
  },
  {
    id: 'fairy-meadows',
    title: 'Fairy Meadows & Nanga Parbat',
    subtitle: 'Four days at the foot of the Killer Mountain',
    region: 'Diamer · Raikot',
    days: 4,
    nights: 3,
    difficulty: 'Moderate',
    season: 'May – Oct',
    price: 62000,
    priceUsd: 220,
    rating: 4.8,
    reviews: 612,
    photo: ND_PHOTOS.fairy,
    spots: 8,
    badge: null,
    blurb: 'A meadow at 3,300m staring directly into Nanga Parbat\'s Raikot face. Wooden huts, pine forest, no road in.',
    highlights: ['Jeep ride from Raikot Bridge', 'Beyal Camp day hike', 'View Point at 3,800m', 'Stargazing nights'],
  },
  {
    id: 'skardu-deosai',
    title: 'Skardu, Deosai & Shigar',
    subtitle: 'Cold deserts, sky-mirror lakes, Mughal fort',
    region: 'Baltistan',
    days: 8,
    nights: 7,
    difficulty: 'Easy',
    season: 'Jun – Sep',
    price: 168000,
    priceUsd: 600,
    rating: 4.9,
    reviews: 297,
    photo: ND_PHOTOS.skardu,
    spots: 5,
    badge: null,
    blurb: 'The "Roof of the World" plateau, Shangrila and Upper Kachura lakes, and a night in a restored 17th-century fort.',
    highlights: ['Deosai plateau jeep safari', 'Sheosar Lake', 'Shigar Fort heritage stay', 'Cold Desert at Katpana'],
  },
  {
    id: 'eid-special',
    title: 'Eid in the Mountains',
    subtitle: 'Five-day getaway · Naran, Lulusar, Babusar',
    region: 'Kaghan · Naran',
    days: 5,
    nights: 4,
    difficulty: 'Easy',
    season: 'Eid · Limited',
    price: 78000,
    priceUsd: 280,
    rating: 4.8,
    reviews: 218,
    photo: ND_PHOTOS.lake,
    spots: 3,
    badge: 'Eid Special',
    blurb: 'A long-weekend escape across Lulusar Lake, Babusar Top and the Saif-ul-Malook trail. Departs the morning after Chaand Raat.',
    highlights: ['Saif-ul-Malook boat ride', 'Babusar Pass at 4,170m', 'Family-friendly pacing', 'Departures Apr 11 & Apr 12'],
  },
  {
    id: 'ghizer-shandur',
    title: 'Ghizer & Shandur Polo Festival',
    subtitle: 'The world\'s highest polo ground in July',
    region: 'Ghizer · Phander',
    days: 10,
    nights: 9,
    difficulty: 'Moderate',
    season: 'Jul (festival)',
    price: 215000,
    priceUsd: 770,
    rating: 4.7,
    reviews: 96,
    photo: ND_PHOTOS.deosai,
    spots: 6,
    badge: 'Festival',
    blurb: 'Phander Lake at dawn, Khalti Lake at dusk, and the three-day polo festival at 3,700m between Chitral and Gilgit teams.',
    highlights: ['Shandur Festival pass', 'Phander Lake camp', 'Khalti & Gupis lakes', 'Local kalash dance evening'],
  },
];

const ND_TESTIMONIALS = [
  {
    quote: 'They run mountain trips the way the mountains deserve to be run. Quiet, careful, and unforgettable.',
    name: 'Aisha R.',
    where: 'Lahore → Hunza, Oct 2025',
    pkg: 'Hunza Valley in Autumn',
  },
  {
    quote: 'Eighteen days on the Baltoro and not a single logistical surprise. Our guide Saleem is a legend.',
    name: 'Marcus H.',
    where: 'Berlin → K2 Base Camp, Aug 2024',
    pkg: 'K2 Base Camp Trek',
  },
  {
    quote: 'Booked it on a Thursday, in Fairy Meadows by Saturday night. The WhatsApp team felt like friends from the start.',
    name: 'Hira & Bilal',
    where: 'Karachi → Nanga Parbat, Jun 2025',
    pkg: 'Fairy Meadows & Nanga Parbat',
  },
];

const ND_ITINERARY = [
  {
    day: 1,
    title: 'Islamabad → Chilas',
    distance: '470 km · ~10 hrs',
    body: 'Pickup at Islamabad airport at first light. Karakoram Highway north along the Indus gorge. Lunch at Besham. Overnight at Shangrila Midway House in Chilas.',
    photo: ND_PHOTOS.village,
  },
  {
    day: 2,
    title: 'Chilas → Karimabad, Hunza',
    distance: '270 km · ~7 hrs',
    body: 'Continue along KKH through Nanga Parbat viewpoint at Raikot. Cross Rakaposhi viewpoint at Ghulmet. Arrive Karimabad by late afternoon — first apricot tea on the terrace.',
    photo: ND_PHOTOS.hunza,
  },
  {
    day: 3,
    title: 'Eagle\'s Nest & Altit Fort',
    distance: 'Local · walking',
    body: 'Pre-dawn drive to Eagle\'s Nest for sunrise over Ultar Sar, Lady Finger and Hunza Peak. Afternoon walking tour of Altit Fort and the Royal Garden orchards.',
    photo: ND_PHOTOS.ridge,
  },
  {
    day: 4,
    title: 'Attabad & Passu',
    distance: '120 km round-trip',
    body: 'Boat across the turquoise Attabad Lake (formed in 2010 by a landslide). Lunch at Passu with the Cathedral Peaks at your shoulder. Cones of Passu hike before returning to Karimabad.',
    photo: ND_PHOTOS.lake,
  },
  {
    day: 5,
    title: 'Khunjerab Pass — China border',
    distance: '380 km round-trip',
    body: 'Up the KKH to the world\'s highest paved border crossing at 4,733m. Pamir plateau views, marmot sightings, and the famous photo at the gate. Return via Sost for chapshuro lunch.',
    photo: ND_PHOTOS.night,
  },
  {
    day: 6,
    title: 'Hopper Glacier day hike',
    distance: '80 km + 4 hrs walking',
    body: 'Drive to Nagar Valley. Moderate three-hour hike onto the white ice of Hopper Glacier with a local guide. Optional ice-cave visit if conditions allow.',
    photo: ND_PHOTOS.k2,
  },
  {
    day: 7,
    title: 'Karimabad → Islamabad',
    distance: 'Flight from Gilgit',
    body: 'Drive to Gilgit for the spectacular PIA flight back to Islamabad (weather-permitting; full road backup included). Goodbye dinner at our partner restaurant in Islamabad.',
    photo: ND_PHOTOS.skardu,
  },
];


// Northern Dreamscape — Homepage
// 1440px-wide artboard. Cinematic editorial.

const NDLogo = ({ size = 22, color = 'currentColor' }) => (
  <svg className="mark" viewBox="0 0 32 32" style={{ width: size, height: size }}>
    {/* Mountain trio + crescent */}
    <path d="M2 26 L10 12 L14 18 L18 10 L24 20 L30 26 Z" fill={color} opacity="0.9" />
    <circle cx="24" cy="8" r="3" fill="none" stroke={color} strokeWidth="1.2" />
    <path d="M2 28 L30 28" stroke={color} strokeWidth="1" opacity="0.5" />
  </svg>
);

const Icon = ({ name, size = 18 }) => {
  const ico = {
    arrow: <><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></>,
    play: <><polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" /></>,
    star: <><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" fill="currentColor" stroke="none" /></>,
    check: <><polyline points="4 12 10 18 20 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <><path d="M5 12h14" /></>,
    mountain: <><path d="M3 20 L9 8 L13 14 L17 6 L21 20 Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M12 22s7-7 7-13a7 7 0 1 0-14 0c0 6 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></>,
    whatsapp: <><path d="M5 19l1.5-4A8 8 0 1 1 9 21l-4-2z" /><path d="M9 11c0 3 2 5 5 5" /></>,
    chevron: <><polyline points="6 9 12 15 18 9" /></>,
    arrowRight: <><path d="M5 12h14M13 5l7 7-7 7" /></>,
  };
  return <svg className="ico" viewBox="0 0 24 24" style={{ width: size, height: size }}>{ico[name]}</svg>;
};

/* ---------- Generic Nav Dropdown ---------- */
const NavDropdown = ({ label, links, dark }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);
  const linkColor = dark ? 'var(--bone)' : 'var(--ink)';
  const dropBg    = dark ? 'var(--teal-900)' : 'var(--bone)';
  const borderCol = dark ? 'var(--line-light)' : 'var(--line)';
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
  );
};

const SERVICE_LINKS = [
  { href: '/accommodation', label: 'Accommodation', sub: 'Hotels · lodges · camps' },
  { href: '/vehicles',      label: 'Vehicles',       sub: '4x4 · coaster · airport pickup' },
  { href: '/guides',        label: 'Tour Guides',    sub: 'Local experts by region' },
  { href: '/restaurants',   label: 'Restaurants',    sub: 'Cuisine · group meals' },
];

const MORE_LINKS = [
  { href: '/journal',  label: 'Journal',  sub: 'Guides · field notes' },
  { href: '/about',    label: 'About',    sub: 'Our story & team' },
  { href: '/contact',  label: 'Contact',  sub: 'Get in touch' },
];

const ServicesDropdown = ({ dark }) => <NavDropdown label="Book Services" links={SERVICE_LINKS} dark={dark} />;
const MoreDropdown     = ({ dark }) => <NavDropdown label="More" links={MORE_LINKS} dark={dark} />;

/* ---------- Nav over dark hero ---------- */
export const NavDark = () => (
  <nav className="nav nav-on-dark" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
    <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
      <NDLogo color="#f5efe4" />
      <span style={{ marginLeft: 10 }}>Northern Dreamscape</span>
    </Link>
    <div className="nav-links">
      <Link href="/packages">Packages</Link>
      <Link href="/destinations">Destinations</Link>
      <ServicesDropdown dark={true} />
      <MoreDropdown dark={true} />
    </div>
    <div className="nav-right">
      <Link href="/contact" className="btn btn-ghost" style={{ padding: '10px 18px', fontSize: 13 }}>
        Contact Us
      </Link>
    </div>
  </nav>
);

/* ---------- HERO ---------- */
const Hero = ({ urgency }) => (
  <section className="nd-hero" style={{ position: 'relative', minHeight: 'clamp(720px, 88vh, 860px)', overflow: 'hidden' }}>
    <div className="photo photo-overlay-strong" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${ND_PHOTOS.hero})` }} />
    {/* subtle vignette */}
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(13,31,36,0.5) 100%)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,22,26,0.9) 0%, rgba(8,22,26,0.68) 38%, rgba(8,22,26,0.24) 72%, rgba(8,22,26,0.12) 100%)' }} />

    <NavDark />

    <div className="nd-hero-content" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 56px 72px', color: 'var(--bone)' }}>
      <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 420px', alignItems: 'end', gap: 56 }}>
        <div style={{ maxWidth: 820 }}>
          <div className="eyebrow rise" style={{ color: 'var(--sand)', marginBottom: 28 }}>
            Gilgit-Baltistan trips planned by locals
          </div>
          <h1 className="rise" style={{ fontSize: 'clamp(74px, 8.2vw, 112px)', lineHeight: 0.94, marginBottom: 24, letterSpacing: '-0.02em', color: 'var(--bone)', textShadow: '0 5px 28px rgba(0,0,0,0.45)' }}>
            Buy the trip<br/>you will still<br/><em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>feel next year.</em>
          </h1>
          <p className="rise" style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--bone)', opacity: 0.95, maxWidth: 560, marginBottom: 40, textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Small-group tours to Hunza, Skardu, Fairy Meadows and K2 routes, with hotels, vehicles, guides and meals handled before you leave home.
          </p>
          <div className="rise nd-hero-actions" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Link href="/packages" className="btn btn-ember btn-lg">
              See ready packages <Icon name="arrow" size={16} />
            </Link>
            <a className="btn btn-ghost btn-lg" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={16} /> Plan private trip
            </a>
          </div>
        </div>

        <div className="rise nd-hero-panel" style={{ display: 'grid', gap: 16, padding: 22, background: 'rgba(8,22,26,0.58)', border: '1px solid rgba(245,239,228,0.18)', backdropFilter: 'blur(14px)' }}>
          {urgency !== 'off' && (
            <div className="scarcity">
              <span className="dot"></span>
              Eid and summer seats are moving fast
            </div>
          )}
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['I want a fixed package', 'Pick dates, see the route, book the seat.'],
              ['I want a private plan', 'Tell us budget, days and comfort level on WhatsApp.'],
              ['I am comparing options', 'Shortlist hotels, guides, vehicles and restaurants.'],
            ].map(([title, body]) => (
              <div key={title} style={{ padding: '14px 0', borderBottom: '1px solid rgba(245,239,228,0.14)' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
                <div style={{ color: 'var(--muted-bone)', fontSize: 13, lineHeight: 1.45 }}>{body}</div>
              </div>
            ))}
          </div>
          <div className="nd-hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, paddingTop: 6 }}>
            <div>
              <div className="stat-num" style={{ color: 'var(--sand)' }}>1.2k</div>
              <div className="stat-label">Travelers since 2014</div>
            </div>
            <div>
              <div className="stat-num" style={{ color: 'var(--sand)' }}>4.9</div>
              <div className="stat-label">From 612 reviews</div>
            </div>
            <div>
              <div className="stat-num" style={{ color: 'var(--sand)' }}>11</div>
              <div className="stat-label">Years on these roads</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="nd-next-hint" style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', color: 'var(--bone)', opacity: 0.56, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em' }}>
      PACKAGES BELOW
    </div>
  </section>
);

/* ---------- Value Prop (intro statement) ---------- */
const Intro = () => (
  <section className="nd-decision-strip" style={{ background: 'var(--bone)', padding: '96px 56px 84px' }}>
    <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.6fr', gap: 72, alignItems: 'flex-start' }}>
      <div>
        <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 20 }}>Choose with less doubt</div>
        <h2 style={{ fontSize: 52, lineHeight: 1.05 }}>
          Three reasons people<br/>
          <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>book instead of browse.</em>
        </h2>
      </div>
      <div>
        <p style={{ fontSize: 20, lineHeight: 1.55, color: 'var(--ink)', marginBottom: 30, maxWidth: 760, textWrap: 'pretty' }}>
          Most travel sites throw choices at you. We reduce the decision: pick the experience, see what is included, and speak to one local planner before paying.
        </p>
        <div className="nd-reason-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            ['01', 'Clear next step', 'Every card leads to either details or WhatsApp. No dead ends, no guessing.'],
            ['02', 'Lower risk', 'Reviews, days, difficulty, route and price appear before the commitment moment.'],
            ['03', 'Human planning', 'A real Pakistan-based person checks your dates, comfort and travel style.'],
          ].map(([n, t, b]) => (
            <div key={t} style={{ padding: 24, background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
              <div className="mono" style={{ color: 'var(--ember)', marginBottom: 14 }}>{n}</div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>{t}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--muted-ink)' }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Featured Packages ---------- */
const FeaturedPackages = () => {
  const featured = ND_PACKAGES.slice(0, 4);
  return (
    <section className="nd-featured-packages" style={{ background: 'var(--bone)', padding: '42px 56px 124px' }}>
      <div className="container-wide">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 20 }}>Spring and summer 2026</div>
            <h2 style={{ fontSize: 64, lineHeight: 1 }}>Pick by <em style={{ fontStyle: 'italic' }}>feeling and fit</em>.</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 14, color: 'var(--muted-ink)', marginBottom: 8 }}>Fast comparison, then deeper details</div>
            <Link href="/packages" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--ink)', borderBottom: '1px solid var(--ink)', paddingBottom: 4 }}>
              VIEW ALL PACKAGES →
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, marginBottom: 28 }}>
          {/* Featured large */}
          <FeatureLarge p={featured[0]} />
          {/* Featured medium */}
          <FeatureMedium p={featured[1]} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          <FeatureSmall p={featured[1]} />
          <FeatureSmall p={featured[2]} />
          <FeatureSmall p={featured[3]} />
        </div>
      </div>
    </section>
  );
};

const FeatureLarge = ({ p }) => (
  <Link href={`/packages/${p.id}`} className="pkg-card" style={{ height: 580, position: 'relative', display: 'block', overflow: 'hidden' }}>
    <div className="photo photo-overlay" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.photo})` }} />
    {p.badge && (
      <div style={{ position: 'absolute', top: 20, left: 20, padding: '8px 14px', background: 'var(--ember)', color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', zIndex: 2 }}>
        {p.badge.toUpperCase()}
      </div>
    )}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32, color: 'var(--bone)', zIndex: 2 }}>
      <div className="mono" style={{ opacity: 0.7, marginBottom: 14 }}>{p.region} · {p.days} days · {p.difficulty}</div>
      <h3 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.05, marginBottom: 14, color: 'var(--bone)' }}>{p.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.85, maxWidth: 480, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.blurb}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.6, letterSpacing: '0.16em', marginBottom: 4 }}>FROM</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 32 }}>PKR {p.price.toLocaleString()}<span style={{ fontSize: 14, opacity: 0.65, marginLeft: 8 }}>/ ${p.priceUsd}</span></div>
        </div>
        <div className="btn btn-ember">View itinerary <Icon name="arrow" size={14} /></div>
      </div>
    </div>
  </Link>
);

const FeatureMedium = ({ p }) => (
  <Link href={`/packages/${p.id}`} className="pkg-card" style={{ height: 580, position: 'relative', display: 'block', overflow: 'hidden' }}>
    <div className="photo photo-overlay" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.photo})` }} />
    {p.badge && (
      <div style={{ position: 'absolute', top: 20, left: 20, padding: '8px 14px', background: 'var(--ink)', color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', zIndex: 2 }}>
        {p.badge.toUpperCase()}
      </div>
    )}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28, color: 'var(--bone)', zIndex: 2 }}>
      <div className="mono" style={{ opacity: 0.7, marginBottom: 12 }}>{p.region} · {p.days} days</div>
      <h3 style={{ fontSize: 34, lineHeight: 1.05, marginBottom: 12, color: 'var(--bone)' }}>{p.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.8, marginBottom: 18 }}>{p.subtitle}.</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 18, borderTop: '1px solid rgba(245,239,228,0.2)' }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: 22 }}>PKR {p.price.toLocaleString()}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em' }}>EXPLORE →</div>
      </div>
    </div>
  </Link>
);

const FeatureSmall = ({ p }) => (
  <Link href={`/packages/${p.id}`} className="pkg-card" style={{ background: 'var(--bone-2)', display: 'block' }}>
    <div className="photo" style={{ height: 280, backgroundImage: `url(${p.photo})` }} />
    <div style={{ padding: 24, background: 'var(--bone-2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div className="mono" style={{ color: 'var(--teal-700)' }}>{p.region}</div>
        <div className="mono" style={{ color: 'var(--muted-ink)' }}>{p.days}D · {p.difficulty.slice(0,4).toUpperCase()}</div>
      </div>
      <h3 style={{ fontSize: 26, lineHeight: 1.1, marginBottom: 10 }}>{p.title}</h3>
      <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--muted-ink)', marginBottom: 20, textWrap: 'pretty' }}>{p.subtitle}.</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 18, borderTop: '1px solid var(--line)' }}>
        <div>
          <div className="mono" style={{ color: 'var(--muted-ink)', fontSize: 9, marginBottom: 2 }}>FROM</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 22 }}>PKR {p.price.toLocaleString()}</div>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ember)', letterSpacing: '0.16em' }}>VIEW →</div>
      </div>
    </div>
  </Link>
);

/* ---------- Why Us (full bleed dark panel) ---------- */
const WhyUs = () => (
  <section style={{ background: 'var(--teal-800)', color: 'var(--bone)', padding: '140px 56px' }}>
    <div className="container-wide">
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 100, alignItems: 'flex-start', marginBottom: 100 }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 24 }}>Why Northern Dreamscape</div>
          <h2 style={{ fontSize: 72, lineHeight: 1, color: 'var(--bone)' }}>
            Eleven years.<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>One thousand</em><br/>
            two hundred and<br/>eighty-four people.
          </h2>
        </div>
        <div style={{ paddingTop: 80 }}>
          <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.88, marginBottom: 30 }}>
            We measure success the way our travelers do: in summit days that go as planned, in altitudes reached without altitude sickness, in WhatsApp groups that stay alive long after the trip ends.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.7 }}>
            Featured in National Geographic Traveller, The Guardian, BBC Travel, Geo, and Dawn.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 50, paddingTop: 60, borderTop: '1px solid var(--line-light)' }}>
        {[
          ['01', 'Born in-region', 'Our nine senior guides were all born and raised in Gilgit-Baltistan. They\'re your translators, drivers, story-keepers and emergency contacts.'],
          ['02', 'Properly licensed', 'Pakistan Tourism Development Corporation licensed since 2014. K2 trek permitted. Insured to international standards.'],
          ['03', 'Honest pricing', 'No middlemen, no commissions. The price you see is what arrives at the village we stay in. We publish our cost breakdown on request.'],
          ['04', '24/7 in-country support', 'Once you board the first flight, you have a Pakistan-based human on WhatsApp at any hour. Not a chatbot. A name.'],
        ].map(([n, t, b]) => (
          <div key={n}>
            <div className="mono" style={{ color: 'var(--sand)', marginBottom: 16 }}>{n}</div>
            <h4 style={{ fontSize: 24, lineHeight: 1.1, marginBottom: 14, color: 'var(--bone)' }}>{t}</h4>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, opacity: 0.7 }}>{b}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Testimonials (editorial pull-quote style) ---------- */
const Testimonials = () => (
  <section style={{ background: 'var(--bone)', padding: '140px 56px' }}>
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80 }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>Letters home</div>
          <h2 style={{ fontSize: 56, lineHeight: 1.05 }}>What people<br/>say when they<br/>get back.</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'flex-end', color: 'var(--ember)' }}>
            {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={16} />)}
          </div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 32, marginTop: 6 }}>4.9 <span style={{ fontSize: 16, opacity: 0.5 }}>· 612 reviews</span></div>
          <div className="mono" style={{ color: 'var(--muted-ink)', marginTop: 8 }}>Google · Tripadvisor · Direct</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
        {ND_TESTIMONIALS.map((t, i) => (
          <div key={i} style={{ paddingTop: 30, borderTop: '1px solid var(--ink)' }}>
            <div style={{ display: 'flex', gap: 4, color: 'var(--ember)', marginBottom: 22 }}>
              {[1,2,3,4,5].map(j => <Icon key={j} name="star" size={12} />)}
            </div>
            <p className="display" style={{ fontSize: 26, lineHeight: 1.25, marginBottom: 30, textWrap: 'pretty' }}>
              "{t.quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                <div className="mono" style={{ color: 'var(--muted-ink)', marginTop: 4 }}>{t.where}</div>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ember)', letterSpacing: '0.16em', textAlign: 'right', maxWidth: 90 }}>{t.pkg}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- FAQ ---------- */
const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  const items = [
    ['Is Gilgit-Baltistan safe for international travelers?', 'Yes. GB has been on the UK FCDO\'s "travel without restriction" list since 2022 and is one of Pakistan\'s safest regions. We brief every traveler, monitor weather and road conditions daily, and have ground support across all valleys we operate in.'],
    ['Do I need a visa? How does it work for international guests?', 'Pakistan offers e-visas to over 175 nationalities, typically issued within 7–10 days. We provide a Letter of Invitation and step-by-step paperwork as part of your booking — no extra cost.'],
    ['What level of fitness do I need?', 'Our trips range from "comfortable" (Hunza, Skardu — gentle walking, jeep transfers) to "strenuous" (K2 Base Camp — eight hours on glacier daily). Each package lists a Difficulty rating with honest expectations. Our team will help you pick the right fit before you book.'],
    ['What about altitude sickness?', 'Every itinerary is built with proper acclimatization days at intermediate elevations. We carry diamox, pulse oximeters and emergency oxygen, and our guides are trained in altitude first response. Trips above 4,500m include an in-country doctor briefing.'],
    ['Can I customize a package or come on my own date?', 'Yes. Roughly 40% of our trips are private departures for couples, families or small groups of friends. Reach us on WhatsApp with your dates and we\'ll quote within 24 hours.'],
    ['How do I pay? Do you accept international cards?', 'We accept bank transfer (IBAN/SWIFT), Wise, Stripe (Visa/Mastercard), and local bank deposit for Pakistani travelers. Deposit is 25% to confirm; balance due 30 days before departure. No charges for changes made 30+ days out.'],
  ];
  return (
    <section style={{ background: 'var(--bone-2)', padding: '140px 56px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80 }}>
        <div style={{ position: 'sticky', top: 40, alignSelf: 'flex-start' }}>
          <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>Common questions</div>
          <h2 style={{ fontSize: 52, lineHeight: 1.05, marginBottom: 28 }}>The answers people ask before they book.</h2>
          <p style={{ fontSize: 15, color: 'var(--muted-ink)', lineHeight: 1.6, marginBottom: 24 }}>Don't see your question? Our team replies on WhatsApp within four working hours.</p>
          <a className="btn btn-ink" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={16} /> Ask us anything
          </a>
        </div>
        <div>
          {items.map(([q, a], i) => (
            <div key={i} onClick={() => setOpen(open === i ? -1 : i)} style={{ borderTop: '1px solid var(--ink)', padding: '28px 0', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 30 }}>
                <h4 style={{ fontSize: 24, lineHeight: 1.2, fontWeight: 500, color: open === i ? 'var(--ember)' : 'var(--ink)', transition: 'color 0.3s' }}>{q}</h4>
                <Icon name={open === i ? 'minus' : 'plus'} size={20} />
              </div>
              {open === i && (
                <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--muted-ink)', marginTop: 18, maxWidth: 720, textWrap: 'pretty' }}>{a}</p>
              )}
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--ink)' }} />
        </div>
      </div>
    </section>
  );
};

/* ---------- Final CTA / Footer ---------- */
const FinalCTA = () => (
  <section style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '180px 56px 140px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.18, backgroundImage: `url(${ND_PHOTOS.night})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--ink) 0%, rgba(13,31,36,0.6) 50%, var(--ink) 100%)' }} />
    <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
      <div className="eyebrow" style={{ color: 'var(--sand)', justifyContent: 'center', display: 'inline-flex', marginBottom: 30 }}>Departures opening for 2026</div>
      <h2 style={{ fontSize: 96, lineHeight: 0.95, color: 'var(--bone)', maxWidth: 1000, margin: '0 auto 40px' }}>
        The roads<br/>
        <em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>open in April.</em>
      </h2>
      <p style={{ fontSize: 19, opacity: 0.78, maxWidth: 560, margin: '0 auto 50px', lineHeight: 1.6 }}>
        Most spring trips fill by mid-February. Tell us your dates and we'll match you to the right departure.
      </p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
        <button className="btn btn-ember btn-lg">Browse all packages <Icon name="arrow" size={16} /></button>
        <a className="btn btn-ghost btn-lg" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={16} /> WhatsApp our team</a>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-col">
        <div className="nav-logo" style={{ color: 'var(--bone)', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <NDLogo color="#f5efe4" />
          <span style={{ marginLeft: 10 }}>Northern Dreamscape</span>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.7, maxWidth: 320, marginBottom: 24 }}>Small-group expeditions to the Karakoram, Himalaya and Hindu Kush. Licensed by PTDC since 2014.</p>
        <div className="mono" style={{ opacity: 0.5 }}>Office: Jutial, Gilgit · Pakistan</div>
        <div className="mono" style={{ opacity: 0.5, marginTop: 8 }}>+92 581 245 8910</div>
      </div>
      <div className="footer-col">
        <h5>Journeys</h5>
        <ul>
          <li>Hunza & Nagar</li>
          <li>K2 & Concordia</li>
          <li>Fairy Meadows</li>
          <li>Skardu & Deosai</li>
          <li>Shandur Festival</li>
          <li>Private departures</li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>The company</h5>
        <ul>
          <li>About us</li>
          <li>Our guides</li>
          <li>Sustainability</li>
          <li>Press & awards</li>
          <li>Journal</li>
          <li>Careers</li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Plan a trip</h5>
        <ul>
          <li>Booking & payment</li>
          <li>Visas for Pakistan</li>
          <li>Insurance & safety</li>
          <li>Packing lists</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 NORTHERN DREAMSCAPE PVT. LTD.</span>
      <span>PTDC LIC. NO. 04-2014-GB · NTN 4521987-2</span>
      <span style={{ display: 'flex', gap: 18 }}>
        <span>INSTAGRAM</span>
        <span>YOUTUBE</span>
        <span>WHATSAPP</span>
      </span>
    </div>
  </footer>
);

/* ---------- Main Homepage ---------- */
const HomePage = ({ urgency, children }) => (
  <div className="nd" data-screen-label="01 Homepage">
    <Hero urgency={urgency} />
    <Intro />
    <FeaturedPackages />
    {children}
    <WhyUs />
    <Testimonials />
    <FAQ />
    <FinalCTA />
    <Footer />
  </div>
);




// Northern Dreamscape — Packages listing page

export const NavLight = ({ activePath }) => (
  <nav className="nav nav-on-light">
    <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
      <NDLogo color="#0d1f24" />
      <span style={{ marginLeft: 10 }}>Northern Dreamscape</span>
    </Link>
    <div className="nav-links">
      <Link href="/packages" style={activePath === '/packages' ? { color: 'var(--ember)', borderBottom: '1px solid var(--ember)', paddingBottom: 4 } : {}}>Packages</Link>
      <Link href="/destinations">Destinations</Link>
      <ServicesDropdown dark={false} />
      <MoreDropdown dark={false} />
    </div>
    <div className="nav-right">
      <Link href="/contact" className="btn btn-ink" style={{ padding: '10px 18px', fontSize: 13 }}>
        Contact Us
      </Link>
    </div>
  </nav>
);

const PackagesHero = () => (
  <section style={{ background: 'var(--bone)', padding: '80px 56px 60px' }}>
    <div className="container-wide">
      <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 28 }}>The 2026 catalogue</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 80, alignItems: 'flex-end', marginBottom: 60 }}>
        <h1 style={{ fontSize: 108, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
          Twenty-two<br/>
          <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>journeys</em> across<br/>
          the high places.
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted-ink)', paddingBottom: 14, maxWidth: 380 }}>
          Trips run April through October, with select winter departures for snow leopard tracking in Hushe. Filter by season, region or pace.
        </p>
      </div>
    </div>
  </section>
);

const Filters = () => {
  const [active, setActive] = React.useState({ region: 'All', season: 'All', difficulty: 'All', sort: 'Recommended' });
  const pill = (label, key, val) => (
    <button
      key={key + '-' + val}
      onClick={() => setActive(a => ({ ...a, [key]: val }))}
      className="mono"
      style={{
        padding: '10px 16px',
        borderRadius: 2,
        border: '1px solid ' + (active[key] === val ? 'var(--ink)' : 'var(--line)'),
        background: active[key] === val ? 'var(--ink)' : 'transparent',
        color: active[key] === val ? 'var(--bone)' : 'var(--ink)',
        fontSize: 11,
        transition: 'all 0.15s',
      }}
    >{label}</button>
  );
  return (
    <section style={{ background: 'var(--bone)', padding: '0 56px 40px' }}>
      <div className="container-wide" style={{ borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--line)', padding: '32px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 40 }}>
          <div>
            <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 14, fontSize: 10 }}>REGION</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['All', 'Hunza', 'Baltistan', 'Diamer', 'Ghizer', 'Kaghan'].map(r => pill(r, 'region', r))}
            </div>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 14, fontSize: 10 }}>SEASON</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['All', 'Spring', 'Summer', 'Autumn', 'Eid'].map(r => pill(r, 'season', r))}
            </div>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 14, fontSize: 10 }}>DIFFICULTY</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['All', 'Easy', 'Moderate', 'Strenuous'].map(r => pill(r, 'difficulty', r))}
            </div>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 14, fontSize: 10 }}>SORT BY</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 14px', border: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', cursor: 'pointer' }}>
              RECOMMENDED <Icon name="chevron" size={12} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="mono" style={{ color: 'var(--muted-ink)' }}>SHOWING 6 OF 22</div>
          <div className="mono" style={{ color: 'var(--ember)' }}>★ EID DEPARTURES — 3 SEATS REMAINING</div>
        </div>
      </div>
    </section>
  );
};

const PackageSupportServices = () => {
  const services = [
    {
      n: '01',
      title: 'Accommodation',
      label: 'Hotels · lodges · camps',
      photo: ND_PHOTOS.village,
      price: 'From PKR 8,500 / night',
      cta: 'Book accommodation',
      body: 'Hand-picked stays by route: heritage hotels in Hunza and Shigar, clean family lodges on road journeys, and expedition tents on glacier routes.',
      points: ['Twin-sharing rooms', 'Private room upgrade', 'Heated rooms where available'],
    },
    {
      n: '02',
      title: 'Vehicles',
      label: '4x4 jeeps · coaster · airport pickup',
      photo: ND_PHOTOS.skardu,
      price: 'From PKR 18,000 / day',
      cta: 'Book a vehicle',
      body: 'Route-appropriate transport with mountain-road drivers: private jeeps for valleys, coasters for groups, and full road backup when flights are weather-hit.',
      points: ['Licensed local drivers', 'KKH and jeep-road ready', 'Fuel, tolls and parking included'],
    },
    {
      n: '03',
      title: 'Tour Guides',
      label: 'Local guides',
      photo: ND_PHOTOS.team1,
      price: 'From PKR 9,000 / day',
      cta: 'Book a guide',
      body: 'Guides from the region who know the roads, languages, weather windows and village etiquette. Trekking trips include specialist mountain staff.',
      points: ['Lead guide on every trip', 'Local area expertise', 'Altitude and safety briefing'],
    },
    {
      n: '04',
      title: 'Meals & Support',
      label: 'Breakfast · dinner · field kitchen',
      photo: ND_PHOTOS.deosai,
      price: 'Custom quote',
      cta: 'Plan meals',
      body: 'Daily meal planning matched to the itinerary: hotel breakfasts, local dinners, packed lunches and staffed kitchens on longer treks.',
      points: ['Vegetarian options', 'Tea and water stops', 'Cook team on treks'],
    },
    {
      n: '05',
      title: 'Permits & Tickets',
      label: 'Parks · forts · border passes',
      photo: ND_PHOTOS.lake,
      price: 'Handled on request',
      cta: 'Arrange permits',
      body: 'We handle local entry tickets, national park fees and route paperwork so travelers are not negotiating every gate on the road.',
      points: ['Khunjerab park fees', 'Fort and lake tickets', 'Trek permits where required'],
    },
    {
      n: '06',
      title: 'On-trip Care',
      label: 'WhatsApp · emergency coordination',
      photo: ND_PHOTOS.night,
      price: 'Add to any private trip',
      cta: 'Add support',
      body: 'A Pakistan-based operations contact stays available throughout the trip for road changes, weather calls, medical support and family updates.',
      points: ['24/7 WhatsApp support', 'Weather monitoring', 'Emergency coordination'],
    },
  ];

  return (
    <section style={{ background: 'var(--bone-2)', padding: '110px 56px 120px' }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: 80, alignItems: 'end', marginBottom: 58 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 22 }}>What comes with the trip</div>
            <h2 style={{ fontSize: 60, lineHeight: 1.05 }}>
              More than<br/>
              <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>a seat in a jeep.</em>
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--muted-ink)', maxWidth: 640, textWrap: 'pretty' }}>
            Every package is built as a complete mountain operation: stays, vehicles, guides, meals, permits and in-country support are planned together so the trip feels calm on the ground.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {services.map(s => (
            <div key={s.title} className="pkg-card" style={{ background: 'var(--bone)', cursor: 'default' }}>
              <div className="photo" style={{ height: 230, backgroundImage: `url(${s.photo})` }}>
                <div style={{ position: 'absolute', top: 16, left: 16, padding: '6px 10px', background: 'rgba(13,31,36,0.72)', color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em' }}>
                  BOOKABLE · {s.n}
                </div>
              </div>
              <div style={{ padding: 26 }}>
                <div className="mono" style={{ color: 'var(--ember)', marginBottom: 12 }}>{s.label}</div>
                <h3 style={{ fontSize: 30, lineHeight: 1.08, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted-ink)', marginBottom: 22, textWrap: 'pretty' }}>{s.body}</p>
                <div style={{ display: 'grid', gap: 9, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                  {s.points.map(point => (
                    <div key={point} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
                      <Icon name="check" size={14} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                  <div>
                    <div className="mono" style={{ color: 'var(--muted-ink)', fontSize: 9, marginBottom: 4 }}>STARTING</div>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 22 }}>{s.price}</div>
                  </div>
                  <a
                    href={`/contact?service=${encodeURIComponent(s.title.toLowerCase())}`}
                    className="btn btn-ember"
                    style={{ padding: '12px 16px', fontSize: 13 }}
                  >
                    {s.cta} <Icon name="arrow" size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 34, padding: '24px 28px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30, background: 'rgba(245,239,228,0.55)' }}>
          <div>
            <div className="mono" style={{ color: 'var(--teal-700)', marginBottom: 6 }}>Book services with or without a package</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted-ink)' }}>Travelers can book only a hotel, only a vehicle, only a guide, or combine any of these with a full package.</p>
          </div>
          <Link href="/contact" className="btn btn-ink">Request services <Icon name="arrow" size={14} /></Link>
        </div>
      </div>
    </section>
  );
};

const PkgCardWide = ({ p, urgency }) => (
  <Link href={`/packages/${p.id}`} className="pkg-card" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0, background: 'var(--bone-2)' }}>
    <div className="photo" style={{ height: 440, backgroundImage: `url(${p.photo})`, position: 'relative' }}>
      {p.badge && (
        <div style={{ position: 'absolute', top: 18, left: 18, padding: '6px 12px', background: p.badge === 'Eid Special' ? 'var(--ember)' : 'var(--ink)', color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em' }}>
          {p.badge.toUpperCase()}
        </div>
      )}
      {urgency !== 'off' && p.spots <= 4 && (
        <div style={{ position: 'absolute', bottom: 18, left: 18 }}>
          <div className="scarcity" style={{ background: 'rgba(13,31,36,0.85)', backdropFilter: 'blur(8px)' }}>
            <span className="dot"></span>
            ONLY {p.spots} SEATS LEFT
          </div>
        </div>
      )}
    </div>
    <div style={{ padding: '36px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="mono" style={{ color: 'var(--teal-700)', marginBottom: 14 }}>
          {p.region} · {p.days} DAYS · {p.difficulty.toUpperCase()} · {p.season.toUpperCase()}
        </div>
        <h3 style={{ fontSize: 36, lineHeight: 1.05, marginBottom: 14 }}>{p.title}</h3>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted-ink)', marginBottom: 22, textWrap: 'pretty' }}>{p.blurb}</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {p.highlights.slice(0, 4).map(h => (
            <li key={h} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 13.5 }}>
              <Icon name="check" size={14} /> {h}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 24, borderTop: '1px solid var(--line)', marginTop: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Icon name="star" size={12} /> <span style={{ fontSize: 13, fontWeight: 600 }}>{p.rating}</span> <span style={{ fontSize: 12, color: 'var(--muted-ink)' }}>· {p.reviews} reviews</span>
          </div>
          <div className="mono" style={{ color: 'var(--muted-ink)', fontSize: 9, marginBottom: 4 }}>FROM</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 32 }}>PKR {p.price.toLocaleString()}<span style={{ fontSize: 13, opacity: 0.55, marginLeft: 6 }}>/ ${p.priceUsd}</span></div>
        </div>
        <span className="btn btn-ember">View details <Icon name="arrow" size={14} /></span>
      </div>
    </div>
  </Link>
);

const PackagesGrid = ({ urgency }) => (
  <section style={{ background: 'var(--bone)', padding: '20px 56px 140px' }}>
    <div className="container-wide" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {ND_PACKAGES.map(p => <PkgCardWide key={p.id} p={p} urgency={urgency} />)}
    </div>
    <div className="container-wide" style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
      <button className="btn btn-ghost-ink btn-lg">Load 16 more journeys <Icon name="arrow" size={14} /></button>
    </div>
  </section>
);

const PackagesAside = () => (
  <section style={{ background: 'var(--teal-800)', color: 'var(--bone)', padding: '120px 56px' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
      <div>
        <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 24 }}>Don't see what you want?</div>
        <h2 style={{ fontSize: 60, lineHeight: 1.05, color: 'var(--bone)' }}>
          Tell us your dates.<br/>
          We'll build<br/>
          <em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>your trip.</em>
        </h2>
      </div>
      <div>
        <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.85, marginBottom: 30 }}>
          Forty percent of our trips are private departures — couples, families, photographers, climbing teams. Send us a WhatsApp with what you're after and we'll quote within 24 hours.
        </p>
        <a className="btn btn-ember btn-lg" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" size={16} /> Start a private trip
        </a>
      </div>
    </div>
  </section>
);

const PackagesPage = ({ urgency }) => (
  <div className="nd" data-screen-label="02 Packages">
    <NavLight />
    <PackagesHero />
    <Filters />
    <PackageSupportServices />
    <PackagesGrid urgency={urgency} />
    <PackagesAside />
    <Footer />
  </div>
);




// Northern Dreamscape — Package Detail Page
// Signature interaction: day-by-day cinematic itinerary scroll reveal.

const DetailHero = ({ p }) => (
  <section style={{ position: 'relative', height: 880, overflow: 'hidden' }}>
    <div className="photo photo-overlay-strong" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.photo})` }} />
    {/* Nav overlay (dark hero) */}
    <NavDark />
    {/* Breadcrumb */}
    <div style={{ position: 'absolute', top: 90, left: 56, right: 56, color: 'var(--bone)', opacity: 0.7, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em' }}>
      <Link href="/packages">← &nbsp; PACKAGES</Link> &nbsp; / &nbsp; {p.region.toUpperCase()} &nbsp; / &nbsp; <span style={{ opacity: 1 }}>{p.title.toUpperCase()}</span>
    </div>

    <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, padding: '0 56px', color: 'var(--bone)' }}>
      <div style={{ maxWidth: 1100 }}>
        <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 28 }}>{p.badge ? p.badge.toUpperCase() : 'SEASONAL JOURNEY'} · {p.region.toUpperCase()}</div>
        <h1 style={{ fontSize: 132, lineHeight: 0.92, marginBottom: 26, letterSpacing: '-0.02em' }}>
          {p.title.split(' ').slice(0,2).join(' ')}<br/>
          <em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>{p.title.split(' ').slice(2).join(' ')}.</em>
        </h1>
        <p style={{ fontSize: 22, opacity: 0.88, maxWidth: 680, lineHeight: 1.5, marginBottom: 50 }}>{p.subtitle}.</p>

        <div style={{ display: 'flex', gap: 50, alignItems: 'center', paddingTop: 30, borderTop: '1px solid rgba(245,239,228,0.25)', maxWidth: 900 }}>
          {[
            ['DURATION', `${p.days} days · ${p.nights} nights`],
            ['DIFFICULTY', p.difficulty],
            ['SEASON', p.season],
            ['MAX GROUP', '10 travelers'],
            ['RATING', `${p.rating} · ${p.reviews} reviews`],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="mono" style={{ opacity: 0.6, marginBottom: 6 }}>{k}</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 22 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const QuickBookBar = ({ p, urgency }) => (
  <section style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '24px 56px', position: 'sticky', top: 0, zIndex: 20, borderBottom: '1px solid var(--line-light)' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', fontSize: 16, opacity: 0.85 }}>
          <NDLogo color="#f5efe4" size={18} />
          <span style={{ marginLeft: 8 }}>{p.title}</span>
        </div>
        <div style={{ display: 'flex', gap: 26, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', opacity: 0.8 }}>
          <a style={{ color: 'var(--sand)' }}>OVERVIEW</a>
          <a>ITINERARY</a>
          <a>INCLUSIONS</a>
          <a>GALLERY</a>
          <a>REVIEWS</a>
          <a>FAQ</a>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        {urgency !== 'off' && (
          <div className="scarcity"><span className="dot"></span>{p.spots} SEATS LEFT</div>
        )}
        <div style={{ textAlign: 'right' }}>
          <div className="mono" style={{ opacity: 0.55, fontSize: 9, marginBottom: 2 }}>FROM</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 24 }}>PKR {p.price.toLocaleString()}</div>
        </div>
        <button className="btn btn-ember btn-lg">Book this trip <Icon name="arrow" size={14} /></button>
      </div>
    </div>
  </section>
);

/* Overview section */
const Overview = ({ p }) => (
  <section style={{ background: 'var(--bone)', padding: '120px 56px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, marginBottom: 100 }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 22 }}>The trip in brief</div>
          <h2 style={{ fontSize: 52, lineHeight: 1.05 }}>A week with<br/>the apricot trees,<br/><em style={{ fontStyle: 'italic' }}>and what they hide.</em></h2>
        </div>
        <div style={{ paddingTop: 14 }}>
          <p style={{ fontSize: 22, lineHeight: 1.5, marginBottom: 28, textWrap: 'pretty' }}>
            Autumn in Hunza is brief and absurdly beautiful. For three weeks each October the entire valley — poplars, willows, apricot orchards — turns the colour of beaten copper, framed against the white wall of Ultar Sar.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--muted-ink)', marginBottom: 18, textWrap: 'pretty' }}>
            This is a comfortable trip: jeeps not feet, lodges not tents, with three days based out of the same hotel in Karimabad so you can settle in. You'll wake for sunrise above Eagle's Nest, drink salted butter tea with a Wakhi family in Hopper, ride a wooden boat across an accidental turquoise lake, and stand at 4,733 metres on the Chinese border.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--muted-ink)', textWrap: 'pretty' }}>
            We've run this exact route every October since 2016. Seventeen autumn departures. Zero cancellations.
          </p>
        </div>
      </div>

      {/* Inclusions grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
        {[
          ['Accommodation', '6 nights · Heritage stays in Karimabad, Shigar fort, Sost guesthouse'],
          ['Transport', 'Private 4×4 jeep · KKH-licensed driver · Gilgit airport pickup'],
          ['Meals', 'All breakfast & dinner · 4 traditional lunches with local families'],
          ['Guides', '1 lead guide + 1 in-region naturalist · Burushaski / Urdu / English'],
          ['Permits', 'Khunjerab National Park · Attabad boat · all entry fees included'],
          ['Insurance', 'Mountain rescue cover up to 5,000m · Medical evacuation'],
          ['Photography', 'Free 1-hour briefing with our Hunza-based photographer'],
          ['What\'s not', 'International flights · Pakistan visa fee · alcohol · tips'],
        ].map(([k, v], i) => (
          <div key={k} style={{ padding: '32px 28px', background: 'var(--bone)', minHeight: 160 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              {i < 7 ? <Icon name="check" size={16} /> : <span style={{ color: 'var(--muted-ink)', fontSize: 18 }}>—</span>}
              <div className="mono" style={{ color: i < 7 ? 'var(--ember)' : 'var(--muted-ink)' }}>{k.toUpperCase()}</div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--muted-ink)' }}>{v}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ----------- ITINERARY — the signature moment ----------- */
const ItineraryDay = ({ d, isLast }) => {
  const [open, setOpen] = React.useState(d.day <= 2);
  const isLeft = d.day % 2 === 1;
  return (
    <div style={{ position: 'relative', padding: '40px 0' }}>
      {/* Vertical timeline rule */}
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: isLast ? 'auto' : 0, height: isLast ? '50%' : '100%', width: 1, background: 'var(--line-light)', transform: 'translateX(-0.5px)' }} />
      <div style={{ position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', width: 11, height: 11, borderRadius: '50%', background: 'var(--ember)', border: '3px solid var(--ink)', zIndex: 2 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-start' }}>
        {/* Text side */}
        <div style={{ gridColumn: isLeft ? 1 : 2, gridRow: 1, paddingTop: 28, textAlign: isLeft ? 'right' : 'left', paddingRight: isLeft ? 40 : 0, paddingLeft: isLeft ? 0 : 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, justifyContent: isLeft ? 'flex-end' : 'flex-start', marginBottom: 14 }}>
            <div className="mono" style={{ color: 'var(--sand)', fontSize: 11 }}>DAY {String(d.day).padStart(2, '0')}</div>
            <div style={{ height: 1, width: 60, background: 'var(--line-light)' }} />
            <div className="mono" style={{ color: 'var(--muted-bone)', fontSize: 10 }}>{d.distance.toUpperCase()}</div>
          </div>
          <h3 style={{ fontSize: 46, lineHeight: 1.05, color: 'var(--bone)', marginBottom: 22, fontStyle: 'italic', fontWeight: 400 }}>{d.title}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--muted-bone)', maxWidth: 460, marginLeft: isLeft ? 'auto' : 0, marginBottom: 24, textWrap: 'pretty' }}>{d.body}</p>
          <button
            onClick={() => setOpen(o => !o)}
            className="mono"
            style={{ color: 'var(--sand)', borderBottom: '1px solid var(--sand)', paddingBottom: 4, fontSize: 10 }}
          >
            {open ? 'HIDE DETAILS −' : 'SHOW DAY DETAILS +'}
          </button>
          {open && (
            <div style={{ marginTop: 26, padding: '20px 0', borderTop: '1px solid var(--line-light)', borderBottom: '1px solid var(--line-light)', textAlign: isLeft ? 'right' : 'left' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['Morning', '7:00 — pickup'],
                  ['Lunch', 'Local rest house'],
                  ['Evening', 'Arrival & briefing'],
                  ['Accommodation', 'Heritage hotel · twin / single supplement available'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start', gap: 12, fontSize: 12.5 }}>
                    <div className="mono" style={{ color: 'var(--muted-bone)', fontSize: 9, minWidth: 110, textAlign: isLeft ? 'right' : 'left' }}>{k.toUpperCase()}</div>
                    <div style={{ color: 'var(--bone)', opacity: 0.9 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Photo side */}
        <div style={{ gridColumn: isLeft ? 2 : 1, gridRow: 1 }}>
          <div className="photo" style={{ height: 420, backgroundImage: `url(${d.photo})`, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 20, left: 20, padding: '6px 12px', background: 'rgba(13,31,36,0.6)', backdropFilter: 'blur(8px)', color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em' }}>
              DAY {String(d.day).padStart(2, '0')} · {d.title.split(' →')[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Itinerary = () => (
  <section style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '140px 56px 100px', position: 'relative' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `url(${ND_PHOTOS.night})`, backgroundSize: 'cover' }} />
    <div className="container" style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div className="eyebrow" style={{ color: 'var(--sand)', justifyContent: 'center', display: 'inline-flex', marginBottom: 26 }}>Day by day · A week unfolded</div>
        <h2 style={{ fontSize: 84, lineHeight: 0.95, color: 'var(--bone)', maxWidth: 900, margin: '0 auto' }}>
          The journey,<br/><em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>hour by hour.</em>
        </h2>
      </div>

      <div style={{ marginTop: 80 }}>
        {ND_ITINERARY.map((d, i) => (
          <ItineraryDay key={d.day} d={d} isLast={i === ND_ITINERARY.length - 1} />
        ))}
      </div>

      {/* Download brochure CTA */}
      <div style={{ textAlign: 'center', marginTop: 80, padding: '50px 0', borderTop: '1px solid var(--line-light)' }}>
        <p style={{ fontSize: 17, opacity: 0.7, marginBottom: 24 }}>Need the day-by-day to share with someone?</p>
        <button className="btn btn-ghost btn-lg">Download the PDF brochure ↓</button>
      </div>
    </div>
  </section>
);

/* ---------- What to Expect (image grid) ---------- */
const Gallery = () => (
  <section style={{ background: 'var(--bone)', padding: '140px 56px' }}>
    <div className="container-wide">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>What to expect</div>
          <h2 style={{ fontSize: 60, lineHeight: 1.05 }}>The valley,<br/><em style={{ fontStyle: 'italic' }}>seen by people who lived there.</em></h2>
        </div>
        <div className="mono" style={{ color: 'var(--muted-ink)' }}>PHOTOS · TRAVELERS · OCT 2023–2025</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 280px)', gap: 14 }}>
        <div className="photo" style={{ backgroundImage: `url(${ND_PHOTOS.hunza})`, gridColumn: 'span 2', gridRow: 'span 2' }} />
        <div className="photo" style={{ backgroundImage: `url(${ND_PHOTOS.ridge})` }} />
        <div className="photo" style={{ backgroundImage: `url(${ND_PHOTOS.lake})` }} />
        <div className="photo" style={{ backgroundImage: `url(${ND_PHOTOS.village})` }} />
        <div className="photo" style={{ backgroundImage: `url(${ND_PHOTOS.night})` }} />
      </div>
    </div>
  </section>
);

/* ---------- Single deep testimonial ---------- */
const DeepTestimonial = () => (
  <section style={{ background: 'var(--sand)', color: 'var(--ink)', padding: '120px 56px' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'center' }}>
      <div className="photo" style={{ height: 480, backgroundImage: `url(${ND_PHOTOS.team1})` }} />
      <div>
        <div className="eyebrow" style={{ color: 'var(--teal-800)', marginBottom: 22 }}>What our travelers say</div>
        <p className="display italic" style={{ fontSize: 44, lineHeight: 1.2, marginBottom: 40, textWrap: 'pretty' }}>
          "Two weeks later I'm still tasting the apricot tea. They moved us through the valley like we were people, not customers."
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>Aisha R.</div>
            <div className="mono" style={{ color: 'var(--muted-ink)' }}>LAHORE → HUNZA · OCT 2025</div>
          </div>
          <div style={{ display: 'flex', gap: 4, color: 'var(--ember)' }}>
            {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={14} />)}
          </div>
        </div>
        <div style={{ marginTop: 40, paddingTop: 30, borderTop: '1px solid rgba(13,31,36,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="mono" style={{ color: 'var(--teal-800)' }}>384 REVIEWS · 4.9 AVERAGE</div>
          <a className="mono" style={{ color: 'var(--ember)', borderBottom: '1px solid var(--ember)', paddingBottom: 3 }}>READ ALL 384 →</a>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Booking confirmation panel (WhatsApp handoff) ---------- */
const BookConfirm = ({ p }) => (
  <section style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '120px 56px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 26 }}>Booking · How it works</div>
          <h2 style={{ fontSize: 60, lineHeight: 1, color: 'var(--bone)', marginBottom: 30 }}>
            Talk to a human.<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>Then book.</em>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.8, marginBottom: 40, maxWidth: 460 }}>
            We don't take payment from a checkout. We send you to WhatsApp, where one of our trip coordinators answers your questions, confirms departure date, and sends a secure payment link. Reply time: under four working hours.
          </p>

          {[
            ['01', 'Click "Book this trip"', 'Open a pre-filled WhatsApp message with this package and your preferred date'],
            ['02', 'Talk to a coordinator', 'A real person (likely Saba, Faisal or Hira) confirms availability and answers questions'],
            ['03', 'Secure your seat', 'Pay 25% deposit by card / Wise / bank transfer. Cancel free 30+ days out.'],
          ].map(([n, t, b]) => (
            <div key={n} style={{ display: 'flex', gap: 30, padding: '20px 0', borderTop: '1px solid var(--line-light)' }}>
              <div className="mono" style={{ color: 'var(--sand)', minWidth: 30 }}>{n}</div>
              <div>
                <h4 style={{ fontSize: 20, color: 'var(--bone)', marginBottom: 6, fontFamily: 'var(--ui)', fontWeight: 600 }}>{t}</h4>
                <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.6 }}>{b}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp preview card */}
        <div style={{ background: '#0d2a23', borderRadius: 16, padding: 0, overflow: 'hidden', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,239,228,0.06)', maxWidth: 460, marginLeft: 'auto' }}>
          {/* fake header */}
          <div style={{ background: '#0e4a3a', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ember)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: 18, color: 'var(--bone)' }}>ND</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Northern Dreamscape</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>online · usually replies in 1 hour</div>
            </div>
            <div style={{ marginLeft: 'auto' }}><Icon name="whatsapp" size={20} /></div>
          </div>
          {/* messages */}
          <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 360, background: 'rgba(13,31,36,0.4)' }}>
            <div className="mono" style={{ alignSelf: 'center', opacity: 0.5, fontSize: 9, marginBottom: 4 }}>TODAY · 10:42</div>
            <div style={{ alignSelf: 'flex-end', background: '#1f6b5a', padding: '14px 16px', borderRadius: '12px 12px 4px 12px', maxWidth: '85%', fontSize: 14, lineHeight: 1.45 }}>
              Hi! I'd like to book the <b>{p.title}</b> trip. Looking at the October departure.
              <div style={{ marginTop: 8, fontSize: 11, opacity: 0.65, textAlign: 'right' }}>10:42 ✓✓</div>
            </div>
            <div style={{ alignSelf: 'flex-start', background: '#1a3d3a', padding: '14px 16px', borderRadius: '12px 12px 12px 4px', maxWidth: '85%', fontSize: 14, lineHeight: 1.45 }}>
              Salam! Saba here from the Gilgit office 👋 We have 6 seats left for the Oct 12 departure and 4 for Oct 19. Are you traveling solo or with someone?
              <div style={{ marginTop: 8, fontSize: 11, opacity: 0.55 }}>10:43</div>
            </div>
            <div style={{ alignSelf: 'center', opacity: 0.5, fontSize: 11, fontStyle: 'italic', marginTop: 4 }}>Saba is typing…</div>
          </div>
          <div style={{ padding: 18, background: 'rgba(13,31,36,0.5)', display: 'flex', justifyContent: 'center' }}>
            <a className="btn btn-ember" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
              <Icon name="whatsapp" size={16} /> Open this chat in WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Floating sticky booking bar (bottom) ---------- */
const StickyBookBar = ({ p, urgency }) => (
  <div style={{ position: 'sticky', bottom: 0, zIndex: 30, background: 'var(--ink)', color: 'var(--bone)', borderTop: '1px solid var(--line-light)', padding: '18px 56px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        <div>
          <div className="mono" style={{ opacity: 0.55, fontSize: 9, marginBottom: 2 }}>{p.title.toUpperCase()}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="mono" style={{ opacity: 0.6 }}>FROM</span>
            <span style={{ fontFamily: 'var(--display)', fontSize: 28 }}>PKR {p.price.toLocaleString()}</span>
            <span style={{ opacity: 0.55, fontSize: 14 }}>/ ${p.priceUsd} · per person</span>
          </div>
        </div>
        <div style={{ height: 40, width: 1, background: 'var(--line-light)' }} />
        <div style={{ display: 'flex', gap: 24 }}>
          <div>
            <div className="mono" style={{ opacity: 0.55, fontSize: 9, marginBottom: 2 }}>NEXT DEPARTURE</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Oct 12 · 2026</div>
          </div>
          {urgency !== 'off' && (
            <div className="scarcity" style={{ alignSelf: 'center' }}><span className="dot"></span>{p.spots} OF 10 SEATS LEFT</div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-ghost">Ask a question</button>
        <a className="btn btn-ember btn-lg" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" size={16} /> Book via WhatsApp
        </a>
      </div>
    </div>
  </div>
);

/* ---------- Main Detail Page ---------- */
const DetailPage = ({ urgency, packageId = 'hunza-autumn' }) => {
  const p = ND_PACKAGES.find(pkg => pkg.id === packageId) || ND_PACKAGES[0];
  return (
    <div className="nd" data-screen-label="03 Package Detail">
      <DetailHero p={p} />
      <QuickBookBar p={p} urgency={urgency} />
      <Overview p={p} />
      <Itinerary />
      <Gallery />
      <DeepTestimonial />
      <BookConfirm p={p} />
      <StickyBookBar p={p} urgency={urgency} />
      <Footer />
    </div>
  );
};




// Northern Dreamscape — Additional pages: Destinations, Journal, About, Contact

const REGIONS = [
  { id: 'hunza', name: 'Hunza & Nagar', tagline: 'Apricot valleys under Ultar Sar', elevation: '2,400m – 4,733m', best: 'May – Oct', trips: 5, photo: ND_PHOTOS.hunza, body: 'The first valley most travelers fall for. Karimabad, Altit Fort, Attabad Lake, and the road to China at Khunjerab Pass.' },
  { id: 'baltistan', name: 'Baltistan & Skardu', tagline: 'Cold deserts, sky mirrors, Mughal forts', elevation: '2,200m – 8,611m', best: 'Jun – Sep', trips: 6, photo: ND_PHOTOS.skardu, body: 'Roof-of-the-world plateau Deosai, the alpine lakes around Skardu, and the launch point for every K2 expedition since 1902.' },
  { id: 'diamer', name: 'Diamer & Fairy Meadows', tagline: 'At the foot of the Killer Mountain', elevation: '1,300m – 3,800m', best: 'May – Oct', trips: 3, photo: ND_PHOTOS.fairy, body: 'A wooden-hut meadow staring directly into the Raikot face of Nanga Parbat. The only way in is on foot or by jeep — no road.' },
  { id: 'ghizer', name: 'Ghizer & Shandur', tagline: 'Where the polo plays at 3,700m', elevation: '1,800m – 4,300m', best: 'Jun – Sep', trips: 4, photo: ND_PHOTOS.deosai, body: 'Phander Lake at dawn, Khalti at dusk, and the three-day Shandur festival each July between the Chitral and Gilgit teams.' },
  { id: 'kaghan', name: 'Kaghan & Naran', tagline: 'Family valley · the gentle introduction', elevation: '1,000m – 4,170m', best: 'May – Sep', trips: 4, photo: ND_PHOTOS.lake, body: 'Saif-ul-Malook lake, Babusar Pass, easy pacing — our most-booked itinerary for first-time mountain travelers and families.' },
  { id: 'concordia', name: 'Concordia & K2', tagline: 'The Throne Room of the Mountain Gods', elevation: '3,300m – 5,700m', best: 'Jul – Aug', trips: 2, photo: ND_PHOTOS.k2, body: 'Eighteen days on glacier ice. Four 8,000m peaks visible from a single basin. The pilgrimage of serious trekkers.' },
];

const DestinationsHero = () => (
  <section style={{ background: 'var(--bone)', padding: '80px 56px 60px' }}>
    <div className="container-wide">
      <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 28 }}>The map · Six regions we run</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80, alignItems: 'flex-end', marginBottom: 40 }}>
        <h1 style={{ fontSize: 108, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
          Six valleys,<br/>
          <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>one road north.</em>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted-ink)', paddingBottom: 14, maxWidth: 380 }}>
          Gilgit-Baltistan covers 72,000 km² — bigger than Switzerland, with five times the elevation range. We've narrowed it to the six places we know in our bones.
        </p>
      </div>
    </div>
  </section>
);

const RegionCard = ({ r, large }) => (
  <Link href={`/destinations/${r.id}`} className="pkg-card" style={{ display: 'block', background: 'var(--bone-2)' }}>
    <div className="photo" style={{ height: large ? 480 : 360, backgroundImage: `url(${r.photo})`, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, padding: '6px 12px', background: 'rgba(13,31,36,0.7)', backdropFilter: 'blur(8px)', color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em' }}>
        REGION · 0{REGIONS.indexOf(r) + 1}
      </div>
    </div>
    <div style={{ padding: '32px 32px 36px' }}>
      <div className="mono" style={{ color: 'var(--teal-700)', marginBottom: 14 }}>{r.elevation} · BEST {r.best.toUpperCase()}</div>
      <h3 style={{ fontSize: large ? 40 : 30, lineHeight: 1.05, marginBottom: 12 }}>{r.name}</h3>
      <p className="display italic" style={{ fontSize: large ? 22 : 18, color: 'var(--ember)', marginBottom: 18 }}>{r.tagline}.</p>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted-ink)', marginBottom: 24, textWrap: 'pretty' }}>{r.body}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--line)' }}>
        <div className="mono" style={{ color: 'var(--ink)' }}>{r.trips} TRIPS IN THIS REGION</div>
        <div className="mono" style={{ color: 'var(--ember)' }}>EXPLORE →</div>
      </div>
    </div>
  </Link>
);

const DestinationsGrid = () => (
  <section style={{ background: 'var(--bone)', padding: '20px 56px 140px' }}>
    <div className="container-wide">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 28 }}>
        <RegionCard r={REGIONS[0]} large />
        <RegionCard r={REGIONS[5]} large />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
        {REGIONS.slice(1, 5).map(r => <RegionCard key={r.id} r={r} />)}
      </div>
    </div>
  </section>
);

const DestinationsPage = () => (
  <div className="nd" data-screen-label="04 Destinations">
    <NavLight />
    <DestinationsHero />
    <DestinationsGrid />
    <section style={{ background: 'var(--teal-800)', color: 'var(--bone)', padding: '120px 56px' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="eyebrow" style={{ color: 'var(--sand)', justifyContent: 'center', display: 'inline-flex', marginBottom: 26 }}>Mixing regions</div>
        <h2 style={{ fontSize: 64, lineHeight: 1, color: 'var(--bone)', marginBottom: 30 }}>
          Or string together<br/><em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>two or three.</em>
        </h2>
        <p style={{ fontSize: 17, opacity: 0.8, maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Many travelers combine Hunza + Skardu (10 days) or Skardu + Deosai + Fairy Meadows (12 days). We'll build the route around your dates.
        </p>
        <Link href="/contact" className="btn btn-ember btn-lg">Plan a custom route <Icon name="arrow" size={14} /></Link>
      </div>
    </section>
    <Footer />
  </div>
);

const DestinationDetailPage = ({ regionId = 'hunza' }) => {
  const r = REGIONS.find(region => region.id === regionId) || REGIONS[0];
  const regionPackages = ND_PACKAGES.filter(p => r.name.split(' ')[0] && p.region.toLowerCase().includes(r.name.split(' ')[0].toLowerCase())).slice(0, 3);
  const shownPackages = regionPackages.length ? regionPackages : ND_PACKAGES.slice(0, 3);

  return (
    <div className="nd" data-screen-label="Destination Detail">
      <section style={{ background: 'var(--ink)', color: 'var(--bone)', position: 'relative', minHeight: 760, overflow: 'hidden' }}>
        <div className="photo photo-overlay-strong" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${r.photo})`, opacity: 0.95 }} />
        <NavDark />
        <div style={{ position: 'absolute', top: 96, left: 56, right: 56, color: 'var(--bone)', opacity: 0.72, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em' }}>
          <Link href="/destinations">← &nbsp; DESTINATIONS</Link> &nbsp; / &nbsp; <span style={{ opacity: 1 }}>{r.name.toUpperCase()}</span>
        </div>
        <div className="container-wide" style={{ position: 'relative', paddingTop: 240, paddingBottom: 100 }}>
          <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 28 }}>Region · {String(REGIONS.indexOf(r) + 1).padStart(2, '0')}</div>
          <h1 style={{ fontSize: 120, lineHeight: 0.92, color: 'var(--bone)', maxWidth: 1100, letterSpacing: '-0.02em', marginBottom: 36 }}>
            {r.name.split('&')[0].trim()}<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>{r.name.includes('&') ? `& ${r.name.split('&')[1].trim()}` : r.tagline}.</em>
          </h1>
          <p style={{ fontSize: 22, opacity: 0.86, maxWidth: 700, lineHeight: 1.5 }}>{r.body}</p>
          <div style={{ display: 'flex', gap: 50, alignItems: 'center', paddingTop: 34, borderTop: '1px solid rgba(245,239,228,0.25)', maxWidth: 900, marginTop: 48 }}>
            {[
              ['ELEVATION', r.elevation],
              ['BEST TIME', r.best],
              ['TRIPS', `${r.trips} journeys`],
              ['STYLE', r.tagline],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="mono" style={{ opacity: 0.6, marginBottom: 6 }}>{k}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 22 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bone)', padding: '120px 56px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 22 }}>Why go</div>
            <h2 style={{ fontSize: 56, lineHeight: 1.05 }}>The reason<br/><em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>this region stays.</em></h2>
          </div>
          <div>
            <p style={{ fontSize: 22, lineHeight: 1.5, marginBottom: 28, textWrap: 'pretty' }}>{r.tagline}. {r.body}</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--muted-ink)', textWrap: 'pretty' }}>
              We pace this region slowly: one long view at a time, with room for weather, road conditions and the small local stops that make the journey feel lived-in rather than rushed.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bone-2)', padding: '120px 56px' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 54 }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 20 }}>Trips in this region</div>
              <h2 style={{ fontSize: 56, lineHeight: 1.05 }}>Start with<br/><em style={{ fontStyle: 'italic' }}>these journeys.</em></h2>
            </div>
            <Link href="/packages" className="mono" style={{ color: 'var(--ember)', borderBottom: '1px solid var(--ember)', paddingBottom: 4 }}>VIEW ALL PACKAGES →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {shownPackages.map(p => <FeatureSmall key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

/* ============================================================ */
/* JOURNAL                                                       */
/* ============================================================ */

const ARTICLES = [
  { id: 'a1', cat: 'Practical', date: 'MAR 04 · 2026', read: '12 MIN', title: 'A complete guide to visas for Pakistan, 2026 edition', blurb: 'Pakistan introduced e-visas for 175+ nationalities. Here is what to expect, what to prepare, and the common pitfalls we have seen this season.', photo: ND_PHOTOS.village },
  { id: 'a2', cat: 'Region', date: 'FEB 18 · 2026', read: '8 MIN', title: 'Why we still won\'t run K2 Base Camp in late August', blurb: 'A note on weather windows, glacier melt, and why our cutoff is non-negotiable — even when the booking call is paying.', photo: ND_PHOTOS.k2 },
  { id: 'a3', cat: 'Story', date: 'JAN 27 · 2026', read: '15 MIN', title: 'Saleem at sixty: the man who has walked to Concordia 84 times', blurb: 'Our senior K2 guide on the year he started, what changed in the eighties, and the trip that almost made him stop.', photo: ND_PHOTOS.ridge },
  { id: 'a4', cat: 'Photography', date: 'JAN 12 · 2026', read: '6 MIN', title: 'The four lenses every Hunza photographer wishes they had brought', blurb: 'Light at altitude is different. Here\'s our resident photographer\'s honest opinion on what to pack and what to leave at home.', photo: ND_PHOTOS.hunza },
  { id: 'a5', cat: 'Region', date: 'DEC 04 · 2025', read: '10 MIN', title: 'Snow leopard tracking in Hushe valley: a 2026 update', blurb: 'Last winter our teams documented 11 sightings across 38 days. Here\'s how the program is run and how to join.', photo: ND_PHOTOS.night },
  { id: 'a6', cat: 'Practical', date: 'NOV 19 · 2025', read: '7 MIN', title: 'Altitude sickness in plain English (and what we carry to prevent it)', blurb: 'Diamox, acclimatization days, oxygen — what works, what doesn\'t, and the daily routine that has kept our teams out of trouble for 11 years.', photo: ND_PHOTOS.lake },
  { id: 'a7', cat: 'Cuisine', date: 'OCT 30 · 2025', read: '5 MIN', title: 'Chapshuro, mamtu and walnut cake: eating your way north', blurb: 'A short tour of Wakhi, Balti and Hunzakut food, and the seven places we never miss on the road.', photo: ND_PHOTOS.deosai },
];

const JournalHero = () => (
  <section style={{ background: 'var(--bone)', padding: '80px 56px 60px' }}>
    <div className="container-wide">
      <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 28 }}>The Journal · Field notes from the high road</div>
      <h1 style={{ fontSize: 108, lineHeight: 0.95, letterSpacing: '-0.02em', maxWidth: 1100 }}>
        Long-form,<br/>
        <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>from the road north.</em>
      </h1>
    </div>
  </section>
);

const JournalFeatured = () => {
  const a = ARTICLES[2]; // Saleem story
  return (
    <section style={{ background: 'var(--bone)', padding: '20px 56px 80px' }}>
      <div className="container-wide">
        <Link href={`/journal/${a.id}`} className="pkg-card" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', background: 'var(--ink)', color: 'var(--bone)', minHeight: 540 }}>
          <div className="photo" style={{ backgroundImage: `url(${a.photo})`, minHeight: 540 }} />
          <div style={{ padding: '60px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="mono" style={{ color: 'var(--sand)', marginBottom: 18 }}>FEATURED · {a.cat.toUpperCase()} · {a.date}</div>
              <h2 style={{ fontSize: 52, lineHeight: 1.05, color: 'var(--bone)', marginBottom: 24, textWrap: 'pretty' }}>{a.title}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, opacity: 0.85, textWrap: 'pretty', maxWidth: 480 }}>{a.blurb}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 30, borderTop: '1px solid var(--line-light)' }}>
              <div className="mono" style={{ opacity: 0.6 }}>{a.read} READ · BY HASSAN ALI</div>
              <div className="mono" style={{ color: 'var(--sand)' }}>READ STORY →</div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

const JournalGrid = () => (
  <section style={{ background: 'var(--bone)', padding: '0 56px 140px' }}>
    <div className="container-wide">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, paddingTop: 50, borderTop: '1px solid var(--ink)' }}>
        <h3 style={{ fontSize: 32, lineHeight: 1.1 }}>More from the road</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', 'Practical', 'Region', 'Story', 'Photography'].map((c, i) => (
            <button key={c} className="mono" style={{ padding: '8px 14px', border: '1px solid ' + (i === 0 ? 'var(--ink)' : 'var(--line)'), background: i === 0 ? 'var(--ink)' : 'transparent', color: i === 0 ? 'var(--bone)' : 'var(--ink)', fontSize: 10 }}>{c.toUpperCase()}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {ARTICLES.filter((_, i) => i !== 2).map(a => (
          <Link key={a.id} href={`/journal/${a.id}`} className="pkg-card" style={{ display: 'block' }}>
            <div className="photo" style={{ height: 300, backgroundImage: `url(${a.photo})` }} />
            <div style={{ padding: '24px 0' }}>
              <div className="mono" style={{ color: 'var(--ember)', marginBottom: 14 }}>{a.cat.toUpperCase()} · {a.date}</div>
              <h4 style={{ fontSize: 24, lineHeight: 1.15, marginBottom: 12, textWrap: 'pretty' }}>{a.title}</h4>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted-ink)', marginBottom: 20, textWrap: 'pretty' }}>{a.blurb}</p>
              <div className="mono" style={{ color: 'var(--muted-ink)', fontSize: 9 }}>{a.read} READ →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const NewsletterStrip = () => (
  <section style={{ background: 'var(--sand)', color: 'var(--ink)', padding: '100px 56px' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>
      <div>
        <div className="eyebrow" style={{ color: 'var(--teal-800)', marginBottom: 22 }}>Field notes, monthly</div>
        <h2 style={{ fontSize: 52, lineHeight: 1.05 }}>One letter a month.<br/><em style={{ fontStyle: 'italic' }}>Never more.</em></h2>
      </div>
      <div>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--muted-ink)', marginBottom: 24 }}>Trip updates, weather windows, one essay, and the occasional photograph from the field. 4,200 readers and counting.</p>
        <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--ink)', paddingBottom: 14 }}>
          <input placeholder="your@email.com" style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'var(--ui)', fontSize: 16, outline: 'none', color: 'var(--ink)' }} />
          <button className="mono" style={{ color: 'var(--ember)', fontWeight: 600 }}>SUBSCRIBE →</button>
        </div>
        <div className="mono" style={{ color: 'var(--muted-ink)', marginTop: 14, fontSize: 9 }}>NO SPAM. UNSUBSCRIBE WITH ONE CLICK.</div>
      </div>
    </div>
  </section>
);

const JournalPage = () => (
  <div className="nd" data-screen-label="05 Journal">
    <NavLight />
    <JournalHero />
    <JournalFeatured />
    <JournalGrid />
    <NewsletterStrip />
    <Footer />
  </div>
);

/* ============================================================ */
/* ABOUT                                                          */
/* ============================================================ */

const TEAM = [
  { name: 'Saleem Karim', role: 'Senior Mountain Guide · K2 lead', from: 'Shimshal · Born 1965', body: 'Has crossed the Baltoro 84 times since 1986. Speaks Wakhi, Burushaski, Urdu, English, basic Mandarin. Featured in the 2019 NatGeo documentary "Snow Mountain".', photo: ND_PHOTOS.team1 },
  { name: 'Saba Aleem', role: 'Trip Coordinator · WhatsApp lead', from: 'Gilgit · Joined 2017', body: 'The voice on the other end of your WhatsApp messages. Tour Operations Diploma, Beaconhouse 2014. Has personally coordinated 312 trips.', photo: ND_PHOTOS.team2 },
  { name: 'Hassan Ali', role: 'Founder · Director of Operations', from: 'Hunza · Founded ND in 2014', body: 'Grew up in Karimabad. MSc in Sustainable Tourism, Edinburgh 2010. Started Northern Dreamscape with two jeeps and one guide. Now eleven of each.', photo: ND_PHOTOS.team3 },
];

const AboutHero = () => (
  <section style={{ background: 'var(--ink)', color: 'var(--bone)', position: 'relative', minHeight: 720, padding: '0 56px' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.45, backgroundImage: `url(${ND_PHOTOS.ridge})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,31,36,0.7) 0%, var(--ink) 90%)' }} />
    <NavDark />
    <div className="container-wide" style={{ position: 'relative', paddingTop: 220, paddingBottom: 120 }}>
      <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 30 }}>About Northern Dreamscape · Est. Karimabad, 2014</div>
      <h1 style={{ fontSize: 120, lineHeight: 0.92, color: 'var(--bone)', maxWidth: 1100, letterSpacing: '-0.02em' }}>
        We were<br/>
        <em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>born here.</em>
      </h1>
      <p style={{ fontSize: 22, opacity: 0.85, maxWidth: 720, lineHeight: 1.5, marginTop: 40 }}>
        Northern Dreamscape was started by a Hunzakut, runs out of an office in Gilgit, and is staffed almost entirely by people whose first sight of these mountains was through a nursery window.
      </p>
    </div>
  </section>
);

const Timeline = () => (
  <section style={{ background: 'var(--bone)', padding: '140px 56px' }}>
    <div className="container">
      <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>Eleven years</div>
      <h2 style={{ fontSize: 60, lineHeight: 1.05, marginBottom: 80 }}>The short version of <em style={{ fontStyle: 'italic' }}>a long road.</em></h2>
      <div>
        {[
          ['2014', 'Founded in Karimabad', 'Hassan Ali leaves a hotel-chain job in Lahore and starts ND with two jeeps, one guide, and a borrowed office above the Karimabad bazaar.'],
          ['2016', 'First international trip', 'A group of seven from Germany walks to Fairy Meadows. Word of mouth carries us through 2017.'],
          ['2018', 'PTDC licensure & K2 permit', 'Pakistan Tourism Development Corporation full license. Our first Baltoro expedition runs in July.'],
          ['2020', 'Pandemic year', 'Zero international trips. We move our nine senior guides onto a basic monthly salary for 14 months. None leaves the company.'],
          ['2022', 'UK FCDO de-restricts GB', 'Our international bookings 4× year-on-year. We move into the current Gilgit office and add four new guides.'],
          ['2024', 'NatGeo & The Guardian', '"Snow Mountain" runs on National Geographic Channel. Guardian Travel names ND in their top-10 mountain operators worldwide.'],
          ['2026', 'Today', '1,284 travelers served. 22 trips on the 2026 catalogue. Same nine senior guides. Same office in Jutial, Gilgit.'],
        ].map(([y, t, b]) => (
          <div key={y} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 2fr', gap: 50, padding: '32px 0', borderTop: '1px solid var(--line)' }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 36, fontStyle: 'italic', color: 'var(--ember)' }}>{y}</div>
            <h4 style={{ fontSize: 22, lineHeight: 1.2, fontFamily: 'var(--ui)', fontWeight: 600 }}>{t}</h4>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--muted-ink)', textWrap: 'pretty' }}>{b}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TeamGrid = () => (
  <section style={{ background: 'var(--teal-800)', color: 'var(--bone)', padding: '140px 56px' }}>
    <div className="container-wide">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, marginBottom: 80 }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 24 }}>The team</div>
          <h2 style={{ fontSize: 60, lineHeight: 1.05, color: 'var(--bone)' }}>The people<br/>you'll <em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>actually meet.</em></h2>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.65, opacity: 0.85, paddingTop: 20, maxWidth: 540 }}>
          We're eleven people. Three meet you on the road, three keep the office running, and five are the guides whose photos hang on our wall. There is no call center.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {TEAM.map(p => (
          <div key={p.name}>
            <div className="photo" style={{ height: 380, backgroundImage: `url(${p.photo})`, marginBottom: 24 }} />
            <div className="mono" style={{ color: 'var(--sand)', marginBottom: 10 }}>{p.role.toUpperCase()}</div>
            <h4 style={{ fontSize: 28, color: 'var(--bone)', marginBottom: 8, fontFamily: 'var(--display)', fontWeight: 500 }}>{p.name}</h4>
            <div className="mono" style={{ opacity: 0.6, marginBottom: 14, fontSize: 10 }}>{p.from.toUpperCase()}</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, opacity: 0.82, textWrap: 'pretty' }}>{p.body}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 60, paddingTop: 30, borderTop: '1px solid var(--line-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="mono" style={{ opacity: 0.7 }}>+ 8 OTHER FULL-TIME COLLEAGUES · DRIVERS, COOKS, OFFICE</div>
        <Link href="/contact" className="mono" style={{ color: 'var(--sand)', borderBottom: '1px solid var(--sand)', paddingBottom: 4 }}>MEET THEM ALL →</Link>
      </div>
    </div>
  </section>
);

const PressStrip = () => (
  <section style={{ background: 'var(--bone)', padding: '120px 56px' }}>
    <div className="container">
      <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>Press & recognition</div>
      <h2 style={{ fontSize: 52, lineHeight: 1.05, marginBottom: 60 }}>What others have said.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 40, paddingTop: 40, borderTop: '1px solid var(--ink)' }}>
        {[
          ['NATIONAL GEOGRAPHIC TRAVELLER', '"The most thoughtful small-group operator in Pakistan."', '2024'],
          ['THE GUARDIAN', '"Top 10 mountain operators worldwide for the second year running."', '2024'],
          ['BBC TRAVEL', '"What other tour companies could learn from Northern Dreamscape."', '2023'],
          ['GEO MAGAZINE', '"Cover feature on the Concordia route, photographed with our Aug 2022 trip."', '2023'],
          ['DAWN', '"The Hunzakut who put Gilgit-Baltistan on the global tourism map."', '2022'],
        ].map(([m, q, y]) => (
          <div key={m} style={{ paddingTop: 30 }}>
            <div className="mono" style={{ color: 'var(--ember)', marginBottom: 16, fontSize: 9.5 }}>{m}</div>
            <p style={{ fontFamily: 'var(--display)', fontSize: 20, lineHeight: 1.3, fontStyle: 'italic', marginBottom: 16, textWrap: 'pretty' }}>{q}</p>
            <div className="mono" style={{ color: 'var(--muted-ink)', fontSize: 9 }}>{y}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutPage = () => (
  <div className="nd" data-screen-label="06 About">
    <AboutHero />
    <Timeline />
    <TeamGrid />
    <PressStrip />
    <FinalCTA />
    <Footer />
  </div>
);

/* ============================================================ */
/* CONTACT                                                        */
/* ============================================================ */

const ContactHero = () => (
  <section style={{ background: 'var(--bone)', padding: '80px 56px 0' }}>
    <div className="container-wide">
      <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 28 }}>Talk to us</div>
      <h1 style={{ fontSize: 108, lineHeight: 0.95, letterSpacing: '-0.02em', maxWidth: 1100, marginBottom: 30 }}>
        Tell us your dates.<br/>
        <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>We'll do the rest.</em>
      </h1>
      <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--muted-ink)', maxWidth: 720 }}>
        WhatsApp is fastest — usually under four hours. Email works too. We answer seven days a week.
      </p>
    </div>
  </section>
);

const ContactSplit = () => (
  <section style={{ background: 'var(--bone)', padding: '80px 56px' }}>
    <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--line)' }}>
      {/* WhatsApp side */}
      <div style={{ padding: '60px 56px', borderRight: '1px solid var(--line)', background: 'var(--teal-800)', color: 'var(--bone)' }}>
        <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 24 }}>Recommended · Fastest reply</div>
        <h3 style={{ fontSize: 44, lineHeight: 1.05, color: 'var(--bone)', marginBottom: 22 }}>Message us<br/>on <em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>WhatsApp.</em></h3>
        <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.85, marginBottom: 30, maxWidth: 440 }}>
          Saba and Faisal split the inbox between them. You'll hear back from a real human, usually within 1–4 hours.
        </p>
        <a className="btn btn-ember btn-lg" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} /> +92 581 245 8910</a>
        <div style={{ marginTop: 40, paddingTop: 30, borderTop: '1px solid var(--line-light)' }}>
          <div className="mono" style={{ opacity: 0.6, marginBottom: 14 }}>RESPONSE TIMES (90TH PERCENTILE)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 36 }}>1h 42m</div>
              <div className="mono" style={{ opacity: 0.6, fontSize: 9 }}>WEEKDAYS · GMT+5</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 36 }}>4h 18m</div>
              <div className="mono" style={{ opacity: 0.6, fontSize: 9 }}>WEEKENDS</div>
            </div>
          </div>
        </div>
      </div>
      {/* Form side */}
      <div style={{ padding: '60px 56px', background: 'var(--bone)' }}>
        <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>Or send the form</div>
        <h3 style={{ fontSize: 44, lineHeight: 1.05, marginBottom: 30 }}>The slower way.<br/><em style={{ fontStyle: 'italic' }}>Equally good.</em></h3>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {[
            ['Your name', 'text'],
            ['Email address', 'email'],
            ['Country / city', 'text'],
            ['Where you\'d like to go', 'text'],
            ['Rough dates', 'text'],
          ].map(([l, t]) => (
            <div key={l}>
              <label className="mono" style={{ color: 'var(--muted-ink)', display: 'block', marginBottom: 8, fontSize: 9 }}>{l.toUpperCase()}</label>
              <input type={t} style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--ink)', padding: '8px 0', background: 'transparent', fontFamily: 'var(--ui)', fontSize: 16, outline: 'none' }} />
            </div>
          ))}
          <div>
            <label className="mono" style={{ color: 'var(--muted-ink)', display: 'block', marginBottom: 8, fontSize: 9 }}>TELL US ANYTHING ELSE</label>
            <textarea rows="3" style={{ width: '100%', border: 'none', borderBottom: '1px solid var(--ink)', padding: '8px 0', background: 'transparent', fontFamily: 'var(--ui)', fontSize: 16, outline: 'none', resize: 'none' }} />
          </div>
          <button type="button" className="btn btn-ink btn-lg" style={{ alignSelf: 'flex-start', marginTop: 14 }}>Send it through <Icon name="arrow" size={14} /></button>
        </form>
      </div>
    </div>
  </section>
);

const Offices = () => (
  <section style={{ background: 'var(--bone-2)', padding: '120px 56px' }}>
    <div className="container">
      <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>Find us</div>
      <h2 style={{ fontSize: 60, lineHeight: 1.05, marginBottom: 60 }}>Two offices.<br/><em style={{ fontStyle: 'italic' }}>One in the mountains.</em></h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        {[
          { city: 'Gilgit', tag: 'Head office', addr: 'Plot 14, Jutial Road\nGilgit · Gilgit-Baltistan\n15100 · Pakistan', tel: '+92 581 245 8910', hours: 'Sun – Thu · 09:00–18:00\nFri · 09:00–13:00\nSat · by appointment', photo: ND_PHOTOS.skardu },
          { city: 'Islamabad', tag: 'Pickup & briefing', addr: 'Office 4-B, Margalla Towers\nF-7/4 · Islamabad\n44000 · Pakistan', tel: '+92 51 287 4419', hours: 'Mon – Fri · 10:00–18:00\nWeekends · airport pickup only', photo: ND_PHOTOS.village },
        ].map(o => (
          <div key={o.city}>
            <div className="photo" style={{ height: 340, backgroundImage: `url(${o.photo})`, marginBottom: 30 }} />
            <div className="mono" style={{ color: 'var(--ember)', marginBottom: 14 }}>{o.tag.toUpperCase()}</div>
            <h3 style={{ fontSize: 40, marginBottom: 24 }}>{o.city}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
              <div>
                <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 10, fontSize: 9 }}>ADDRESS</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{o.addr}</p>
              </div>
              <div>
                <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 10, fontSize: 9 }}>HOURS</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{o.hours}</p>
              </div>
            </div>
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--line)', fontFamily: 'var(--display)', fontSize: 22 }}>{o.tel}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactPage = () => (
  <div className="nd" data-screen-label="07 Contact">
    <NavLight />
    <ContactHero />
    <ContactSplit />
    <Offices />
    <Footer />
  </div>
);

const JournalDetailPage = ({ articleId = 'a3' }) => {
  const a = ARTICLES.find(article => article.id === articleId) || ARTICLES[2];
  const related = ARTICLES.filter(article => article.id !== a.id).slice(0, 3);

  return (
    <div className="nd" data-screen-label="Journal Detail">
      <NavLight />
      <section style={{ background: 'var(--bone)', padding: '80px 56px 70px' }}>
        <div className="container">
          <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 28 }}>
            <Link href="/journal">← JOURNAL</Link> · {a.cat.toUpperCase()} · {a.date} · {a.read} READ
          </div>
          <h1 style={{ fontSize: 96, lineHeight: 0.98, letterSpacing: '-0.02em', maxWidth: 1060, marginBottom: 32 }}>
            {a.title}
          </h1>
          <p style={{ fontSize: 21, lineHeight: 1.55, color: 'var(--muted-ink)', maxWidth: 760, textWrap: 'pretty' }}>{a.blurb}</p>
        </div>
      </section>

      <section style={{ background: 'var(--bone)', padding: '0 56px 100px' }}>
        <div className="container-wide">
          <div className="photo" style={{ height: 640, backgroundImage: `url(${a.photo})` }} />
        </div>
      </section>

      <article style={{ background: 'var(--bone)', padding: '0 56px 120px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 90, alignItems: 'flex-start' }}>
          <aside style={{ position: 'sticky', top: 40 }}>
            <div className="mono" style={{ color: 'var(--ember)', marginBottom: 18 }}>FIELD NOTE</div>
            <div style={{ borderTop: '1px solid var(--ink)', paddingTop: 18 }}>
              <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 8 }}>AUTHOR</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 24 }}>Hassan Ali</div>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18, marginTop: 18 }}>
              <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 8 }}>CATEGORY</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 24 }}>{a.cat}</div>
            </div>
          </aside>
          <div>
            {[
              a.blurb,
              'The north rewards travelers who leave space in the schedule. Roads pause for weather, light changes by the minute, and the best moments usually arrive between the itinerary lines.',
              'Our guides write these notes from the same roads they drive every season: what changed, what stayed reliable, and what we would tell a friend before they packed.',
              'Use this as a practical starting point, then speak to our team before you lock dates. Conditions in Gilgit-Baltistan are generous, but they are never generic.'
            ].map((p, i) => (
              <p key={i} style={{ fontSize: i === 0 ? 22 : 17, lineHeight: i === 0 ? 1.55 : 1.85, marginBottom: 28, color: i === 0 ? 'var(--ink)' : 'var(--muted-ink)', textWrap: 'pretty' }}>{p}</p>
            ))}
            <blockquote style={{ margin: '54px 0', padding: '34px 0', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
              <p className="display italic" style={{ fontSize: 38, lineHeight: 1.22, color: 'var(--ember)', textWrap: 'pretty' }}>
                "A mountain journey gets better when the operator is honest about the slow parts."
              </p>
            </blockquote>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--muted-ink)', textWrap: 'pretty' }}>
              That is the principle behind every article here: no overpromising, no postcard-only version of the road, and no hiding the practical details that make a trip work.
            </p>
          </div>
        </div>
      </article>

      <section style={{ background: 'var(--bone-2)', padding: '100px 56px' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44 }}>
            <h2 style={{ fontSize: 48, lineHeight: 1.05 }}>More from<br/><em style={{ fontStyle: 'italic' }}>the road.</em></h2>
            <Link href="/journal" className="mono" style={{ color: 'var(--ember)', borderBottom: '1px solid var(--ember)', paddingBottom: 4 }}>BACK TO JOURNAL →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {related.map(item => (
              <Link key={item.id} href={`/journal/${item.id}`} className="pkg-card" style={{ display: 'block' }}>
                <div className="photo" style={{ height: 260, backgroundImage: `url(${item.photo})` }} />
                <div style={{ paddingTop: 22 }}>
                  <div className="mono" style={{ color: 'var(--ember)', marginBottom: 12 }}>{item.cat.toUpperCase()} · {item.date}</div>
                  <h4 style={{ fontSize: 24, lineHeight: 1.15, marginBottom: 10 }}>{item.title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted-ink)' }}>{item.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterStrip />
      <Footer />
    </div>
  );
};



export { HomePage, PackagesPage, DetailPage, DestinationsPage, DestinationDetailPage, JournalPage, JournalDetailPage, AboutPage, ContactPage };

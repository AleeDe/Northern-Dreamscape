import Link from 'next/link'
import {servicesByTypeQuery, featuredServicesQuery} from '@/lib/sanity/queries'
import {sanityFetch} from '@/lib/sanity/fetch'
import {NavLight, NavDark, Footer} from '@/components/site'
import {BookNowButton} from '@/components/booking-modal'

const WHATSAPP = 'https://wa.me/925812458910?text=Hi%20Northern%20Dreamscape%2C%20I%20want%20to%20plan%20a%20trip.'
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fit=crop'

function imgUrl(item) {
  return item?.heroImage?.asset?.url || item?.portrait?.asset?.url || FALLBACK_IMG
}

const serviceTypes = [
  {title: 'Accommodation', type: 'accommodation', href: '/accommodation'},
  {title: 'Vehicles', type: 'vehicle', href: '/vehicles'},
  {title: 'Tour Guides', type: 'guide', href: '/guides'},
  {title: 'Restaurants', type: 'restaurant', href: '/restaurants'},
]

function priceLabel(pricing) {
  if (!pricing?.priceFrom) return 'Custom quote'
  const unit = {
    per_person: 'person',
    per_day: 'day',
    per_night: 'night',
    per_route: 'route',
    custom_quote: 'quote',
  }[pricing.unit] || 'booking'
  return `${pricing.currency || 'PKR'} ${pricing.priceFrom.toLocaleString()} / ${unit}`
}

function imageUrl(item) {
  return item?.heroImage?.asset?.url || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fit=crop'
}

export function SanityNotConfigured() {
  return (
    <div className="nd" style={{ minHeight: '100vh', background: 'var(--bone)', padding: '80px 56px' }}>
      <div className="container">
        <h1 style={{ fontSize: 64, lineHeight: 1, marginBottom: 24 }}>Sanity is ready.</h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--muted-ink)', maxWidth: 720 }}>
          Add your Sanity project values to `.env.local`, then import `sanity/seed.ndjson`. This page is intentionally not falling back to old hardcoded package data.
        </p>
      </div>
    </div>
  )
}

export function SanityPackagesPage({packages}) {
  if (!packages) return <SanityNotConfigured />

  return (
    <div className="nd">
      <NavLight activePath="/packages" />
      <section className="nd-catalog-hero" style={{ background: 'var(--bone)', padding: '64px 56px 44px' }}>
        <div className="container-wide">
          <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>Ready routes, private planning</div>
          <h1 style={{ fontSize: 88, lineHeight: 0.96, marginBottom: 24 }}>
            Pick the route.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>We handle the hard parts.</em>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--muted-ink)', maxWidth: 760 }}>
            Compare days, difficulty, route style and starting price quickly. When one feels right, open the detail page or ask for a custom version on WhatsApp.
          </p>
        </div>
      </section>

      <section className="nd-package-list" style={{ background: 'var(--bone)', padding: '20px 56px 96px' }}>
        <div className="container-wide" style={{ display: 'grid', gap: 22 }}>
          {packages.map((pkg) => (
            <Link key={pkg._id} href={`/packages/${pkg.slug}`} className="pkg-card nd-decision-card" style={{ display: 'grid', gridTemplateColumns: '380px minmax(0, 1fr)', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
              <div className="photo" style={{ minHeight: 330, backgroundImage: `url(${imageUrl(pkg)})` }} />
              <div style={{ padding: 30, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="mono" style={{ color: 'var(--teal-700)', marginBottom: 14 }}>
                    {pkg.region} · {pkg.days} DAYS · {pkg.difficulty}
                  </div>
                  <h2 style={{ fontSize: 38, lineHeight: 1.05, marginBottom: 12 }}>{pkg.title}</h2>
                  <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--muted-ink)', marginBottom: 22 }}>{pkg.summary || pkg.subtitle}</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {(pkg.highlights || []).slice(0, 4).map((item) => (
                      <span key={item} className="mono" style={{ border: '1px solid var(--line)', padding: '8px 10px', color: 'var(--muted-ink)' }}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="nd-price-rail" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--line)', paddingTop: 22, marginTop: 28 }}>
                  <div>
                    <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 5 }}>FROM</div>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 30 }}>{priceLabel(pkg.pricing)}</div>
                  </div>
                  <span className="btn btn-ember">View details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="nd-planner-band" style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '64px 56px' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 28 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 16 }}>Still comparing?</div>
            <h2 style={{ color: 'var(--bone)', fontSize: 46, lineHeight: 1.05 }}>
              Send us your dates and budget.<br />
              <em style={{ color: 'var(--sand)', fontStyle: 'italic' }}>We will shortlist the best route.</em>
            </h2>
          </div>
          <a className="btn btn-ember btn-lg" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
        </div>
      </section>

      <SanityServicesPreview />
      <Footer />
    </div>
  )
}

function MiniServiceCard({item, label}) {
  if (!item) return null
  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--bone)', padding: 18 }}>
      <div className="mono" style={{ color: 'var(--ember)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>{item.name || item.title}</div>
      <div style={{ fontSize: 13, color: 'var(--muted-ink)', lineHeight: 1.5 }}>
        {item.cuisines?.join(', ') || item.category || item.type || item.location?.city || priceLabel(item.pricing)}
      </div>
    </div>
  )
}

const PLACE_ICONS = { mountain:'⛰️', lake:'🏞️', valley:'🌄', fort:'🏯', village:'🏘️', pass:'🛤️', glacier:'🧊', park:'🌿', other:'📍' }

const PKG_SERVICE_SECTIONS = [
  { key: 'accommodations', label: 'Accommodation', icon: '🏨', href: '/accommodation' },
  { key: 'vehicles',       label: 'Vehicles',       icon: '🚙', href: '/vehicles'      },
  { key: 'guides',         label: 'Tour Guides',    icon: '🧭', href: '/guides'        },
  { key: 'restaurants',    label: 'Restaurants',    icon: '🍽️', href: '/restaurants'   },
]

export function SanityPackageDetailPage({pkg}) {
  if (!pkg) return <SanityNotConfigured />

  // Smart resolve: use package's own links, fallback to destination's links
  const dest = pkg.destination
  const resolve = (key) => {
    const own = pkg[key] || []
    const fromDest = dest?.[key] || []
    return own.length ? own : fromDest
  }

  const accommodations = resolve('accommodations')
  const vehicles       = resolve('vehicles')
  const guides         = resolve('guides')
  const restaurants    = resolve('restaurants')
  const landmarks      = (pkg.landmarks?.length ? pkg.landmarks : dest?.landmarks) || []

  const hasAnyService = accommodations.length || vehicles.length || guides.length || restaurants.length

  return (
    <div className="nd">
      <NavLight activePath="/packages" />

      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: 720, color: 'var(--bone)', display: 'flex', alignItems: 'end', padding: '80px 56px 80px', overflow: 'hidden' }}>
        <div className="photo" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imageUrl(pkg)})` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,22,26,0.86), rgba(8,22,26,0.45), rgba(8,22,26,0.2))' }} />
        <div className="container-wide" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 24 }}>
            {pkg.region} · {pkg.season}
            {dest && <> · <Link href={`/destinations/${dest.slug}`} style={{ color: 'var(--sand)', textDecoration: 'underline', textDecorationColor: 'rgba(245,239,228,0.4)' }}>{dest.name}</Link></>}
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 104px)', lineHeight: 0.94, color: 'var(--bone)', maxWidth: 980, marginBottom: 26 }}>{pkg.title}</h1>
          <p style={{ fontSize: 21, lineHeight: 1.55, maxWidth: 720, opacity: 0.9 }}>{pkg.summary || pkg.subtitle}</p>
        </div>
      </section>

      {/* ── Sticky booking bar ── */}
      <section style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '22px 56px', position: 'sticky', top: 0, zIndex: 20 }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', fontSize: 14 }}>
            <span>{pkg.days} days · {pkg.nights} nights</span>
            <span>{pkg.difficulty}</span>
            {pkg.rating && <span>★ {pkg.rating} ({pkg.reviewCount} reviews)</span>}
          </div>
          <BookNowButton serviceName={pkg.title} serviceType="package" serviceSlug={pkg.slug} serviceId={pkg._id} label="Book This Package" />
        </div>
      </section>

      {/* ── Overview + mini service cards ── */}
      <section style={{ background: 'var(--bone)', padding: '96px 56px' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 20 }}>Package overview</div>
            <h2 style={{ fontSize: 54, lineHeight: 1.05, marginBottom: 24 }}>What's included<br /><em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>in this journey.</em></h2>
            <p style={{ color: 'var(--muted-ink)', lineHeight: 1.8, marginBottom: 28 }}>{pkg.summary || pkg.subtitle}</p>
            {dest && (
              <div style={{ padding: '16px 20px', background: 'var(--bone-2)', border: '1px solid var(--line)', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ember)', marginBottom: 4 }}>DESTINATION</div>
                  <Link href={`/destinations/${dest.slug}`} style={{ fontWeight: 700, fontSize: 17, color: 'var(--ink)', textDecoration: 'none' }}>{dest.name} →</Link>
                  {dest.tagline && <p style={{ fontSize: 13, color: 'var(--muted-ink)', margin: '4px 0 0' }}>{dest.tagline}</p>}
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {accommodations.slice(0, 2).map(i => <MiniServiceCard key={i._id} item={i} label="🏨 Accommodation" />)}
            {vehicles.slice(0, 2).map(i => <MiniServiceCard key={i._id} item={i} label="🚙 Vehicle" />)}
            {guides.slice(0, 2).map(i => <MiniServiceCard key={i._id} item={i} label="🧭 Guide" />)}
            {restaurants.slice(0, 2).map(i => <MiniServiceCard key={i._id} item={i} label="🍽️ Restaurant" />)}
          </div>
        </div>
      </section>

      {/* ── Itinerary ── */}
      {pkg.itineraryDays?.length > 0 && (
        <section style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '110px 56px' }}>
          <div className="container-wide">
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 22 }}>Day by day</div>
              <h2 style={{ fontSize: 'clamp(40px, 5vw, 76px)', lineHeight: 0.98, color: 'var(--bone)' }}>Your itinerary,<br /><em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>day by day.</em></h2>
            </div>
            <div style={{ display: 'grid', gap: 26 }}>
              {pkg.itineraryDays.map((day) => (
                <div key={`${day.dayNumber}-${day.title}`} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 28, borderTop: '1px solid var(--line-light)', paddingTop: 28 }}>
                  <div>
                    <div className="mono" style={{ color: 'var(--sand)', marginBottom: 12 }}>DAY {String(day.dayNumber).padStart(2, '0')}</div>
                    {(day.routeFrom || day.routeTo) && <div style={{ color: 'var(--muted-bone)', lineHeight: 1.6 }}>{day.routeFrom} → {day.routeTo}</div>}
                    {(day.distanceKm || day.travelTime) && <div style={{ color: 'var(--muted-bone)', marginTop: 8, fontSize: 13 }}>{day.distanceKm ? `${day.distanceKm} km` : ''} {day.travelTime ? `· ${day.travelTime}` : ''}</div>}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.08, color: 'var(--bone)', marginBottom: 12 }}>{day.title}</h3>
                    <p style={{ color: 'var(--muted-bone)', lineHeight: 1.75, marginBottom: 18 }}>{day.summary}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                      <MiniServiceCard item={day.accommodation} label="🏨 Stay" />
                      <MiniServiceCard item={day.vehicle} label="🚙 Vehicle" />
                      <MiniServiceCard item={day.guide} label="🧭 Guide" />
                      <MiniServiceCard item={day.restaurants?.[0]} label="🍽️ Meal" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Famous Landmarks ── */}
      {landmarks.length > 0 && (
        <section style={{ background: 'var(--bone)', padding: '80px 56px' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 36 }}>
              <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 14 }}>
                {dest ? `Places you'll visit in ${dest.name}` : 'Famous places on this route'}
              </div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, margin: 0 }}>
                Must-see <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>landmarks.</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 22 }}>
              {landmarks.map((lm) => (
                <div key={lm._id} style={{ background: 'var(--bone-2)', border: '1px solid var(--line)', overflow: 'hidden' }}>
                  {lm.heroImage?.asset?.url && (
                    <div className="photo" style={{ height: 190, backgroundImage: `url(${lm.heroImage.asset.url})` }} />
                  )}
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <h3 style={{ fontSize: 18, lineHeight: 1.2, margin: 0 }}>{PLACE_ICONS[lm.category] || '📍'} {lm.name}</h3>
                      {lm.elevation && <span className="mono" style={{ fontSize: 10, color: 'var(--muted-ink)', flexShrink: 0, marginLeft: 8 }}>{lm.elevation}m</span>}
                    </div>
                    {lm.description && <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--muted-ink)', margin: '0 0 10px' }}>{lm.description}</p>}
                    {lm.mapsLink && (
                      <a href={lm.mapsLink} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 10, color: 'var(--teal-700)', letterSpacing: '0.1em' }}>
                        VIEW ON MAP →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Included Services ── */}
      {hasAnyService && (
        <section style={{ background: 'var(--bone-2)', padding: '80px 56px' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 40 }}>
              <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 14 }}>Everything arranged for you</div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, margin: 0 }}>
                Services <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>included.</em>
              </h2>
            </div>
            {PKG_SERVICE_SECTIONS.map(({ key, label, icon, href }) => {
              const items = key === 'accommodations' ? accommodations : key === 'vehicles' ? vehicles : key === 'guides' ? guides : restaurants
              if (!items.length) return null
              return (
                <div key={key} style={{ marginBottom: 40 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--line)' }}>
                    <h3 style={{ margin: 0, fontSize: 20 }}>{icon} {label}</h3>
                    <Link href={href} className="mono" style={{ fontSize: 10, color: 'var(--ember)', letterSpacing: '0.14em' }}>VIEW ALL →</Link>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                    {items.map(item => (
                      <Link key={item._id} href={`${href}/${item.slug}`} className="pkg-card"
                        style={{ display: 'block', background: 'var(--bone)', color: 'inherit', textDecoration: 'none' }}>
                        <div className="photo" style={{ height: 160, backgroundImage: `url(${item.portrait?.asset?.url || item.heroImage?.asset?.url || FALLBACK_IMG})` }} />
                        <div style={{ padding: '14px 16px' }}>
                          <div className="mono" style={{ color: 'var(--ember)', fontSize: 10, marginBottom: 5 }}>
                            {item.cuisines?.join(' · ') || item.category || item.type || item.location?.city || label}
                          </div>
                          <h4 style={{ fontSize: 16, lineHeight: 1.25, marginBottom: 6 }}>{item.name || item.title}</h4>
                          {item.shortDescription && <p style={{ fontSize: 12, color: 'var(--muted-ink)', lineHeight: 1.5, marginBottom: 10 }}>{item.shortDescription}</p>}
                          <span className="mono" style={{ fontSize: 10, color: 'var(--teal-700)' }}>VIEW DETAILS →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      {pkg.faqs?.length > 0 && (
        <section style={{ background: 'var(--bone)', padding: '80px 56px' }}>
          <div className="container" style={{ display: 'grid', gap: 18 }}>
            <h2 style={{ fontSize: 48, lineHeight: 1.05, marginBottom: 22 }}>Questions before booking.</h2>
            {pkg.faqs.map((faq) => (
              <div key={faq.question} style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>{faq.question}</h3>
                <p style={{ color: 'var(--muted-ink)', lineHeight: 1.7 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export async function SanityServicesPreview() {
  const groups = await Promise.all(
    serviceTypes.map(async (group) => ({
      ...group,
      items: await sanityFetch({query: servicesByTypeQuery, params: {type: group.type}}) || [],
    }))
  )

  return (
    <section style={{ background: 'var(--bone-2)', padding: '96px 56px' }}>
      <div className="container-wide">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 42 }}>
          <h2 style={{ fontSize: 56, lineHeight: 1.05 }}>Book individual<br /><em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>travel services.</em></h2>
          <p style={{ maxWidth: 460, color: 'var(--muted-ink)', lineHeight: 1.7 }}>These are separate Sanity documents, not package text. You can feature any item and attach it to packages.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
          {groups.map((group) => (
            <div key={group.type} style={{ background: 'var(--bone)', padding: 22, border: '1px solid var(--line)' }}>
              <div className="mono" style={{ color: 'var(--ember)', marginBottom: 12 }}>{group.title}</div>
              {(group.items || []).slice(0, 2).map((item) => (
                <Link key={item._id} href={`${group.href}/${item.slug}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none', padding: '14px 0', borderTop: '1px solid var(--line)' }}>
                  <div style={{ fontWeight: 700, marginBottom: 5 }}>{item.name || item.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted-ink)' }}>
                    {item.cuisines?.join(', ') || item.category || item.type || item.location?.city}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SanityServiceListingPage({title, eyebrow, description, items, servicePath}) {
  if (!items) return <SanityNotConfigured />

  return (
    <div className="nd">
      <NavLight />
      <section style={{ background: 'var(--bone)', padding: '60px 56px 56px' }}>
        <div className="container-wide">
          <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>{eyebrow}</div>
          <h1 style={{ fontSize: 'clamp(52px, 7vw, 86px)', lineHeight: 0.96, marginBottom: 24 }}>{title}</h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--muted-ink)', maxWidth: 760 }}>{description}</p>
        </div>
      </section>

      <section style={{ background: 'var(--bone)', padding: '20px 56px 110px' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
          {items.map((item) => {
            const heroSrc = item.heroImage?.asset?.url || item.portrait?.asset?.url || FALLBACK_IMG
            const galleryImgs = (item.gallery || []).filter(g => g?.asset?.url)
            return (
              <Link key={item._id} href={`${servicePath}/${item.slug}`} className="pkg-card" style={{ background: 'var(--bone-2)', display: 'block', color: 'inherit', textDecoration: 'none', position: 'relative' }}>
                {/* Featured badge */}
                {item.featured && (
                  <div className="mono" style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, background: 'var(--ember)', color: 'var(--bone)', fontSize: 10, padding: '5px 10px' }}>FEATURED</div>
                )}
                {/* Hero image */}
                <div className="photo" style={{ height: 260, backgroundImage: `url(${heroSrc})` }} />
                {/* Mini gallery strip */}
                {galleryImgs.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${galleryImgs.length}, 1fr)`, gap: 3 }}>
                    {galleryImgs.map((img, i) => (
                      <div key={img.asset?._id || i} className="photo" style={{ height: 70, backgroundImage: `url(${img.asset.url})` }} />
                    ))}
                  </div>
                )}
                <div style={{ padding: 24 }}>
                  <div className="mono" style={{ color: 'var(--ember)', marginBottom: 10, fontSize: 11 }}>
                    {item.cuisines?.join(' · ') || item.category || item.type || item.location?.city || 'Bookable service'}
                  </div>
                  <h2 style={{ fontSize: 26, lineHeight: 1.15, marginBottom: 10 }}>{item.name || item.title}</h2>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--muted-ink)', marginBottom: 16 }}>
                    {item.shortDescription || priceLabel(item.pricing)}
                  </p>
                  {/* Highlights */}
                  {item.highlights?.length > 0 && (
                    <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {item.highlights.slice(0, 3).map((h) => (
                        <div key={h} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'var(--muted-ink)' }}>
                          <span style={{ color: 'var(--teal-700)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Rating */}
                  {item.rating && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                      <span style={{ color: 'var(--ember)', fontSize: 14 }}>{'★'.repeat(Math.round(item.rating))}</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{item.rating}</span>
                      <span style={{ fontSize: 12, color: 'var(--muted-ink)' }}>({item.reviewCount || 0} reviews)</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', borderTop: '1px solid var(--line)', paddingTop: 16, marginTop: 4 }}>
                    <div>
                      <div className="mono" style={{ color: 'var(--muted-ink)', marginBottom: 4, fontSize: 10 }}>FROM</div>
                      <div style={{ fontFamily: 'var(--display)', fontSize: 22 }}>{priceLabel(item.pricing)}</div>
                    </div>
                    <span className="mono" style={{ color: 'var(--ember)', fontSize: 12 }}>VIEW →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      <Footer />
    </div>
  )
}

// ─── Service Detail Page (vehicle / accommodation / guide / restaurant) ───────

function StarRating({ rating, size = 16 }) {
  const full = Math.floor(rating || 0)
  const half = rating % 1 >= 0.5
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {[1,2,3,4,5].map((i) => (
        <span key={i} style={{ fontSize: size, color: i <= full ? '#e8822e' : (i === full + 1 && half ? '#e8822e' : '#d4c9b8'), opacity: i <= full ? 1 : (i === full + 1 && half ? 0.6 : 0.3) }}>★</span>
      ))}
    </span>
  )
}

export function SanityServiceDetailPage({ item, backHref, backLabel }) {
  if (!item) return (
    <div className="nd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <NavLight />
      <p style={{ color: 'var(--muted-ink)' }}>Not found.</p>
    </div>
  )

  const itemName = item.name || item.title || ''
  const itemSlug = item.slug || ''
  const itemType = item._type || 'package'
  const itemId   = item._id  || ''

  const chips = [
    item.type, item.category, item.location?.city, item.location?.region,
    ...(item.cuisines || []), ...(item.languages?.slice(0,2) || []),
  ].filter(Boolean)

  return (
    <div className="nd">
      <NavLight />

      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: 560, display: 'flex', alignItems: 'flex-end', padding: '60px 56px 72px', overflow: 'hidden', color: 'var(--bone)' }}>
        <div className="photo" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgUrl(item)})` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,22,26,0.92) 45%, rgba(8,22,26,0.35))' }} />
        <div className="container-wide" style={{ position: 'relative', width: '100%' }}>
          <Link href={backHref} className="mono" style={{ color: 'var(--sand)', fontSize: 12, display: 'inline-block', marginBottom: 24 }}>← {backLabel}</Link>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {chips.slice(0, 5).map((c) => (
              <span key={c} className="mono" style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 11px', fontSize: 11, color: 'var(--sand)', border: '1px solid rgba(255,255,255,0.18)' }}>{c}</span>
            ))}
          </div>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 84px)', lineHeight: 0.96, color: 'var(--bone)', maxWidth: 840, marginBottom: 20 }}>{item.name || item.title}</h1>
          {(item.shortDescription || item.role) && (
            <p style={{ fontSize: 18, lineHeight: 1.65, maxWidth: 600, opacity: 0.88, marginBottom: 24 }}>{item.shortDescription || item.role}</p>
          )}
          {/* Trust bar inside hero */}
          {item.rating && (
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <StarRating rating={item.rating} size={18} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>{item.rating}</span>
              <span style={{ fontSize: 14, opacity: 0.75 }}>{item.reviewCount || 0} verified reviews</span>
              {item.experienceYears && <span className="mono" style={{ fontSize: 12, opacity: 0.7 }}>{item.experienceYears} years experience</span>}
              {item.totalTours && <span className="mono" style={{ fontSize: 12, opacity: 0.7 }}>{item.totalTours} tours completed</span>}
            </div>
          )}
        </div>
      </section>

      {/* ── Sticky booking bar ── */}
      <section style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '16px 56px', position: 'sticky', top: 0, zIndex: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--display)', fontSize: 22 }}>{priceLabel(item.pricing)}</span>
            {item.rating && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <StarRating rating={item.rating} size={13} />
                <span className="mono" style={{ fontSize: 12 }}>{item.rating} · {item.reviewCount || 0} reviews</span>
              </span>
            )}
            {item.seats && <span className="mono" style={{ fontSize: 12 }}>{item.seats} seats</span>}
            {item.seatingCapacity && <span className="mono" style={{ fontSize: 12 }}>{item.seatingCapacity} seats</span>}
            {item.availability && <span className="mono" style={{ fontSize: 12 }}>{item.availability}</span>}
          </div>
          <BookNowButton serviceName={itemName} serviceType={itemType} serviceSlug={itemSlug} serviceId={itemId} label="Book Now" />
        </div>
      </section>

      {/* ── Main content + sidebar ── */}
      <section style={{ background: 'var(--bone)', padding: '72px 56px' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 60, alignItems: 'start' }}>

          {/* ── Left: content ── */}
          <div>

            {/* Highlights trust bullets */}
            {item.highlights?.length > 0 && (
              <div style={{ marginBottom: 48 }}>
                <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 18 }}>Why book this</div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {item.highlights.map((h) => (
                    <div key={h} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
                      <span style={{ color: 'var(--teal-700)', fontWeight: 700, fontSize: 18, lineHeight: 1, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 15, lineHeight: 1.55 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bio (guides) */}
            {item.bio?.length > 0 && (
              <div style={{ marginBottom: 44 }}>
                <h2 style={{ fontSize: 30, marginBottom: 20 }}>About this guide.</h2>
                {item.bio.map((block) => {
                  const text = block.children?.map((c) => c.text).join('') || ''
                  return <p key={block._key} style={{ fontSize: 16.5, lineHeight: 1.85, color: 'var(--muted-ink)', marginBottom: 16 }}>{text}</p>
                })}
              </div>
            )}

            {/* Specialties (guides) */}
            {item.specialties?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Specialties</h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {item.specialties.map((s) => (
                    <span key={s} className="mono" style={{ background: 'var(--bone-2)', border: '1px solid var(--line)', padding: '8px 14px', fontSize: 12 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications (guides) */}
            {item.certifications?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Certifications & qualifications</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {item.certifications.map((c) => (
                    <div key={c} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: 'rgba(0,120,100,0.06)', border: '1px solid rgba(0,120,100,0.18)' }}>
                      <span style={{ color: 'var(--teal-700)', fontWeight: 700, fontSize: 16 }}>✓</span>
                      <span style={{ fontSize: 14.5 }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities (accommodation) */}
            {item.amenities?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Amenities</h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {item.amenities.map((a) => (
                    <span key={a} style={{ display: 'flex', gap: 6, alignItems: 'center', border: '1px solid var(--line)', padding: '8px 14px', fontSize: 13, background: 'var(--bone-2)' }}>
                      <span style={{ color: 'var(--teal-700)' }}>✓</span> {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dietary options (restaurants) */}
            {item.dietaryOptions?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Dietary options</h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {item.dietaryOptions.map((d) => (
                    <span key={d} className="mono" style={{ background: 'rgba(0,120,100,0.07)', border: '1px solid rgba(0,120,100,0.2)', padding: '8px 14px', fontSize: 12, color: 'var(--teal-700)' }}>{d}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Menu highlights (restaurants) */}
            {item.menuHighlights?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Menu highlights</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {item.menuHighlights.map((m) => (
                    <div key={m} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
                      <span style={{ color: 'var(--ember)', fontSize: 14 }}>◆</span>
                      <span style={{ fontSize: 14 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Good for (restaurants) */}
            {item.goodFor?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Good for</h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {item.goodFor.map((g) => (
                    <span key={g} className="mono" style={{ background: 'var(--bone-2)', border: '1px solid var(--line)', padding: '8px 14px', fontSize: 12 }}>{g}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Routes served (vehicles) */}
            {item.routesAllowed?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Routes covered</h2>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {item.routesAllowed.map((r) => (
                    <span key={r} className="mono" style={{ border: '1px solid var(--line)', padding: '8px 14px', fontSize: 12 }}>{r}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicle features */}
            {item.features?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Vehicle features</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                  {item.features.map((f) => (
                    <div key={f.title} style={{ padding: '16px 18px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
                      <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{f.title}</div>
                      {f.description && <div style={{ fontSize: 13, color: 'var(--muted-ink)', lineHeight: 1.5 }}>{f.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meal types (restaurants) */}
            {item.mealTypes?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Meal service</h2>
                <div style={{ display: 'flex', gap: 10 }}>
                  {item.mealTypes.map((m) => (
                    <span key={m} style={{ padding: '10px 18px', background: 'var(--ink)', color: 'var(--bone)', fontSize: 13, fontFamily: 'var(--mono)' }}>{m}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Opening hours (restaurants) */}
            {item.openingHours?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>Opening hours</h2>
                <div style={{ border: '1px solid var(--line)', overflow: 'hidden' }}>
                  {item.openingHours.map((h, i) => (
                    <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 18px', background: i % 2 === 0 ? 'var(--bone-2)' : 'var(--bone)', borderBottom: i < item.openingHours.length - 1 ? '1px solid var(--line)' : 'none' }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{h.day}</span>
                      <span className="mono" style={{ fontSize: 13, color: 'var(--muted-ink)' }}>
                        {h.closed ? 'Closed' : `${h.openTime || ''} – ${h.closeTime || ''}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Included / Excluded ── */}
            {(item.included?.length > 0 || item.excluded?.length > 0) && (
              <div style={{ marginBottom: 44 }}>
                <h2 style={{ fontSize: 28, marginBottom: 20 }}>What's included</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {item.included?.length > 0 && (
                    <div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--teal-700)', marginBottom: 14 }}>INCLUDED</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {item.included.map((inc) => (
                          <div key={inc} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--teal-700)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                            <span style={{ fontSize: 14, lineHeight: 1.5 }}>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.excluded?.length > 0 && (
                    <div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--muted-ink)', marginBottom: 14 }}>NOT INCLUDED</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {item.excluded.map((exc) => (
                          <div key={exc} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <span style={{ color: '#b04030', flexShrink: 0, marginTop: 1 }}>✕</span>
                            <span style={{ fontSize: 14, color: 'var(--muted-ink)', lineHeight: 1.5 }}>{exc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Room types (accommodation) ── */}
            {item.roomTypes?.length > 0 && (
              <div style={{ marginBottom: 44 }}>
                <h2 style={{ fontSize: 28, marginBottom: 20 }}>Room types</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 18 }}>
                  {item.roomTypes.map((room) => (
                    <div key={room.name} style={{ padding: '22px 20px', border: '1px solid var(--line)', background: 'var(--bone-2)' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{room.name}</div>
                      {room.maxOccupancy && <div style={{ fontSize: 13, color: 'var(--muted-ink)', marginBottom: 6 }}>Up to {room.maxOccupancy} guests</div>}
                      {room.amenities?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                          {room.amenities.map((a) => <span key={a} style={{ fontSize: 11, color: 'var(--muted-ink)', background: 'var(--bone)', padding: '3px 8px', border: '1px solid var(--line)' }}>{a}</span>)}
                        </div>
                      )}
                      {room.pricePerNight && (
                        <div style={{ fontFamily: 'var(--display)', fontSize: 20, color: 'var(--ember)', marginTop: 10 }}>
                          PKR {room.pricePerNight.toLocaleString()}<span style={{ fontSize: 14, color: 'var(--muted-ink)' }}>/night</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Cancellation policy ── */}
            {item.cancellationPolicy && (
              <div style={{ marginBottom: 40, padding: '22px 24px', background: 'rgba(232,130,46,0.06)', border: '1px solid rgba(232,130,46,0.22)' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ember)', marginBottom: 10 }}>CANCELLATION POLICY</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--muted-ink)' }}>{item.cancellationPolicy}</p>
              </div>
            )}

            {/* ── House rules (accommodation) ── */}
            {item.houseRules?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 28, marginBottom: 16 }}>House rules</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {item.houseRules.map((rule) => (
                    <div key={rule} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, lineHeight: 1.55 }}>
                      <span style={{ color: 'var(--muted-ink)', flexShrink: 0 }}>—</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div style={{ position: 'sticky', top: 72, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Price card */}
            <div style={{ padding: '28px 24px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
              <div className="mono" style={{ color: 'var(--ember)', marginBottom: 8, fontSize: 11 }}>PRICE</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 30, marginBottom: 4 }}>{priceLabel(item.pricing)}</div>
              {item.pricing?.priceNote && <div style={{ fontSize: 13, color: 'var(--muted-ink)', lineHeight: 1.5, marginBottom: 18 }}>{item.pricing.priceNote}</div>}
              {item.rating && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                  <StarRating rating={item.rating} size={14} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{item.rating}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted-ink)' }}>({item.reviewCount || 0} reviews)</span>
                </div>
              )}
            </div>

            {/* Location */}
            {item.location && (
              <div style={{ padding: '18px 24px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
                <div className="mono" style={{ color: 'var(--ember)', marginBottom: 8, fontSize: 11 }}>LOCATION</div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{item.location.city || item.location.name}</div>
                {item.location.region && <div style={{ fontSize: 13, color: 'var(--muted-ink)' }}>{item.location.region}, Pakistan</div>}
                <a href={`https://maps.google.com/?q=${encodeURIComponent([item.location.name, item.location.city, 'Pakistan'].filter(Boolean).join(', '))}`} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 11, color: 'var(--teal-700)', display: 'inline-block', marginTop: 8 }}>View on Google Maps →</a>
              </div>
            )}

            {/* Vehicle specs */}
            {item.seats && (
              <div style={{ padding: '18px 24px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
                <div className="mono" style={{ color: 'var(--ember)', marginBottom: 12, fontSize: 11 }}>VEHICLE SPECS</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span style={{ color: 'var(--muted-ink)' }}>Seats</span><span style={{ fontWeight: 600 }}>{item.seats}</span></div>
                  {item.model && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span style={{ color: 'var(--muted-ink)' }}>Model</span><span style={{ fontWeight: 600 }}>{item.model}</span></div>}
                  {item.luggageCapacity && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span style={{ color: 'var(--muted-ink)' }}>Luggage</span><span style={{ fontWeight: 600 }}>{item.luggageCapacity}</span></div>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span style={{ color: 'var(--muted-ink)' }}>Driver</span><span style={{ fontWeight: 600, color: item.withDriver ? 'var(--teal-700)' : 'var(--muted-ink)' }}>{item.withDriver ? '✓ Included' : 'Not included'}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span style={{ color: 'var(--muted-ink)' }}>Fuel</span><span style={{ fontWeight: 600, color: item.fuelIncluded ? 'var(--teal-700)' : 'var(--muted-ink)' }}>{item.fuelIncluded ? '✓ Included' : 'Quoted by route'}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span style={{ color: 'var(--muted-ink)' }}>A/C</span><span style={{ fontWeight: 600, color: item.acAvailable ? 'var(--teal-700)' : 'var(--muted-ink)' }}>{item.acAvailable ? '✓ Yes' : 'No'}</span></div>
                </div>
              </div>
            )}

            {/* Check-in/out */}
            {(item.checkInTime || item.checkOutTime) && (
              <div style={{ padding: '18px 24px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
                <div className="mono" style={{ color: 'var(--ember)', marginBottom: 12, fontSize: 11 }}>CHECK-IN / CHECK-OUT</div>
                <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
                  {item.checkInTime && <div><div style={{ color: 'var(--muted-ink)', marginBottom: 4 }}>Check-in</div><div style={{ fontWeight: 600 }}>{item.checkInTime}</div></div>}
                  {item.checkOutTime && <div><div style={{ color: 'var(--muted-ink)', marginBottom: 4 }}>Check-out</div><div style={{ fontWeight: 600 }}>{item.checkOutTime}</div></div>}
                </div>
              </div>
            )}

            {/* Restaurant info */}
            {item.seatingCapacity && (
              <div style={{ padding: '18px 24px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
                <div className="mono" style={{ color: 'var(--ember)', marginBottom: 12, fontSize: 11 }}>RESTAURANT INFO</div>
                <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted-ink)' }}>Seating</span><span style={{ fontWeight: 600 }}>{item.seatingCapacity} guests</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted-ink)' }}>Reservation</span><span style={{ fontWeight: 600, color: item.reservationRequired ? 'var(--ember)' : 'var(--teal-700)' }}>{item.reservationRequired ? 'Required' : 'Walk-in OK'}</span></div>
                  {item.priceRange && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted-ink)' }}>Price range</span><span style={{ fontWeight: 600 }}>{item.priceRange}</span></div>}
                </div>
              </div>
            )}

            {/* Guide meta */}
            {item.experienceYears && (
              <div style={{ padding: '18px 24px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
                <div className="mono" style={{ color: 'var(--ember)', marginBottom: 12, fontSize: 11 }}>GUIDE PROFILE</div>
                <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted-ink)' }}>Experience</span><span style={{ fontWeight: 600 }}>{item.experienceYears} years</span></div>
                  {item.totalTours && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted-ink)' }}>Tours done</span><span style={{ fontWeight: 600 }}>{item.totalTours}</span></div>}
                  {item.homeRegion && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted-ink)' }}>Home region</span><span style={{ fontWeight: 600 }}>{item.homeRegion}</span></div>}
                  {item.availability && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted-ink)' }}>Available</span><span style={{ fontWeight: 600 }}>{item.availability}</span></div>}
                  {item.languages?.length > 0 && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--muted-ink)' }}>Languages</span><span style={{ fontWeight: 600, textAlign: 'right', maxWidth: 160 }}>{item.languages.join(', ')}</span></div>}
                </div>
              </div>
            )}

            {/* CTA */}
            <BookNowButton serviceName={itemName} serviceType={itemType} serviceSlug={itemSlug} label="Book Now" style={{ textAlign: 'center', padding: '18px 24px', fontSize: 15, width: '100%', justifyContent: 'center' }} />
            <Link href={backHref} className="mono" style={{ textAlign: 'center', color: 'var(--muted-ink)', fontSize: 12 }}>← Back to {backLabel}</Link>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {item.gallery?.length > 0 && (
        <section style={{ background: 'var(--ink)', padding: '64px 56px' }}>
          <div className="container-wide">
            <h2 style={{ fontSize: 40, marginBottom: 28, color: 'var(--bone)' }}>Gallery.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {item.gallery.slice(0, 9).map((img, i) => (
                <div key={img.asset?._id || i} className="photo" style={{ height: i === 0 ? 360 : 200, gridColumn: i === 0 ? 'span 2' : 'auto', backgroundImage: `url(${img.asset?.url})` }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Reviews ── */}
      {item.reviews?.length > 0 && (
        <section style={{ background: 'var(--bone-2)', padding: '72px 56px' }}>
          <div className="container-wide">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 14 }}>Guest reviews</div>
                <h2 style={{ fontSize: 44, lineHeight: 1.05 }}>What guests say.</h2>
              </div>
              {item.rating && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 52, lineHeight: 1, color: 'var(--ember)', marginBottom: 4 }}>{item.rating}</div>
                  <StarRating rating={item.rating} size={18} />
                  <div className="mono" style={{ marginTop: 6, fontSize: 12, color: 'var(--muted-ink)' }}>{item.reviewCount} total reviews</div>
                </div>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {item.reviews.map((review) => (
                <div key={review._id} style={{ padding: '26px 24px', background: 'var(--bone)', border: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{review.reviewerName}</div>
                      {review.verified && (
                        <div className="mono" style={{ fontSize: 10, color: 'var(--teal-700)' }}>✓ VERIFIED BOOKING</div>
                      )}
                    </div>
                    <StarRating rating={review.rating} size={14} />
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--muted-ink)', marginBottom: 14 }}>{review.reviewText}</p>
                  {review.reviewDate && (
                    <div className="mono" style={{ fontSize: 11, color: 'var(--muted-ink)' }}>
                      {new Date(review.reviewDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      {item.faqs?.length > 0 && (
        <section style={{ background: 'var(--bone)', padding: '64px 56px' }}>
          <div className="container">
            <h2 style={{ fontSize: 40, marginBottom: 32 }}>Questions before booking.</h2>
            {item.faqs.map((faq) => (
              <div key={faq.question} style={{ borderTop: '1px solid var(--line)', paddingTop: 22, marginTop: 22 }}>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>{faq.question}</h3>
                <p style={{ color: 'var(--muted-ink)', lineHeight: 1.75 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Book CTA ── */}
      <section style={{ background: 'var(--ember)', color: 'var(--bone)', padding: '64px 56px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.1, marginBottom: 12, color: 'var(--bone)' }}>Ready to book?</h2>
          <p style={{ fontSize: 17, opacity: 0.88, marginBottom: 28, lineHeight: 1.6 }}>Submit your booking request and our team will confirm within 24 hours.</p>
          <BookNowButton serviceName={itemName} serviceType={itemType} serviceSlug={itemSlug} serviceId={itemId} label="Book Now — It's Free" className="btn" style={{ background: 'var(--bone)', color: 'var(--ember)', fontSize: 16, padding: '18px 44px' }} />
        </div>
      </section>
      <Footer />
    </div>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export function SanityHomePage({ data }) {
  const packages = data?.packages || []
  const destinations = data?.destinations || []
  const posts = data?.featuredPosts || []

  return (
    <div className="nd">
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--ink)', color: 'var(--bone)' }}>
        <div className="photo" style={{ position: 'absolute', inset: 0, backgroundImage: `url(https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=2200&q=80&auto=format&fit=crop)`, opacity: 0.45 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(8,22,26,0.85) 40%, rgba(8,22,26,0.3))' }} />
        <div className="container-wide" style={{ position: 'relative', padding: '0 56px' }}>
          <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 28 }}>Gilgit-Baltistan · KKH · Karakoram</div>
          <h1 style={{ fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 0.94, color: 'var(--bone)', maxWidth: 900, marginBottom: 36 }}>
            Pakistan's high<br /><em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>altitude frontier.</em>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.65, maxWidth: 620, opacity: 0.88, marginBottom: 44 }}>
            Hunza, K2, Fairy Meadows, Skardu — curated packages, private transport, expert guides and mountain hotels, all in one place.
          </p>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            <Link className="btn btn-ember" href="/packages">Browse packages</Link>
            <a className="btn btn-outline-light" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Plan on WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      {packages.length > 0 && (
        <section style={{ background: 'var(--bone)', padding: '96px 56px' }}>
          <div className="container-wide">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 16 }}>Curated tours</div>
                <h2 style={{ fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.0 }}>Featured<br /><em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>packages.</em></h2>
              </div>
              <Link href="/packages" className="mono" style={{ color: 'var(--ember)', borderBottom: '1px solid var(--ember)', paddingBottom: 2 }}>View all packages →</Link>
            </div>
            <div style={{ display: 'grid', gap: 24 }}>
              {packages.map((pkg) => (
                <Link key={pkg._id} href={`/packages/${pkg.slug}`} className="pkg-card" style={{ display: 'grid', gridTemplateColumns: '420px 1fr', background: 'var(--bone-2)', color: 'inherit', textDecoration: 'none' }}>
                  <div className="photo" style={{ minHeight: 340, backgroundImage: `url(${imgUrl(pkg)})` }} />
                  <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="mono" style={{ color: 'var(--teal-700)', marginBottom: 12 }}>
                        {pkg.region} · {pkg.days} DAYS · {pkg.difficulty?.toUpperCase()}
                      </div>
                      <h3 style={{ fontSize: 36, lineHeight: 1.08, marginBottom: 12 }}>{pkg.title}</h3>
                      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted-ink)', marginBottom: 18 }}>{pkg.summary || pkg.subtitle}</p>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {(pkg.highlights || []).slice(0, 3).map((h) => (
                          <span key={h} className="mono" style={{ border: '1px solid var(--line)', padding: '6px 10px', fontSize: 11, color: 'var(--muted-ink)' }}>{h}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--line)', paddingTop: 20, marginTop: 24 }}>
                      <div>
                        <div className="mono" style={{ fontSize: 11, color: 'var(--muted-ink)', marginBottom: 4 }}>FROM</div>
                        <div style={{ fontFamily: 'var(--display)', fontSize: 26 }}>
                          {pkg.pricing?.currency || 'PKR'} {pkg.pricing?.priceFrom?.toLocaleString() || '—'}
                        </div>
                      </div>
                      <span className="btn btn-ember" style={{ fontSize: 13 }}>View details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Destinations */}
      {destinations.length > 0 && (
        <section style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '96px 56px' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 52 }}>
              <div className="eyebrow" style={{ color: 'var(--sand)', marginBottom: 16 }}>Where to go</div>
              <h2 style={{ fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 1.0, color: 'var(--bone)' }}>
                Destinations<br /><em style={{ fontStyle: 'italic', color: 'var(--sand)' }}>worth the altitude.</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {destinations.map((dest) => (
                <Link key={dest._id} href={`/destinations/${dest.slug}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line-light)' }}>
                  <div className="photo" style={{ height: 220, backgroundImage: `url(${imgUrl(dest)})` }} />
                  <div style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 26, marginBottom: 10 }}>{dest.name}</h3>
                    <p style={{ fontSize: 14, color: 'var(--muted-bone)', lineHeight: 1.65 }}>{dest.tagline || dest.summary}</p>
                    <div className="mono" style={{ color: 'var(--sand)', marginTop: 14, fontSize: 11 }}>EXPLORE →</div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <Link href="/destinations" className="btn btn-outline-light">All destinations</Link>
            </div>
          </div>
        </section>
      )}

      {/* Journal */}
      {posts.length > 0 && (
        <section style={{ background: 'var(--bone-2)', padding: '96px 56px' }}>
          <div className="container-wide">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 16 }}>Travel journal</div>
                <h2 style={{ fontSize: 'clamp(36px, 4vw, 60px)', lineHeight: 1.05 }}>Guides &<br /><em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>field notes.</em></h2>
              </div>
              <Link href="/journal" className="mono" style={{ color: 'var(--ember)', borderBottom: '1px solid var(--ember)', paddingBottom: 2 }}>All articles →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
              {posts.map((post) => (
                <Link key={post._id} href={`/journal/${post.slug}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none', background: 'var(--bone)', border: '1px solid var(--line)' }}>
                  <div className="photo" style={{ height: 200, backgroundImage: `url(${imgUrl(post)})` }} />
                  <div style={{ padding: 22 }}>
                    <div className="mono" style={{ color: 'var(--ember)', marginBottom: 10, fontSize: 11 }}>{post.category?.toUpperCase()}</div>
                    <h3 style={{ fontSize: 20, lineHeight: 1.3, marginBottom: 10 }}>{post.title}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--muted-ink)' }}>{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: 'var(--ember)', color: 'var(--bone)', padding: '80px 56px', textAlign: 'center' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>Ready to go?</div>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 64px)', lineHeight: 1.05, color: 'var(--bone)', marginBottom: 28 }}>Tell us your dates.<br />We build the route.</h2>
          <BookNowButton serviceName="Custom Trip" serviceType="custom_trip" serviceSlug="" label="Start Your Booking" className="btn" style={{ background: 'var(--bone)', color: 'var(--ember)', fontSize: 16, padding: '18px 44px' }} />
        </div>
      </section>
      <Footer />
    </div>
  )
}

// ─── Destinations List ────────────────────────────────────────────────────────

export function SanityDestinationsPage({ destinations }) {
  if (!destinations) return <SanityNotConfigured />

  return (
    <div className="nd">
      <NavLight />
      <section style={{ background: 'var(--bone)', padding: '60px 56px 56px' }}>
        <div className="container-wide">
          <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>Where to go</div>
          <h1 style={{ fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 0.96, marginBottom: 24 }}>
            Destinations.<br /><em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>Choose your altitude.</em>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--muted-ink)', maxWidth: 720 }}>
            From the Hunza Valley at 2,400m to Concordia at 5,128m — every destination is a different world.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--bone)', padding: '20px 56px 110px' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 26 }}>
          {destinations.map((dest) => (
            <Link key={dest._id} href={`/destinations/${dest.slug}`} className="pkg-card" style={{ display: 'block', color: 'inherit', textDecoration: 'none', background: 'var(--bone-2)' }}>
              <div className="photo" style={{ height: 280, backgroundImage: `url(${imgUrl(dest)})` }} />
              <div style={{ padding: 28 }}>
                <h2 style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 10 }}>{dest.name}</h2>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--muted-ink)', marginBottom: 18 }}>{dest.tagline || dest.summary}</p>
                <div style={{ display: 'flex', gap: 18, fontSize: 13 }}>
                  {dest.bestSeason && <span className="mono" style={{ color: 'var(--teal-700)' }}>Season: {dest.bestSeason}</span>}
                  {dest.elevationRange && <span className="mono" style={{ color: 'var(--muted-ink)' }}>{dest.elevationRange}</span>}
                </div>
                {dest.packageCount > 0 && (
                  <div className="mono" style={{ marginTop: 16, color: 'var(--ember)', fontSize: 12 }}>{dest.packageCount} package{dest.packageCount !== 1 ? 's' : ''} available</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

// ─── Destination Detail ───────────────────────────────────────────────────────

const SERVICE_SECTIONS = [
  { key: 'accommodations', label: 'Where to Stay',   icon: '🏨', href: '/accommodation', type: 'accommodation' },
  { key: 'restaurants',    label: 'Where to Eat',    icon: '🍽️', href: '/restaurants',   type: 'restaurant'    },
  { key: 'guides',         label: 'Tour Guides',     icon: '🧭', href: '/guides',        type: 'guide'         },
  { key: 'vehicles',       label: 'Vehicles',        icon: '🚙', href: '/vehicles',      type: 'vehicle'       },
]

function getYoutubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

export function SanityDestinationDetailPage({ destination }) {
  if (!destination) return (
    <div className="nd" style={{ minHeight: '60vh' }}>
      <NavLight />
      <p style={{ padding: '80px 56px', color: 'var(--muted-ink)' }}>Destination not found.</p>
    </div>
  )

  const allGallery = destination.gallery || []
  const hasServices = SERVICE_SECTIONS.some(s => destination[s.key]?.length > 0)

  return (
    <div className="nd">
      <NavLight />

      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: 640, display: 'flex', alignItems: 'flex-end', padding: '140px 56px 80px', overflow: 'hidden', color: 'var(--bone)' }}>
        <div className="photo" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgUrl(destination)})` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,22,26,0.9) 40%, rgba(8,22,26,0.3))' }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 22 }}>
            {destination.bestSeason    && <span className="mono" style={{ color: 'var(--sand)', fontSize: 12 }}>🗓 {destination.bestSeason}</span>}
            {destination.elevationRange && <span className="mono" style={{ color: 'var(--sand)', fontSize: 12 }}>📐 {destination.elevationRange}</span>}
            {destination.travelTime    && <span className="mono" style={{ color: 'var(--sand)', fontSize: 12 }}>🚗 {destination.travelTime}</span>}
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 100px)', lineHeight: 0.95, color: 'var(--bone)', maxWidth: 900, marginBottom: 22 }}>{destination.name}</h1>
          <p style={{ fontSize: 19, lineHeight: 1.65, maxWidth: 640, opacity: 0.88, marginBottom: 32 }}>{destination.tagline || destination.summary}</p>
          <BookNowButton serviceName={destination.name} serviceType="custom_trip" serviceSlug={destination.slug || ''} label="Plan a trip here" />
        </div>
      </section>

      {/* ── Quick facts + summary ── */}
      <section style={{ background: 'var(--bone)', padding: '72px 56px' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.85, color: 'var(--muted-ink)', marginBottom: 0 }}>{destination.summary}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'BEST SEASON',   value: destination.bestSeason },
              { label: 'ELEVATION',     value: destination.elevationRange },
              { label: 'CLIMATE',       value: destination.climate },
              { label: 'FROM ISLAMABAD',value: destination.travelTime },
            ].filter(r => r.value).map(r => (
              <div key={r.label} style={{ padding: '16px 20px', background: 'var(--bone-2)', border: '1px solid var(--line)' }}>
                <div className="mono" style={{ color: 'var(--ember)', marginBottom: 4, fontSize: 10 }}>{r.label}</div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery ── */}
      {allGallery.length > 0 && (
        <section style={{ background: 'var(--ink)', padding: '72px 56px' }}>
          <div className="container-wide">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
              <h2 style={{ fontSize: 40, color: 'var(--bone)', margin: 0 }}>Gallery</h2>
              <span className="mono" style={{ color: 'rgba(245,239,228,0.45)', fontSize: 11 }}>{allGallery.length} PHOTOS</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {allGallery.map((g, i) => (
                <div key={i} style={{ position: 'relative', gridColumn: i === 0 ? 'span 2' : 'span 1' }}>
                  <div className="photo" style={{ height: i === 0 ? 420 : 207, backgroundImage: `url(${g.image?.asset?.url || imgUrl(g)})` }} />
                  {g.caption && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px', background: 'rgba(8,22,26,0.7)', color: 'var(--bone)', fontFamily: 'var(--mono)', fontSize: 10 }}>
                      {g.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Videos ── */}
      {destination.videos?.length > 0 && (
        <section style={{ background: 'var(--bone-2)', padding: '72px 56px' }}>
          <div className="container-wide">
            <h2 style={{ fontSize: 40, marginBottom: 32 }}>Videos</h2>
            <div style={{ display: 'grid', gridTemplateColumns: destination.videos.length === 1 ? '1fr' : 'repeat(2, 1fr)', gap: 24 }}>
              {destination.videos.map((v, i) => {
                const ytId = getYoutubeId(v.youtubeUrl)
                return (
                  <div key={i}>
                    {ytId ? (
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: 'var(--ink)' }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${ytId}`}
                          title={v.title || 'Video'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        />
                      </div>
                    ) : (
                      <a href={v.youtubeUrl || v.vimeoUrl} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 240, background: 'var(--ink)', color: 'var(--bone)', fontSize: 40, textDecoration: 'none' }}>
                        ▶
                      </a>
                    )}
                    {v.title && <p style={{ marginTop: 10, fontWeight: 600, fontSize: 15 }}>{v.title}</p>}
                    {v.caption && <p style={{ fontSize: 13, color: 'var(--muted-ink)', marginTop: 4 }}>{v.caption}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Famous Places ── */}
      {destination.landmarks?.length > 0 && (
        <section style={{ background: 'var(--bone)', padding: '72px 56px' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 40 }}>
              <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 14 }}>Must-visit spots</div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, margin: 0 }}>
                Famous places in <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>{destination.name}.</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {destination.landmarks.map((lm) => (
                <div key={lm._id} style={{ background: 'var(--bone-2)', border: '1px solid var(--line)', overflow: 'hidden' }}>
                  {lm.heroImage?.asset?.url && (
                    <div className="photo" style={{ height: 200, backgroundImage: `url(${lm.heroImage.asset.url})` }} />
                  )}
                  <div style={{ padding: '20px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <h3 style={{ fontSize: 20, lineHeight: 1.2, margin: 0 }}>
                        {PLACE_ICONS[lm.category] || '📍'} {lm.name}
                      </h3>
                      {lm.elevation && <span className="mono" style={{ fontSize: 10, color: 'var(--muted-ink)', flexShrink: 0, marginLeft: 8 }}>{lm.elevation}m</span>}
                    </div>
                    {lm.description && <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--muted-ink)', margin: '0 0 12px' }}>{lm.description}</p>}
                    {lm.mapsLink && (
                      <a href={lm.mapsLink} target="_blank" rel="noopener noreferrer"
                        className="mono" style={{ fontSize: 10, color: 'var(--teal-700)', letterSpacing: '0.1em' }}>
                        VIEW ON MAP →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Linked Services ── */}
      {hasServices && (
        <section style={{ background: 'var(--bone-2)', padding: '72px 56px' }}>
          <div className="container-wide">
            <div style={{ marginBottom: 48 }}>
              <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 14 }}>Book individually</div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, margin: 0 }}>
                Services in <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>{destination.name}.</em>
              </h2>
            </div>
            {SERVICE_SECTIONS.map(({ key, label, icon, href, type }) => {
              const items = destination[key]
              if (!items?.length) return null
              return (
                <div key={key} style={{ marginBottom: 52 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
                    <h3 style={{ margin: 0, fontSize: 22 }}>{icon} {label}</h3>
                    <Link href={href} className="mono" style={{ fontSize: 10, color: 'var(--ember)', letterSpacing: '0.14em' }}>VIEW ALL →</Link>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                    {items.map(item => (
                      <Link key={item._id} href={`${href}/${item.slug}`} className="pkg-card"
                        style={{ display: 'block', background: 'var(--bone)', color: 'inherit', textDecoration: 'none' }}>
                        <div className="photo" style={{ height: 180, backgroundImage: `url(${item.portrait?.asset?.url || item.heroImage?.asset?.url || FALLBACK_IMG})` }} />
                        <div style={{ padding: '18px 20px' }}>
                          <div className="mono" style={{ color: 'var(--ember)', fontSize: 10, marginBottom: 6 }}>
                            {item.cuisines?.join(' · ') || item.category || item.type || item.location?.city || type.toUpperCase()}
                          </div>
                          <h4 style={{ fontSize: 18, lineHeight: 1.2, marginBottom: 8 }}>{item.name || item.title}</h4>
                          {item.shortDescription && <p style={{ fontSize: 13, color: 'var(--muted-ink)', lineHeight: 1.55, marginBottom: 12 }}>{item.shortDescription}</p>}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                            <div style={{ fontFamily: 'var(--display)', fontSize: 17 }}>{priceLabel(item.pricing)}</div>
                            <span className="mono" style={{ fontSize: 10, color: 'var(--ember)' }}>BOOK →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Packages ── */}
      {destination.packages?.length > 0 && (
        <section style={{ background: 'var(--bone)', padding: '72px 56px' }}>
          <div className="container-wide">
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, marginBottom: 40 }}>
              Packages for <em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>{destination.name}.</em>
            </h2>
            <div style={{ display: 'grid', gap: 20 }}>
              {destination.packages.map((pkg) => (
                <Link key={pkg._id} href={`/packages/${pkg.slug}`} className="pkg-card"
                  style={{ display: 'grid', gridTemplateColumns: '320px 1fr', background: 'var(--bone-2)', color: 'inherit', textDecoration: 'none' }}>
                  <div className="photo" style={{ minHeight: 260, backgroundImage: `url(${imgUrl(pkg)})` }} />
                  <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="mono" style={{ color: 'var(--teal-700)', marginBottom: 10, fontSize: 12 }}>{pkg.region} · {pkg.days} DAYS · {pkg.difficulty}</div>
                      <h3 style={{ fontSize: 28, lineHeight: 1.1, marginBottom: 10 }}>{pkg.title}</h3>
                      <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--muted-ink)' }}>{pkg.summary || pkg.subtitle}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--line)', paddingTop: 18, marginTop: 20 }}>
                      <div style={{ fontFamily: 'var(--display)', fontSize: 22 }}>{priceLabel(pkg.pricing)}</div>
                      <span className="mono" style={{ color: 'var(--ember)' }}>VIEW →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      {destination.faqs?.length > 0 && (
        <section style={{ background: 'var(--bone-2)', padding: '72px 56px' }}>
          <div className="container">
            <h2 style={{ fontSize: 40, marginBottom: 32 }}>Questions about {destination.name}.</h2>
            {destination.faqs.map((faq) => (
              <div key={faq.question} style={{ borderTop: '1px solid var(--line)', paddingTop: 22, marginTop: 22 }}>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>{faq.question}</h3>
                <p style={{ color: 'var(--muted-ink)', lineHeight: 1.7 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

// ─── Journal List ─────────────────────────────────────────────────────────────

export function SanityJournalPage({ posts }) {
  if (!posts) return <SanityNotConfigured />

  return (
    <div className="nd">
      <NavLight />
      <section style={{ background: 'var(--bone)', padding: '60px 56px 56px' }}>
        <div className="container-wide">
          <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 24 }}>Field notes & guides</div>
          <h1 style={{ fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 0.96, marginBottom: 24 }}>
            Travel journal.<br /><em style={{ fontStyle: 'italic', color: 'var(--ember)' }}>Read before you go.</em>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--muted-ink)', maxWidth: 720 }}>
            Route guides, packing lists, seasonal advice and stories from the Karakoram — written by our team and local guides.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--bone)', padding: '20px 56px 110px' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {posts.map((post) => (
            <Link key={post._id} href={`/journal/${post.slug}`} className="pkg-card" style={{ display: 'block', color: 'inherit', textDecoration: 'none', background: 'var(--bone-2)' }}>
              <div className="photo" style={{ height: 240, backgroundImage: `url(${imgUrl(post)})` }} />
              <div style={{ padding: 24 }}>
                <div className="mono" style={{ color: 'var(--ember)', marginBottom: 10, fontSize: 11 }}>{post.category?.toUpperCase()}</div>
                <h2 style={{ fontSize: 22, lineHeight: 1.3, marginBottom: 12 }}>{post.title}</h2>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--muted-ink)' }}>{post.excerpt}</p>
                {post.publishedAt && (
                  <div className="mono" style={{ marginTop: 16, fontSize: 11, color: 'var(--muted-ink)' }}>
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="container" style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted-ink)' }}>
            <p>No articles published yet. Check back soon.</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}

// ─── Journal Detail ───────────────────────────────────────────────────────────

export function SanityJournalDetailPage({ post }) {
  if (!post) return (
    <div className="nd" style={{ minHeight: '60vh' }}>
      <NavLight />
      <p style={{ padding: '80px 56px', color: 'var(--muted-ink)' }}>Article not found.</p>
    </div>
  )

  return (
    <div className="nd">
      <NavLight />
      <section style={{ background: 'var(--bone)', padding: '60px 56px 56px' }}>
        <div className="container">
          <div className="mono" style={{ color: 'var(--ember)', marginBottom: 18, fontSize: 12 }}>{post.category?.toUpperCase()}</div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05, marginBottom: 24 }}>{post.title}</h1>
          {post.excerpt && <p style={{ fontSize: 20, lineHeight: 1.7, color: 'var(--muted-ink)', maxWidth: 760 }}>{post.excerpt}</p>}
          <div style={{ display: 'flex', gap: 24, marginTop: 28, alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: 22 }}>
            {post.author && <span style={{ fontSize: 14, fontWeight: 600 }}>{post.author.name}</span>}
            {post.author?.role && <span style={{ fontSize: 13, color: 'var(--muted-ink)' }}>{post.author.role}</span>}
            {post.publishedAt && (
              <span className="mono" style={{ fontSize: 12, color: 'var(--muted-ink)', marginLeft: 'auto' }}>
                {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </section>

      {post.heroImage?.asset?.url && (
        <div className="photo" style={{ height: 520, backgroundImage: `url(${post.heroImage.asset.url})`, margin: '0 56px' }} />
      )}

      <section style={{ background: 'var(--bone)', padding: '64px 56px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {(post.content || []).map((block) => {
            if (block._type !== 'block') return null
            const text = block.children?.map((c) => c.text).join('') || ''
            if (block.style === 'h2') return <h2 key={block._key} style={{ fontSize: 32, lineHeight: 1.2, margin: '40px 0 16px' }}>{text}</h2>
            if (block.style === 'h3') return <h3 key={block._key} style={{ fontSize: 24, lineHeight: 1.3, margin: '32px 0 12px' }}>{text}</h3>
            return <p key={block._key} style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--muted-ink)', marginBottom: 22 }}>{text}</p>
          })}
        </div>
      </section>

      {post.faqs?.length > 0 && (
        <section style={{ background: 'var(--bone-2)', padding: '64px 56px' }}>
          <div className="container">
            <h2 style={{ fontSize: 36, marginBottom: 28 }}>Frequently asked.</h2>
            {post.faqs.map((faq) => (
              <div key={faq.question} style={{ borderTop: '1px solid var(--line)', paddingTop: 20, marginTop: 20 }}>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>{faq.question}</h3>
                <p style={{ color: 'var(--muted-ink)', lineHeight: 1.7 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {post.relatedPackages?.length > 0 && (
        <section style={{ background: 'var(--bone)', padding: '64px 56px' }}>
          <div className="container-wide">
            <h2 style={{ fontSize: 36, marginBottom: 28 }}>Related packages.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {post.relatedPackages.map((pkg) => (
                <Link key={pkg._id} href={`/packages/${pkg.slug}`} className="pkg-card" style={{ display: 'block', color: 'inherit', textDecoration: 'none', background: 'var(--bone-2)' }}>
                  <div className="photo" style={{ height: 200, backgroundImage: `url(${imgUrl(pkg)})` }} />
                  <div style={{ padding: 20 }}>
                    <div className="mono" style={{ color: 'var(--teal-700)', marginBottom: 8, fontSize: 11 }}>{pkg.days} DAYS · {pkg.difficulty}</div>
                    <h3 style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 8 }}>{pkg.title}</h3>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 20, color: 'var(--ember)' }}>
                      {pkg.pricing?.currency || 'PKR'} {pkg.pricing?.priceFrom?.toLocaleString() || '—'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}

// ─── Featured Services Section (for homepage) ─────────────────────────────────

const SERVICE_META = [
  {
    key: 'accommodations',
    label: 'Accommodation',
    href: '/accommodation',
    promise: 'Sleep close to the route, not far from the feeling.',
    useCase: 'Best for families, couples and groups who want comfort level decided before the road starts.',
    features: ['Verified stays', 'Room type guidance', 'Breakfast and heating notes'],
    cta: 'Choose stays',
  },
  {
    key: 'vehicles',
    label: 'Vehicles',
    href: '/vehicles',
    promise: 'The right vehicle changes the whole trip.',
    useCase: 'Use this when road comfort, luggage space, driver quality and mountain route access matter.',
    features: ['4x4 and coaster options', 'Driver included', 'Route-ready planning'],
    cta: 'Pick transport',
  },
  {
    key: 'guides',
    label: 'Tour Guides',
    href: '/guides',
    promise: 'A local guide makes the place easier to trust.',
    useCase: 'Ideal when you want language help, cultural context, safety judgment and a smoother day plan.',
    features: ['Regional expertise', 'Languages listed', 'Safety-first pacing'],
    cta: 'Meet guides',
  },
  {
    key: 'restaurants',
    label: 'Restaurants',
    href: '/restaurants',
    promise: 'Plan the meals people remember later.',
    useCase: 'Useful for group meals, dietary needs, local food stops and reliable dinner reservations.',
    features: ['Cuisine clarity', 'Group meal friendly', 'Dietary options'],
    cta: 'Plan meals',
  },
]

function ServiceBuyingBlock({ data }) {
  return (
    <section className="nd-services-feature nd-services-redesign" style={{ background: 'var(--bone)', padding: '58px 56px 112px' }}>
      <div className="container-wide">
        <div className="nd-services-head" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 34, alignItems: 'end', marginBottom: 44 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--teal-700)', marginBottom: 18 }}>Build your own trip</div>
            <h2 style={{ fontSize: 64, lineHeight: 1 }}>
              Choose the service,<br /><em style={{ fontStyle: 'italic' }}>then the exact fit.</em>
            </h2>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted-ink)' }}>
            Each category solves a different travel problem. Start with the service type, then compare the best available options inside it.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 28 }}>
          {SERVICE_META.map(({ key, label, href, promise, useCase, features, cta }, index) => {
            const items = data[key] || []
            if (!items.length) return null

            const lead = items[0]
            const rest = items.slice(1, 4)
            const leadSrc = lead?.heroImage?.asset?.url || lead?.portrait?.asset?.url || FALLBACK_IMG

            return (
              <div className="nd-service-row" key={key} style={{ display: 'grid', gridTemplateColumns: index % 2 === 0 ? '0.82fr 1.38fr' : '1.38fr 0.82fr', gap: 24, alignItems: 'stretch' }}>
                <div className="nd-service-panel" style={{ order: index % 2 === 0 ? 0 : 2, background: index % 2 === 0 ? 'var(--ink)' : 'var(--teal-800)', color: 'var(--bone)', padding: 30, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 390 }}>
                  <div>
                    <div className="mono" style={{ color: 'var(--sand)', marginBottom: 18 }}>SERVICE {String(index + 1).padStart(2, '0')} / {label}</div>
                    <h3 style={{ color: 'var(--bone)', fontSize: 42, lineHeight: 1.02, marginBottom: 18 }}>{promise}</h3>
                    <p style={{ color: 'var(--muted-bone)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{useCase}</p>
                    <div style={{ display: 'grid', gap: 10 }}>
                      {features.map((feature) => (
                        <div key={feature} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14 }}>
                          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--ember)', flexShrink: 0 }} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href={href} className="btn btn-ember" style={{ alignSelf: 'flex-start', marginTop: 28 }}>{cta}</Link>
                </div>

                <div className="nd-service-showcase" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 16 }}>
                  {lead && (
                    <Link href={`${href}/${lead.slug}`} className="pkg-card nd-service-lead" style={{ background: 'var(--bone-2)', display: 'grid', gridTemplateRows: '1fr auto', color: 'inherit', textDecoration: 'none', border: '1px solid var(--line)' }}>
                      <div className="photo photo-overlay" style={{ minHeight: 270, backgroundImage: `url(${leadSrc})`, position: 'relative' }}>
                        {lead.rating && (
                          <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(8,22,26,0.78)', color: 'var(--bone)', padding: '6px 10px', fontFamily: 'var(--mono)', fontSize: 11 }}>
                            <span style={{ color: 'var(--ember)' }}>★</span>
                            <span style={{ fontWeight: 700 }}>{lead.rating}</span>
                            <span style={{ opacity: 0.65 }}>· {lead.reviewCount || 0}</span>
                          </div>
                        )}
                      </div>
                      <div style={{ padding: 22 }}>
                        <div className="mono" style={{ color: 'var(--ember)', marginBottom: 10 }}>{label.toUpperCase()} PICK</div>
                        <h3 style={{ fontSize: 27, lineHeight: 1.1, marginBottom: 10 }}>{lead.name || lead.title}</h3>
                        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted-ink)', marginBottom: 14 }}>{lead.shortDescription || lead.category || lead.type || lead.location?.city || priceLabel(lead.pricing)}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'end', borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                          <div>
                            <div className="mono" style={{ color: 'var(--muted-ink)', fontSize: 9, marginBottom: 3 }}>FROM</div>
                            <div style={{ fontFamily: 'var(--display)', fontSize: 22 }}>{priceLabel(lead.pricing)}</div>
                          </div>
                          <span className="mono" style={{ color: 'var(--ember)' }}>BOOK →</span>
                        </div>
                      </div>
                    </Link>
                  )}

                  <div className="nd-service-stack" style={{ display: 'grid', gap: 12 }}>
                    {rest.map((item) => {
                      const heroSrc = item.heroImage?.asset?.url || item.portrait?.asset?.url || FALLBACK_IMG
                      const sub = item.cuisines?.join(' · ') || item.category || item.type || item.location?.city || ''
                      return (
                        <Link key={item._id} href={`${href}/${item.slug}`} className="pkg-card nd-service-mini" style={{ background: 'var(--bone-2)', display: 'grid', gridTemplateColumns: '116px 1fr', color: 'inherit', textDecoration: 'none', border: '1px solid var(--line)', minHeight: 116 }}>
                          <div className="photo" style={{ backgroundImage: `url(${heroSrc})` }} />
                          <div style={{ padding: '15px 15px 13px' }}>
                            {sub && <div className="mono" style={{ color: 'var(--ember)', fontSize: 9, marginBottom: 7 }}>{sub.toUpperCase()}</div>}
                            <h3 style={{ fontSize: 18, lineHeight: 1.15, marginBottom: 8 }}>{item.name || item.title}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'end' }}>
                              <p style={{ fontSize: 12.5, lineHeight: 1.35, color: 'var(--muted-ink)' }}>{item.highlights?.[0] || priceLabel(item.pricing)}</p>
                              {item.rating && <span className="mono" style={{ color: 'var(--teal-700)', fontSize: 9 }}>★ {item.rating}</span>}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                    <Link href={href} className="nd-service-more" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '17px 18px', background: 'var(--bone)', border: '1px solid var(--line)', color: 'inherit', textDecoration: 'none' }}>
                      <span className="mono" style={{ color: 'var(--muted-ink)' }}>See all {label}</span>
                      <span className="mono" style={{ color: 'var(--ember)' }}>VIEW →</span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export async function SanityFeaturedServicesSection() {
  const data = await sanityFetch({ query: featuredServicesQuery }) || {}

  const allEmpty = SERVICE_META.every(m => !(data[m.key]?.length))
  if (allEmpty) return null

  return <ServiceBuyingBlock data={data} />
}

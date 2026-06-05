'use client'

import React from 'react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import {
  inp, sel, F, Grid, Sec, Tog, TagInput, FaqsEditor, SeoTab,
  GalleryEditor, RefCheckList, SlidePanel,
} from '@/components/admin/EditorShared'

const STATUS_COLOR = { live:'#27ae60', draft:'#e8822e', hidden:'#999' }

const TABS = [
  { key:'content',   label:'📝 Content'    },
  { key:'itinerary', label:'🗓️ Itinerary'  },
  { key:'media',     label:'🖼️ Media'       },
  { key:'services',  label:'🔗 Services'    },
  { key:'seo',       label:'🔍 SEO & FAQs'  },
  { key:'settings',  label:'⚙️ Settings'    },
]

// ── Day-by-day itinerary editor ───────────────────────────────────────────────
function ItineraryEditor({ days, onChange, services }) {
  const [openDay, setOpenDay] = React.useState(null)

  function addDay() {
    const n = days.length + 1
    onChange([...days, { _key: `day-${n}-${Date.now()}`, dayNumber: n, title: '', summary: '', routeFrom: '', routeTo: '', distanceKm: '', travelTime: '', altitudeMeters: '', difficulty: '', mealsIncluded: [], featuredMoment: '', accommodationId: '', vehicleId: '', guideId: '', restaurantIds: [] }])
    setOpenDay(days.length)
  }
  function updateDay(i, k, v) { onChange(days.map((d, j) => j === i ? { ...d, [k]: v } : d)) }
  function removeDay(i) { onChange(days.filter((_, j) => j !== i).map((d, idx) => ({ ...d, dayNumber: idx + 1 }))) }
  function moveDay(i, dir) {
    const j = i + dir
    if (j < 0 || j >= days.length) return
    const copy = [...days]
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
    onChange(copy.map((d, idx) => ({ ...d, dayNumber: idx + 1 })))
  }

  return (
    <div>
      <Sec>DAY-BY-DAY ITINERARY</Sec>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Build the trip day by day. Each day can have its own route, accommodation, vehicle, guide and meal stops.</p>

      <div style={{ display: 'grid', gap: 8 }}>
        {days.map((day, i) => (
          <div key={day._key || i} style={{ border: '1px solid #ddd', background: openDay === i ? '#fdf8f2' : 'white' }}>
            {/* Day header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', cursor: 'pointer' }}
              onClick={() => setOpenDay(openDay === i ? null : i)}>
              <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: '#e8822e', flexShrink: 0 }}>DAY {day.dayNumber}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{day.title || <em style={{ color: '#aaa', fontWeight: 400 }}>Untitled day</em>}</span>
              <button type="button" onClick={(e) => { e.stopPropagation(); moveDay(i, -1) }} disabled={i === 0}
                style={{ background: 'none', border: 'none', cursor: i === 0 ? 'default' : 'pointer', fontSize: 14, color: i === 0 ? '#ccc' : '#888', padding: '0 4px' }}>↑</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); moveDay(i, 1) }} disabled={i === days.length - 1}
                style={{ background: 'none', border: 'none', cursor: i === days.length - 1 ? 'default' : 'pointer', fontSize: 14, color: i === days.length - 1 ? '#ccc' : '#888', padding: '0 4px' }}>↓</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); removeDay(i) }}
                style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace' }}>DELETE</button>
              <span style={{ fontSize: 14, color: '#888' }}>{openDay === i ? '▲' : '▼'}</span>
            </div>

            {/* Day expanded form */}
            {openDay === i && (
              <div style={{ padding: '4px 14px 16px', borderTop: '1px solid #f0ece6' }}>
                <Grid>
                  <F label="Day Title" req><input value={day.title} onChange={e => updateDay(i, 'title', e.target.value)} style={inp} placeholder="Arrive in Hunza" /></F>
                  <F label="Main Location" full={false}><input value={day.locationName || ''} onChange={e => updateDay(i, 'locationName', e.target.value)} style={inp} placeholder="Karimabad" /></F>
                  <F label="Difficulty" full={false}>
                    <select value={day.difficulty || ''} onChange={e => updateDay(i, 'difficulty', e.target.value)} style={sel}>
                      <option value="">—</option>
                      {['Easy','Moderate','Strenuous'].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </F>
                  <F label="Summary"><textarea value={day.summary} onChange={e => updateDay(i, 'summary', e.target.value)} rows={2} style={{ ...inp, resize: 'vertical' }} /></F>
                  <F label="Route From" full={false}><input value={day.routeFrom} onChange={e => updateDay(i, 'routeFrom', e.target.value)} style={inp} placeholder="Gilgit" /></F>
                  <F label="Route To" full={false}><input value={day.routeTo} onChange={e => updateDay(i, 'routeTo', e.target.value)} style={inp} placeholder="Hunza" /></F>
                  <F label="Distance (km)" full={false}><input type="number" value={day.distanceKm} onChange={e => updateDay(i, 'distanceKm', e.target.value)} style={inp} /></F>
                  <F label="Travel Time" full={false}><input value={day.travelTime} onChange={e => updateDay(i, 'travelTime', e.target.value)} style={inp} placeholder="3 hrs drive" /></F>
                  <F label="Altitude (m)" full={false}><input type="number" value={day.altitudeMeters} onChange={e => updateDay(i, 'altitudeMeters', e.target.value)} style={inp} /></F>
                  <F label="Featured Moment" full={false}><input value={day.featuredMoment} onChange={e => updateDay(i, 'featuredMoment', e.target.value)} style={inp} placeholder="Sunset at Eagle's Nest" /></F>
                </Grid>
                <F label="Meals Included">
                  <TagInput value={day.mealsIncluded || []} onChange={v => updateDay(i, 'mealsIncluded', v)} placeholder="e.g. Breakfast" />
                </F>
                <Grid>
                  <F label="Accommodation" full={false}>
                    <select value={day.accommodationId || ''} onChange={e => updateDay(i, 'accommodationId', e.target.value)} style={sel}>
                      <option value="">— None —</option>
                      {services.accommodations.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                    </select>
                  </F>
                  <F label="Vehicle" full={false}>
                    <select value={day.vehicleId || ''} onChange={e => updateDay(i, 'vehicleId', e.target.value)} style={sel}>
                      <option value="">— None —</option>
                      {services.vehicles.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
                    </select>
                  </F>
                  <F label="Guide" full={false}>
                    <select value={day.guideId || ''} onChange={e => updateDay(i, 'guideId', e.target.value)} style={sel}>
                      <option value="">— None —</option>
                      {services.guides.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
                    </select>
                  </F>
                </Grid>
                <RefCheckList label="Meal Stops / Restaurants" options={services.restaurants} selected={day.restaurantIds || []} onChange={v => updateDay(i, 'restaurantIds', v)} />
              </div>
            )}
          </div>
        ))}
      </div>

      <button type="button" onClick={addDay}
        style={{ marginTop: 12, padding: '10px 18px', border: '1px dashed #aaa', background: 'white', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace', color: '#555', width: '100%' }}>
        + ADD DAY {days.length + 1}
      </button>
    </div>
  )
}

// ── Package editor panel ──────────────────────────────────────────────────────
function PackagePanel({ pkg, onClose, onSaved, services }) {
  const isEdit = !!pkg?._id
  const [tab, setTab] = React.useState('content')
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState('')

  const [form, setForm] = React.useState({
    title: pkg?.title || '', region: pkg?.region || '', days: pkg?.days || '', nights: pkg?.nights || '',
    difficulty: pkg?.difficulty || 'Easy', season: pkg?.season || '', summary: pkg?.summary || '',
    subtitle: pkg?.subtitle || '', spotsLeft: pkg?.spotsLeft || '',
    price: pkg?.price || '', priceUsd: pkg?.priceUsd || '', currency: pkg?.currency || 'PKR',
    highlights: pkg?.highlights || [], included: pkg?.included || [], excluded: pkg?.excluded || [],
    heroImage: pkg?.heroImage?.asset ? { url: pkg.heroImage.asset.url, id: pkg.heroImage.asset._id } : null,
    gallery: (pkg?.gallery || []).map(g => ({ id: g.asset?._id, url: g.asset?.url })),
    itineraryDays: (pkg?.itineraryDays || []).map(d => ({
      _key: d._key, dayNumber: d.dayNumber, title: d.title || '', summary: d.summary || '', locationName: d.locationName || '',
      routeFrom: d.routeFrom || '', routeTo: d.routeTo || '', distanceKm: d.distanceKm || '', travelTime: d.travelTime || '',
      altitudeMeters: d.altitudeMeters || '', difficulty: d.difficulty || '', mealsIncluded: d.mealsIncluded || [],
      featuredMoment: d.featuredMoment || '',
      accommodationId: d.accommodation?._id || '', vehicleId: d.vehicle?._id || '', guideId: d.guide?._id || '',
      restaurantIds: (d.restaurants || []).map(r => r._id),
    })),
    accommodationIds: (pkg?.accommodations || []).map(a => a._id),
    vehicleIds: (pkg?.vehicles || []).map(v => v._id),
    guideIds: (pkg?.guides || []).map(g => g._id),
    restaurantIds: (pkg?.restaurants || []).map(r => r._id),
    faqs: pkg?.faqs || [],
    metaTitle: pkg?.seo?.metaTitle || '', metaDescription: pkg?.seo?.metaDescription || '', focusKeywords: pkg?.seo?.focusKeywords || '',
    status: pkg?.status || 'draft', featured: !!pkg?.featured, showOnHome: !!pkg?.showOnHome, priority: pkg?.priority || 100,
    rating: pkg?.rating || '', reviewCount: pkg?.reviewCount || '',
  })

  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const t = k => v => setForm(f => ({ ...f, [k]: v }))

  async function save(e) {
    e?.preventDefault()
    if (!form.title) { setError('Title is required'); setTab('content'); return }
    setSaving(true); setError('')

    const payload = {
      title: form.title, region: form.region, days: Number(form.days) || 1, nights: Number(form.nights) || 0,
      difficulty: form.difficulty, season: form.season, summary: form.summary, subtitle: form.subtitle,
      spotsLeft: form.spotsLeft ? Number(form.spotsLeft) : undefined,
      price: form.price, priceUsd: form.priceUsd, currency: form.currency,
      highlights: form.highlights, included: form.included, excluded: form.excluded,
      heroImageId: form.heroImage?.id || null,
      gallery: form.gallery.map(g => ({ _type: 'mediaImage', _key: g.id, asset: { _type: 'reference', _ref: g.id } })),
      itineraryDays: form.itineraryDays,
      accommodationIds: form.accommodationIds, vehicleIds: form.vehicleIds, guideIds: form.guideIds, restaurantIds: form.restaurantIds,
      faqs: form.faqs,
      seo: { metaTitle: form.metaTitle, metaDescription: form.metaDescription, focusKeywords: form.focusKeywords },
      status: form.status, featured: form.featured, showOnHome: form.showOnHome, priority: Number(form.priority) || 100,
      rating: form.rating ? Number(form.rating) : undefined, reviewCount: form.reviewCount ? Number(form.reviewCount) : undefined,
    }

    const res = await fetch('/api/admin/packages', {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit ? { id: pkg._id, fields: payload } : payload),
    })
    const data = await res.json()
    setSaving(false)
    if (data.success || data._id) onSaved()
    else setError(data.error || 'Save failed')
  }

  return (
    <SlidePanel title={isEdit ? `✏️ ${pkg.title}` : '➕ New Package'} onClose={onClose} onSave={save} saving={saving}
      tabs={TABS} activeTab={tab} setTab={setTab} error={error}>

      {tab === 'content' && (
        <div>
          <Sec>BASIC INFO</Sec>
          <Grid>
            <F label="Package Title" req><input value={form.title} onChange={s('title')} style={inp} placeholder="Hunza Valley in Autumn" /></F>
            <F label="Region" full={false}><input value={form.region} onChange={s('region')} style={inp} placeholder="Hunza · Nagar" /></F>
            <F label="Season" full={false}><input value={form.season} onChange={s('season')} style={inp} placeholder="April – October" /></F>
            <F label="Days" full={false}><input type="number" value={form.days} onChange={s('days')} style={inp} min={1} /></F>
            <F label="Nights" full={false}><input type="number" value={form.nights} onChange={s('nights')} style={inp} min={0} /></F>
            <F label="Difficulty" full={false}>
              <select value={form.difficulty} onChange={s('difficulty')} style={sel}>{['Easy','Moderate','Strenuous'].map(d => <option key={d}>{d}</option>)}</select>
            </F>
            <F label="Spots Left" full={false}><input type="number" value={form.spotsLeft} onChange={s('spotsLeft')} style={inp} /></F>
            <F label="Price (PKR)" full={false}><input type="number" value={form.price} onChange={s('price')} style={inp} /></F>
            <F label="Price (USD)" full={false}><input type="number" value={form.priceUsd} onChange={s('priceUsd')} style={inp} /></F>
            <F label="Subtitle"><input value={form.subtitle} onChange={s('subtitle')} style={inp} placeholder="Short one-liner" /></F>
            <F label="Summary"><textarea value={form.summary} onChange={s('summary')} rows={3} style={{ ...inp, resize:'vertical' }} /></F>
          </Grid>
          <Sec>SELLING POINTS</Sec>
          <F label="Highlights"><TagInput value={form.highlights} onChange={t('highlights')} placeholder="e.g. Attabad Lake boat ride" /></F>
          <F label="What's Included"><TagInput value={form.included} onChange={t('included')} placeholder="e.g. Hotel accommodation" /></F>
          <F label="What's Excluded"><TagInput value={form.excluded} onChange={t('excluded')} placeholder="e.g. International flights" /></F>
        </div>
      )}

      {tab === 'itinerary' && (
        <ItineraryEditor days={form.itineraryDays} onChange={t('itineraryDays')} services={services} />
      )}

      {tab === 'media' && (
        <div>
          <Sec>HERO IMAGE</Sec>
          <ImageUpload value={form.heroImage} onChange={v => setForm(f => ({ ...f, heroImage: { url: v.url, id: v._id || v.id } }))} label="Hero Photo" />
          <Sec>PHOTO GALLERY</Sec>
          <GalleryEditor value={form.gallery} onChange={t('gallery')} />
        </div>
      )}

      {tab === 'services' && (
        <div>
          <Sec>PACKAGE-LEVEL SERVICES</Sec>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Overall services for the whole package (separate from per-day itinerary).</p>
          <RefCheckList label="🏨 Accommodations" options={services.accommodations} selected={form.accommodationIds} onChange={t('accommodationIds')} />
          <RefCheckList label="🚙 Vehicles" options={services.vehicles} selected={form.vehicleIds} onChange={t('vehicleIds')} />
          <RefCheckList label="🧭 Tour Guides" options={services.guides} selected={form.guideIds} onChange={t('guideIds')} />
          <RefCheckList label="🍽️ Restaurants" options={services.restaurants} selected={form.restaurantIds} onChange={t('restaurantIds')} />
        </div>
      )}

      {tab === 'seo' && <SeoTab form={form} onChange={nf => setForm(nf)} />}

      {tab === 'settings' && (
        <div>
          <Sec>PUBLISH SETTINGS</Sec>
          <Grid>
            <F label="Status" full={false}>
              <select value={form.status} onChange={s('status')} style={sel}>{['draft','live','hidden'].map(v => <option key={v}>{v}</option>)}</select>
            </F>
            <F label="Priority (lower = first)" full={false}><input type="number" value={form.priority} onChange={s('priority')} style={inp} /></F>
            <F label="Rating (0–5)" full={false}><input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={s('rating')} style={inp} /></F>
            <F label="Review Count" full={false}><input type="number" value={form.reviewCount} onChange={s('reviewCount')} style={inp} /></F>
          </Grid>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 8 }}>
            <Tog label="Featured" v={form.featured} onChange={t('featured')} />
            <Tog label="Show on Homepage" v={form.showOnHome} onChange={t('showOnHome')} />
          </div>
        </div>
      )}
    </SlidePanel>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PackagesPage() {
  const [packages, setPackages] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [modal, setModal] = React.useState(null)
  const [filter, setFilter] = React.useState('all')
  const [search, setSearch] = React.useState('')
  const [deleting, setDeleting] = React.useState(null)
  const [toggling, setToggling] = React.useState(null)
  const [services, setServices] = React.useState({ accommodations: [], vehicles: [], guides: [], restaurants: [] })

  React.useEffect(() => {
    fetchPackages()
    fetch('/api/admin/services').then(r => r.json()).then(d => setServices({ accommodations: d.accommodations || [], vehicles: d.vehicles || [], guides: d.guides || [], restaurants: d.restaurants || [] }))
  }, [])

  async function fetchPackages() {
    setLoading(true)
    const res = await fetch('/api/admin/packages')
    const data = await res.json()
    setPackages(data.packages || [])
    setLoading(false)
  }

  async function deletePackage(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    await fetch('/api/admin/packages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setPackages(ps => ps.filter(p => p._id !== id))
    setDeleting(null)
  }

  async function quickToggle(id, field, value) {
    setToggling(id + field)
    await fetch('/api/admin/packages', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, fields: { [field]: value } }) })
    setPackages(ps => ps.map(p => p._id === id ? { ...p, [field]: value } : p))
    setToggling(null)
  }

  const filtered = packages
    .filter(p => filter === 'all' || p.status === filter)
    .filter(p => !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.region?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 36px)' }}>
      {modal && <PackagePanel pkg={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSaved={() => { setModal(null); fetchPackages() }} services={services} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 26px)', margin: 0, fontWeight: 700 }}>📦 Packages <span style={{ fontSize: 14, color: '#888', fontWeight: 400 }}>({packages.length})</span></h1>
        <button onClick={() => setModal('new')}
          style={{ padding: '10px 20px', background: '#e8822e', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em' }}>
          + NEW PACKAGE
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search packages..."
          style={{ padding: '8px 12px', border: '1px solid #ddd', fontSize: 13, flex: '1 1 180px', outline: 'none' }} />
        {['all','live','draft','hidden'].map(st => (
          <button key={st} onClick={() => setFilter(st)}
            style={{ padding: '7px 14px', border: '1px solid', fontSize: 11, fontFamily: 'monospace', cursor: 'pointer', flexShrink: 0,
              background: filter === st ? '#0d1f24' : 'white', color: filter === st ? '#f5efe4' : '#555', borderColor: filter === st ? '#0d1f24' : '#ddd' }}>
            {st.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {filtered.map(p => (
            <div key={p._id} style={{ background: 'white', border: '1px solid #e8e4de', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div style={{ width: 60, height: 50, flexShrink: 0, background: '#f0ece6', overflow: 'hidden' }}>
                {p.heroImage?.asset?.url && <img src={p.heroImage.asset.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                  {[p.region, p.days && `${p.days}d`, p.difficulty, p.itineraryDays?.length && `${p.itineraryDays.length} day plan`, p.price && `PKR ${Number(p.price).toLocaleString()}`].filter(Boolean).join(' · ')}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, padding: '3px 10px', fontFamily: 'monospace', fontWeight: 700, background: `${STATUS_COLOR[p.status]}18`, color: STATUS_COLOR[p.status] }}>{p.status?.toUpperCase()}</span>
                <Tog2 label="Featured" v={p.featured} disabled={toggling === p._id + 'featured'} onChange={v => quickToggle(p._id, 'featured', v)} />
                <Tog2 label="Home" v={p.showOnHome} disabled={toggling === p._id + 'showOnHome'} onChange={v => quickToggle(p._id, 'showOnHome', v)} />
                <button onClick={() => setModal(p)} style={{ padding: '6px 12px', border: '1px solid #2d7a6e', background: 'white', color: '#2d7a6e', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace' }}>EDIT</button>
                <a href={`/packages/${p.slug}`} target="_blank" style={{ fontSize: 11, color: '#888', fontFamily: 'monospace', textDecoration: 'none' }}>VIEW</a>
                <button onClick={() => deletePackage(p._id, p.title)} disabled={deleting === p._id}
                  style={{ padding: '6px 12px', border: '1px solid #fcc', background: 'white', color: '#c0392b', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace', opacity: deleting === p._id ? 0.5 : 1 }}>DELETE</button>
              </div>
            </div>
          ))}
          {!filtered.length && <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>No packages found.</div>}
        </div>
      )}
    </div>
  )
}

function Tog2({ label, v, onChange, disabled }) {
  return (
    <button onClick={() => onChange(!v)} disabled={disabled}
      style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: v ? '#27ae60' : '#bbb', fontFamily: 'monospace', padding: 0, opacity: disabled ? 0.5 : 1 }}>
      <span style={{ width: 26, height: 14, borderRadius: 7, background: v ? '#27ae60' : '#ddd', position: 'relative', display: 'inline-block', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 2, left: v ? 13 : 2, width: 10, height: 10, borderRadius: '50%', background: 'white', transition: 'left 0.15s' }} />
      </span>
      {label}
    </button>
  )
}

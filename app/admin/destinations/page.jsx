'use client'
import React from 'react'
import { Tog, ItemRow, PageHeader, SearchBar, ImageUpload, inp, sel } from '@/components/admin/CrudPage'

// ── Shared field wrapper ────────────────────────────────────────────────────
function F({ label, req, children, span2 = true }) {
  return (
    <div style={{ gridColumn: span2 ? 'span 2' : 'span 1', marginBottom: 14 }}>
      <label style={{ display: 'block', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.1em', color: '#888', marginBottom: 5 }}>
        {label.toUpperCase()}{req && <span style={{ color: '#e8822e' }}> *</span>}
      </label>
      {children}
    </div>
  )
}

function Grid({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>{children}</div>
}

function SectionTitle({ children }) {
  return <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.16em', color: '#e8822e', marginBottom: 16, marginTop: 24, paddingBottom: 8, borderBottom: '1px solid #f0ece6' }}>{children}</div>
}

// ── Multi-image gallery editor ──────────────────────────────────────────────
function GalleryEditor({ value = [], onChange }) {
  async function addImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data._id) onChange([...value, { image: { url: data.url, id: data._id }, caption: '' }])
  }
  function updateCaption(i, caption) {
    onChange(value.map((g, j) => j === i ? { ...g, caption } : g))
  }
  function remove(i) { onChange(value.filter((_, j) => j !== i)) }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, marginBottom: 12 }}>
        {value.map((g, i) => (
          <div key={i} style={{ border: '1px solid #ddd', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 100 }}>
              <img src={g.image?.url || g.image?.asset?.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button type="button" onClick={() => remove(i)}
                style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(192,57,43,0.85)', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12, lineHeight: 1 }}>×</button>
            </div>
            <input value={g.caption || ''} onChange={e => updateCaption(i, e.target.value)} placeholder="Caption..."
              style={{ ...inp, border: 'none', borderTop: '1px solid #ddd', fontSize: 11, padding: '5px 8px' }} />
          </div>
        ))}
        <label style={{ border: '2px dashed #ddd', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#888', fontSize: 12, fontFamily: 'monospace' }}>
          + ADD
          <input type="file" accept="image/*" onChange={addImage} style={{ display: 'none' }} />
        </label>
      </div>
    </div>
  )
}

// ── Videos editor ─────────────────────────────────────────────────────────
function VideosEditor({ value = [], onChange }) {
  function add() { onChange([...value, { title: '', youtubeUrl: '', caption: '' }]) }
  function update(i, k, v) { onChange(value.map((x, j) => j === i ? { ...x, [k]: v } : x)) }
  function remove(i) { onChange(value.filter((_, j) => j !== i)) }
  return (
    <div>
      {value.map((v, i) => (
        <div key={i} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 10, background: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace' }}>REMOVE</button>
          </div>
          <Grid>
            <F label="Title" span2={false}><input value={v.title || ''} onChange={e => update(i, 'title', e.target.value)} style={inp} placeholder="Video title" /></F>
            <F label="Caption" span2={false}><input value={v.caption || ''} onChange={e => update(i, 'caption', e.target.value)} style={inp} placeholder="Optional caption" /></F>
            <F label="YouTube URL"><input value={v.youtubeUrl || ''} onChange={e => update(i, 'youtubeUrl', e.target.value)} style={inp} placeholder="https://youtube.com/watch?v=..." /></F>
          </Grid>
        </div>
      ))}
      <button type="button" onClick={add}
        style={{ padding: '8px 16px', border: '1px dashed #aaa', background: 'white', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace', color: '#555' }}>
        + ADD VIDEO
      </button>
    </div>
  )
}

// ── FAQs editor ────────────────────────────────────────────────────────────
function FaqsEditor({ value = [], onChange }) {
  function add() { onChange([...value, { question: '', answer: '' }]) }
  function update(i, k, v) { onChange(value.map((x, j) => j === i ? { ...x, [k]: v } : x)) }
  function remove(i) { onChange(value.filter((_, j) => j !== i)) }
  return (
    <div>
      {value.map((faq, i) => (
        <div key={i} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>FAQ {i + 1}</span>
            <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: 11 }}>REMOVE</button>
          </div>
          <F label="Question"><input value={faq.question || ''} onChange={e => update(i, 'question', e.target.value)} style={inp} /></F>
          <F label="Answer"><textarea value={faq.answer || ''} onChange={e => update(i, 'answer', e.target.value)} rows={3} style={{ ...inp, resize: 'vertical' }} /></F>
        </div>
      ))}
      <button type="button" onClick={add}
        style={{ padding: '8px 16px', border: '1px dashed #aaa', background: 'white', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace', color: '#555' }}>
        + ADD FAQ
      </button>
    </div>
  )
}

// ── Reference multi-select ─────────────────────────────────────────────────
function RefSelect({ label, options, selected = [], onChange }) {
  const isSelected = (id) => selected.includes(id)
  const toggle = (id) => onChange(isSelected(id) ? selected.filter(x => x !== id) : [...selected, id])
  return (
    <div>
      <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.1em', color: '#888', marginBottom: 8 }}>{label.toUpperCase()}</div>
      <div style={{ border: '1px solid #ddd', maxHeight: 200, overflowY: 'auto' }}>
        {options.length === 0 && <div style={{ padding: '12px 14px', fontSize: 12, color: '#aaa' }}>No items found</div>}
        {options.map(o => (
          <label key={o._id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderBottom: '1px solid #f5f0e8', cursor: 'pointer', background: isSelected(o._id) ? '#fdf8f2' : 'white' }}>
            <input type="checkbox" checked={isSelected(o._id)} onChange={() => toggle(o._id)} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 13 }}>{o.name || o.title}</span>
          </label>
        ))}
      </div>
      {selected.length > 0 && <div style={{ fontSize: 11, color: '#888', marginTop: 4, fontFamily: 'monospace' }}>{selected.length} selected</div>}
    </div>
  )
}

// ── Tabs ──────────────────────────────────────────────────────────────────
const TABS = [
  { key: 'content',   label: '📝 Content'         },
  { key: 'media',     label: '🖼️ Media'            },
  { key: 'landmarks', label: '📍 Famous Places'    },
  { key: 'services',  label: '🔗 Linked Services'  },
  { key: 'seo',       label: '🔍 SEO & FAQs'       },
  { key: 'settings',  label: '⚙️ Settings'         },
]

// ── Destination Modal ──────────────────────────────────────────────────────
function DestModal({ item, onClose, onSaved, allLandmarks, allServices }) {
  const isEdit = !!item?._id
  const [tab, setTab] = React.useState('content')
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState('')

  const [form, setForm] = React.useState({
    name:           item?.name || '',
    tagline:        item?.tagline || '',
    summary:        item?.summary || '',
    bestSeason:     item?.bestSeason || '',
    elevationRange: item?.elevationRange || '',
    climate:        item?.climate || '',
    travelTime:     item?.travelTime || '',
    // Location
    city:      item?.location?.city || '',
    region:    item?.location?.region || '',
    country:   item?.location?.country || 'Pakistan',
    placeName: item?.location?.placeName || '',
    address:   item?.location?.address || '',
    lat:       item?.location?.lat || '',
    lng:       item?.location?.lng || '',
    mapsUrl:   item?.location?.googleMapsUrl || '',
    // Media
    heroImage: item?.heroImage?.asset ? { url: item.heroImage.asset.url, id: item.heroImage.asset._id } : null,
    gallery:   (item?.gallery || []).map(g => ({ image: { url: g.image?.asset?.url, id: g.image?.asset?._id }, caption: g.caption || '' })),
    videos:    item?.videos || [],
    // References (store as arrays of IDs)
    landmarkIds:      (item?.landmarks || []).map(l => l._id),
    accommodationIds: (item?.accommodations || []).map(a => a._id),
    restaurantIds:    (item?.restaurants || []).map(r => r._id),
    guideIds:         (item?.guides || []).map(g => g._id),
    vehicleIds:       (item?.vehicles || []).map(v => v._id),
    // FAQs
    faqs: item?.faqs || [],
    // SEO
    metaTitle:       item?.seo?.metaTitle || '',
    metaDescription: item?.seo?.metaDescription || '',
    focusKeywords:   item?.seo?.focusKeywords || '',
    // Settings
    status:   item?.status || 'draft',
    featured: !!item?.featured,
  })

  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const t = k => v => setForm(f => ({ ...f, [k]: v }))

  async function save(e) {
    e.preventDefault()
    if (!form.name) { setError('Name is required'); setTab('content'); return }
    setSaving(true); setError('')

    const payload = {
      name: form.name, tagline: form.tagline, summary: form.summary,
      bestSeason: form.bestSeason, elevationRange: form.elevationRange,
      climate: form.climate, travelTime: form.travelTime,
      location: { city: form.city, region: form.region, country: form.country, placeName: form.placeName, address: form.address, lat: form.lat ? Number(form.lat) : undefined, lng: form.lng ? Number(form.lng) : undefined, googleMapsUrl: form.mapsUrl },
      heroImageId: form.heroImage?.id || null,
      gallery: form.gallery.map(g => ({ image: g.image?.id ? { _type: 'mediaImage', asset: { _type: 'reference', _ref: g.image.id } } : null, caption: g.caption })).filter(g => g.image),
      videos: form.videos,
      landmarkIds: form.landmarkIds,
      accommodationIds: form.accommodationIds,
      restaurantIds: form.restaurantIds,
      guideIds: form.guideIds,
      vehicleIds: form.vehicleIds,
      faqs: form.faqs,
      seo: { metaTitle: form.metaTitle, metaDescription: form.metaDescription, focusKeywords: form.focusKeywords },
      status: form.status,
      featured: form.featured,
    }

    const res = await fetch('/api/admin/crud', {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit ? { id: item._id, fields: payload } : { _type: 'destination', ...payload }),
    })
    const data = await res.json()
    setSaving(false)
    if (data.success || data._id) onSaved()
    else setError(data.error || 'Save failed')
  }

  const tabStyle = (k) => ({
    padding: '10px 16px', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'nowrap',
    background: tab === k ? '#0d1f24' : 'transparent',
    color: tab === k ? '#f5efe4' : 'rgba(245,239,228,0.6)',
    borderBottom: tab === k ? '2px solid #e8822e' : '2px solid transparent',
  })

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end' }}>
      <div style={{ background: 'white', width: '100%', maxWidth: 760, display: 'flex', flexDirection: 'column', height: '100vh' }}>

        {/* Header */}
        <div style={{ background: '#0d1f24', padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h2 style={{ margin: 0, color: '#f5efe4', fontSize: 17 }}>{isEdit ? `✏️ ${item.name}` : '➕ New Destination'}</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={save} disabled={saving}
              style={{ padding: '8px 20px', background: '#e8822e', color: 'white', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.1em', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'SAVING...' : 'SAVE'}
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#f5efe4', cursor: 'pointer', fontSize: 22 }}>×</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: '#0d1f24', display: 'flex', overflowX: 'auto', flexShrink: 0 }}>
          {TABS.map(t => <button key={t.key} type="button" onClick={() => setTab(t.key)} style={tabStyle(t.key)}>{t.label}</button>)}
        </div>

        {error && <div style={{ padding: '10px 22px', background: '#fff0eb', color: '#c0392b', fontSize: 13, flexShrink: 0 }}>{error}</div>}

        {/* Tab content */}
        <form onSubmit={save} style={{ flex: 1, overflowY: 'auto', padding: 22 }}>

          {/* ── CONTENT ── */}
          {tab === 'content' && (
            <div>
              <SectionTitle>BASIC INFO</SectionTitle>
              <Grid>
                <F label="Name" req><input value={form.name} onChange={s('name')} style={inp} required /></F>
                <F label="Tagline"><input value={form.tagline} onChange={s('tagline')} style={inp} placeholder="The valleys of kings..." /></F>
                <F label="Best Season" span2={false}><input value={form.bestSeason} onChange={s('bestSeason')} style={inp} placeholder="May – September" /></F>
                <F label="Elevation Range" span2={false}><input value={form.elevationRange} onChange={s('elevationRange')} style={inp} placeholder="2,000m – 8,000m" /></F>
                <F label="Climate" span2={false}><input value={form.climate} onChange={s('climate')} style={inp} placeholder="Alpine / Arid" /></F>
                <F label="Travel Time from Islamabad" span2={false}><input value={form.travelTime} onChange={s('travelTime')} style={inp} placeholder="16 hours by road" /></F>
                <F label="Summary"><textarea value={form.summary} onChange={s('summary')} rows={4} style={{ ...inp, resize: 'vertical' }} placeholder="Overview of the destination..." /></F>
              </Grid>

              <SectionTitle>LOCATION</SectionTitle>
              <Grid>
                <F label="Place Name" span2={false}><input value={form.placeName} onChange={s('placeName')} style={inp} placeholder="Hunza Valley" /></F>
                <F label="City / Town" span2={false}><input value={form.city} onChange={s('city')} style={inp} placeholder="Karimabad" /></F>
                <F label="Region" span2={false}><input value={form.region} onChange={s('region')} style={inp} placeholder="Gilgit-Baltistan" /></F>
                <F label="Country" span2={false}><input value={form.country} onChange={s('country')} style={inp} /></F>
                <F label="Address"><textarea value={form.address} onChange={s('address')} rows={2} style={{ ...inp, resize: 'vertical' }} /></F>
                <F label="Latitude" span2={false}><input type="number" step="any" value={form.lat} onChange={s('lat')} style={inp} placeholder="36.3167" /></F>
                <F label="Longitude" span2={false}><input type="number" step="any" value={form.lng} onChange={s('lng')} style={inp} placeholder="74.6500" /></F>
                <F label="Google Maps URL"><input value={form.mapsUrl} onChange={s('mapsUrl')} style={inp} placeholder="https://maps.google.com/..." /></F>
              </Grid>
            </div>
          )}

          {/* ── MEDIA ── */}
          {tab === 'media' && (
            <div>
              <SectionTitle>HERO IMAGE</SectionTitle>
              <ImageUpload value={form.heroImage} onChange={v => setForm(f => ({ ...f, heroImage: { url: v.url, id: v._id || v.id } }))} label="Hero Photo" />

              <SectionTitle>PHOTO GALLERY</SectionTitle>
              <GalleryEditor value={form.gallery} onChange={t('gallery')} />

              <SectionTitle>VIDEOS</SectionTitle>
              <VideosEditor value={form.videos} onChange={t('videos')} />
            </div>
          )}

          {/* ── LANDMARKS ── */}
          {tab === 'landmarks' && (
            <div>
              <SectionTitle>FAMOUS PLACES & LANDMARKS</SectionTitle>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Select landmarks that belong to this destination. Add new ones from <strong>Famous Places & Landmarks</strong> section.</p>
              <RefSelect label="Landmarks" options={allLandmarks} selected={form.landmarkIds} onChange={t('landmarkIds')} />
            </div>
          )}

          {/* ── SERVICES ── */}
          {tab === 'services' && (
            <div>
              <SectionTitle>LINKED SERVICES</SectionTitle>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>Link services to this destination. They'll automatically show on packages using this destination.</p>
              <div style={{ display: 'grid', gap: 20 }}>
                <RefSelect label="🏨 Accommodations" options={allServices.accommodations} selected={form.accommodationIds} onChange={t('accommodationIds')} />
                <RefSelect label="🍽️ Restaurants" options={allServices.restaurants} selected={form.restaurantIds} onChange={t('restaurantIds')} />
                <RefSelect label="🧭 Tour Guides" options={allServices.guides} selected={form.guideIds} onChange={t('guideIds')} />
                <RefSelect label="🚙 Vehicles" options={allServices.vehicles} selected={form.vehicleIds} onChange={t('vehicleIds')} />
              </div>
            </div>
          )}

          {/* ── SEO & FAQs ── */}
          {tab === 'seo' && (
            <div>
              <SectionTitle>SEO</SectionTitle>
              <Grid>
                <F label="Meta Title"><input value={form.metaTitle} onChange={s('metaTitle')} style={inp} placeholder="Hunza Valley – Pakistan Mountain Tours" /></F>
                <F label="Focus Keywords"><input value={form.focusKeywords} onChange={s('focusKeywords')} style={inp} placeholder="hunza valley, pakistan tours" /></F>
                <F label="Meta Description"><textarea value={form.metaDescription} onChange={s('metaDescription')} rows={3} style={{ ...inp, resize: 'vertical' }} placeholder="155 characters max..." /></F>
              </Grid>

              <SectionTitle>FAQs</SectionTitle>
              <FaqsEditor value={form.faqs} onChange={t('faqs')} />
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === 'settings' && (
            <div>
              <SectionTitle>PUBLISH SETTINGS</SectionTitle>
              <Grid>
                <F label="Status" span2={false}>
                  <select value={form.status} onChange={s('status')} style={sel}>
                    {['draft', 'live', 'hidden'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </F>
                <F label=" " span2={false}><div style={{ paddingTop: 24 }}><Tog label="Featured on Homepage" v={form.featured} onChange={t('featured')} /></div></F>
              </Grid>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function DestinationsPage() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [modal, setModal] = React.useState(null)
  const [deleting, setDeleting] = React.useState(null)
  const [search, setSearch] = React.useState('')
  const [allLandmarks, setAllLandmarks] = React.useState([])
  const [allServices, setAllServices] = React.useState({ accommodations: [], restaurants: [], guides: [], vehicles: [] })

  React.useEffect(() => {
    load()
    // Preload all reference options
    fetch('/api/admin/crud?type=landmark').then(r => r.json()).then(d => setAllLandmarks(d.data || []))
    fetch('/api/admin/services').then(r => r.json()).then(d => setAllServices({ accommodations: d.accommodations || [], restaurants: d.restaurants || [], guides: d.guides || [], vehicles: d.vehicles || [] }))
  }, [])

  async function load() {
    setLoading(true)
    const d = await fetch('/api/admin/crud?type=destination').then(r => r.json())
    setItems(d.data || []); setLoading(false)
  }

  async function del(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    await fetch('/api/admin/crud', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setItems(i => i.filter(x => x._id !== id)); setDeleting(null)
  }

  const filtered = items.filter(i => !search || i.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding: 'clamp(16px,4vw,36px)' }}>
      {modal && (
        <DestModal
          item={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load() }}
          allLandmarks={allLandmarks}
          allServices={allServices}
        />
      )}

      <PageHeader title="🗺️ Destinations" count={items.length} onAdd={() => setModal('new')} addLabel="+ NEW DESTINATION" />
      <SearchBar value={search} onChange={setSearch} placeholder="Search destinations..." />

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {filtered.map(item => (
            <ItemRow key={item._id}
              imgUrl={item.heroImage?.asset?.url}
              title={item.name}
              subtitle={[item.tagline, item.bestSeason, item.elevationRange].filter(Boolean).join(' · ')}
              status={item.status}
              onEdit={() => setModal(item)}
              onView={`/destinations/${item.slug}`}
              onDelete={() => del(item._id, item.name)}
              deleting={deleting === item._id}>
              {item.featured && <span style={{ fontSize: 10, color: '#e8822e', fontFamily: 'monospace' }}>★ FEATURED</span>}
              <span style={{ fontSize: 10, color: '#888', fontFamily: 'monospace' }}>
                {[item.landmarks?.length && `${item.landmarks.length} landmarks`, item.accommodations?.length && `${item.accommodations.length} hotels`].filter(Boolean).join(' · ')}
              </span>
            </ItemRow>
          ))}
          {!filtered.length && <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>No destinations.</div>}
        </div>
      )}
    </div>
  )
}

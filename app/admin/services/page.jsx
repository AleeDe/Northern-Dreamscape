'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { ImageUpload } from '@/components/admin/ImageUpload'
import {
  inp, sel, F, Grid, Sec, Tog, TagInput, SeoTab, SettingsTab,
  GalleryEditor, SlidePanel,
} from '@/components/admin/EditorShared'

const TABS_CONFIG = [
  { key: 'accommodations', label: '🏨 Accommodation', _type: 'accommodation', single: 'Accommodation' },
  { key: 'vehicles',       label: '🚙 Vehicles',       _type: 'vehicle',       single: 'Vehicle'       },
  { key: 'guides',         label: '🧭 Guides',         _type: 'guide',         single: 'Guide'         },
  { key: 'restaurants',    label: '🍽️ Restaurants',    _type: 'restaurant',    single: 'Restaurant'    },
]
const HREF = { accommodations:'/accommodation', vehicles:'/vehicles', guides:'/guides', restaurants:'/restaurants' }
const STATUS_COLOR = { live:'#27ae60', draft:'#e8822e', hidden:'#999' }

const EDITOR_TABS = [
  { key:'content',  label:'📝 Content'   },
  { key:'details',  label:'⭐ Details'   },
  { key:'media',    label:'🖼️ Media'      },
  { key:'seo',      label:'🔍 SEO & FAQs' },
  { key:'settings', label:'⚙️ Settings'  },
]

function ServicePanel({ item, _type, onClose, onSaved }) {
  const isEdit = !!item?._id
  const [tab, setTab] = React.useState('content')
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState('')

  const [form, setForm] = React.useState({
    name: item?.name || '',
    city: item?.location?.city || '', region: item?.location?.region || '',
    shortDescription: item?.shortDescription || '',
    price: item?.price || '', currency: item?.currency || 'PKR',
    highlights: item?.highlights || [], included: item?.included || [], excluded: item?.excluded || [],
    cancellationPolicy: item?.cancellationPolicy || '',
    // accommodation
    type: item?.type || '', amenities: item?.amenities || [], houseRules: item?.houseRules || [],
    checkInTime: item?.checkInTime || '', checkOutTime: item?.checkOutTime || '',
    // vehicle
    category: item?.category || '', model: item?.model || '', seats: item?.seats || '', doors: item?.doors || '',
    luggageCapacity: item?.luggageCapacity || '', routesAllowed: item?.routesAllowed || [],
    withDriver: item?.withDriver ?? true, fuelIncluded: item?.fuelIncluded ?? false,
    acAvailable: item?.acAvailable ?? true, insuranceIncluded: item?.insuranceIncluded ?? false,
    // guide
    role: item?.role || '', homeRegion: item?.homeRegion || '', languages: item?.languages || [],
    specialties: item?.specialties || [], experienceYears: item?.experienceYears || '',
    certifications: item?.certifications || [], totalTours: item?.totalTours || '', availability: item?.availability || '',
    // restaurant
    cuisines: item?.cuisines || [], mealTypes: item?.mealTypes || [], priceRange: item?.priceRange || '',
    seatingCapacity: item?.seatingCapacity || '', reservationRequired: item?.reservationRequired ?? false,
    dietaryOptions: item?.dietaryOptions || [], menuHighlights: item?.menuHighlights || [], goodFor: item?.goodFor || [],
    // media
    heroImage: (item?.heroImage?.asset || item?.portrait?.asset) ? { url: (item.heroImage?.asset || item.portrait?.asset).url, id: (item.heroImage?.asset || item.portrait?.asset)._id } : null,
    gallery: (item?.gallery || []).map(g => ({ id: g.asset?._id, url: g.asset?.url })),
    // seo
    faqs: item?.faqs || [], metaTitle: item?.seo?.metaTitle || '', metaDescription: item?.seo?.metaDescription || '', focusKeywords: item?.seo?.focusKeywords || '',
    // settings
    status: item?.status || 'draft', featured: !!item?.featured, bookable: item?.bookable ?? true,
    rating: item?.rating || '', reviewCount: item?.reviewCount || '',
  })

  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const t = k => v => setForm(f => ({ ...f, [k]: v }))

  async function save(e) {
    e?.preventDefault()
    if (!form.name) { setError('Name is required'); setTab('content'); return }
    setSaving(true); setError('')

    const common = {
      name: form.name, city: form.city, region: form.region,
      shortDescription: form.shortDescription, price: form.price, currency: form.currency,
      highlights: form.highlights, included: form.included, excluded: form.excluded,
      cancellationPolicy: form.cancellationPolicy,
      status: form.status, featured: form.featured, bookable: form.bookable,
      rating: form.rating ? Number(form.rating) : undefined,
      reviewCount: form.reviewCount ? Number(form.reviewCount) : undefined,
      gallery: form.gallery.map(g => ({ _type:'mediaImage', _key:g.id, asset:{ _type:'reference', _ref:g.id } })),
      faqs: form.faqs,
      seo: { metaTitle: form.metaTitle, metaDescription: form.metaDescription, focusKeywords: form.focusKeywords },
      [_type === 'guide' ? 'portraitId' : 'heroImageId']: form.heroImage?.id || null,
    }

    const typeSpecific =
      _type === 'accommodation' ? { type: form.type, amenities: form.amenities, houseRules: form.houseRules, checkInTime: form.checkInTime, checkOutTime: form.checkOutTime } :
      _type === 'vehicle' ? { category: form.category, model: form.model, seats: Number(form.seats)||0, doors: Number(form.doors)||undefined, luggageCapacity: form.luggageCapacity, routesAllowed: form.routesAllowed, withDriver: form.withDriver, fuelIncluded: form.fuelIncluded, acAvailable: form.acAvailable, insuranceIncluded: form.insuranceIncluded } :
      _type === 'guide' ? { role: form.role, homeRegion: form.homeRegion, languages: form.languages, specialties: form.specialties, experienceYears: Number(form.experienceYears)||0, certifications: form.certifications, totalTours: Number(form.totalTours)||undefined, availability: form.availability } :
      { cuisines: form.cuisines, mealTypes: form.mealTypes, priceRange: form.priceRange, seatingCapacity: Number(form.seatingCapacity)||undefined, reservationRequired: form.reservationRequired, dietaryOptions: form.dietaryOptions, menuHighlights: form.menuHighlights, goodFor: form.goodFor }

    const payload = { ...common, ...typeSpecific }

    const res = await fetch('/api/admin/services', {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit ? { id: item._id, fields: payload } : { _type, ...payload }),
    })
    const data = await res.json()
    setSaving(false)
    if (data.success || data._id) onSaved()
    else setError(data.error || 'Save failed')
  }

  const single = TABS_CONFIG.find(t => t._type === _type)?.single

  return (
    <SlidePanel title={isEdit ? `✏️ ${item.name}` : `➕ New ${single}`} onClose={onClose} onSave={save} saving={saving}
      tabs={EDITOR_TABS} activeTab={tab} setTab={setTab} error={error}>

      {tab === 'content' && (
        <div>
          <Sec>BASIC INFO</Sec>
          <Grid>
            <F label="Name" req><input value={form.name} onChange={s('name')} style={inp} /></F>
            {_type !== 'guide' && <F label="City" full={false}><input value={form.city} onChange={s('city')} style={inp} placeholder="Gilgit" /></F>}
            {_type !== 'guide' && <F label="Region" full={false}><input value={form.region} onChange={s('region')} style={inp} placeholder="Gilgit-Baltistan" /></F>}
            <F label="Price (PKR)" full={false}><input type="number" value={form.price} onChange={s('price')} style={inp} /></F>
            <F label="Short Description"><textarea value={form.shortDescription} onChange={s('shortDescription')} rows={3} style={{ ...inp, resize:'vertical' }} /></F>
          </Grid>
          <Sec>SELLING POINTS</Sec>
          <F label="Highlights"><TagInput value={form.highlights} onChange={t('highlights')} placeholder="Short selling point" /></F>
          <F label="What's Included"><TagInput value={form.included} onChange={t('included')} /></F>
          <F label="What's Excluded"><TagInput value={form.excluded} onChange={t('excluded')} /></F>
          <F label="Cancellation Policy"><textarea value={form.cancellationPolicy} onChange={s('cancellationPolicy')} rows={2} style={{ ...inp, resize:'vertical' }} /></F>
        </div>
      )}

      {tab === 'details' && (
        <div>
          {_type === 'accommodation' && <>
            <Sec>HOTEL DETAILS</Sec>
            <Grid>
              <F label="Type" full={false}>
                <select value={form.type} onChange={s('type')} style={sel}>
                  <option value="">—</option>
                  {['Hotel','Guesthouse','Lodge','Camp','Heritage stay','Resort'].map(x => <option key={x}>{x}</option>)}
                </select>
              </F>
              <F label="Check-in Time" full={false}><input value={form.checkInTime} onChange={s('checkInTime')} style={inp} placeholder="14:00" /></F>
              <F label="Check-out Time" full={false}><input value={form.checkOutTime} onChange={s('checkOutTime')} style={inp} placeholder="11:00" /></F>
            </Grid>
            <F label="Amenities"><TagInput value={form.amenities} onChange={t('amenities')} placeholder="e.g. WiFi, Heating" /></F>
            <F label="House Rules"><TagInput value={form.houseRules} onChange={t('houseRules')} /></F>
          </>}

          {_type === 'vehicle' && <>
            <Sec>VEHICLE SPECS</Sec>
            <Grid>
              <F label="Category" full={false}>
                <select value={form.category} onChange={s('category')} style={sel}>
                  <option value="">—</option>
                  {['Car','4x4 Jeep','SUV','Coaster','Van','Airport pickup','Motorbike'].map(x => <option key={x}>{x}</option>)}
                </select>
              </F>
              <F label="Model" full={false}><input value={form.model} onChange={s('model')} style={inp} placeholder="Toyota Land Cruiser" /></F>
              <F label="Seats" full={false}><input type="number" value={form.seats} onChange={s('seats')} style={inp} /></F>
              <F label="Doors" full={false}><input type="number" value={form.doors} onChange={s('doors')} style={inp} /></F>
              <F label="Luggage Capacity" full={false}><input value={form.luggageCapacity} onChange={s('luggageCapacity')} style={inp} placeholder="4 large bags" /></F>
            </Grid>
            <F label="Routes Allowed"><TagInput value={form.routesAllowed} onChange={t('routesAllowed')} placeholder="e.g. Skardu" /></F>
            <div style={{ display:'flex', gap:24, flexWrap:'wrap', marginTop:8 }}>
              <Tog label="With Driver" v={form.withDriver} onChange={t('withDriver')} />
              <Tog label="Fuel Included" v={form.fuelIncluded} onChange={t('fuelIncluded')} />
              <Tog label="AC Available" v={form.acAvailable} onChange={t('acAvailable')} />
              <Tog label="Insurance Included" v={form.insuranceIncluded} onChange={t('insuranceIncluded')} />
            </div>
          </>}

          {_type === 'guide' && <>
            <Sec>GUIDE PROFILE</Sec>
            <Grid>
              <F label="Role" full={false}><input value={form.role} onChange={s('role')} style={inp} placeholder="Senior Mountain Guide" /></F>
              <F label="Home Region" full={false}><input value={form.homeRegion} onChange={s('homeRegion')} style={inp} placeholder="Hunza" /></F>
              <F label="Experience (Years)" full={false}><input type="number" value={form.experienceYears} onChange={s('experienceYears')} style={inp} /></F>
              <F label="Total Tours" full={false}><input type="number" value={form.totalTours} onChange={s('totalTours')} style={inp} /></F>
              <F label="Availability" full={false}><input value={form.availability} onChange={s('availability')} style={inp} placeholder="March – October" /></F>
            </Grid>
            <F label="Languages"><TagInput value={form.languages} onChange={t('languages')} placeholder="e.g. English" /></F>
            <F label="Specialties"><TagInput value={form.specialties} onChange={t('specialties')} placeholder="e.g. High-altitude trekking" /></F>
            <F label="Certifications"><TagInput value={form.certifications} onChange={t('certifications')} /></F>
          </>}

          {_type === 'restaurant' && <>
            <Sec>RESTAURANT DETAILS</Sec>
            <Grid>
              <F label="Price Range" full={false}>
                <select value={form.priceRange} onChange={s('priceRange')} style={sel}>
                  <option value="">—</option>
                  {['Budget','Mid-range','Premium','Custom group menu'].map(x => <option key={x}>{x}</option>)}
                </select>
              </F>
              <F label="Seating Capacity" full={false}><input type="number" value={form.seatingCapacity} onChange={s('seatingCapacity')} style={inp} /></F>
            </Grid>
            <F label="Cuisines"><TagInput value={form.cuisines} onChange={t('cuisines')} placeholder="e.g. Balti, Pakistani" /></F>
            <F label="Meal Types"><TagInput value={form.mealTypes} onChange={t('mealTypes')} placeholder="e.g. Lunch, Dinner" /></F>
            <F label="Dietary Options"><TagInput value={form.dietaryOptions} onChange={t('dietaryOptions')} placeholder="e.g. Vegetarian, Halal" /></F>
            <F label="Menu Highlights"><TagInput value={form.menuHighlights} onChange={t('menuHighlights')} /></F>
            <F label="Good For"><TagInput value={form.goodFor} onChange={t('goodFor')} placeholder="e.g. Groups, Families" /></F>
            <div style={{ marginTop:8 }}><Tog label="Reservation Required" v={form.reservationRequired} onChange={t('reservationRequired')} /></div>
          </>}
        </div>
      )}

      {tab === 'media' && (
        <div>
          <Sec>{_type === 'guide' ? 'PORTRAIT' : 'HERO IMAGE'}</Sec>
          <ImageUpload value={form.heroImage} onChange={v => setForm(f => ({ ...f, heroImage: { url:v.url, id:v._id||v.id } }))} label={_type === 'guide' ? 'Profile Photo' : 'Main Photo'} />
          <Sec>PHOTO GALLERY</Sec>
          <GalleryEditor value={form.gallery} onChange={t('gallery')} />
        </div>
      )}

      {tab === 'seo' && <SeoTab form={form} onChange={nf => setForm(nf)} />}

      {tab === 'settings' && <SettingsTab form={form} onChange={nf => setForm(nf)} />}
    </SlidePanel>
  )
}

export default function ServicesPage() {
  return (
    <React.Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>Loading...</div>}>
      <ServicesPageInner />
    </React.Suspense>
  )
}

function ServicesPageInner() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const initial = TABS_CONFIG.find(t => t.key === tabParam || t._type === tabParam)?.key || 'accommodations'

  const [data, setData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState(initial)
  const [modal, setModal] = React.useState(null)
  const [toggling, setToggling] = React.useState(null)
  const [deleting, setDeleting] = React.useState(null)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    const res = await fetch('/api/admin/services')
    setData(await res.json())
    setLoading(false)
  }

  async function quickToggle(id, field, value) {
    setToggling(id + field)
    await fetch('/api/admin/services', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, fields: { [field]: value } }) })
    setData(d => {
      const nd = { ...d }
      Object.keys(nd).forEach(k => { if (Array.isArray(nd[k])) nd[k] = nd[k].map(i => i._id === id ? { ...i, [field]: value } : i) })
      return nd
    })
    setToggling(null)
  }

  async function deleteItem(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    await fetch('/api/admin/services', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setData(d => {
      const nd = { ...d }
      Object.keys(nd).forEach(k => { if (Array.isArray(nd[k])) nd[k] = nd[k].filter(i => i._id !== id) })
      return nd
    })
    setDeleting(null)
  }

  const currentType = TABS_CONFIG.find(t => t.key === activeTab)?._type
  const currentSingle = TABS_CONFIG.find(t => t.key === activeTab)?.single
  const items = (data[activeTab] || []).filter(i =>
    !search || (i.name || '').toLowerCase().includes(search.toLowerCase()) || (i.location?.city || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 36px)' }}>
      {modal && (
        <ServicePanel item={modal === 'new' ? null : modal} _type={currentType}
          onClose={() => setModal(null)} onSaved={() => { setModal(null); fetchData() }} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 26px)', margin: 0, fontWeight: 700 }}>🏨 Services</h1>
        <button onClick={() => setModal('new')}
          style={{ padding: '10px 20px', background: '#e8822e', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em' }}>
          + NEW {currentSingle?.toUpperCase()}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {TABS_CONFIG.map(t => (
          <button key={t.key} onClick={() => { setActiveTab(t.key); setSearch('') }}
            style={{ padding: '9px 16px', border: '1px solid', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'nowrap', flexShrink: 0,
              background: activeTab === t.key ? '#0d1f24' : 'white', color: activeTab === t.key ? '#f5efe4' : '#555', borderColor: activeTab === t.key ? '#0d1f24' : '#ddd' }}>
            {t.label} <span style={{ opacity: 0.6 }}>({(data[t.key] || []).length})</span>
          </button>
        ))}
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
        style={{ padding: '8px 12px', border: '1px solid #ddd', fontSize: 13, width: '100%', marginBottom: 14, outline: 'none', boxSizing: 'border-box' }} />

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {items.map(item => {
            const imgUrl = item.portrait?.asset?.url || item.heroImage?.asset?.url
            return (
              <div key={item._id} style={{ background: 'white', border: '1px solid #e8e4de', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ width: 52, height: 44, flexShrink: 0, background: '#f0ece6', overflow: 'hidden' }}>
                  {imgUrl && <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
                    {[item.location?.city, item.cuisines?.join(', ') || item.languages?.join(', ') || (item.seats && `${item.seats} seats`) || (item.experienceYears && `${item.experienceYears} yrs`), item.price && `PKR ${Number(item.price).toLocaleString()}`].filter(Boolean).join(' · ')}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, padding: '3px 8px', fontFamily: 'monospace', fontWeight: 700, background: `${STATUS_COLOR[item.status] || '#999'}18`, color: STATUS_COLOR[item.status] || '#999' }}>{(item.status || 'draft').toUpperCase()}</span>
                  <Tog2 label="Featured" v={item.featured} disabled={toggling === item._id + 'featured'} onChange={v => quickToggle(item._id, 'featured', v)} />
                  <button onClick={() => setModal(item)} style={{ padding: '5px 10px', border: '1px solid #2d7a6e', background: 'white', color: '#2d7a6e', cursor: 'pointer', fontSize: 10, fontFamily: 'monospace' }}>EDIT</button>
                  <a href={`${HREF[activeTab]}/${item.slug}`} target="_blank" style={{ fontSize: 10, color: '#888', fontFamily: 'monospace', textDecoration: 'none' }}>VIEW</a>
                  <button onClick={() => deleteItem(item._id, item.name)} disabled={deleting === item._id}
                    style={{ padding: '5px 10px', border: '1px solid #fcc', background: 'white', color: '#c0392b', cursor: 'pointer', fontSize: 10, fontFamily: 'monospace', opacity: deleting === item._id ? 0.5 : 1 }}>DEL</button>
                </div>
              </div>
            )
          })}
          {!items.length && <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>No items found.</div>}
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

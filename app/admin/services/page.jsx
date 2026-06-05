'use client'

import React from 'react'
import { ImageUpload } from '@/components/admin/ImageUpload'

const TABS = [
  { key: 'accommodations', label: '🏨 Accommodation', _type: 'accommodation' },
  { key: 'vehicles',       label: '🚙 Vehicles',       _type: 'vehicle'       },
  { key: 'guides',         label: '🧭 Guides',         _type: 'guide'         },
  { key: 'restaurants',    label: '🍽️ Restaurants',    _type: 'restaurant'    },
]
const HREF = { accommodations:'/accommodation', vehicles:'/vehicles', guides:'/guides', restaurants:'/restaurants' }
const STATUS_COLOR = { live:'#27ae60', draft:'#e8822e', hidden:'#999' }

const inp = { width:'100%', padding:'9px 11px', border:'1px solid #ddd', fontSize:13, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }
const sel = { ...inp, background:'white', cursor:'pointer' }

const F = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.1em', color: '#888', marginBottom: 5 }}>{label.toUpperCase()}</label>
    {children}
  </div>
)

function Tog({ label, v, onChange, disabled }) {
  return (
    <button onClick={() => onChange(!v)} disabled={disabled} type="button"
      style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: v ? '#27ae60' : '#bbb', fontFamily: 'monospace', padding: 0, opacity: disabled ? 0.5 : 1 }}>
      <span style={{ width: 26, height: 14, borderRadius: 7, background: v ? '#27ae60' : '#ddd', position: 'relative', display: 'inline-block', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 2, left: v ? 13 : 2, width: 10, height: 10, borderRadius: '50%', background: 'white', transition: 'left 0.15s' }} />
      </span>
      {label}
    </button>
  )
}

function TagInput({ value, onChange, placeholder }) {
  const [txt, setTxt] = React.useState('')
  const tags = Array.isArray(value) ? value : []
  function add() { const v = txt.trim(); if (v) { onChange([...tags, v]); setTxt('') } }
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
        {tags.map((t, i) => (
          <span key={i} style={{ background: '#f0ece6', padding: '3px 8px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
            {t}
            <button type="button" onClick={() => onChange(tags.filter((_, j) => j !== i))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', fontSize: 13, lineHeight: 1, padding: 0 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder={placeholder} style={{ ...inp, flex: 1 }} />
        <button type="button" onClick={add} style={{ padding: '9px 12px', background: '#0d1f24', color: 'white', border: 'none', cursor: 'pointer', fontSize: 11 }}>ADD</button>
      </div>
    </div>
  )
}

function ServiceModal({ item, _type, onClose, onSaved }) {
  const isEdit = !!item?._id
  const [form, setForm] = React.useState({
    name: item?.name || '',
    city: item?.city || '',
    region: item?.region || '',
    shortDescription: item?.shortDescription || '',
    price: item?.price || '',
    currency: item?.currency || 'PKR',
    status: item?.status || 'draft',
    featured: item?.featured || false,
    // Vehicle
    seats: item?.seats || '',
    withDriver: item?.withDriver || false,
    fuelIncluded: item?.fuelIncluded || false,
    acAvailable: item?.acAvailable || false,
    // Guide
    experienceYears: item?.experienceYears || '',
    languages: item?.languages || [],
    availability: item?.availability || '',
    // Restaurant
    cuisines: item?.cuisines || [],
    priceRange: item?.priceRange || '',
    seatingCapacity: item?.seatingCapacity || '',
    reservationRequired: item?.reservationRequired || false,
    // Accommodation
    checkInTime: item?.checkInTime || '',
    checkOutTime: item?.checkOutTime || '',
    // Image
    heroImage: item?.heroImage?.asset ? { url: item.heroImage.asset.url, id: item.heroImage.asset._id } : null,
    portrait: item?.portrait?.asset ? { url: item.portrait.asset.url, id: item.portrait.asset._id } : null,
  })
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState('')

  const set = k => v => setForm(f => ({ ...f, [k]: v }))
  const setE = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const setC = k => e => setForm(f => ({ ...f, [k]: e.target.checked }))

  async function save(e) {
    e.preventDefault()
    if (!form.name) { setError('Name is required'); return }
    setSaving(true); setError('')

    const payload = {
      _type, name: form.name, city: form.city, region: form.region,
      shortDescription: form.shortDescription, price: form.price,
      currency: form.currency, status: form.status, featured: form.featured,
      heroImageId: form.heroImage?.id || null,
      portraitId: form.portrait?.id || null,
      ...(_type === 'vehicle' ? { seats: Number(form.seats) || 0, withDriver: form.withDriver, fuelIncluded: form.fuelIncluded, acAvailable: form.acAvailable } : {}),
      ...(_type === 'guide' ? { experienceYears: Number(form.experienceYears) || 0, languages: form.languages, availability: form.availability } : {}),
      ...(_type === 'restaurant' ? { cuisines: form.cuisines, priceRange: form.priceRange, seatingCapacity: Number(form.seatingCapacity) || 0, reservationRequired: form.reservationRequired } : {}),
      ...(_type === 'accommodation' ? { checkInTime: form.checkInTime, checkOutTime: form.checkOutTime } : {}),
    }

    const res = await fetch('/api/admin/services', {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit ? { id: item._id, fields: payload } : payload),
    })
    const data = await res.json()
    setSaving(false)
    if (data.success || data._id) onSaved()
    else setError(data.error || 'Save failed')
  }

  const typeLabel = { accommodation:'Accommodation', vehicle:'Vehicle', guide:'Guide', restaurant:'Restaurant' }[_type]
  const imgKey = _type === 'guide' ? 'portrait' : 'heroImage'

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 16px', overflowY: 'auto' }}>
      <div style={{ background: 'white', width: '100%', maxWidth: 620, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ background: '#0d1f24', padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: '#f5efe4', fontSize: 16 }}>{isEdit ? '✏️ Edit' : '➕ New'} {typeLabel}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#f5efe4', cursor: 'pointer', fontSize: 22 }}>×</button>
        </div>
        <form onSubmit={save} style={{ padding: 22, maxHeight: '80vh', overflowY: 'auto' }}>
          {error && <div style={{ padding: '10px 14px', background: '#fff0eb', border: '1px solid #fcc', color: '#c0392b', fontSize: 13, marginBottom: 14 }}>{error}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <F label="Name *"><input value={form.name} onChange={setE('name')} style={inp} required /></F>
            </div>
            {_type !== 'guide' && <F label="City"><input value={form.city} onChange={setE('city')} style={inp} placeholder="Gilgit" /></F>}
            {_type !== 'guide' && <F label="Region"><input value={form.region} onChange={setE('region')} style={inp} placeholder="Gilgit-Baltistan" /></F>}
            <F label="Price (PKR)"><input type="number" value={form.price} onChange={setE('price')} style={inp} /></F>
            <F label="Status">
              <select value={form.status} onChange={setE('status')} style={sel}>
                {['draft','live','hidden'].map(s => <option key={s}>{s}</option>)}
              </select>
            </F>
          </div>

          <F label="Short Description">
            <textarea value={form.shortDescription} onChange={setE('shortDescription')} rows={2} style={{ ...inp, resize: 'vertical' }} />
          </F>

          {/* Type-specific fields */}
          {_type === 'vehicle' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
              <F label="Seats"><input type="number" value={form.seats} onChange={setE('seats')} style={inp} /></F>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20 }}>
                {[['withDriver','With Driver'],['fuelIncluded','Fuel Included'],['acAvailable','AC Available']].map(([k,l]) => (
                  <Tog key={k} label={l} v={form[k]} onChange={set(k)} />
                ))}
              </div>
            </div>
          )}

          {_type === 'guide' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
              <F label="Experience (Years)"><input type="number" value={form.experienceYears} onChange={setE('experienceYears')} style={inp} /></F>
              <F label="Availability"><input value={form.availability} onChange={setE('availability')} style={inp} placeholder="Year-round" /></F>
              <div style={{ gridColumn: '1 / -1' }}>
                <F label="Languages">
                  <TagInput value={form.languages} onChange={set('languages')} placeholder="e.g. English" />
                </F>
              </div>
            </div>
          )}

          {_type === 'restaurant' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
              <F label="Price Range"><input value={form.priceRange} onChange={setE('priceRange')} style={inp} placeholder="Budget / Mid / Fine" /></F>
              <F label="Seating Capacity"><input type="number" value={form.seatingCapacity} onChange={setE('seatingCapacity')} style={inp} /></F>
              <div style={{ gridColumn: '1 / -1' }}>
                <F label="Cuisines">
                  <TagInput value={form.cuisines} onChange={set('cuisines')} placeholder="e.g. Pakistani" />
                </F>
              </div>
              <div style={{ paddingTop: 4 }}><Tog label="Reservation Required" v={form.reservationRequired} onChange={set('reservationRequired')} /></div>
            </div>
          )}

          {_type === 'accommodation' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
              <F label="Check-in Time"><input value={form.checkInTime} onChange={setE('checkInTime')} style={inp} placeholder="14:00" /></F>
              <F label="Check-out Time"><input value={form.checkOutTime} onChange={setE('checkOutTime')} style={inp} placeholder="11:00" /></F>
            </div>
          )}

          <F label={_type === 'guide' ? 'Profile Photo' : 'Main Photo'}>
            <ImageUpload
              value={form[imgKey]}
              onChange={v => setForm(f => ({ ...f, [imgKey]: { url: v.url, id: v._id || v.id } }))}
            />
          </F>

          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <Tog label="Featured" v={form.featured} onChange={set('featured')} />
          </div>

          <div style={{ display: 'flex', gap: 10, paddingTop: 14, borderTop: '1px solid #f0ece6' }}>
            <button type="submit" disabled={saving}
              style={{ flex: 1, padding: '11px', background: '#0d1f24', color: '#f5efe4', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'monospace', fontSize: 12, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'SAVING...' : isEdit ? 'SAVE CHANGES' : `CREATE ${_type.toUpperCase()}`}
            </button>
            <button type="button" onClick={onClose}
              style={{ padding: '11px 18px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 }}>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [data, setData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState('accommodations')
  const [modal, setModal] = React.useState(null)
  const [toggling, setToggling] = React.useState(null)
  const [deleting, setDeleting] = React.useState(null)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    const res = await fetch('/api/admin/services')
    const d = await res.json()
    setData(d)
    setLoading(false)
  }

  async function quickToggle(id, field, value) {
    setToggling(id + field)
    await fetch('/api/admin/services', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, fields: { [field]: value } }) })
    setData(d => {
      const nd = { ...d }
      Object.keys(nd).forEach(k => { nd[k] = (nd[k] || []).map(i => i._id === id ? { ...i, [field]: value } : i) })
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
      Object.keys(nd).forEach(k => { nd[k] = (nd[k] || []).filter(i => i._id !== id) })
      return nd
    })
    setDeleting(null)
  }

  const currentType = TABS.find(t => t.key === activeTab)?._type
  const items = (data[activeTab] || []).filter(i =>
    !search || (i.name || '').toLowerCase().includes(search.toLowerCase()) || (i.city || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 36px)' }}>
      {modal && (
        <ServiceModal
          item={modal === 'new' ? null : modal}
          _type={currentType}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); fetchData() }}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 26px)', margin: 0, fontWeight: 700 }}>🏨 Services</h1>
        <button onClick={() => setModal('new')}
          style={{ padding: '10px 20px', background: '#e8822e', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em' }}>
          + NEW {currentType?.toUpperCase()}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {TABS.map(t => (
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
            const imgUrl = item.portrait?.asset?.url || item.portrait?.url || item.heroImage?.asset?.url || item.heroImage?.url
            return (
              <div key={item._id} style={{ background: 'white', border: '1px solid #e8e4de', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ width: 52, height: 44, flexShrink: 0, background: '#f0ece6', overflow: 'hidden' }}>
                  {imgUrl && <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
                    {[item.city, item.cuisines?.join(', ') || item.languages?.join(', ') || (item.seats && `${item.seats} seats`) || (item.experienceYears && `${item.experienceYears} yrs`), item.price && `PKR ${Number(item.price).toLocaleString()}`].filter(Boolean).join(' · ')}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, padding: '3px 8px', fontFamily: 'monospace', fontWeight: 700, background: `${STATUS_COLOR[item.status] || '#999'}18`, color: STATUS_COLOR[item.status] || '#999' }}>
                    {(item.status || 'draft').toUpperCase()}
                  </span>
                  <Tog label="Featured" v={item.featured} disabled={toggling === item._id + 'featured'} onChange={v => quickToggle(item._id, 'featured', v)} />
                  <select value={item.status || 'draft'} onChange={e => quickToggle(item._id, 'status', e.target.value)}
                    style={{ padding: '5px 6px', border: '1px solid #ddd', fontSize: 10, fontFamily: 'monospace', background: 'white', cursor: 'pointer' }}>
                    {['draft','live','hidden'].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <button onClick={() => setModal(item)} style={{ padding: '5px 10px', border: '1px solid #2d7a6e', background: 'white', color: '#2d7a6e', cursor: 'pointer', fontSize: 10, fontFamily: 'monospace' }}>EDIT</button>
                  <a href={`${HREF[activeTab]}/${item.slug}`} target="_blank" style={{ fontSize: 10, color: '#888', fontFamily: 'monospace', textDecoration: 'none' }}>VIEW</a>
                  <button onClick={() => deleteItem(item._id, item.name)} disabled={deleting === item._id}
                    style={{ padding: '5px 10px', border: '1px solid #fcc', background: 'white', color: '#c0392b', cursor: 'pointer', fontSize: 10, fontFamily: 'monospace', opacity: deleting === item._id ? 0.5 : 1 }}>
                    DEL
                  </button>
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

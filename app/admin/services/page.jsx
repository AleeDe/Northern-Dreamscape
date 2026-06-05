'use client'

import React from 'react'

const TABS = [
  { key: 'accommodations', label: '🏨 Accommodation', type: 'accommodation' },
  { key: 'vehicles',       label: '🚙 Vehicles',       type: 'vehicle'       },
  { key: 'guides',         label: '🧭 Guides',         type: 'guide'         },
  { key: 'restaurants',    label: '🍽️ Restaurants',    type: 'restaurant'    },
]

function Toggle({ label, value, onChange, saving }) {
  return (
    <button onClick={() => onChange(!value)} disabled={saving}
      style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: value ? '#27ae60' : '#bbb', fontFamily: 'monospace', padding: 0, opacity: saving ? 0.5 : 1 }}>
      <span style={{ width: 28, height: 15, borderRadius: 8, background: value ? '#27ae60' : '#ddd', position: 'relative', display: 'inline-block', transition: 'background 0.2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 2, left: value ? 14 : 2, width: 11, height: 11, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
      </span>
      {label}
    </button>
  )
}

const STATUS_COLOR = { live: '#27ae60', draft: '#e8822e', hidden: '#999' }

export default function ServicesPage() {
  const [data, setData] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState('accommodations')
  const [saving, setSaving] = React.useState(null)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    const res = await fetch('/api/admin/services')
    const d = await res.json()
    setData(d)
    setLoading(false)
  }

  async function toggle(id, field, value) {
    setSaving(id + field)
    await fetch('/api/admin/services', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, fields: { [field]: value } }),
    })
    setData(d => {
      const updated = { ...d }
      Object.keys(updated).forEach(k => {
        updated[k] = (updated[k] || []).map(item => item._id === id ? { ...item, [field]: value } : item)
      })
      return updated
    })
    setSaving(null)
  }

  const items = (data[activeTab] || []).filter(i =>
    !search || (i.name || '').toLowerCase().includes(search.toLowerCase()) || (i.city || '').toLowerCase().includes(search.toLowerCase())
  )

  const hrefBase = { accommodations: '/accommodation', vehicles: '/vehicles', guides: '/guides', restaurants: '/restaurants' }

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 36px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 26px)', margin: 0, fontWeight: 700 }}>🏨 Services</h1>
        <a href="/studio" target="_blank"
          style={{ padding: '9px 18px', background: '#0d1f24', color: '#f5efe4', textDecoration: 'none', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.1em' }}>
          + ADD IN STUDIO
        </a>
      </div>

      {/* Tabs — scroll on mobile */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            style={{ padding: '9px 16px', border: '1px solid', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'nowrap', flexShrink: 0,
              background: activeTab === t.key ? '#0d1f24' : 'white',
              color: activeTab === t.key ? '#f5efe4' : '#555',
              borderColor: activeTab === t.key ? '#0d1f24' : '#ddd',
            }}>
            {t.label} <span style={{ opacity: 0.6 }}>({(data[t.key] || []).length})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
        style={{ padding: '8px 12px', border: '1px solid #ddd', fontSize: 13, width: '100%', marginBottom: 14, outline: 'none', boxSizing: 'border-box' }} />

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {items.map(item => {
            const imgUrl = item.portrait?.url || item.heroImage?.asset?.url
            return (
              <div key={item._id} style={{ background: 'white', border: '1px solid #e8e4de', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                {/* Thumbnail */}
                <div style={{ width: 52, height: 52, flexShrink: 0, background: '#f0ece6', overflow: 'hidden', borderRadius: 2 }}>
                  {imgUrl && <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>
                    {item.city && `${item.city} · `}
                    {item.cuisines?.join(', ') || item.languages?.join(', ') || (item.seats ? `${item.seats} seats` : '') || (item.experienceYears ? `${item.experienceYears} yrs exp` : '')}
                    {item.rating ? ` · ★ ${item.rating}` : ''}
                  </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, padding: '3px 10px', fontFamily: 'monospace', fontWeight: 700,
                    background: `${STATUS_COLOR[item.status] || '#999'}18`, color: STATUS_COLOR[item.status] || '#999',
                    border: `1px solid ${STATUS_COLOR[item.status] || '#999'}40` }}>
                    {(item.status || 'draft').toUpperCase()}
                  </span>

                  <Toggle label="Featured" value={item.featured} onChange={v => toggle(item._id, 'featured', v)} saving={saving === item._id + 'featured'} />

                  <select value={item.status || 'draft'} onChange={e => toggle(item._id, 'status', e.target.value)}
                    style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: 11, fontFamily: 'monospace', cursor: 'pointer', background: 'white' }}>
                    {['draft','live','hidden'].map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                  </select>

                  <a href={`${hrefBase[activeTab]}/${item.slug}`} target="_blank"
                    style={{ fontSize: 11, color: '#2d7a6e', fontFamily: 'monospace', textDecoration: 'none' }}>VIEW →</a>
                </div>
              </div>
            )
          })}
          {!items.length && (
            <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>No items found.</div>
          )}
        </div>
      )}
    </div>
  )
}

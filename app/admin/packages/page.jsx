'use client'

import React from 'react'
import Link from 'next/link'

const STATUS_COLOR = { live: '#27ae60', draft: '#e8822e', hidden: '#999' }

export default function PackagesPage() {
  const [packages, setPackages] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(null)
  const [filter, setFilter] = React.useState('all')
  const [search, setSearch] = React.useState('')

  React.useEffect(() => { fetchPackages() }, [])

  async function fetchPackages() {
    setLoading(true)
    const res = await fetch('/api/admin/packages')
    const data = await res.json()
    setPackages(data.packages || [])
    setLoading(false)
  }

  async function toggle(id, field, value) {
    setSaving(id + field)
    await fetch('/api/admin/packages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, fields: { [field]: value } }),
    })
    setPackages(ps => ps.map(p => p._id === id ? { ...p, [field]: value } : p))
    setSaving(null)
  }

  const filtered = packages
    .filter(p => filter === 'all' || p.status === filter)
    .filter(p => !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.region?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 36px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 26px)', margin: 0, fontWeight: 700 }}>📦 Packages</h1>
        <a href="/studio/structure/package;__edit__new-package" target="_blank"
          style={{ padding: '9px 18px', background: '#0d1f24', color: '#f5efe4', textDecoration: 'none', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.1em' }}>
          + ADD IN STUDIO
        </a>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search packages..."
          style={{ padding: '8px 12px', border: '1px solid #ddd', fontSize: 13, flex: '1 1 180px', outline: 'none' }} />
        {['all','live','draft','hidden'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '7px 14px', border: '1px solid', fontSize: 11, fontFamily: 'monospace', cursor: 'pointer', flexShrink: 0,
              background: filter === s ? '#0d1f24' : 'white',
              color: filter === s ? '#f5efe4' : '#555',
              borderColor: filter === s ? '#0d1f24' : '#ddd',
            }}>
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {filtered.map(p => (
            <div key={p._id} style={{ background: 'white', border: '1px solid #e8e4de', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              {/* Thumbnail */}
              <div style={{ width: 56, height: 56, flexShrink: 0, background: '#f0ece6', overflow: 'hidden' }}>
                {p.heroImage?.asset?.url && (
                  <img src={p.heroImage.asset.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: '#888' }}>
                  {p.region} · {p.days} days · {p.difficulty}
                  {p.price ? ` · PKR ${p.price.toLocaleString()}` : ''}
                </div>
              </div>

              {/* Status + toggles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, padding: '3px 10px', fontFamily: 'monospace', fontWeight: 700,
                  background: `${STATUS_COLOR[p.status]}18`, color: STATUS_COLOR[p.status], border: `1px solid ${STATUS_COLOR[p.status]}40` }}>
                  {p.status?.toUpperCase()}
                </span>

                <Toggle label="Featured" value={p.featured} onChange={v => toggle(p._id, 'featured', v)} saving={saving === p._id + 'featured'} />
                <Toggle label="Homepage" value={p.showOnHome} onChange={v => toggle(p._id, 'showOnHome', v)} saving={saving === p._id + 'showOnHome'} />

                <select value={p.status} onChange={e => toggle(p._id, 'status', e.target.value)}
                  style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: 11, fontFamily: 'monospace', cursor: 'pointer', background: 'white' }}>
                  {['draft','live','hidden'].map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                </select>

                <a href={`/packages/${p.slug}`} target="_blank"
                  style={{ fontSize: 11, color: '#2d7a6e', fontFamily: 'monospace', textDecoration: 'none' }}>VIEW →</a>
              </div>
            </div>
          ))}
          {!filtered.length && (
            <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>No packages found.</div>
          )}
        </div>
      )}
    </div>
  )
}

function Toggle({ label, value, onChange, saving }) {
  return (
    <button onClick={() => onChange(!value)} disabled={saving}
      style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: value ? '#27ae60' : '#bbb', fontFamily: 'monospace', padding: '4px 0', opacity: saving ? 0.5 : 1 }}>
      <span style={{ width: 28, height: 15, borderRadius: 8, background: value ? '#27ae60' : '#ddd', position: 'relative', display: 'inline-block', transition: 'background 0.2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 2, left: value ? 14 : 2, width: 11, height: 11, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
      </span>
      {label}
    </button>
  )
}

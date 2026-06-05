'use client'

import React from 'react'
import { ImageUpload } from '@/components/admin/ImageUpload'

const STATUS_COLOR = { live:'#27ae60', draft:'#e8822e', hidden:'#999' }
const EMPTY = { title:'', region:'', days:'', nights:'', difficulty:'Easy', season:'', summary:'', price:'', priceUsd:'', currency:'PKR', highlights:'', included:'', excluded:'', status:'draft', featured:false, showOnHome:false, heroImage:null }

// ── Shared field components ────────────────────────────────────────────────────
const F = ({ label, req, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.1em', color: '#888', marginBottom: 5 }}>
      {label.toUpperCase()}{req && <span style={{ color: '#e8822e' }}> *</span>}
    </label>
    {children}
  </div>
)
const inp = { width:'100%', padding:'9px 11px', border:'1px solid #ddd', fontSize:13, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }
const sel = { ...inp, background:'white', cursor:'pointer' }

function TagInput({ value, onChange, placeholder }) {
  const [txt, setTxt] = React.useState('')
  const tags = Array.isArray(value) ? value : (value ? String(value).split('\n').filter(Boolean) : [])
  function add() { const v = txt.trim(); if (v) { onChange([...tags, v]); setTxt('') } }
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
        {tags.map((t, i) => (
          <span key={i} style={{ background: '#f0ece6', padding: '4px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            {t}
            <button type="button" onClick={() => onChange(tags.filter((_, j) => j !== i))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder={placeholder || 'Type and press Enter'} style={{ ...inp, flex: 1 }} />
        <button type="button" onClick={add}
          style={{ padding: '9px 14px', background: '#0d1f24', color: '#f5efe4', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace' }}>
          ADD
        </button>
      </div>
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, userSelect: 'none' }}>
      <span style={{ width: 36, height: 20, borderRadius: 10, background: checked ? '#27ae60' : '#ddd', position: 'relative', display: 'inline-block', transition: 'background 0.2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 3, left: checked ? 18 : 3, width: 14, height: 14, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      </span>
      {label}
    </label>
  )
}

function PackageModal({ pkg, onClose, onSaved }) {
  const isEdit = !!pkg?._id
  const [form, setForm] = React.useState(pkg ? {
    title: pkg.title || '', region: pkg.region || '', days: pkg.days || '', nights: pkg.nights || '',
    difficulty: pkg.difficulty || 'Easy', season: pkg.season || '', summary: pkg.summary || '',
    price: pkg.price || '', priceUsd: pkg.priceUsd || '', currency: pkg.currency || 'PKR',
    highlights: pkg.highlights || [], included: pkg.included || [], excluded: pkg.excluded || [],
    status: pkg.status || 'draft', featured: pkg.featured || false, showOnHome: pkg.showOnHome || false,
    heroImage: pkg.heroImage?.asset ? { url: pkg.heroImage.asset.url, id: pkg.heroImage.asset._id } : null,
  } : { ...EMPTY, highlights: [], included: [], excluded: [] })
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState('')

  const set = k => v => setForm(f => ({ ...f, [k]: v }))
  const setE = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function save(e) {
    e.preventDefault()
    if (!form.title) { setError('Title is required'); return }
    setSaving(true); setError('')
    const payload = {
      ...form,
      heroImageId: form.heroImage?.id || null,
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
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 16px', overflowY: 'auto' }}>
      <div style={{ background: 'white', width: '100%', maxWidth: 680, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ background: '#0d1f24', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: '#f5efe4', fontSize: 17 }}>{isEdit ? '✏️ Edit Package' : '➕ New Package'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#f5efe4', cursor: 'pointer', fontSize: 22 }}>×</button>
        </div>
        <form onSubmit={save} style={{ padding: 24, maxHeight: '80vh', overflowY: 'auto' }}>
          {error && <div style={{ padding: '10px 14px', background: '#fff0eb', border: '1px solid #fcc', color: '#c0392b', fontSize: 13, marginBottom: 16 }}>{error}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <F label="Package Title" req><input value={form.title} onChange={setE('title')} style={inp} placeholder="Hunza Valley in Autumn" /></F>
            </div>
            <F label="Region"><input value={form.region} onChange={setE('region')} style={inp} placeholder="Hunza · Nagar" /></F>
            <F label="Season"><input value={form.season} onChange={setE('season')} style={inp} placeholder="April – October" /></F>
            <F label="Days" req><input type="number" value={form.days} onChange={setE('days')} style={inp} min={1} /></F>
            <F label="Nights"><input type="number" value={form.nights} onChange={setE('nights')} style={inp} min={0} /></F>
            <F label="Difficulty">
              <select value={form.difficulty} onChange={setE('difficulty')} style={sel}>
                {['Easy','Moderate','Strenuous'].map(d => <option key={d}>{d}</option>)}
              </select>
            </F>
            <F label="Status">
              <select value={form.status} onChange={setE('status')} style={sel}>
                {['draft','live','hidden'].map(s => <option key={s}>{s}</option>)}
              </select>
            </F>
            <F label="Price (PKR)"><input type="number" value={form.price} onChange={setE('price')} style={inp} /></F>
            <F label="Price (USD)"><input type="number" value={form.priceUsd} onChange={setE('priceUsd')} style={inp} /></F>
          </div>

          <F label="Summary">
            <textarea value={form.summary} onChange={setE('summary')} rows={3} style={{ ...inp, resize: 'vertical' }} placeholder="Short description..." />
          </F>

          <F label="Hero Photo">
            <ImageUpload value={form.heroImage} onChange={v => setForm(f => ({ ...f, heroImage: { url: v.url, id: v._id || v.id } }))} />
          </F>

          <F label="Highlights (press Enter to add)">
            <TagInput value={form.highlights} onChange={set('highlights')} placeholder="e.g. Attabad Lake visit" />
          </F>
          <F label="Included">
            <TagInput value={form.included} onChange={set('included')} placeholder="e.g. Hotel accommodation" />
          </F>
          <F label="Excluded">
            <TagInput value={form.excluded} onChange={set('excluded')} placeholder="e.g. International flights" />
          </F>

          <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
            <Toggle label="Featured" checked={form.featured} onChange={set('featured')} />
            <Toggle label="Show on Homepage" checked={form.showOnHome} onChange={set('showOnHome')} />
          </div>

          <div style={{ display: 'flex', gap: 10, paddingTop: 16, borderTop: '1px solid #f0ece6' }}>
            <button type="submit" disabled={saving}
              style={{ flex: 1, padding: '12px', background: '#0d1f24', color: '#f5efe4', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'SAVING...' : isEdit ? 'SAVE CHANGES' : 'CREATE PACKAGE'}
            </button>
            <button type="button" onClick={onClose}
              style={{ padding: '12px 20px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 }}>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PackagesPage() {
  const [packages, setPackages] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [modal, setModal] = React.useState(null) // null | 'new' | pkg object
  const [filter, setFilter] = React.useState('all')
  const [search, setSearch] = React.useState('')
  const [deleting, setDeleting] = React.useState(null)
  const [toggling, setToggling] = React.useState(null)

  React.useEffect(() => { fetchPackages() }, [])

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

  function onSaved() { setModal(null); fetchPackages() }

  const filtered = packages
    .filter(p => filter === 'all' || p.status === filter)
    .filter(p => !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.region?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 36px)' }}>
      {modal && <PackageModal pkg={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSaved={onSaved} />}

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
        {['all','live','draft','hidden'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '7px 14px', border: '1px solid', fontSize: 11, fontFamily: 'monospace', cursor: 'pointer', flexShrink: 0,
              background: filter === s ? '#0d1f24' : 'white', color: filter === s ? '#f5efe4' : '#555', borderColor: filter === s ? '#0d1f24' : '#ddd' }}>
            {s.toUpperCase()}
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
                  {[p.region, p.days && `${p.days}d`, p.difficulty, p.price && `PKR ${Number(p.price).toLocaleString()}`].filter(Boolean).join(' · ')}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, padding: '3px 10px', fontFamily: 'monospace', fontWeight: 700, background: `${STATUS_COLOR[p.status]}18`, color: STATUS_COLOR[p.status] }}>
                  {p.status?.toUpperCase()}
                </span>
                <Tog label="Featured" v={p.featured} disabled={toggling === p._id + 'featured'} onChange={v => quickToggle(p._id, 'featured', v)} />
                <Tog label="Home" v={p.showOnHome} disabled={toggling === p._id + 'showOnHome'} onChange={v => quickToggle(p._id, 'showOnHome', v)} />
                <select value={p.status} onChange={e => quickToggle(p._id, 'status', e.target.value)}
                  style={{ padding: '5px 8px', border: '1px solid #ddd', fontSize: 11, fontFamily: 'monospace', background: 'white', cursor: 'pointer' }}>
                  {['draft','live','hidden'].map(s => <option key={s}>{s}</option>)}
                </select>
                <button onClick={() => setModal(p)} style={{ padding: '6px 12px', border: '1px solid #2d7a6e', background: 'white', color: '#2d7a6e', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace' }}>EDIT</button>
                <a href={`/packages/${p.slug}`} target="_blank" style={{ fontSize: 11, color: '#888', fontFamily: 'monospace', textDecoration: 'none' }}>VIEW</a>
                <button onClick={() => deletePackage(p._id, p.title)} disabled={deleting === p._id}
                  style={{ padding: '6px 12px', border: '1px solid #fcc', background: 'white', color: '#c0392b', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace', opacity: deleting === p._id ? 0.5 : 1 }}>
                  DELETE
                </button>
              </div>
            </div>
          ))}
          {!filtered.length && <div style={{ padding: 40, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>No packages found.</div>}
        </div>
      )}
    </div>
  )
}

function Tog({ label, v, onChange, disabled }) {
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

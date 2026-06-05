'use client'
import React from 'react'
import { F, Modal, ItemRow, PageHeader, SearchBar, ImageUpload, inp, sel } from '@/components/admin/CrudPage'

const CATS = ['mountain','lake','valley','fort','village','pass','glacier','park','other']
const CAT_ICONS = { mountain:'⛰️', lake:'🏞️', valley:'🌄', fort:'🏯', village:'🏘️', pass:'🛤️', glacier:'🧊', park:'🌿', other:'📍' }

export default function LandmarksPage() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [modal, setModal] = React.useState(null)
  const [form, setForm] = React.useState({})
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(null)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => { load() }, [])
  async function load() {
    setLoading(true)
    const d = await fetch('/api/admin/crud?type=landmark').then(r => r.json())
    setItems(d.data || []); setLoading(false)
  }

  const EMPTY = { name:'', category:'mountain', description:'', elevation:'', mapsLink:'', bestTimeToVisit:'', travelTip:'', status:'live', heroImage:null }

  function openNew() { setForm(EMPTY); setModal('new') }
  function openEdit(item) {
    setForm({ name:item.name||'', category:item.category||'mountain', description:item.description||'', elevation:item.elevation||'', mapsLink:item.mapsLink||'', bestTimeToVisit:item.bestTimeToVisit||'', travelTip:item.travelTip||'', status:item.status||'live', heroImage: item.heroImage?.asset ? { url:item.heroImage.asset.url, id:item.heroImage.asset._id } : null })
    setModal(item)
  }

  async function save(e) {
    e.preventDefault(); setSaving(true)
    const payload = { ...form, heroImageId: form.heroImage?.id||null }
    const isEdit = modal !== 'new'
    await fetch('/api/admin/crud', { method: isEdit ? 'PATCH':'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(isEdit ? { id:modal._id, fields:payload } : { _type:'landmark', ...payload }) })
    setSaving(false); setModal(null); load()
  }

  async function del(id, name) {
    if (!confirm(`Delete "${name}"?`)) return
    setDeleting(id)
    await fetch('/api/admin/crud', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id }) })
    setItems(i => i.filter(x => x._id!==id)); setDeleting(null)
  }

  const s = k => e => setForm(f => ({ ...f, [k]:e.target.value }))
  const filtered = items.filter(i => !search || i.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding:'clamp(16px,4vw,36px)' }}>
      {modal && <Modal title={modal==='new' ? '➕ New Landmark' : '✏️ Edit Landmark'} onClose={() => setModal(null)} onSubmit={save} saving={saving}>
        <F label="Name" req><input value={form.name} onChange={s('name')} style={inp} required /></F>
        <F label="Category">
          <select value={form.category} onChange={s('category')} style={sel}>
            {CATS.map(c => <option key={c} value={c}>{CAT_ICONS[c]} {c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
          </select>
        </F>
        <F label="Elevation (metres)"><input type="number" value={form.elevation} onChange={s('elevation')} style={inp} /></F>
        <F label="Best Time to Visit"><input value={form.bestTimeToVisit} onChange={s('bestTimeToVisit')} style={inp} placeholder="May – October" /></F>
        <F label="Description"><textarea value={form.description} onChange={s('description')} rows={3} style={{ ...inp, resize:'vertical' }} /></F>
        <F label="Travel Tip"><textarea value={form.travelTip} onChange={s('travelTip')} rows={2} style={{ ...inp, resize:'vertical' }} /></F>
        <F label="Google Maps URL"><input value={form.mapsLink} onChange={s('mapsLink')} style={inp} placeholder="https://maps.google.com/..." /></F>
        <F label="Status">
          <select value={form.status} onChange={s('status')} style={sel}>{['draft','live','hidden'].map(v => <option key={v}>{v}</option>)}</select>
        </F>
        <F label="Photo">
          <ImageUpload value={form.heroImage} onChange={v => setForm(f => ({ ...f, heroImage:{ url:v.url, id:v._id||v.id } }))} />
        </F>
      </Modal>}

      <PageHeader title="📍 Famous Places & Landmarks" count={items.length} onAdd={openNew} addLabel="+ NEW LANDMARK" />
      <SearchBar value={search} onChange={setSearch} placeholder="Search landmarks..." />
      {loading ? <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>Loading...</div> : (
        <div style={{ display:'grid', gap:8 }}>
          {filtered.map(item => (
            <ItemRow key={item._id} imgUrl={item.heroImage?.asset?.url} title={`${CAT_ICONS[item.category]||'📍'} ${item.name}`}
              subtitle={[item.elevation && `${item.elevation}m`, item.bestTimeToVisit].filter(Boolean).join(' · ')} status={item.status}
              onEdit={() => openEdit(item)} onDelete={() => del(item._id, item.name)} deleting={deleting===item._id} />
          ))}
          {!filtered.length && <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>No landmarks.</div>}
        </div>
      )}
    </div>
  )
}

'use client'
import React from 'react'
import { F, Tog, Modal, ItemRow, PageHeader, SearchBar, StatusBadge, ImageUpload, inp, sel } from '@/components/admin/CrudPage'

const EMPTY = { name:'', tagline:'', summary:'', bestSeason:'', elevationRange:'', climate:'', travelTime:'', status:'draft', featured:false, heroImage:null }

function DestForm({ form, setForm }) {
  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const t = k => v => setForm(f => ({ ...f, [k]: v }))
  return (
    <>
      <F label="Name" req><input value={form.name} onChange={s('name')} style={inp} required /></F>
      <F label="Tagline"><input value={form.tagline} onChange={s('tagline')} style={inp} placeholder="The valleys of kings" /></F>
      <F label="Best Season" half><input value={form.bestSeason} onChange={s('bestSeason')} style={inp} placeholder="May – September" /></F>
      <F label="Elevation Range" half><input value={form.elevationRange} onChange={s('elevationRange')} style={inp} placeholder="2,000m – 8,000m" /></F>
      <F label="Climate" half><input value={form.climate} onChange={s('climate')} style={inp} placeholder="Alpine / Arid" /></F>
      <F label="Travel Time from ISB" half><input value={form.travelTime} onChange={s('travelTime')} style={inp} placeholder="16 hours by road" /></F>
      <F label="Summary"><textarea value={form.summary} onChange={s('summary')} rows={3} style={{ ...inp, resize:'vertical' }} /></F>
      <F label="Status" half>
        <select value={form.status} onChange={s('status')} style={sel}>
          {['draft','live','hidden'].map(v => <option key={v}>{v}</option>)}
        </select>
      </F>
      <F label=" " half><div style={{ paddingTop:22 }}><Tog label="Featured on Homepage" v={form.featured} onChange={t('featured')} /></div></F>
      <F label="Hero Photo">
        <ImageUpload value={form.heroImage} onChange={v => setForm(f => ({ ...f, heroImage: { url: v.url, id: v._id||v.id } }))} />
      </F>
    </>
  )
}

export default function DestinationsPage() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [modal, setModal] = React.useState(null)
  const [form, setForm] = React.useState(EMPTY)
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(null)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/crud?type=destination')
    const d = await res.json()
    setItems(d.data || [])
    setLoading(false)
  }

  function openNew() { setForm({ ...EMPTY, heroImage: null }); setModal('new') }
  function openEdit(item) {
    setForm({ name: item.name||'', tagline: item.tagline||'', summary: item.summary||'', bestSeason: item.bestSeason||'', elevationRange: item.elevationRange||'', climate: item.climate||'', travelTime: item.travelTime||'', status: item.status||'draft', featured: !!item.featured, heroImage: item.heroImage?.asset ? { url: item.heroImage.asset.url, id: item.heroImage.asset._id } : null })
    setModal(item)
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, heroImageId: form.heroImage?.id||null }
    const isEdit = modal !== 'new'
    await fetch('/api/admin/crud', { method: isEdit ? 'PATCH' : 'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(isEdit ? { id: modal._id, fields: payload } : { _type:'destination', ...payload }) })
    setSaving(false); setModal(null); load()
  }

  async function del(id, name) {
    if (!confirm(`Delete "${name}"?`)) return
    setDeleting(id)
    await fetch('/api/admin/crud', { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    setItems(i => i.filter(x => x._id !== id)); setDeleting(null)
  }

  const filtered = items.filter(i => !search || i.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding:'clamp(16px,4vw,36px)' }}>
      {modal && <Modal title={modal==='new' ? '➕ New Destination' : '✏️ Edit Destination'} onClose={() => setModal(null)} onSubmit={save} saving={saving}>
        <DestForm form={form} setForm={setForm} />
      </Modal>}
      <PageHeader title="🗺️ Destinations" count={items.length} onAdd={openNew} addLabel="+ NEW DESTINATION" />
      <SearchBar value={search} onChange={setSearch} placeholder="Search destinations..." />
      {loading ? <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>Loading...</div> : (
        <div style={{ display:'grid', gap:8 }}>
          {filtered.map(item => (
            <ItemRow key={item._id} imgUrl={item.heroImage?.asset?.url} title={item.name} subtitle={[item.tagline, item.bestSeason].filter(Boolean).join(' · ')} status={item.status}
              onEdit={() => openEdit(item)} onView={`/destinations/${item.slug}`} onDelete={() => del(item._id, item.name)} deleting={deleting===item._id}>
              {item.featured && <span style={{ fontSize:10, color:'#e8822e', fontFamily:'monospace' }}>★ FEATURED</span>}
            </ItemRow>
          ))}
          {!filtered.length && <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>No destinations.</div>}
        </div>
      )}
    </div>
  )
}

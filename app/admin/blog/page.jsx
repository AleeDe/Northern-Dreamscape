'use client'
import React from 'react'
import { F, Tog, Modal, ItemRow, PageHeader, SearchBar, ImageUpload, inp, sel } from '@/components/admin/CrudPage'

const CATEGORIES = ['Practical','Region','Story','Photography','Guide']

export default function BlogPage() {
  const [items, setItems] = React.useState([])
  const [authors, setAuthors] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [modal, setModal] = React.useState(null)
  const [form, setForm] = React.useState({})
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(null)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    load()
    fetch('/api/admin/crud?type=author').then(r => r.json()).then(d => setAuthors(d.data || []))
  }, [])

  async function load() {
    setLoading(true)
    const d = await fetch('/api/admin/crud?type=blogPost').then(r => r.json())
    setItems(d.data || []); setLoading(false)
  }

  const EMPTY = { title:'', category:'Practical', excerpt:'', status:'draft', featured:false, publishedAt: new Date().toISOString().split('T')[0], authorId:'', heroImage:null }

  function openNew() { setForm(EMPTY); setModal('new') }
  function openEdit(item) {
    setForm({ title:item.title||'', category:item.category||'Practical', excerpt:item.excerpt||'', status:item.status||'draft', featured:!!item.featured, publishedAt:(item.publishedAt||'').split('T')[0], authorId:item.author?._id||'', heroImage: item.heroImage?.asset ? { url:item.heroImage.asset.url, id:item.heroImage.asset._id } : null })
    setModal(item)
  }

  async function save(e) {
    e.preventDefault(); setSaving(true)
    const payload = { ...form, heroImageId:form.heroImage?.id||null }
    const isEdit = modal !== 'new'
    await fetch('/api/admin/crud', { method: isEdit ? 'PATCH':'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(isEdit ? { id:modal._id, fields:payload } : { _type:'blogPost', ...payload }) })
    setSaving(false); setModal(null); load()
  }

  async function del(id, name) {
    if (!confirm(`Delete "${name}"?`)) return
    setDeleting(id)
    await fetch('/api/admin/crud', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id }) })
    setItems(i => i.filter(x => x._id!==id)); setDeleting(null)
  }

  const s = k => e => setForm(f => ({ ...f, [k]:e.target.value }))
  const t = k => v => setForm(f => ({ ...f, [k]:v }))
  const filtered = items.filter(i => !search || i.title?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding:'clamp(16px,4vw,36px)' }}>
      {modal && <Modal title={modal==='new' ? '➕ New Post' : '✏️ Edit Post'} onClose={() => setModal(null)} onSubmit={save} saving={saving}>
        <F label="Title" req><input value={form.title} onChange={s('title')} style={inp} required /></F>
        <F label="Category" half>
          <select value={form.category} onChange={s('category')} style={sel}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </F>
        <F label="Status" half>
          <select value={form.status} onChange={s('status')} style={sel}>
            {['draft','live','hidden'].map(v => <option key={v}>{v}</option>)}
          </select>
        </F>
        <F label="Publish Date" half><input type="date" value={form.publishedAt} onChange={s('publishedAt')} style={inp} /></F>
        <F label="Author" half>
          <select value={form.authorId} onChange={s('authorId')} style={sel}>
            <option value="">— Select author —</option>
            {authors.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
          </select>
        </F>
        <F label="Excerpt"><textarea value={form.excerpt} onChange={s('excerpt')} rows={3} style={{ ...inp, resize:'vertical' }} placeholder="Short summary shown on listing..." /></F>
        <F label=" "><div style={{ paddingTop:8 }}><Tog label="Featured post" v={form.featured} onChange={t('featured')} /></div></F>
        <F label="Cover Photo">
          <ImageUpload value={form.heroImage} onChange={v => setForm(f => ({ ...f, heroImage:{ url:v.url, id:v._id||v.id } }))} />
        </F>
      </Modal>}

      <PageHeader title="📝 Journal / Blog" count={items.length} onAdd={openNew} addLabel="+ NEW POST" />
      <SearchBar value={search} onChange={setSearch} placeholder="Search posts..." />
      {loading ? <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>Loading...</div> : (
        <div style={{ display:'grid', gap:8 }}>
          {filtered.map(item => (
            <ItemRow key={item._id} imgUrl={item.heroImage?.asset?.url} title={item.title}
              subtitle={[item.category, item.author?.name, item.publishedAt?.split('T')[0]].filter(Boolean).join(' · ')} status={item.status}
              onEdit={() => openEdit(item)} onView={`/journal/${item.slug}`} onDelete={() => del(item._id, item.title)} deleting={deleting===item._id}>
              {item.featured && <span style={{ fontSize:10, color:'#e8822e', fontFamily:'monospace' }}>★ FEATURED</span>}
            </ItemRow>
          ))}
          {!filtered.length && <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>No posts.</div>}
        </div>
      )}
    </div>
  )
}

'use client'
import React from 'react'
import { F, Modal, ItemRow, PageHeader, SearchBar, TagInput, ImageUpload, inp } from '@/components/admin/CrudPage'

export default function AuthorsPage() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [modal, setModal] = React.useState(null)
  const [form, setForm] = React.useState({})
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(null)

  React.useEffect(() => { load() }, [])
  async function load() {
    setLoading(true)
    const d = await fetch('/api/admin/crud?type=author').then(r => r.json())
    setItems(d.data || []); setLoading(false)
  }

  const EMPTY = { name:'', role:'', bio:'', expertise:[], avatar:null }

  function openNew() { setForm(EMPTY); setModal('new') }
  function openEdit(item) {
    setForm({ name:item.name||'', role:item.role||'', bio:item.bio||'', expertise:item.expertise||[], avatar: item.avatar?.asset ? { url:item.avatar.asset.url, id:item.avatar.asset._id } : null })
    setModal(item)
  }

  async function save(e) {
    e.preventDefault(); setSaving(true)
    const payload = { ...form, avatarId:form.avatar?.id||null }
    const isEdit = modal !== 'new'
    await fetch('/api/admin/crud', { method: isEdit ? 'PATCH':'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(isEdit ? { id:modal._id, fields:payload } : { _type:'author', ...payload }) })
    setSaving(false); setModal(null); load()
  }

  async function del(id, name) {
    if (!confirm(`Delete "${name}"?`)) return
    setDeleting(id)
    await fetch('/api/admin/crud', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id }) })
    setItems(i => i.filter(x => x._id!==id)); setDeleting(null)
  }

  const s = k => e => setForm(f => ({ ...f, [k]:e.target.value }))

  return (
    <div style={{ padding:'clamp(16px,4vw,36px)' }}>
      {modal && <Modal title={modal==='new' ? '➕ New Author' : '✏️ Edit Author'} onClose={() => setModal(null)} onSubmit={save} saving={saving}>
        <F label="Full Name" req><input value={form.name} onChange={s('name')} style={inp} required /></F>
        <F label="Role"><input value={form.role} onChange={s('role')} style={inp} placeholder="Senior Guide, Writer..." /></F>
        <F label="Bio"><textarea value={form.bio} onChange={s('bio')} rows={3} style={{ ...inp, resize:'vertical' }} /></F>
        <F label="Areas of Expertise">
          <TagInput value={form.expertise} onChange={v => setForm(f => ({ ...f, expertise:v }))} placeholder="e.g. K2 Expeditions" />
        </F>
        <F label="Profile Photo">
          <ImageUpload value={form.avatar} onChange={v => setForm(f => ({ ...f, avatar:{ url:v.url, id:v._id||v.id } }))} />
        </F>
      </Modal>}

      <PageHeader title="✍️ Authors" count={items.length} onAdd={openNew} addLabel="+ NEW AUTHOR" />
      {loading ? <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>Loading...</div> : (
        <div style={{ display:'grid', gap:8 }}>
          {items.map(item => (
            <ItemRow key={item._id} imgUrl={item.avatar?.asset?.url} title={item.name} subtitle={item.role}
              onEdit={() => openEdit(item)} onDelete={() => del(item._id, item.name)} deleting={deleting===item._id} />
          ))}
          {!items.length && <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>No authors.</div>}
        </div>
      )}
    </div>
  )
}

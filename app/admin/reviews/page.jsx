'use client'
import React from 'react'
import { F, Tog, Modal, ItemRow, PageHeader, SearchBar, inp, sel } from '@/components/admin/CrudPage'

const STARS = [1,2,3,4,5]

export default function ReviewsPage() {
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
    const d = await fetch('/api/admin/crud?type=review').then(r => r.json())
    setItems(d.data || []); setLoading(false)
  }

  const EMPTY = { reviewerName:'', rating:5, reviewText:'', reviewDate: new Date().toISOString().split('T')[0], verified:false, nationality:'' }

  function openNew() { setForm(EMPTY); setModal('new') }
  function openEdit(item) {
    setForm({ reviewerName:item.reviewerName||'', rating:item.rating||5, reviewText:item.reviewText||'', reviewDate:item.reviewDate||'', verified:!!item.verified, nationality:item.nationality||'' })
    setModal(item)
  }

  async function save(e) {
    e.preventDefault(); setSaving(true)
    const isEdit = modal !== 'new'
    await fetch('/api/admin/crud', { method: isEdit ? 'PATCH':'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(isEdit ? { id:modal._id, fields:form } : { _type:'review', ...form }) })
    setSaving(false); setModal(null); load()
  }

  async function del(id, name) {
    if (!confirm(`Delete review by "${name}"?`)) return
    setDeleting(id)
    await fetch('/api/admin/crud', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id }) })
    setItems(i => i.filter(x => x._id!==id)); setDeleting(null)
  }

  const s = k => e => setForm(f => ({ ...f, [k]:e.target.value }))
  const t = k => v => setForm(f => ({ ...f, [k]:v }))
  const filtered = items.filter(i => !search || i.reviewerName?.toLowerCase().includes(search.toLowerCase()) || i.relatedTo?.title?.toLowerCase().includes(search.toLowerCase()) || i.relatedTo?.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding:'clamp(16px,4vw,36px)' }}>
      {modal && <Modal title={modal==='new' ? '➕ New Review' : '✏️ Edit Review'} onClose={() => setModal(null)} onSubmit={save} saving={saving}>
        <F label="Reviewer Name" req><input value={form.reviewerName} onChange={s('reviewerName')} style={inp} required /></F>
        <F label="Nationality"><input value={form.nationality} onChange={s('nationality')} style={inp} placeholder="Pakistani" /></F>
        <F label="Rating" half>
          <select value={form.rating} onChange={s('rating')} style={sel}>
            {STARS.map(n => <option key={n} value={n}>{'★'.repeat(n)} ({n}/5)</option>)}
          </select>
        </F>
        <F label="Review Date" half><input type="date" value={form.reviewDate} onChange={s('reviewDate')} style={inp} /></F>
        <F label="Review Text"><textarea value={form.reviewText} onChange={s('reviewText')} rows={4} style={{ ...inp, resize:'vertical' }} /></F>
        <F label=" "><div style={{ paddingTop:8 }}><Tog label="Verified Review" v={form.verified} onChange={t('verified')} /></div></F>
      </Modal>}

      <PageHeader title="⭐ Reviews" count={items.length} onAdd={openNew} addLabel="+ NEW REVIEW" />
      <SearchBar value={search} onChange={setSearch} placeholder="Search by reviewer or service..." />
      {loading ? <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>Loading...</div> : (
        <div style={{ display:'grid', gap:8 }}>
          {filtered.map(item => (
            <ItemRow key={item._id} title={item.reviewerName} imgUrl={undefined}
              subtitle={[`${'★'.repeat(item.rating||0)}`, item.relatedTo?.title||item.relatedTo?.name, item.reviewDate].filter(Boolean).join(' · ')}
              onEdit={() => openEdit(item)} onDelete={() => del(item._id, item.reviewerName)} deleting={deleting===item._id}>
              {item.verified && <span style={{ fontSize:10, color:'#27ae60', fontFamily:'monospace' }}>✓ VERIFIED</span>}
            </ItemRow>
          ))}
          {!filtered.length && <div style={{ padding:40, textAlign:'center', color:'#aaa', background:'white', border:'1px solid #e8e4de' }}>No reviews.</div>}
        </div>
      )}
    </div>
  )
}

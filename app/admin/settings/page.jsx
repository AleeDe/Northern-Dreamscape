'use client'
import React from 'react'
import { ImageUpload, inp } from '@/components/admin/CrudPage'

const F = ({ label, children }) => (
  <div style={{ marginBottom:18 }}>
    <label style={{ display:'block', fontFamily:'monospace', fontSize:10, letterSpacing:'0.1em', color:'#888', marginBottom:6 }}>{label.toUpperCase()}</label>
    {children}
  </div>
)

export default function SettingsPage() {
  const [form, setForm] = React.useState(null)
  const [id, setId] = React.useState(null)
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  React.useEffect(() => { load() }, [])

  async function load() {
    const d = await fetch('/api/admin/crud?type=siteSettings').then(r => r.json())
    const s = d.data
    if (s) {
      setId(s._id)
      setForm({ siteName:s.siteName||'', tagline:s.tagline||'', phone:s.phone||'', email:s.email||'', address:s.address||'', whatsapp:s.whatsapp||'', logoImage: s.logoImage?.asset ? { url:s.logoImage.asset.url, id:s.logoImage.asset._id } : null })
    } else {
      setForm({ siteName:'Northern Dreamscape', tagline:'', phone:'', email:'', address:'', whatsapp:'', logoImage:null })
    }
  }

  async function save(e) {
    e.preventDefault(); setSaving(true); setSaved(false)
    const payload = { ...form, logoImageId: form.logoImage?.id||null }
    if (id) {
      await fetch('/api/admin/crud', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id, fields:payload }) })
    } else {
      await fetch('/api/admin/crud', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ _type:'siteSettings', ...payload }) })
    }
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000)
  }

  const s = k => e => setForm(f => ({ ...f, [k]:e.target.value }))

  if (!form) return <div style={{ padding:40, textAlign:'center', color:'#aaa' }}>Loading...</div>

  return (
    <div style={{ padding:'clamp(16px,4vw,36px)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
        <h1 style={{ fontSize:'clamp(18px,4vw,26px)', margin:0, fontWeight:700 }}>⚙️ Site Settings</h1>
        {saved && <span style={{ color:'#27ae60', fontFamily:'monospace', fontSize:12 }}>✓ SAVED!</span>}
      </div>

      <form onSubmit={save}>
        <div style={{ background:'white', border:'1px solid #e8e4de', padding:28, marginBottom:20 }}>
          <h3 style={{ margin:'0 0 20px', fontSize:15, borderBottom:'1px solid #f0ece6', paddingBottom:12 }}>🏢 General</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 20px' }}>
            <F label="Site Name"><input value={form.siteName} onChange={s('siteName')} style={inp} /></F>
            <F label="Tagline"><input value={form.tagline} onChange={s('tagline')} style={inp} /></F>
          </div>
          <F label="Site Logo">
            <ImageUpload value={form.logoImage} onChange={v => setForm(f => ({ ...f, logoImage:{ url:v.url, id:v._id||v.id } }))} />
          </F>
        </div>

        <div style={{ background:'white', border:'1px solid #e8e4de', padding:28, marginBottom:20 }}>
          <h3 style={{ margin:'0 0 20px', fontSize:15, borderBottom:'1px solid #f0ece6', paddingBottom:12 }}>📞 Contact Details</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 20px' }}>
            <F label="Phone"><input value={form.phone} onChange={s('phone')} style={inp} placeholder="+92 581 245 8910" /></F>
            <F label="Email"><input type="email" value={form.email} onChange={s('email')} style={inp} placeholder="info@northerndreamscape.com" /></F>
            <F label="WhatsApp Number"><input value={form.whatsapp} onChange={s('whatsapp')} style={inp} placeholder="+925812458910" /></F>
            <div />
          </div>
          <F label="Office Address"><textarea value={form.address} onChange={s('address')} rows={2} style={{ ...inp, resize:'vertical' }} placeholder="Jutial, Gilgit · Pakistan" /></F>
        </div>

        <button type="submit" disabled={saving}
          style={{ padding:'13px 32px', background:'#0d1f24', color:'#f5efe4', border:'none', cursor: saving ? 'not-allowed':'pointer', fontFamily:'monospace', fontSize:13, letterSpacing:'0.1em', opacity: saving ? 0.7:1 }}>
          {saving ? 'SAVING...' : 'SAVE SETTINGS'}
        </button>
      </form>
    </div>
  )
}

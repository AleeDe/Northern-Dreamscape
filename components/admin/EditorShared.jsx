'use client'
import React from 'react'

export const inp = { width:'100%', padding:'9px 11px', border:'1px solid #ddd', fontSize:13, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }
export const sel = { ...inp, background:'white', cursor:'pointer' }

export function F({ label, req, children, full = true }) {
  return (
    <div style={{ gridColumn: full ? 'span 2' : 'span 1', marginBottom: 14 }}>
      <label style={{ display:'block', fontFamily:'monospace', fontSize:10, letterSpacing:'0.1em', color:'#888', marginBottom:5 }}>
        {label.toUpperCase()}{req && <span style={{ color:'#e8822e' }}> *</span>}
      </label>
      {children}
    </div>
  )
}

export function Grid({ children, cols = 2 }) {
  return <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols}, 1fr)`, gap:'0 16px' }}>{children}</div>
}

export function Sec({ children }) {
  return <div style={{ fontFamily:'monospace', fontSize:10, letterSpacing:'0.16em', color:'#e8822e', marginBottom:14, marginTop:22, paddingBottom:8, borderBottom:'1px solid #f0ece6' }}>{children}</div>
}

export function Tog({ label, v, onChange }) {
  return (
    <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:13, userSelect:'none' }}>
      <span onClick={() => onChange(!v)}
        style={{ width:34, height:18, borderRadius:9, background:v?'#27ae60':'#ddd', position:'relative', display:'inline-block', transition:'background 0.2s', flexShrink:0, cursor:'pointer' }}>
        <span style={{ position:'absolute', top:2, left:v?17:2, width:14, height:14, borderRadius:'50%', background:'white', transition:'left 0.15s' }} />
      </span>
      {label}
    </label>
  )
}

export function TagInput({ value=[], onChange, placeholder }) {
  const [txt, setTxt] = React.useState('')
  const add = () => { const v=txt.trim(); if(v){ onChange([...value,v]); setTxt('') } }
  return (
    <div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom: value.length?8:0 }}>
        {value.map((t,i) => (
          <span key={i} style={{ background:'#f0ece6', padding:'3px 9px', fontSize:12, display:'flex', alignItems:'center', gap:5 }}>
            {t}
            <button type="button" onClick={() => onChange(value.filter((_,j)=>j!==i))}
              style={{ background:'none', border:'none', cursor:'pointer', color:'#c0392b', fontSize:14, lineHeight:1, padding:0 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <input value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),add())}
          placeholder={placeholder||'Type and press Enter'} style={{ ...inp, flex:1 }} />
        <button type="button" onClick={add} style={{ padding:'9px 12px', background:'#0d1f24', color:'white', border:'none', cursor:'pointer', fontSize:11 }}>ADD</button>
      </div>
    </div>
  )
}

export function FaqsEditor({ value=[], onChange }) {
  const add = () => onChange([...value, { question:'', answer:'' }])
  const upd = (i,k,v) => onChange(value.map((x,j)=>j===i?{...x,[k]:v}:x))
  const rem = (i) => onChange(value.filter((_,j)=>j!==i))
  return (
    <div>
      {value.map((faq,i) => (
        <div key={i} style={{ border:'1px solid #ddd', padding:12, marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontFamily:'monospace', fontSize:11, color:'#888' }}>FAQ {i+1}</span>
            <button type="button" onClick={()=>rem(i)} style={{ background:'none', border:'none', color:'#c0392b', cursor:'pointer', fontSize:11, fontFamily:'monospace' }}>REMOVE</button>
          </div>
          <F label="Question"><input value={faq.question||''} onChange={e=>upd(i,'question',e.target.value)} style={inp} /></F>
          <F label="Answer"><textarea value={faq.answer||''} onChange={e=>upd(i,'answer',e.target.value)} rows={3} style={{ ...inp, resize:'vertical' }} /></F>
        </div>
      ))}
      <button type="button" onClick={add} style={{ padding:'8px 16px', border:'1px dashed #aaa', background:'white', cursor:'pointer', fontSize:12, fontFamily:'monospace', color:'#555' }}>+ ADD FAQ</button>
    </div>
  )
}

export function SeoTab({ form, onChange }) {
  const s = k => e => onChange({ ...form, [k]: e.target.value })
  return (
    <div>
      <Sec>SEO</Sec>
      <Grid>
        <F label="Meta Title"><input value={form.metaTitle||''} onChange={s('metaTitle')} style={inp} placeholder="60 chars max" /></F>
        <F label="Focus Keywords"><input value={form.focusKeywords||''} onChange={s('focusKeywords')} style={inp} /></F>
        <F label="Meta Description"><textarea value={form.metaDescription||''} onChange={s('metaDescription')} rows={3} style={{ ...inp, resize:'vertical' }} placeholder="155 chars max" /></F>
      </Grid>
      <Sec>FAQs</Sec>
      <FaqsEditor value={form.faqs||[]} onChange={v=>onChange({ ...form, faqs:v })} />
    </div>
  )
}

export function SettingsTab({ form, onChange, extras }) {
  const s = k => e => onChange({ ...form, [k]: e.target.value })
  const t = k => v => onChange({ ...form, [k]: v })
  return (
    <div>
      <Sec>PUBLISH SETTINGS</Sec>
      <Grid>
        <F label="Status" full={false}>
          <select value={form.status||'draft'} onChange={s('status')} style={sel}>
            {['draft','live','hidden'].map(v=><option key={v}>{v}</option>)}
          </select>
        </F>
        <F label="Rating (0–5)" full={false}>
          <input type="number" step="0.1" min="0" max="5" value={form.rating||''} onChange={s('rating')} style={inp} />
        </F>
        <F label="Review Count" full={false}>
          <input type="number" min="0" value={form.reviewCount||''} onChange={s('reviewCount')} style={inp} />
        </F>
      </Grid>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap', marginTop:8 }}>
        <Tog label="Featured" v={!!form.featured} onChange={t('featured')} />
        <Tog label="Bookable separately" v={!!form.bookable} onChange={t('bookable')} />
        {extras}
      </div>
    </div>
  )
}

export function GalleryEditor({ value=[], onChange }) {
  async function addImage(e) {
    const file = e.target.files?.[0]; if(!file) return
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method:'POST', body:fd })
    const data = await res.json()
    if(data._id) onChange([...value, { id:data._id, url:data.url }])
  }
  const rem = (i) => onChange(value.filter((_,j)=>j!==i))
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))', gap:8, marginBottom:10 }}>
        {value.map((g,i) => (
          <div key={i} style={{ position:'relative', height:90, border:'1px solid #ddd', overflow:'hidden' }}>
            <img src={g.url||g.asset?.url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <button type="button" onClick={()=>rem(i)}
              style={{ position:'absolute', top:3, right:3, background:'rgba(192,57,43,0.85)', color:'white', border:'none', borderRadius:'50%', width:18, height:18, cursor:'pointer', fontSize:11, lineHeight:1 }}>×</button>
          </div>
        ))}
        <label style={{ border:'2px dashed #ddd', height:90, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#888', fontSize:11, fontFamily:'monospace' }}>
          + ADD
          <input type="file" accept="image/*" onChange={addImage} style={{ display:'none' }} />
        </label>
      </div>
    </div>
  )
}

export function RefCheckList({ label, options=[], selected=[], onChange }) {
  const toggle = id => onChange(selected.includes(id) ? selected.filter(x=>x!==id) : [...selected, id])
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ fontFamily:'monospace', fontSize:10, letterSpacing:'0.1em', color:'#888', marginBottom:6 }}>{label.toUpperCase()}</div>
      <div style={{ border:'1px solid #ddd', maxHeight:180, overflowY:'auto' }}>
        {!options.length && <div style={{ padding:'10px 14px', fontSize:12, color:'#aaa' }}>No items</div>}
        {options.map(o => (
          <label key={o._id} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 14px', borderBottom:'1px solid #f5f0e8', cursor:'pointer', background:selected.includes(o._id)?'#fdf8f2':'white' }}>
            <input type="checkbox" checked={selected.includes(o._id)} onChange={()=>toggle(o._id)} />
            <span style={{ fontSize:13 }}>{o.name||o.title}</span>
          </label>
        ))}
      </div>
      {selected.length>0 && <div style={{ fontSize:11, color:'#888', marginTop:3, fontFamily:'monospace' }}>{selected.length} selected</div>}
    </div>
  )
}

export function SlidePanel({ title, onClose, onSave, saving, tabs, activeTab, setTab, children, error }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:1000, display:'flex', alignItems:'stretch', justifyContent:'flex-end' }}>
      <div style={{ background:'white', width:'100%', maxWidth:780, display:'flex', flexDirection:'column', height:'100vh' }}>
        <div style={{ background:'#0d1f24', padding:'15px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <h2 style={{ margin:0, color:'#f5efe4', fontSize:16 }}>{title}</h2>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={onSave} disabled={saving}
              style={{ padding:'8px 20px', background:'#e8822e', color:'white', border:'none', cursor:saving?'not-allowed':'pointer', fontFamily:'monospace', fontSize:11, letterSpacing:'0.1em', opacity:saving?0.7:1 }}>
              {saving?'SAVING...':'SAVE'}
            </button>
            <button onClick={onClose} style={{ background:'none', border:'none', color:'#f5efe4', cursor:'pointer', fontSize:22 }}>×</button>
          </div>
        </div>
        <div style={{ background:'#0d1f24', display:'flex', overflowX:'auto', flexShrink:0 }}>
          {tabs.map(t => (
            <button key={t.key} type="button" onClick={()=>setTab(t.key)}
              style={{ padding:'10px 15px', border:'none', cursor:'pointer', fontSize:12, fontFamily:'monospace', whiteSpace:'nowrap', background:activeTab===t.key?'rgba(255,255,255,0.1)':'transparent', color:activeTab===t.key?'#f5efe4':'rgba(245,239,228,0.55)', borderBottom:activeTab===t.key?'2px solid #e8822e':'2px solid transparent' }}>
              {t.label}
            </button>
          ))}
        </div>
        {error && <div style={{ padding:'10px 20px', background:'#fff0eb', color:'#c0392b', fontSize:13, flexShrink:0, borderBottom:'1px solid #fcc' }}>{error}</div>}
        <div style={{ flex:1, overflowY:'auto', padding:20 }}>{children}</div>
      </div>
    </div>
  )
}

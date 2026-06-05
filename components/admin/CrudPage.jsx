'use client'
import React from 'react'
import { ImageUpload } from './ImageUpload'

export const inp = { width:'100%', padding:'9px 11px', border:'1px solid #ddd', fontSize:13, fontFamily:'inherit', outline:'none', boxSizing:'border-box' }
export const sel = { ...inp, background:'white', cursor:'pointer' }

export function F({ label, req, half, children }) {
  return (
    <div style={{ marginBottom: 14, gridColumn: half ? 'span 1' : 'span 2' }}>
      <label style={{ display:'block', fontFamily:'monospace', fontSize:10, letterSpacing:'0.1em', color:'#888', marginBottom:5 }}>
        {label.toUpperCase()}{req && <span style={{ color:'#e8822e' }}> *</span>}
      </label>
      {children}
    </div>
  )
}

export function Tog({ label, v, onChange, disabled }) {
  return (
    <label style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer', fontSize:13, userSelect:'none', opacity: disabled ? 0.5 : 1 }}>
      <span onClick={() => !disabled && onChange(!v)}
        style={{ width:34, height:18, borderRadius:9, background: v ? '#27ae60' : '#ddd', position:'relative', display:'inline-block', transition:'background 0.2s', flexShrink:0, cursor:'pointer' }}>
        <span style={{ position:'absolute', top:2, left: v ? 17 : 2, width:14, height:14, borderRadius:'50%', background:'white', transition:'left 0.15s' }} />
      </span>
      {label}
    </label>
  )
}

export function TagInput({ value=[], onChange, placeholder }) {
  const [txt, setTxt] = React.useState('')
  function add() { const v=txt.trim(); if(v){ onChange([...value, v]); setTxt('') } }
  return (
    <div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom: value.length ? 8 : 0 }}>
        {value.map((t,i) => (
          <span key={i} style={{ background:'#f0ece6', padding:'3px 9px', fontSize:12, display:'flex', alignItems:'center', gap:5 }}>
            {t}
            <button type="button" onClick={() => onChange(value.filter((_,j) => j!==i))}
              style={{ background:'none', border:'none', cursor:'pointer', color:'#c0392b', fontSize:14, lineHeight:1, padding:0 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => e.key==='Enter' && (e.preventDefault(), add())}
          placeholder={placeholder || 'Type and press Enter'} style={{ ...inp, flex:1 }} />
        <button type="button" onClick={add}
          style={{ padding:'9px 12px', background:'#0d1f24', color:'white', border:'none', cursor:'pointer', fontSize:11 }}>ADD</button>
      </div>
    </div>
  )
}

export function Modal({ title, onClose, children, onSubmit, saving }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:1000, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'20px 16px', overflowY:'auto' }}>
      <div style={{ background:'white', width:'100%', maxWidth:680, borderRadius:2 }}>
        <div style={{ background:'#0d1f24', padding:'16px 22px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ margin:0, color:'#f5efe4', fontSize:17 }}>{title}</h2>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#f5efe4', cursor:'pointer', fontSize:22 }}>×</button>
        </div>
        <form onSubmit={onSubmit} style={{ padding:22, maxHeight:'80vh', overflowY:'auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 14px' }}>
            {children}
          </div>
          <div style={{ display:'flex', gap:10, paddingTop:16, borderTop:'1px solid #f0ece6', marginTop:8 }}>
            <button type="submit" disabled={saving}
              style={{ flex:1, padding:'12px', background:'#0d1f24', color:'#f5efe4', border:'none', cursor: saving ? 'not-allowed':'pointer', fontFamily:'monospace', fontSize:12, opacity: saving ? 0.7:1 }}>
              {saving ? 'SAVING...' : 'SAVE'}
            </button>
            <button type="button" onClick={onClose}
              style={{ padding:'12px 18px', border:'1px solid #ddd', background:'white', cursor:'pointer', fontFamily:'monospace', fontSize:12 }}>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function StatusBadge({ status }) {
  const c = { live:'#27ae60', draft:'#e8822e', hidden:'#999', published:'#27ae60' }[status] || '#999'
  return (
    <span style={{ fontSize:10, padding:'3px 9px', fontFamily:'monospace', fontWeight:700, background:`${c}18`, color:c, border:`1px solid ${c}40` }}>
      {(status||'draft').toUpperCase()}
    </span>
  )
}

export function ItemRow({ imgUrl, title, subtitle, status, onEdit, onDelete, onView, children, deleting }) {
  return (
    <div style={{ background:'white', border:'1px solid #e8e4de', padding:'12px 16px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
      {imgUrl !== undefined && (
        <div style={{ width:52, height:44, flexShrink:0, background:'#f0ece6', overflow:'hidden' }}>
          {imgUrl && <img src={imgUrl} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />}
        </div>
      )}
      <div style={{ flex:1, minWidth:140 }}>
        <div style={{ fontWeight:600, fontSize:13 }}>{title}</div>
        {subtitle && <div style={{ fontSize:11, color:'#888', marginTop:2 }}>{subtitle}</div>}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
        {status && <StatusBadge status={status} />}
        {children}
        {onEdit && <button onClick={onEdit} style={{ padding:'5px 10px', border:'1px solid #2d7a6e', background:'white', color:'#2d7a6e', cursor:'pointer', fontSize:10, fontFamily:'monospace' }}>EDIT</button>}
        {onView && <a href={onView} target="_blank" style={{ fontSize:10, color:'#888', fontFamily:'monospace', textDecoration:'none' }}>VIEW</a>}
        {onDelete && <button onClick={onDelete} disabled={deleting}
          style={{ padding:'5px 10px', border:'1px solid #fcc', background:'white', color:'#c0392b', cursor:'pointer', fontSize:10, fontFamily:'monospace', opacity: deleting ? 0.5:1 }}>
          DEL
        </button>}
      </div>
    </div>
  )
}

export function PageHeader({ title, count, onAdd, addLabel }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
      <h1 style={{ fontSize:'clamp(18px,4vw,26px)', margin:0, fontWeight:700 }}>
        {title} {count !== undefined && <span style={{ fontSize:14, color:'#888', fontWeight:400 }}>({count})</span>}
      </h1>
      {onAdd && (
        <button onClick={onAdd}
          style={{ padding:'10px 20px', background:'#e8822e', color:'white', border:'none', cursor:'pointer', fontFamily:'monospace', fontSize:12, letterSpacing:'0.1em' }}>
          {addLabel || '+ NEW'}
        </button>
      )}
    </div>
  )
}

export function SearchBar({ value, onChange, placeholder }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'Search...'}
      style={{ padding:'8px 12px', border:'1px solid #ddd', fontSize:13, width:'100%', marginBottom:14, outline:'none', boxSizing:'border-box' }} />
  )
}

export { ImageUpload }

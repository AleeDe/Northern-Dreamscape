'use client'
import React from 'react'

export function ImageUpload({ value, onChange, label = 'Photo' }) {
  const [uploading, setUploading] = React.useState(false)
  const ref = React.useRef()

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data._id) onChange({ id: data._id, url: data.url })
  }

  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', color: '#888', marginBottom: 6 }}>
        {label.toUpperCase()}
      </label>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {value?.url && (
          <img src={value.url} alt="" style={{ width: 72, height: 56, objectFit: 'cover', border: '1px solid #ddd' }} />
        )}
        <div>
          <button type="button" onClick={() => ref.current?.click()}
            style={{ padding: '8px 14px', border: '1px dashed #aaa', background: uploading ? '#f0ece6' : 'white', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: 12, fontFamily: 'monospace', color: '#555' }}>
            {uploading ? 'Uploading...' : value?.url ? 'Change Photo' : '+ Upload Photo'}
          </button>
          <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
          {value?.url && (
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>✓ Uploaded</div>
          )}
        </div>
      </div>
    </div>
  )
}

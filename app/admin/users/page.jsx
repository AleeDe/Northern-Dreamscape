'use client'

import React from 'react'

const ROLES = { admin: '👑 Administrator', editor: '✏️ Editor', bookings: '📋 Bookings Only' }

export default function UsersPage() {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [showAdd, setShowAdd] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(null)
  const [form, setForm] = React.useState({ name: '', email: '', password: '', role: 'editor' })
  const [passwordForm, setPasswordForm] = React.useState({ newPassword: '', confirm: '' })
  const [msg, setMsg] = React.useState('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    setLoading(true)
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    setUsers(data.users || [])
    setLoading(false)
  }

  async function addUser(e) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setSaving(false)
    if (data.success) { setShowAdd(false); setForm({ name: '', email: '', password: '', role: 'editor' }); fetchUsers(); setMsg('User added successfully!') }
    else setMsg(data.error || 'Failed to add user')
  }

  async function toggleActive(userId, isActive) {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, isActive: !isActive }),
    })
    fetchUsers()
  }

  async function changePassword(e) {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirm) { setMsg('Passwords do not match'); return }
    setSaving(true)
    const res = await fetch('/api/admin/set-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: showPassword, newPassword: passwordForm.newPassword }),
    })
    setSaving(false)
    const data = await res.json()
    if (data.success) { setShowPassword(null); setPasswordForm({ newPassword: '', confirm: '' }); setMsg('Password updated!') }
    else setMsg(data.error || 'Failed')
  }

  const inp = (placeholder, value, onChange, type='text') => (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required
      style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: 12 }} />
  )

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, margin: 0, fontWeight: 700 }}>👥 Admin Users</h1>
        <button onClick={() => setShowAdd(true)}
          style={{ padding: '10px 20px', background: '#0d1f24', color: '#f5efe4', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em' }}>
          + ADD USER
        </button>
      </div>

      {msg && <div style={{ padding: '12px 16px', background: '#e8f4f0', border: '1px solid #b2d8d2', fontSize: 13, marginBottom: 20, color: '#1a5c54' }}>{msg}</div>}

      {/* Users table */}
      <div style={{ background: 'white', border: '1px solid #e8e4de' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f6f2' }}>
              {['Name', 'Email', 'Role', 'Last Login', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', color: '#888', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>Loading...</td></tr>
            ) : users.map(u => (
              <tr key={u._id} style={{ borderTop: '1px solid #f0ece6' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: 14 }}>{u.name}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: '#555' }}>{u.email}</td>
                <td style={{ padding: '14px 16px', fontSize: 13 }}>{ROLES[u.role] || u.role}</td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: '#888' }}>
                  {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }) : 'Never'}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: 11, padding: '4px 10px', fontFamily: 'monospace', fontWeight: 700,
                    background: u.isActive ? '#e8f4f014' : '#fff0eb',
                    color: u.isActive ? '#27ae60' : '#c0392b',
                    border: `1px solid ${u.isActive ? '#b2d8d2' : '#fcc'}`,
                  }}>
                    {u.isActive ? '● ACTIVE' : '● DISABLED'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setShowPassword(u._id)}
                      style={{ padding: '6px 12px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace' }}>
                      PASSWORD
                    </button>
                    <button onClick={() => toggleActive(u._id, u.isActive)}
                      style={{ padding: '6px 12px', border: `1px solid ${u.isActive ? '#fcc' : '#b2d8d2'}`, background: 'white', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace', color: u.isActive ? '#c0392b' : '#27ae60' }}>
                      {u.isActive ? 'DISABLE' : 'ENABLE'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: 32, width: 400, maxWidth: '90vw' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 18 }}>Add New User</h3>
            <form onSubmit={addUser}>
              {inp('Full Name', form.name, e => setForm(f => ({ ...f, name: e.target.value })))}
              {inp('Email Address', form.email, e => setForm(f => ({ ...f, email: e.target.value })), 'email')}
              {inp('Password (min 8 chars)', form.password, e => setForm(f => ({ ...f, password: e.target.value })), 'password')}
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', fontSize: 13, marginBottom: 20 }}>
                {Object.entries(ROLES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" disabled={saving}
                  style={{ flex: 1, padding: '12px', background: '#0d1f24', color: '#f5efe4', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 }}>
                  {saving ? 'SAVING...' : 'ADD USER'}
                </button>
                <button type="button" onClick={() => setShowAdd(false)}
                  style={{ padding: '12px 20px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 }}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPassword && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: 32, width: 380, maxWidth: '90vw' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 18 }}>Change Password</h3>
            <form onSubmit={changePassword}>
              {inp('New Password (min 8 chars)', passwordForm.newPassword, e => setPasswordForm(f => ({ ...f, newPassword: e.target.value })), 'password')}
              {inp('Confirm Password', passwordForm.confirm, e => setPasswordForm(f => ({ ...f, confirm: e.target.value })), 'password')}
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" disabled={saving}
                  style={{ flex: 1, padding: '12px', background: '#0d1f24', color: '#f5efe4', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 }}>
                  {saving ? 'SAVING...' : 'UPDATE'}
                </button>
                <button type="button" onClick={() => setShowPassword(null)}
                  style={{ padding: '12px 20px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 }}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

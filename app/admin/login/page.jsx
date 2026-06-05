'use client'

import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const { data: session } = useSession()
  const [form, setForm] = React.useState({ email: '', password: '' })
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (session) router.push('/admin')
  }, [session, router])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) setError('Invalid email or password.')
    else router.push('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1f24', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#f5efe4', fontWeight: 500, letterSpacing: '-0.01em' }}>
            Northern Dreamscape
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(245,239,228,0.4)', letterSpacing: '0.16em', marginTop: 6 }}>
            ADMIN DASHBOARD
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#f5efe4', padding: '36px 32px' }}>
          <h2 style={{ fontSize: 22, margin: '0 0 28px', fontFamily: 'Georgia, serif' }}>Sign in</h2>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', color: '#5a6e73', marginBottom: 6 }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email" required autoFocus
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', background: 'white' }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', color: '#5a6e73', marginBottom: 6 }}>
              PASSWORD
            </label>
            <input
              type="password" required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', background: 'white' }}
            />
          </div>

          {error && (
            <div style={{ background: '#fff0eb', border: '1px solid #fcc', padding: '10px 14px', fontSize: 13, color: '#c0392b', marginBottom: 18 }}>
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', background: '#0d1f24', color: '#f5efe4', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 14, fontFamily: 'monospace', letterSpacing: '0.1em', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN →'}
          </button>
        </form>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'

function AdminNav() {
  const { data: session } = useSession()
  const path = usePathname()
  const role = session?.user?.role

  const links = [
    { href: '/admin',          label: '🏠 Overview',  roles: ['admin', 'editor', 'bookings'] },
    { href: '/admin/bookings', label: '📋 Bookings',  roles: ['admin', 'editor', 'bookings'] },
    { href: '/admin/packages', label: '📦 Packages',  roles: ['admin', 'editor'] },
    { href: '/admin/services', label: '🏨 Services',  roles: ['admin', 'editor'] },
    { href: '/admin/users',    label: '👥 Users',     roles: ['admin'] },
    { href: '/studio',         label: '⚙️ Studio',    roles: ['admin'] },
  ].filter(l => l.roles.includes(role))

  return (
    <aside style={{ width: 220, background: '#0d1f24', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0 }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(245,239,228,0.1)' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: '#f5efe4', fontWeight: 500 }}>Northern Dreamscape</div>
        <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(245,239,228,0.4)', letterSpacing: '0.14em', marginTop: 4 }}>ADMIN PANEL</div>
      </div>

      <nav style={{ flex: 1, padding: '16px 0' }}>
        {links.map(l => {
          const active = path === l.href || (l.href !== '/admin' && path.startsWith(l.href))
          return (
            <Link key={l.href} href={l.href} style={{
              display: 'block', padding: '11px 20px', color: active ? '#f5efe4' : 'rgba(245,239,228,0.55)',
              textDecoration: 'none', fontSize: 13, fontFamily: 'sans-serif',
              background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
              borderLeft: active ? '3px solid #e8822e' : '3px solid transparent',
            }}>
              {l.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(245,239,228,0.1)' }}>
        <div style={{ fontSize: 12, color: 'rgba(245,239,228,0.5)', marginBottom: 4, fontFamily: 'monospace' }}>{session?.user?.name}</div>
        <div style={{ fontSize: 10, color: 'rgba(245,239,228,0.3)', fontFamily: 'monospace', marginBottom: 12, letterSpacing: '0.1em' }}>
          {role?.toUpperCase()}
        </div>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
          style={{ background: 'none', border: '1px solid rgba(245,239,228,0.2)', color: 'rgba(245,239,228,0.55)', cursor: 'pointer', padding: '8px 14px', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em', width: '100%' }}>
          SIGN OUT
        </button>
      </div>
    </aside>
  )
}

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <div style={{ display: 'flex', fontFamily: 'system-ui, sans-serif' }}>
        <AdminNav />
        <main style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#f8f6f2' }}>
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}

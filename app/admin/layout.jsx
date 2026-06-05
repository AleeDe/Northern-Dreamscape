'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut, SessionProvider } from 'next-auth/react'

const NAV_LINKS = [
  { href: '/admin',               label: 'Overview',         icon: '🏠', roles: ['admin','editor','bookings'] },
  { href: '/admin/bookings',      label: 'Bookings',         icon: '📋', roles: ['admin','editor','bookings'] },
  { divider: true },
  { href: '/admin/packages',      label: 'Packages',         icon: '📦', roles: ['admin','editor'] },
  { href: '/admin/destinations',  label: 'Destinations',     icon: '🗺️', roles: ['admin','editor'] },
  { href: '/admin/landmarks',     label: 'Landmarks',        icon: '📍', roles: ['admin','editor'] },
  { divider: true },
  { href: '/admin/services',      label: 'Accommodation',    icon: '🏨', roles: ['admin','editor'] },
  { href: '/admin/vehicles',      label: 'Vehicles',         icon: '🚙', roles: ['admin','editor'] },
  { href: '/admin/guides',        label: 'Tour Guides',      icon: '🧭', roles: ['admin','editor'] },
  { href: '/admin/restaurants',   label: 'Restaurants',      icon: '🍽️', roles: ['admin','editor'] },
  { divider: true },
  { href: '/admin/reviews',       label: 'Reviews',          icon: '⭐', roles: ['admin','editor'] },
  { href: '/admin/blog',          label: 'Journal / Blog',   icon: '📝', roles: ['admin','editor'] },
  { href: '/admin/authors',       label: 'Authors',          icon: '✍️', roles: ['admin','editor'] },
  { divider: true },
  { href: '/admin/settings',      label: 'Site Settings',    icon: '⚙️', roles: ['admin'] },
  { href: '/admin/users',         label: 'Users',            icon: '👥', roles: ['admin'] },
]

function AdminNav({ open, onClose }) {
  const { data: session } = useSession()
  const path = usePathname()
  const role = session?.user?.role

  const links = NAV_LINKS.filter(l => l.divider || l.roles?.includes(role))

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40, display: 'none' }}
          className="admin-overlay" />
      )}

      <aside className={`admin-sidebar${open ? ' open' : ''}`}>
        <div style={{ padding: '20px 18px', borderBottom: '1px solid rgba(245,239,228,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: '#f5efe4', fontWeight: 500 }}>Northern Dreamscape</div>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(245,239,228,0.4)', letterSpacing: '0.14em', marginTop: 3 }}>ADMIN PANEL</div>
          </div>
          <button onClick={onClose} className="admin-close-btn"
            style={{ background: 'none', border: 'none', color: 'rgba(245,239,228,0.5)', cursor: 'pointer', fontSize: 20, padding: 4, display: 'none' }}>
            ✕
          </button>
        </div>

        <nav style={{ flex: 1, padding: '12px 0' }}>
          {links.map((l, i) => {
            if (l.divider) return <div key={i} style={{ height: 1, background: 'rgba(245,239,228,0.08)', margin: '4px 0' }} />
            const active = path === l.href || (l.href !== '/admin' && path.startsWith(l.href))
            return (
              <Link key={l.href} href={l.href} onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 18px', color: active ? '#f5efe4' : 'rgba(245,239,228,0.55)',
                  textDecoration: 'none', fontSize: 12.5,
                  background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                  borderLeft: active ? '3px solid #e8822e' : '3px solid transparent',
                }}>
                <span style={{ fontSize: 15 }}>{l.icon}</span>
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(245,239,228,0.1)' }}>
          <div style={{ fontSize: 12, color: 'rgba(245,239,228,0.6)', marginBottom: 2 }}>{session?.user?.name}</div>
          <div style={{ fontSize: 10, color: 'rgba(245,239,228,0.3)', fontFamily: 'monospace', marginBottom: 10, letterSpacing: '0.1em' }}>
            {role?.toUpperCase()}
          </div>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
            style={{ background: 'none', border: '1px solid rgba(245,239,228,0.2)', color: 'rgba(245,239,228,0.55)', cursor: 'pointer', padding: '7px 12px', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', width: '100%' }}>
            SIGN OUT
          </button>
        </div>
      </aside>
    </>
  )
}

function AdminShell({ children }) {
  const path = usePathname()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const isLogin = path === '/admin/login'

  if (isLogin) return <>{children}</>

  return (
    <div style={{ display: 'flex', fontFamily: 'system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          className="admin-overlay" />
      )}

      <AdminNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="admin-main-wrap">
        {/* Mobile top bar */}
        <div className="admin-topbar">
          <button onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, padding: '4px 8px', color: '#0d1f24' }}>
            ☰
          </button>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 500 }}>Northern Dreamscape</div>
          <div style={{ width: 40 }} />
        </div>

        <main style={{ flex: 1, background: '#f8f6f2' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
      <style>{`
        .admin-sidebar {
          width: 220px;
          background: #0d1f24;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 50;
          transition: transform 0.25s ease;
        }
        .admin-topbar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #0d1f24;
          color: #f5efe4;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .admin-main-wrap {
          margin-left: 220px;
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-close-btn {
            display: block !important;
          }
          .admin-topbar {
            display: flex !important;
          }
          .admin-main-wrap {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </SessionProvider>
  )
}

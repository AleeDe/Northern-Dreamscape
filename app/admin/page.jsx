import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityClient } from '@/lib/sanity/client'
import Link from 'next/link'

async function getStats() {
  return sanityClient.fetch(`{
    "totalBookings":    count(*[_type == "bookingInquiry"]),
    "newBookings":      count(*[_type == "bookingInquiry" && status == "new"]),
    "confirmedBookings":count(*[_type == "bookingInquiry" && status == "confirmed"]),
    "totalPackages":    count(*[_type == "package" && status == "live"]),
    "recentBookings": *[_type == "bookingInquiry"] | order(submittedAt desc)[0...8] {
      _id, bookingRef, fullName, serviceName, status, submittedAt, guests
    }
  }`)
}

const SC = { new:'#e8822e', contacted:'#2980b9', quoted:'#8e44ad', confirmed:'#27ae60', cancelled:'#c0392b' }
const SL = { new:'🆕 New', contacted:'📞 Contacted', quoted:'💬 Quoted', confirmed:'✅ Confirmed', cancelled:'❌ Cancelled' }

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const stats = await getStats()

  return (
    <div style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', margin: 0, fontWeight: 700 }}>
          Welcome, {session?.user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#666', margin: '6px 0 0', fontSize: 14 }}>Here's what's happening today.</p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 32 }}>
        {[
          { label: 'New Bookings',   value: stats.newBookings,       color: '#e8822e', href: '/admin/bookings?status=new' },
          { label: 'Total Bookings', value: stats.totalBookings,     color: '#0d1f24', href: '/admin/bookings' },
          { label: 'Confirmed',      value: stats.confirmedBookings, color: '#27ae60', href: '/admin/bookings?status=confirmed' },
          { label: 'Live Packages',  value: stats.totalPackages,     color: '#2d7a6e', href: '/admin/packages' },
        ].map(s => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'white', border: '1px solid #e8e4de', padding: '18px 20px', borderLeft: `4px solid ${s.color}` }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: s.color, fontFamily: 'Georgia, serif' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#888', fontFamily: 'monospace', letterSpacing: '0.08em', marginTop: 4 }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      <div style={{ background: 'white', border: '1px solid #e8e4de' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8e4de', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Recent Bookings</h2>
          <Link href="/admin/bookings" style={{ fontSize: 11, color: '#e8822e', fontFamily: 'monospace', textDecoration: 'none' }}>VIEW ALL →</Link>
        </div>

        {/* Mobile cards */}
        <div className="admin-booking-cards">
          {stats.recentBookings.map(b => (
            <div key={b._id} style={{ padding: '14px 20px', borderBottom: '1px solid #f0ece6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{b.fullName}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{b.serviceName || '—'}</div>
                </div>
                <span style={{ fontSize: 11, padding: '3px 8px', background: `${SC[b.status]}18`, color: SC[b.status], fontFamily: 'monospace', fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>
                  {SL[b.status]}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#888' }}>
                <span style={{ fontFamily: 'monospace', color: '#e8822e', fontWeight: 700 }}>{b.bookingRef}</span>
                <span>{b.guests} guests</span>
                {b.submittedAt && <span>{new Date(b.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>}
              </div>
            </div>
          ))}
          {!stats.recentBookings.length && (
            <div style={{ padding: 32, textAlign: 'center', color: '#aaa', fontSize: 14 }}>No bookings yet.</div>
          )}
        </div>
      </div>

      <style>{`
        .admin-booking-cards { display: block; }
      `}</style>
    </div>
  )
}

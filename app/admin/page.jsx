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
    "totalServices":    count(*[_type in ["accommodation","vehicle","guide","restaurant"] && status == "live"]),
    "recentBookings":   *[_type == "bookingInquiry"] | order(submittedAt desc)[0...5] {
      _id, bookingRef, fullName, serviceName, status, submittedAt, guests
    }
  }`)
}

const STATUS_COLOR = { new: '#e8822e', contacted: '#2980b9', quoted: '#8e44ad', confirmed: '#27ae60', cancelled: '#c0392b' }
const STATUS_LABEL = { new: '🆕 New', contacted: '📞 Contacted', quoted: '💬 Quoted', confirmed: '✅ Confirmed', cancelled: '❌ Cancelled' }

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const stats = await getStats()

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, margin: 0, fontWeight: 700 }}>Welcome, {session?.user?.name?.split(' ')[0]} 👋</h1>
        <p style={{ color: '#666', margin: '6px 0 0', fontSize: 14 }}>Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 36 }}>
        {[
          { label: 'New Bookings',   value: stats.newBookings,      color: '#e8822e', href: '/admin/bookings?status=new' },
          { label: 'Total Bookings', value: stats.totalBookings,    color: '#0d1f24', href: '/admin/bookings' },
          { label: 'Confirmed',      value: stats.confirmedBookings,color: '#27ae60', href: '/admin/bookings?status=confirmed' },
          { label: 'Live Packages',  value: stats.totalPackages,    color: '#2d7a6e', href: '/admin/packages' },
        ].map(s => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'white', border: '1px solid #e8e4de', padding: '22px 24px', borderLeft: `4px solid ${s.color}` }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: s.color, fontFamily: 'Georgia, serif' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace', letterSpacing: '0.1em', marginTop: 4 }}>{s.label.toUpperCase()}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      <div style={{ background: 'white', border: '1px solid #e8e4de' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #e8e4de', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Recent Bookings</h2>
          <Link href="/admin/bookings" style={{ fontSize: 12, color: '#e8822e', fontFamily: 'monospace', letterSpacing: '0.1em', textDecoration: 'none' }}>VIEW ALL →</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f6f2' }}>
              {['Ref', 'Customer', 'Service', 'Guests', 'Status', 'Date'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', color: '#888', fontWeight: 600 }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.recentBookings.map((b, i) => (
              <tr key={b._id} style={{ borderTop: '1px solid #f0ece6' }}>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 12, color: '#e8822e', fontWeight: 700 }}>{b.bookingRef}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600 }}>{b.fullName}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#555', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.serviceName || '—'}</td>
                <td style={{ padding: '12px 16px', fontSize: 13 }}>{b.guests}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: `${STATUS_COLOR[b.status]}18`, color: STATUS_COLOR[b.status], fontFamily: 'monospace', fontWeight: 700 }}>
                    {STATUS_LABEL[b.status]}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#888' }}>
                  {b.submittedAt ? new Date(b.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—'}
                </td>
              </tr>
            ))}
            {!stats.recentBookings.length && (
              <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#aaa', fontSize: 14 }}>No bookings yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

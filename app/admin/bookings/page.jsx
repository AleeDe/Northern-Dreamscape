'use client'

import React from 'react'
import Link from 'next/link'

const STATUS_COLOR = { new: '#e8822e', contacted: '#2980b9', quoted: '#8e44ad', confirmed: '#27ae60', cancelled: '#c0392b' }
const STATUS_LABEL = { new: '🆕 New', contacted: '📞 Contacted', quoted: '💬 Quoted', confirmed: '✅ Confirmed', cancelled: '❌ Cancelled' }
const ALL_STATUSES = ['new', 'contacted', 'quoted', 'confirmed', 'cancelled']

export default function BookingsPage() {
  const [bookings, setBookings] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [filter, setFilter] = React.useState('all')
  const [selected, setSelected] = React.useState(null)
  const [updating, setUpdating] = React.useState(false)

  React.useEffect(() => { fetchBookings() }, [])

  async function fetchBookings() {
    setLoading(true)
    const res = await fetch('/api/admin/bookings')
    const data = await res.json()
    setBookings(data.bookings || [])
    setLoading(false)
  }

  async function updateStatus(id, status) {
    setUpdating(true)
    await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setUpdating(false)
    setSelected(s => s ? { ...s, status } : s)
    setBookings(bs => bs.map(b => b._id === id ? { ...b, status } : b))
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <div style={{ padding: '36px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, margin: 0, fontWeight: 700 }}>📋 Bookings</h1>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>{filtered.length} bookings</div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {['all', ...ALL_STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '7px 16px', border: '1px solid', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.08em',
              background: filter === s ? '#0d1f24' : 'white',
              color: filter === s ? '#f5efe4' : '#555',
              borderColor: filter === s ? '#0d1f24' : '#ddd',
            }}>
            {s === 'all' ? 'ALL' : STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 24, alignItems: 'start' }}>
        {/* Table */}
        <div style={{ background: 'white', border: '1px solid #e8e4de', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#aaa' }}>Loading...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f6f2' }}>
                  {['Ref', 'Customer', 'Service', 'Date', 'Guests', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', color: '#888', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b._id} onClick={() => setSelected(b)}
                    style={{ borderTop: '1px solid #f0ece6', cursor: 'pointer', background: selected?._id === b._id ? '#fdf8f2' : 'white' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 12, color: '#e8822e', fontWeight: 700 }}>{b.bookingRef}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{b.fullName}</div>
                      <div style={{ fontSize: 11, color: '#888' }}>{b.email}</div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: 13, color: '#555', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.serviceName || '—'}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: '#888' }}>{b.travelDate || '—'}</td>
                    <td style={{ padding: '12px 14px', fontSize: 13 }}>{b.guests}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: 11, padding: '4px 8px', background: `${STATUS_COLOR[b.status]}18`, color: STATUS_COLOR[b.status], fontFamily: 'monospace', fontWeight: 700 }}>
                        {STATUS_LABEL[b.status]}
                      </span>
                    </td>
                  </tr>
                ))}
                {!filtered.length && (
                  <tr><td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#aaa' }}>No bookings found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ background: 'white', border: '1px solid #e8e4de', padding: 24, position: 'sticky', top: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#e8822e', fontWeight: 700, marginBottom: 4 }}>{selected.bookingRef}</div>
                <h2 style={{ margin: 0, fontSize: 18 }}>{selected.fullName}</h2>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#999' }}>×</button>
            </div>

            {/* Info rows */}
            {[
              { label: 'Email',     value: selected.email },
              { label: 'Phone',     value: selected.phone },
              { label: 'Service',   value: selected.serviceName },
              { label: 'Travel',    value: selected.travelDate },
              { label: 'Return',    value: selected.returnDate },
              { label: 'Guests',    value: selected.guests },
              { label: 'Nationality', value: selected.nationality },
              { label: 'CNIC',      value: selected.cnic },
              { label: 'Emergency', value: selected.emergencyPhone ? `${selected.emergencyName} · ${selected.emergencyPhone}` : null },
              { label: 'Dietary',   value: selected.dietaryRequirements },
              { label: 'Medical',   value: selected.medicalConditions },
            ].filter(r => r.value).map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0ece6', fontSize: 13 }}>
                <span style={{ color: '#888', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.08em' }}>{r.label.toUpperCase()}</span>
                <span style={{ fontWeight: 500, textAlign: 'right', maxWidth: 200 }}>{r.value}</span>
              </div>
            ))}

            {selected.message && (
              <div style={{ marginTop: 14, padding: '12px 14px', background: '#f8f6f2', fontSize: 13, color: '#555', lineHeight: 1.6 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#888', marginBottom: 6 }}>MESSAGE</div>
                {selected.message}
              </div>
            )}

            {/* Status change */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#888', marginBottom: 10, letterSpacing: '0.1em' }}>UPDATE STATUS</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {ALL_STATUSES.map(s => (
                  <button key={s} disabled={updating || selected.status === s}
                    onClick={() => updateStatus(selected._id, s)}
                    style={{ padding: '9px 8px', border: `1px solid ${STATUS_COLOR[s]}`, cursor: selected.status === s ? 'default' : 'pointer',
                      background: selected.status === s ? STATUS_COLOR[s] : 'white',
                      color: selected.status === s ? 'white' : STATUS_COLOR[s],
                      fontSize: 11, fontFamily: 'monospace', opacity: updating ? 0.6 : 1,
                    }}>
                    {STATUS_LABEL[s]}
                  </button>
                ))}
              </div>
            </div>

            {selected.submittedAt && (
              <div style={{ marginTop: 16, fontSize: 11, color: '#aaa', fontFamily: 'monospace' }}>
                Submitted: {new Date(selected.submittedAt).toLocaleString('en-GB')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

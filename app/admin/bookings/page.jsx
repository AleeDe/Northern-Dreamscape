'use client'

import React from 'react'

const SC = { new:'#e8822e', contacted:'#2980b9', quoted:'#8e44ad', confirmed:'#27ae60', cancelled:'#c0392b' }
const SL = { new:'🆕 New', contacted:'📞 Contacted', quoted:'💬 Quoted', confirmed:'✅ Confirmed', cancelled:'❌ Cancelled' }
const ALL_STATUSES = ['new','contacted','quoted','confirmed','cancelled']

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
    <div style={{ padding: 'clamp(16px, 4vw, 36px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 26px)', margin: 0, fontWeight: 700 }}>📋 Bookings</h1>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>{filtered.length} total</div>
      </div>

      {/* Filter tabs — horizontal scroll on mobile */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {['all', ...ALL_STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '7px 14px', border: '1px solid', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace', whiteSpace: 'nowrap', flexShrink: 0,
              background: filter === s ? '#0d1f24' : 'white',
              color: filter === s ? '#f5efe4' : '#555',
              borderColor: filter === s ? '#0d1f24' : '#ddd',
            }}>
            {s === 'all' ? 'ALL' : SL[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: 48, textAlign: 'center', color: '#aaa', background: 'white', border: '1px solid #e8e4de' }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr' : '1fr', gap: 16 }} className="bookings-grid">

          {/* Cards list */}
          <div style={{ background: 'white', border: '1px solid #e8e4de' }}>
            {filtered.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>No bookings found.</div>
            )}
            {filtered.map(b => (
              <div key={b._id} onClick={() => setSelected(selected?._id === b._id ? null : b)}
                style={{ padding: '14px 18px', borderBottom: '1px solid #f0ece6', cursor: 'pointer',
                  background: selected?._id === b._id ? '#fdf8f2' : 'white',
                  borderLeft: selected?._id === b._id ? '3px solid #e8822e' : '3px solid transparent',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#e8822e', fontWeight: 700 }}>{b.bookingRef}</span>
                      <span style={{ fontSize: 11, padding: '2px 8px', background: `${SC[b.status]}18`, color: SC[b.status], fontFamily: 'monospace', fontWeight: 700 }}>
                        {SL[b.status]}
                      </span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{b.fullName}</div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {b.serviceName || '—'} · {b.guests || 1} guests
                      {b.travelDate ? ` · ${b.travelDate}` : ''}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: '#aaa', flexShrink: 0 }}>
                    {b.submittedAt ? new Date(b.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={{ background: 'white', border: '1px solid #e8e4de', padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#e8822e', fontWeight: 700, marginBottom: 4 }}>{selected.bookingRef}</div>
                  <h2 style={{ margin: 0, fontSize: 18 }}>{selected.fullName}</h2>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#999' }}>×</button>
              </div>

              <div style={{ marginBottom: 18 }}>
                {[
                  { label: 'Email',       value: selected.email },
                  { label: 'Phone',       value: selected.phone },
                  { label: 'Service',     value: selected.serviceName },
                  { label: 'Travel Date', value: selected.travelDate },
                  { label: 'Return Date', value: selected.returnDate },
                  { label: 'Guests',      value: selected.guests },
                  { label: 'Nationality', value: selected.nationality },
                  { label: 'CNIC',        value: selected.cnic },
                  { label: 'Emergency',   value: selected.emergencyPhone ? `${selected.emergencyName} · ${selected.emergencyPhone}` : null },
                  { label: 'Dietary',     value: selected.dietaryRequirements },
                  { label: 'Medical',     value: selected.medicalConditions },
                ].filter(r => r.value).map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0ece6', fontSize: 13, gap: 12 }}>
                    <span style={{ color: '#888', fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.08em', flexShrink: 0 }}>{r.label.toUpperCase()}</span>
                    <span style={{ fontWeight: 500, textAlign: 'right' }}>{r.value}</span>
                  </div>
                ))}
              </div>

              {selected.message && (
                <div style={{ padding: '12px 14px', background: '#f8f6f2', fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 18 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#888', marginBottom: 6 }}>MESSAGE</div>
                  {selected.message}
                </div>
              )}

              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#888', marginBottom: 10, letterSpacing: '0.1em' }}>UPDATE STATUS</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {ALL_STATUSES.map(s => (
                    <button key={s} disabled={updating || selected.status === s}
                      onClick={() => updateStatus(selected._id, s)}
                      style={{ padding: '9px 6px', border: `1px solid ${SC[s]}`, cursor: selected.status === s ? 'default' : 'pointer',
                        background: selected.status === s ? SC[s] : 'white',
                        color: selected.status === s ? 'white' : SC[s],
                        fontSize: 11, fontFamily: 'monospace', opacity: updating ? 0.6 : 1,
                      }}>
                      {SL[s]}
                    </button>
                  ))}
                </div>
              </div>

              {selected.submittedAt && (
                <div style={{ marginTop: 14, fontSize: 11, color: '#aaa', fontFamily: 'monospace' }}>
                  Submitted: {new Date(selected.submittedAt).toLocaleString('en-GB')}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .bookings-grid { grid-template-columns: ${selected ? '1fr 380px' : '1fr'} !important; }
        }
      `}</style>
    </div>
  )
}

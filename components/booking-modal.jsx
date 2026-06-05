'use client'

import React from 'react'

// ── Step indicator ────────────────────────────────────────────────────────────
function Steps({ current }) {
  const steps = ['Trip Details', 'Your Info', 'Confirm']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <React.Fragment key={label}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? 'var(--teal-700)' : active ? 'var(--ember)' : 'var(--bone-2)',
                color: done || active ? 'white' : 'var(--muted-ink)',
                fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, transition: 'all 0.2s',
              }}>
                {done ? '✓' : i + 1}
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: active ? 'var(--ember)' : done ? 'var(--teal-700)' : 'var(--muted-ink)' }}>
                {label.toUpperCase()}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? 'var(--teal-700)' : 'var(--line)', margin: '0 8px', marginBottom: 22, transition: 'background 0.3s' }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// ── Field helper ──────────────────────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--muted-ink)', marginBottom: 6 }}>
        {label.toUpperCase()}{required && <span style={{ color: 'var(--ember)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && <p style={{ margin: '5px 0 0', fontSize: 12, color: 'var(--ember)' }}>{error}</p>}
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '11px 14px', border: '1px solid var(--line)', background: 'var(--bone)',
  fontFamily: 'var(--ui)', fontSize: 14, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
  borderRadius: 2,
}

// ── Main modal ────────────────────────────────────────────────────────────────
export function BookingModal({ isOpen, onClose, serviceName = '', serviceType = 'package', serviceSlug = '', serviceId = '' }) {
  const [step, setStep] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [bookingRef, setBookingRef] = React.useState(null)
  const [errors, setErrors] = React.useState({})

  const [form, setForm] = React.useState({
    serviceName: serviceName,
    serviceType: serviceType,
    serviceSlug: serviceSlug,
    serviceId: serviceId,
    travelDate: '',
    returnDate: '',
    guests: 1,
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    cnic: '',
    emergencyName: '',
    emergencyPhone: '',
    dietaryRequirements: '',
    medicalConditions: '',
    message: '',
  })

  // Sync serviceName when prop changes
  React.useEffect(() => {
    setForm(f => ({ ...f, serviceName, serviceType, serviceSlug, serviceId }))
  }, [serviceName, serviceType, serviceSlug, serviceId])

  // Reset on close
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setStep(0); setBookingRef(null); setErrors({}) }, 300)
    }
  }, [isOpen])

  // Close on Escape
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  function validateStep0() {
    const e = {}
    if (!form.travelDate) e.travelDate = 'Travel date is required'
    if (!form.guests || form.guests < 1) e.guests = 'At least 1 guest'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep1() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.phone.trim()) e.phone = 'Phone / WhatsApp is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (step === 0 && !validateStep0()) return
    if (step === 1 && !validateStep1()) return
    setStep(s => s + 1)
  }

  async function submit() {
    setLoading(true)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          guests: Number(form.guests),
          sourceUrl: window.location.href,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setBookingRef(data.bookingRef)
      setStep(3)
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(8,22,26,0.75)', zIndex: 10000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="booking-modal-inner" style={{
        background: 'var(--bone)', width: '100%', maxWidth: 560, maxHeight: '90vh',
        overflowY: 'auto', position: 'relative', borderRadius: 2,
        boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        {/* Header */}
        <div style={{ background: 'var(--ink)', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', color: 'rgba(245,239,228,0.55)', marginBottom: 6 }}>BOOKING REQUEST</div>
            <h2 style={{ margin: 0, color: 'var(--bone)', fontSize: 20, lineHeight: 1.2 }}>
              {form.serviceName || 'Northern Dreamscape'}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(245,239,228,0.6)', cursor: 'pointer', fontSize: 22, lineHeight: 1, padding: 4, marginTop: -4 }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 28px' }}>

          {/* ── Success Screen ── */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontSize: 24, marginBottom: 10 }}>Booking Request Sent!</h3>
              <p style={{ color: 'var(--muted-ink)', lineHeight: 1.65, marginBottom: 28 }}>
                Our support team will review your request and contact you within <strong>24 hours</strong> via phone or WhatsApp to confirm availability and guide you through payment.
              </p>
              <div style={{ background: 'var(--bone-2)', border: '1px solid var(--line)', padding: '20px 24px', marginBottom: 28 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ember)', marginBottom: 6 }}>YOUR BOOKING REFERENCE</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 32, letterSpacing: '0.05em' }}>{bookingRef}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-ink)', marginTop: 6 }}>Save this for your records</div>
              </div>
              <div style={{ background: '#e8f4f0', border: '1px solid #b2d8d2', padding: '16px 20px', marginBottom: 28, textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: 13, color: '#1a5c54', lineHeight: 1.6 }}>
                  📧 A confirmation email has been sent to <strong>{form.email}</strong><br />
                  📞 We'll call / WhatsApp you at <strong>{form.phone}</strong>
                </p>
              </div>
              <button onClick={onClose} className="btn btn-ink" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                Close
              </button>
            </div>
          )}

          {/* ── Steps 0-2 ── */}
          {step < 3 && (
            <>
              <Steps current={step} />

              {/* Step 0 — Trip Details */}
              {step === 0 && (
                <div>
                  <h3 style={{ fontSize: 18, marginBottom: 20, marginTop: 0 }}>Trip Details</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                    <Field label="Travel Date" required error={errors.travelDate}>
                      <input type="date" value={form.travelDate} onChange={set('travelDate')}
                        min={new Date().toISOString().split('T')[0]}
                        style={{ ...inputStyle, borderColor: errors.travelDate ? 'var(--ember)' : 'var(--line)' }} />
                    </Field>
                    <Field label="Return Date">
                      <input type="date" value={form.returnDate} onChange={set('returnDate')}
                        min={form.travelDate || new Date().toISOString().split('T')[0]}
                        style={inputStyle} />
                    </Field>
                  </div>
                  <Field label="Number of Guests" required error={errors.guests}>
                    <input type="number" value={form.guests} onChange={set('guests')} min={1} max={50}
                      style={{ ...inputStyle, borderColor: errors.guests ? 'var(--ember)' : 'var(--line)' }} />
                  </Field>
                  <Field label="Special Requests / Message">
                    <textarea value={form.message} onChange={set('message')} rows={3}
                      placeholder="Any specific requirements, questions or preferences..."
                      style={{ ...inputStyle, resize: 'vertical' }} />
                  </Field>
                </div>
              )}

              {/* Step 1 — Personal Info */}
              {step === 1 && (
                <div>
                  <h3 style={{ fontSize: 18, marginBottom: 20, marginTop: 0 }}>Your Information</h3>
                  <Field label="Full Name" required error={errors.fullName}>
                    <input type="text" value={form.fullName} onChange={set('fullName')} placeholder="Muhammad Ali"
                      style={{ ...inputStyle, borderColor: errors.fullName ? 'var(--ember)' : 'var(--line)' }} />
                  </Field>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                    <Field label="Email" required error={errors.email}>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com"
                        style={{ ...inputStyle, borderColor: errors.email ? 'var(--ember)' : 'var(--line)' }} />
                    </Field>
                    <Field label="Phone / WhatsApp" required error={errors.phone}>
                      <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+92 300 1234567"
                        style={{ ...inputStyle, borderColor: errors.phone ? 'var(--ember)' : 'var(--line)' }} />
                    </Field>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                    <Field label="Nationality">
                      <input type="text" value={form.nationality} onChange={set('nationality')} placeholder="Pakistani"
                        style={inputStyle} />
                    </Field>
                    <Field label="CNIC / Passport No.">
                      <input type="text" value={form.cnic} onChange={set('cnic')} placeholder="35202-XXXXXXX-X"
                        style={inputStyle} />
                    </Field>
                  </div>
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18, marginTop: 4 }}>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted-ink)', marginBottom: 14 }}>EMERGENCY CONTACT (OPTIONAL)</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                      <Field label="Emergency Contact Name">
                        <input type="text" value={form.emergencyName} onChange={set('emergencyName')} placeholder="Contact name"
                          style={inputStyle} />
                      </Field>
                      <Field label="Emergency Phone">
                        <input type="tel" value={form.emergencyPhone} onChange={set('emergencyPhone')} placeholder="+92 300..."
                          style={inputStyle} />
                      </Field>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18, marginTop: 4 }}>
                    <Field label="Dietary Requirements">
                      <input type="text" value={form.dietaryRequirements} onChange={set('dietaryRequirements')} placeholder="Vegetarian, Halal only, allergies..."
                        style={inputStyle} />
                    </Field>
                    <Field label="Medical Conditions">
                      <textarea value={form.medicalConditions} onChange={set('medicalConditions')} rows={2}
                        placeholder="Any medical conditions we should know about..."
                        style={{ ...inputStyle, resize: 'vertical' }} />
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 2 — Review & Confirm */}
              {step === 2 && (
                <div>
                  <h3 style={{ fontSize: 18, marginBottom: 20, marginTop: 0 }}>Review & Confirm</h3>
                  <div style={{ background: 'var(--bone-2)', border: '1px solid var(--line)', padding: '20px 22px', marginBottom: 20 }}>
                    <Row label="Service" value={form.serviceName || 'Custom Trip'} />
                    <Row label="Travel Date" value={form.travelDate || '—'} />
                    {form.returnDate && <Row label="Return Date" value={form.returnDate} />}
                    <Row label="Guests" value={form.guests} />
                    <div style={{ borderTop: '1px solid var(--line)', marginTop: 12, paddingTop: 12 }} />
                    <Row label="Name" value={form.fullName} />
                    <Row label="Email" value={form.email} />
                    <Row label="Phone" value={form.phone} last />
                  </div>
                  <div style={{ background: '#fff8e6', border: '1px solid #f0d580', padding: '14px 18px', marginBottom: 20 }}>
                    <p style={{ margin: 0, fontSize: 13, color: '#7a5c00', lineHeight: 1.6 }}>
                      💳 <strong>Payment:</strong> After confirming availability, our team will share payment details via WhatsApp. We accept Bank Transfer, EasyPaisa, and JazzCash.
                    </p>
                  </div>
                  {errors.submit && (
                    <p style={{ color: 'var(--ember)', fontSize: 13, marginBottom: 16, padding: '10px 14px', background: '#fff0eb', border: '1px solid #fcc' }}>
                      {errors.submit}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)} className="btn"
                    style={{ flex: 1, justifyContent: 'center', background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink)', padding: '13px' }}>
                    ← Back
                  </button>
                )}
                {step < 2 && (
                  <button onClick={next} className="btn btn-ember" style={{ flex: 1, justifyContent: 'center', padding: '13px' }}>
                    Continue →
                  </button>
                )}
                {step === 2 && (
                  <button onClick={submit} disabled={loading} className="btn btn-ember"
                    style={{ flex: 1, justifyContent: 'center', padding: '13px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: last ? 'none' : '1px solid var(--line)' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-ink)' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{value}</span>
    </div>
  )
}

// ── Hook for easy use anywhere ────────────────────────────────────────────────
export function useBooking() {
  const [state, setState] = React.useState({ open: false, serviceName: '', serviceType: 'package', serviceSlug: '', serviceId: '' })
  const open = ({ serviceName = '', serviceType = 'package', serviceSlug = '', serviceId = '' } = {}) =>
    setState({ open: true, serviceName, serviceType, serviceSlug, serviceId })
  const close = () => setState(s => ({ ...s, open: false }))
  return { isOpen: state.open, open, close, serviceName: state.serviceName, serviceType: state.serviceType, serviceSlug: state.serviceSlug, serviceId: state.serviceId }
}

// ── Drop-in button that opens the modal — usable from server components ───────
export function BookNowButton({ serviceName = '', serviceType = 'package', serviceSlug = '', serviceId = '', label = 'Book Now', className = 'btn btn-ember', style = {} }) {
  const booking = useBooking()
  return (
    <>
      <button
        className={className}
        style={{ cursor: 'pointer', ...style }}
        onClick={() => booking.open({ serviceName, serviceType, serviceSlug, serviceId })}
      >
        {label}
      </button>
      <BookingModal
        isOpen={booking.isOpen}
        onClose={booking.close}
        serviceName={booking.serviceName}
        serviceType={booking.serviceType}
        serviceSlug={booking.serviceSlug}
        serviceId={booking.serviceId}
      />
    </>
  )
}

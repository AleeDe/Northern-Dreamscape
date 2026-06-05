import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/writeClient'

function generateRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'ND-'
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)]
  return ref
}

export async function POST(request) {
  try {
    const body = await request.json()

    const {
      serviceType, serviceName, serviceSlug,
      travelDate, returnDate, guests,
      fullName, email, phone, nationality, cnic,
      emergencyName, emergencyPhone,
      dietaryRequirements, medicalConditions, message,
      sourceUrl,
    } = body

    // Basic validation
    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: 'Name, email and phone are required.' }, { status: 400 })
    }

    const bookingRef = generateRef()

    const doc = {
      _type: 'bookingInquiry',
      bookingRef,
      status: 'new',
      serviceType: serviceType || 'custom_trip',
      serviceName: serviceName || '',
      serviceSlug: serviceSlug || '',
      travelDate: travelDate || null,
      returnDate: returnDate || null,
      guests: guests ? Number(guests) : 1,
      fullName,
      email,
      phone,
      nationality: nationality || '',
      cnic: cnic || '',
      emergencyName: emergencyName || '',
      emergencyPhone: emergencyPhone || '',
      dietaryRequirements: dietaryRequirements || '',
      medicalConditions: medicalConditions || '',
      message: message || '',
      sourceUrl: sourceUrl || '',
      submittedAt: new Date().toISOString(),
    }

    await sanityWriteClient.create(doc)

    // Send confirmation email via Resend (if configured)
    if (process.env.RESEND_API_KEY && email) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Northern Dreamscape <bookings@northerndreamscape.com>',
          to: email,
          subject: `Booking Request Received — ${bookingRef}`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0d1f24;">
              <div style="background: #0d1f24; padding: 32px 40px;">
                <h1 style="color: #f5efe4; font-size: 28px; margin: 0;">Northern Dreamscape</h1>
                <p style="color: rgba(245,239,228,0.6); margin: 8px 0 0; font-size: 13px; letter-spacing: 0.1em;">SMALL-GROUP EXPEDITIONS · GILGIT-BALTISTAN</p>
              </div>
              <div style="padding: 40px; background: #f5efe4;">
                <h2 style="font-size: 22px; margin: 0 0 8px;">Thank you, ${fullName}!</h2>
                <p style="color: #5a6e73; margin: 0 0 28px;">We have received your booking request. Our team will review it and contact you within <strong>24 hours</strong> to confirm details and guide you through the next steps.</p>

                <div style="background: white; border: 1px solid #ddd; padding: 24px; margin-bottom: 24px;">
                  <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 0.14em; color: #e8822e; font-family: monospace;">BOOKING REFERENCE</p>
                  <p style="margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 0.05em;">${bookingRef}</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  ${serviceName ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #5a6e73;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: 600;">${serviceName}</td></tr>` : ''}
                  ${travelDate ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #5a6e73;">Travel Date</td><td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: 600;">${travelDate}</td></tr>` : ''}
                  <tr><td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #5a6e73;">Guests</td><td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: 600;">${guests || 1}</td></tr>
                  <tr><td style="padding: 10px 0; color: #5a6e73;">Phone / WhatsApp</td><td style="padding: 10px 0; font-weight: 600;">${phone}</td></tr>
                </table>

                <div style="margin-top: 32px; padding: 20px; background: #e8f4f0; border-left: 3px solid #2d7a6e;">
                  <p style="margin: 0; font-size: 13px; color: #2d7a6e;"><strong>What happens next?</strong><br/>Our team will call or WhatsApp you at <strong>${phone}</strong> to confirm availability, discuss itinerary details, and share payment instructions (bank transfer / EasyPaisa / JazzCash).</p>
                </div>
              </div>
              <div style="padding: 24px 40px; background: #0d1f24; text-align: center;">
                <p style="color: rgba(245,239,228,0.5); font-size: 12px; margin: 0;">© 2026 Northern Dreamscape · Jutial, Gilgit · +92 581 245 8910</p>
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('Email send failed (non-fatal):', emailErr)
      }
    }

    return NextResponse.json({ success: true, bookingRef }, { status: 201 })

  } catch (err) {
    console.error('Booking API error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

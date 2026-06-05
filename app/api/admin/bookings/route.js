import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import { sanityClient } from '@/lib/sanity/client'

const BOOKINGS_QUERY = `*[_type == "bookingInquiry"] | order(submittedAt desc) {
  _id, bookingRef, status, fullName, email, phone,
  serviceName, serviceType, travelDate, returnDate, guests,
  nationality, cnic, emergencyName, emergencyPhone,
  dietaryRequirements, medicalConditions, message, submittedAt,
  "requestedItem": requestedItem->{ _id, title, name, "slug": slug.current }
}`

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const bookings = await sanityClient.fetch(BOOKINGS_QUERY)
  return NextResponse.json({ bookings })
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, status } = await request.json()
  const allowed = ['new', 'contacted', 'quoted', 'confirmed', 'cancelled']
  if (!id || !allowed.includes(status)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  await sanityWriteClient.patch(id).set({ status }).commit()
  return NextResponse.json({ success: true })
}

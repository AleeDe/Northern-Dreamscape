import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import { sanityClient } from '@/lib/sanity/client'

const QUERY = `*[_type == "package"] | order(priority asc, title asc) {
  _id, title, "slug": slug.current, region, days, difficulty, status,
  featured, showOnHome, priority, rating, reviewCount, spotsLeft,
  "price": pricing.priceFrom,
  "currency": pricing.currency,
  heroImage { asset->{ url } }
}`

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const packages = await sanityClient.fetch(QUERY)
  return NextResponse.json({ packages })
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, fields } = await request.json()
  await sanityWriteClient.patch(id).set(fields).commit()
  return NextResponse.json({ success: true })
}

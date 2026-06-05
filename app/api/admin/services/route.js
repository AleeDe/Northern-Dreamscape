import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import { sanityClient } from '@/lib/sanity/client'

const QUERY = `{
  "accommodations": *[_type == "accommodation"] | order(name asc) {
    _id, _type, name, "slug": slug.current, status, featured, rating, reviewCount,
    "city": location.city, heroImage { asset->{ url } }
  },
  "vehicles": *[_type == "vehicle"] | order(name asc) {
    _id, _type, name, "slug": slug.current, status, featured, rating,
    seats, withDriver, heroImage { asset->{ url } }
  },
  "guides": *[_type == "guide"] | order(name asc) {
    _id, _type, name, "slug": slug.current, status, featured, rating,
    experienceYears, languages, portrait { asset->{ url } }
  },
  "restaurants": *[_type == "restaurant"] | order(name asc) {
    _id, _type, name, "slug": slug.current, status, featured, rating,
    cuisines, "city": location.city, heroImage { asset->{ url } }
  }
}`

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await sanityClient.fetch(QUERY)
  return NextResponse.json(data)
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, fields } = await request.json()
  await sanityWriteClient.patch(id).set(fields).commit()
  return NextResponse.json({ success: true })
}

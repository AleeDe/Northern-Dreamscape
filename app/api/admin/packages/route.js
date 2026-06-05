import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import { sanityClient } from '@/lib/sanity/client'

const QUERY = `*[_type == "package"] | order(priority asc, title asc) {
  _id, title, "slug": slug.current, region, days, nights, difficulty,
  season, status, featured, showOnHome, priority, rating, reviewCount,
  spotsLeft, summary, subtitle, highlights, included, excluded,
  "price": pricing.priceFrom, "priceUsd": pricing.priceUsd,
  "currency": pricing.currency,
  heroImage { asset->{ _id, url } }
}`

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const packages = await sanityClient.fetch(QUERY)
  return NextResponse.json({ packages })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const doc = {
    _type: 'package',
    title: body.title,
    slug: { _type: 'slug', current: slug },
    region: body.region || '',
    days: Number(body.days) || 1,
    nights: Number(body.nights) || 0,
    difficulty: body.difficulty || 'Easy',
    season: body.season || '',
    summary: body.summary || '',
    highlights: body.highlights || [],
    included: body.included || [],
    excluded: body.excluded || [],
    pricing: {
      _type: 'pricing',
      currency: body.currency || 'PKR',
      priceFrom: Number(body.price) || 0,
      priceUsd: Number(body.priceUsd) || 0,
    },
    status: body.status || 'draft',
    featured: body.featured || false,
    showOnHome: body.showOnHome || false,
    priority: Number(body.priority) || 100,
    ...(body.heroImageId ? { heroImage: { _type: 'mediaImage', asset: { _type: 'reference', _ref: body.heroImageId } } } : {}),
  }

  const created = await sanityWriteClient.create(doc)
  return NextResponse.json({ success: true, _id: created._id })
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id, fields } = body

  // Handle nested pricing update
  if (fields.price !== undefined || fields.currency !== undefined || fields.priceUsd !== undefined) {
    const pkg = await sanityClient.fetch(`*[_id == $id][0]{ pricing }`, { id })
    const current = pkg?.pricing || {}
    fields.pricing = {
      _type: 'pricing',
      currency: fields.currency ?? current.currency ?? 'PKR',
      priceFrom: fields.price !== undefined ? Number(fields.price) : current.priceFrom,
      priceUsd: fields.priceUsd !== undefined ? Number(fields.priceUsd) : current.priceUsd,
    }
    delete fields.price; delete fields.currency; delete fields.priceUsd
  }

  // Handle slug update
  if (fields.title) {
    fields.slug = { _type: 'slug', current: fields.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }
  }

  // Handle image
  if (fields.heroImageId) {
    fields.heroImage = { _type: 'mediaImage', asset: { _type: 'reference', _ref: fields.heroImageId } }
    delete fields.heroImageId
  }

  await sanityWriteClient.patch(id).set(fields).commit()
  return NextResponse.json({ success: true })
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await request.json()
  await sanityWriteClient.delete(id)
  return NextResponse.json({ success: true })
}

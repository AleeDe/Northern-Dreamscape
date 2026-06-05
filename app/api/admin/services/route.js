import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import { sanityClient } from '@/lib/sanity/client'

const QUERIES = {
  accommodation: `*[_type == "accommodation"] | order(name asc) {
    _id, _type, name, "slug": slug.current, status, featured, rating, reviewCount,
    shortDescription, amenities, checkInTime, checkOutTime,
    "city": location.city, "region": location.region,
    "price": pricing.priceFrom, "currency": pricing.currency,
    heroImage { asset->{ _id, url } }
  }`,
  vehicle: `*[_type == "vehicle"] | order(name asc) {
    _id, _type, name, "slug": slug.current, status, featured, rating,
    shortDescription, seats, withDriver, fuelIncluded, acAvailable,
    "price": pricing.priceFrom, "currency": pricing.currency,
    heroImage { asset->{ _id, url } }
  }`,
  guide: `*[_type == "guide"] | order(name asc) {
    _id, _type, name, "slug": slug.current, status, featured, rating,
    shortDescription, experienceYears, totalTours, languages, availability,
    "price": pricing.priceFrom, "currency": pricing.currency,
    portrait { asset->{ _id, url } }
  }`,
  restaurant: `*[_type == "restaurant"] | order(name asc) {
    _id, _type, name, "slug": slug.current, status, featured, rating,
    shortDescription, cuisines, priceRange, seatingCapacity, reservationRequired,
    "city": location.city,
    "price": pricing.priceFrom, "currency": pricing.currency,
    heroImage { asset->{ _id, url } }
  }`,
}

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type && QUERIES[type]) {
    const items = await sanityClient.fetch(QUERIES[type])
    return NextResponse.json({ items })
  }

  // Return all
  const [accommodations, vehicles, guides, restaurants] = await Promise.all([
    sanityClient.fetch(QUERIES.accommodation),
    sanityClient.fetch(QUERIES.vehicle),
    sanityClient.fetch(QUERIES.guide),
    sanityClient.fetch(QUERIES.restaurant),
  ])
  return NextResponse.json({ accommodations, vehicles, guides, restaurants })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { _type, name, city, region, price, currency, heroImageId, portraitId, ...rest } = body

  if (!_type || !name) return NextResponse.json({ error: '_type and name required' }, { status: 400 })

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const doc = {
    _type,
    name,
    slug: { _type: 'slug', current: slug },
    location: { _type: 'location', city: city || '', region: region || '' },
    pricing: { _type: 'pricing', currency: currency || 'PKR', priceFrom: Number(price) || 0 },
    status: rest.status || 'draft',
    featured: rest.featured || false,
    shortDescription: rest.shortDescription || '',
    ...(_type === 'vehicle' ? { seats: Number(rest.seats) || 0, withDriver: rest.withDriver || false } : {}),
    ...(_type === 'guide' ? { experienceYears: Number(rest.experienceYears) || 0, languages: rest.languages || [] } : {}),
    ...(_type === 'restaurant' ? { cuisines: rest.cuisines || [], priceRange: rest.priceRange || '' } : {}),
    ...(heroImageId ? { heroImage: { _type: 'mediaImage', asset: { _type: 'reference', _ref: heroImageId } } } : {}),
    ...(portraitId ? { portrait: { _type: 'mediaImage', asset: { _type: 'reference', _ref: portraitId } } } : {}),
  }

  const created = await sanityWriteClient.create(doc)
  return NextResponse.json({ success: true, _id: created._id })
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, fields } = await request.json()

  if (fields.price !== undefined || fields.currency !== undefined) {
    const item = await sanityClient.fetch(`*[_id == $id][0]{ pricing }`, { id })
    fields.pricing = {
      _type: 'pricing',
      currency: fields.currency ?? item?.pricing?.currency ?? 'PKR',
      priceFrom: fields.price !== undefined ? Number(fields.price) : item?.pricing?.priceFrom,
    }
    delete fields.price; delete fields.currency
  }

  if (fields.city !== undefined || fields.region !== undefined) {
    const item = await sanityClient.fetch(`*[_id == $id][0]{ location }`, { id })
    fields.location = {
      _type: 'location',
      city: fields.city ?? item?.location?.city ?? '',
      region: fields.region ?? item?.location?.region ?? '',
    }
    delete fields.city; delete fields.region
  }

  if (fields.heroImageId) {
    fields.heroImage = { _type: 'mediaImage', asset: { _type: 'reference', _ref: fields.heroImageId } }
    delete fields.heroImageId
  }
  if (fields.portraitId) {
    fields.portrait = { _type: 'mediaImage', asset: { _type: 'reference', _ref: fields.portraitId } }
    delete fields.portraitId
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

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import { sanityClient } from '@/lib/sanity/client'

const QUERY = `*[_type == "package"] | order(priority asc, title asc) {
  _id, title, "slug": slug.current, region, days, nights, difficulty,
  season, status, featured, showOnHome, priority, rating, reviewCount,
  spotsLeft, summary, subtitle, highlights, included, excluded,
  "price": pricing.priceFrom, "priceUsd": pricing.priceUsd, "currency": pricing.currency,
  heroImage { asset->{ _id, url } },
  gallery[] { asset->{ _id, url } },
  itineraryDays[] {
    _key, dayNumber, title, summary, locationName,
    routeFrom, routeTo, distanceKm, travelTime, altitudeMeters, difficulty,
    mealsIncluded, featuredMoment,
    accommodation->{ _id, name },
    vehicle->{ _id, name },
    guide->{ _id, name },
    restaurants[]->{ _id, name }
  },
  accommodations[]->{ _id, name },
  vehicles[]->{ _id, name },
  guides[]->{ _id, name },
  restaurants[]->{ _id, name },
  faqs, seo { metaTitle, metaDescription, focusKeywords }
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

  const ref = (id) => ({ _type: 'reference', _ref: id })
  const refKey = (id) => ({ _type: 'reference', _ref: id, _key: id })

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
    subtitle: body.subtitle || '',
    ...(body.spotsLeft ? { spotsLeft: Number(body.spotsLeft) } : {}),
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
    ...(body.rating ? { rating: Number(body.rating) } : {}),
    ...(body.reviewCount ? { reviewCount: Number(body.reviewCount) } : {}),
    ...(body.heroImageId ? { heroImage: { _type: 'mediaImage', asset: ref(body.heroImageId) } } : {}),
    ...(body.gallery?.length ? { gallery: body.gallery } : {}),
    ...(body.faqs?.length ? { faqs: body.faqs } : {}),
    ...(body.seo ? { seo: body.seo } : {}),
    ...(body.accommodationIds?.length ? { accommodations: body.accommodationIds.map(refKey) } : {}),
    ...(body.vehicleIds?.length ? { vehicles: body.vehicleIds.map(refKey) } : {}),
    ...(body.guideIds?.length ? { guides: body.guideIds.map(refKey) } : {}),
    ...(body.restaurantIds?.length ? { restaurants: body.restaurantIds.map(refKey) } : {}),
    ...(body.itineraryDays?.length ? { itineraryDays: body.itineraryDays.map((day, i) => ({
      _key: day._key || `day-${i+1}-${Date.now()}`,
      _type: 'itineraryDay',
      dayNumber: Number(day.dayNumber) || i+1,
      title: day.title || '',
      summary: day.summary || '',
      locationName: day.locationName || '',
      routeFrom: day.routeFrom || '',
      routeTo: day.routeTo || '',
      distanceKm: day.distanceKm ? Number(day.distanceKm) : undefined,
      travelTime: day.travelTime || '',
      altitudeMeters: day.altitudeMeters ? Number(day.altitudeMeters) : undefined,
      difficulty: day.difficulty || '',
      mealsIncluded: day.mealsIncluded || [],
      featuredMoment: day.featuredMoment || '',
      ...(day.accommodationId ? { accommodation: ref(day.accommodationId) } : {}),
      ...(day.vehicleId ? { vehicle: ref(day.vehicleId) } : {}),
      ...(day.guideId ? { guide: ref(day.guideId) } : {}),
      ...(day.restaurantIds?.length ? { restaurants: day.restaurantIds.map(refKey) } : {}),
    })) } : {}),
  }

  const created = await sanityWriteClient.create(doc)
  return NextResponse.json({ success: true, _id: created._id })
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id, fields } = body

  const slugify = t => t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')

  // Pricing
  if (fields.price !== undefined || fields.currency !== undefined || fields.priceUsd !== undefined) {
    const pkg = await sanityClient.fetch(`*[_id == $id][0]{ pricing }`, { id })
    const current = pkg?.pricing || {}
    fields.pricing = { _type:'pricing', currency: fields.currency??current.currency??'PKR', priceFrom: fields.price!==undefined?Number(fields.price):current.priceFrom, priceUsd: fields.priceUsd!==undefined?Number(fields.priceUsd):current.priceUsd }
    delete fields.price; delete fields.currency; delete fields.priceUsd
  }
  // Slug
  if (fields.title) fields.slug = { _type:'slug', current: slugify(fields.title) }
  // Images
  if (fields.heroImageId) { fields.heroImage = { _type:'mediaImage', asset:{ _type:'reference', _ref:fields.heroImageId } } }
  delete fields.heroImageId
  // Itinerary days
  if (fields.itineraryDays) {
    fields.itineraryDays = fields.itineraryDays.map((day, i) => ({
      _key: day._key || `day-${i+1}-${Date.now()}`,
      _type: 'itineraryDay',
      dayNumber: Number(day.dayNumber) || i+1,
      title: day.title || '',
      summary: day.summary || '',
      locationName: day.locationName || '',
      routeFrom: day.routeFrom || '',
      routeTo: day.routeTo || '',
      distanceKm: day.distanceKm ? Number(day.distanceKm) : undefined,
      travelTime: day.travelTime || '',
      altitudeMeters: day.altitudeMeters ? Number(day.altitudeMeters) : undefined,
      difficulty: day.difficulty || '',
      mealsIncluded: day.mealsIncluded || [],
      featuredMoment: day.featuredMoment || '',
      ...(day.accommodationId ? { accommodation: { _type:'reference', _ref:day.accommodationId } } : {}),
      ...(day.vehicleId       ? { vehicle:        { _type:'reference', _ref:day.vehicleId       } } : {}),
      ...(day.guideId         ? { guide:           { _type:'reference', _ref:day.guideId         } } : {}),
      ...(day.restaurantIds?.length ? { restaurants: day.restaurantIds.map(r => ({ _type:'reference', _ref:r, _key:r })) } : {}),
    }))
  }
  // Service refs
  if (fields.accommodationIds) { fields.accommodations = fields.accommodationIds.map(id => ({_type:'reference',_ref:id,_key:id})); delete fields.accommodationIds }
  if (fields.vehicleIds)       { fields.vehicles       = fields.vehicleIds.map(id => ({_type:'reference',_ref:id,_key:id}));       delete fields.vehicleIds }
  if (fields.guideIds)         { fields.guides         = fields.guideIds.map(id => ({_type:'reference',_ref:id,_key:id}));         delete fields.guideIds }
  if (fields.restaurantIds)    { fields.restaurants    = fields.restaurantIds.map(id => ({_type:'reference',_ref:id,_key:id}));    delete fields.restaurantIds }

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

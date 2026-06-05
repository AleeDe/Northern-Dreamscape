// Generic CRUD API for all document types
// Usage: GET/POST/PATCH/DELETE with ?type=destination etc.
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import { sanityClient } from '@/lib/sanity/client'

const QUERIES = {
  destination: `*[_type == "destination"] | order(name asc) {
    _id, name, "slug": slug.current, tagline, status, featured, bestSeason, elevationRange, summary,
    heroImage { asset->{ _id, url } }
  }`,
  landmark: `*[_type == "landmark"] | order(name asc) {
    _id, name, "slug": slug.current, category, description, elevation, mapsLink, status,
    heroImage { asset->{ _id, url } }
  }`,
  review: `*[_type == "review"] | order(reviewDate desc) {
    _id, reviewerName, rating, reviewText, reviewDate, verified, nationality,
    "relatedTo": relatedTo->{ _id, name, title, _type }
  }`,
  blogPost: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, "slug": slug.current, category, status, featured, publishedAt, excerpt,
    heroImage { asset->{ _id, url } },
    author->{ _id, name }
  }`,
  author: `*[_type == "author"] | order(name asc) {
    _id, name, role, bio, expertise,
    avatar { asset->{ _id, url } }
  }`,
  siteSettings: `*[_type == "siteSettings"][0] {
    _id, siteName, tagline, phone, email, address, whatsapp,
    logoImage { asset->{ _id, url } }
  }`,
}

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  if (!QUERIES[type]) return NextResponse.json({ error: 'Unknown type' }, { status: 400 })

  const data = await sanityClient.fetch(QUERIES[type])
  return NextResponse.json({ data })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { _type, ...body } = await request.json()
  const doc = buildDoc(_type, body)
  const created = await sanityWriteClient.create(doc)
  return NextResponse.json({ success: true, _id: created._id })
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, fields } = await request.json()
  const cleaned = processFields(fields)
  await sanityWriteClient.patch(id).set(cleaned).commit()
  return NextResponse.json({ success: true })
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await request.json()
  await sanityWriteClient.delete(id)
  return NextResponse.json({ success: true })
}

function slugify(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function imgRef(id) {
  return id ? { _type: 'mediaImage', asset: { _type: 'reference', _ref: id } } : undefined
}

function buildDoc(_type, body) {
  const base = { _type }
  const slug = (text) => ({ _type: 'slug', current: slugify(text) })

  switch (_type) {
    case 'destination':
      return { ...base, name: body.name, slug: slug(body.name), tagline: body.tagline || '', summary: body.summary || '',
        bestSeason: body.bestSeason || '', elevationRange: body.elevationRange || '', climate: body.climate || '',
        travelTime: body.travelTime || '', status: body.status || 'draft', featured: !!body.featured,
        ...(body.heroImageId ? { heroImage: imgRef(body.heroImageId) } : {}) }

    case 'landmark':
      return { ...base, name: body.name, slug: slug(body.name), category: body.category || 'other',
        description: body.description || '', elevation: Number(body.elevation) || undefined,
        mapsLink: body.mapsLink || '', bestTimeToVisit: body.bestTimeToVisit || '',
        travelTip: body.travelTip || '', status: body.status || 'live',
        ...(body.heroImageId ? { heroImage: imgRef(body.heroImageId) } : {}) }

    case 'review':
      return { ...base, reviewerName: body.reviewerName, rating: Number(body.rating) || 5,
        reviewText: body.reviewText || '', reviewDate: body.reviewDate || new Date().toISOString().split('T')[0],
        verified: !!body.verified, nationality: body.nationality || '',
        ...(body.relatedToId ? { relatedTo: { _type: 'reference', _ref: body.relatedToId } } : {}) }

    case 'blogPost':
      return { ...base, title: body.title, slug: slug(body.title), category: body.category || 'Practical',
        excerpt: body.excerpt || '', status: body.status || 'draft', featured: !!body.featured,
        publishedAt: body.publishedAt || new Date().toISOString(),
        ...(body.heroImageId ? { heroImage: imgRef(body.heroImageId) } : {}),
        ...(body.authorId ? { author: { _type: 'reference', _ref: body.authorId } } : {}) }

    case 'author':
      return { ...base, name: body.name, role: body.role || '', bio: body.bio || '',
        expertise: Array.isArray(body.expertise) ? body.expertise : [],
        ...(body.avatarId ? { avatar: imgRef(body.avatarId) } : {}) }

    default:
      return { ...base, ...body }
  }
}

function processFields(fields) {
  const out = { ...fields }
  if (out.heroImageId) { out.heroImage = imgRef(out.heroImageId); delete out.heroImageId }
  if (out.avatarId)    { out.avatar   = imgRef(out.avatarId);    delete out.avatarId    }
  if (out.portraitId)  { out.portrait = imgRef(out.portraitId);  delete out.portraitId  }
  if (out.relatedToId) { out.relatedTo = { _type: 'reference', _ref: out.relatedToId }; delete out.relatedToId }
  if (out.authorId)    { out.author = { _type: 'reference', _ref: out.authorId }; delete out.authorId }
  if (out.name && !out.slug) out.slug = { _type: 'slug', current: slugify(out.name) }
  if (out.title && !out.slug) out.slug = { _type: 'slug', current: slugify(out.title) }
  return out
}

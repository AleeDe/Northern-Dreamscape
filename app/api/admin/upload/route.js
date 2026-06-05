import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role === 'bookings') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const asset = await sanityWriteClient.assets.upload('image', buffer, {
    filename: file.name,
    contentType: file.type,
  })

  return NextResponse.json({
    _id: asset._id,
    url: asset.url,
  })
}

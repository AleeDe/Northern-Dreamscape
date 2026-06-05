import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import { sanityClient } from '@/lib/sanity/client'
import bcrypt from 'bcryptjs'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const users = await sanityClient.fetch(
    `*[_type == "adminUser"] | order(name asc) { _id, name, email, role, isActive, lastLogin }`
  )
  return NextResponse.json({ users })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, email, password, role } = await request.json()
  if (!name || !email || !password || password.length < 8) {
    return NextResponse.json({ error: 'name, email, password (min 8 chars) required' }, { status: 400 })
  }

  const existing = await sanityClient.fetch(`*[_type == "adminUser" && email == $email][0]._id`, { email })
  if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 400 })

  const passwordHash = await bcrypt.hash(password, 12)
  await sanityWriteClient.create({ _type: 'adminUser', name, email, passwordHash, role: role || 'editor', isActive: true })

  return NextResponse.json({ success: true })
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { userId, isActive } = await request.json()
  await sanityWriteClient.patch(userId).set({ isActive }).commit()
  return NextResponse.json({ success: true })
}

import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import bcrypt from 'bcryptjs'
import { createClient } from 'next-sanity'

const readClient = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-15',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// POST /api/admin/setup — only works if NO admin user exists yet
export async function POST(request) {
  // Check setup key from env for extra security
  const { name, email, password, setupKey } = await request.json()

  if (setupKey !== process.env.ADMIN_SETUP_KEY) {
    return NextResponse.json({ error: 'Invalid setup key' }, { status: 401 })
  }

  // Block if admin already exists
  const existing = await readClient.fetch(`count(*[_type == "adminUser" && role == "admin"])`)
  if (existing > 0) {
    return NextResponse.json({ error: 'Admin already exists. Use the dashboard to add more users.' }, { status: 403 })
  }

  if (!name || !email || !password || password.length < 8) {
    return NextResponse.json({ error: 'name, email, password (min 8 chars) required' }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await sanityWriteClient.create({
    _type: 'adminUser',
    name,
    email,
    passwordHash,
    role: 'admin',
    isActive: true,
  })

  return NextResponse.json({ success: true, message: 'Admin account created. You can now login.' })
}

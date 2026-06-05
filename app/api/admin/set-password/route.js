import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sanityWriteClient } from '@/lib/sanity/writeClient'
import bcrypt from 'bcryptjs'

// POST /api/admin/set-password
// Body: { userId, newPassword } — only admins can do this
export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { userId, newPassword } = await request.json()
  if (!userId || !newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: 'userId and newPassword (min 8 chars) required' }, { status: 400 })
  }

  const hash = await bcrypt.hash(newPassword, 12)
  await sanityWriteClient.patch(userId).set({ passwordHash: hash }).commit()

  return NextResponse.json({ success: true })
}

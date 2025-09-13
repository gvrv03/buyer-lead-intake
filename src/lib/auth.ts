// lib/auth.ts
import { cookies } from 'next/headers';
import prisma from './prisma';

export async function getCurrentUser() {
  // demo: read cookie "demo_user" which holds userId
  const all = cookies();
  const userId = all.get('demo_user')?.value;
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId }});
  return user;
}

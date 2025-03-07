import { useProtector } from '@/services/auth/guard'

export default async function ProtectedLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const auth = await useProtector('public')

  return children
}

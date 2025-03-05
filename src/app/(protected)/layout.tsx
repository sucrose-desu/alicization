import { useProtector } from '@/services/guard'

export default async function ProtectedLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const auth = await useProtector()
  return children
}

import { useProtector } from '@/services/auth/guard'

export default async function LabsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const account = await useProtector('labs')

  return children
}

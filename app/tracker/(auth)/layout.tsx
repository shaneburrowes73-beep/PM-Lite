import { TrackerShell } from './_components/TrackerShell'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <TrackerShell>
      {children}
    </TrackerShell>
  )
}

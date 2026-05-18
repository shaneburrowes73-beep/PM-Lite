<<<<<<< HEAD
import { TrackerShell } from './_components/TrackerShell'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <TrackerShell>
      {children}
    </TrackerShell>
  )
}
=======
import TrackerShell from './_components/TrackerShell'

export default function TrackerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <TrackerShell>{children}</TrackerShell>
      }
>>>>>>> 54991a77d8f4ce8694e7b74e15c4a7be268bf59d

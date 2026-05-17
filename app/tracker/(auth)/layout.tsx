import TrackerShell from './_components/TrackerShell'

export default function TrackerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <TrackerShell>{children}</TrackerShell>
      }

// Mirrors app/tracker/login/layout.tsx so the register form gets the same
// centered dark-background treatment.

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {children}
    </div>
  )
}

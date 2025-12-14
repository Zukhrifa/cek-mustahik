//12239148 Lutfi made layout
// app/(auth)/layout.tsx
// Layout untuk auth pages (login/register) tanpa sidebar

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

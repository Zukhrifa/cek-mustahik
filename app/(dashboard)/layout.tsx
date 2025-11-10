import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64">Sidebar</aside>
      <main className="flex-1">{children}</main> {/* ini wajib */}
    </div>
  );
}


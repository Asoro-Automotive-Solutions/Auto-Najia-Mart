'use client'

import { usePathname } from 'next/navigation'
import DashboardAdminApp from './dashboard/App'
import ItemsStoreAdminApp from './items-store/App'

export default function AdminPortal() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin/items-store')) {
    return <ItemsStoreAdminApp />
  }

  return <DashboardAdminApp />
}

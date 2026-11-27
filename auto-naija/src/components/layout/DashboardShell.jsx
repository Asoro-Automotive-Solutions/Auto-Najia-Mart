'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoCarOutline } from 'react-icons/io5'
import { IoMdArrowBack } from 'react-icons/io'
import { HiDotsVertical } from 'react-icons/hi'
import MobileMenu from './MobileMenu'
import { LuLayoutDashboard } from 'react-icons/lu'
import { MdOutlineInventory2 } from 'react-icons/md'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import { IoAnalyticsOutline } from 'react-icons/io5'
import { MdPeopleAlt } from 'react-icons/md'
import { BsGrid3X3Gap } from 'react-icons/bs'
import { RiTruckLine } from 'react-icons/ri'
import { BsCash } from 'react-icons/bs'
import { GiMegaphone } from 'react-icons/gi'
import { PiBookOpenText } from 'react-icons/pi'
import { MdOutlineAssignmentReturn } from 'react-icons/md'
import { CiMail } from 'react-icons/ci'
import { LuCircleHelp } from 'react-icons/lu'
import { IoLogOutOutline } from 'react-icons/io5'
import { MdHomeFilled } from 'react-icons/md'
import { IoMdSearch } from 'react-icons/io'
import { MdOutlineMessage } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

const menuItems = [
  { label: 'Dashboard', icon: LuLayoutDashboard, href: '/', key: 'dashboard' },
  { label: 'Inventory', icon: MdOutlineInventory2, href: '/', key: 'inventory' },
  { label: 'Orders', icon: MdOutlineShoppingCart, href: '/order-confirmation', key: 'orders' },
  { label: 'Analytics', icon: IoAnalyticsOutline, href: '/', key: 'analytics' },
  { label: 'Customers', icon: MdPeopleAlt, href: '/', key: 'customers' },
  { label: 'Suppliers', icon: BsGrid3X3Gap, href: '/', key: 'suppliers' },
  { label: 'Logistics', icon: RiTruckLine, href: '/', key: 'logistics' },
  { label: 'Payments', icon: BsCash, href: '/', key: 'payments' },
  { label: 'Promotions', icon: GiMegaphone, href: '/', key: 'promotions' },
  { label: 'Catalog', icon: PiBookOpenText, href: '/', key: 'catalog' },
  { label: 'Returns', icon: MdOutlineAssignmentReturn, href: '/', key: 'returns' },
  { label: 'Messages', icon: CiMail, href: '/chat-screens', key: 'messages' },
  { label: 'Settings', icon: IoSettingsOutline, href: '/password-security', key: 'settings' },
  { label: 'Help', icon: LuCircleHelp, href: '/help-support', key: 'help' },
  { label: 'LogOut', icon: IoLogOutOutline, href: '/logout-confirmation', key: 'logout' },
]

export default function DashboardShell({
  activeItem,
  children,
  mobileTitle = 'Password & Security',
  mobileSubtitle = '',
}) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div
      className="passwordSecurityPage dashboardShell"
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5FAFF',
      }}
    >
      <header
        className="passwordSecurityNav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: '#FCF8FF',
          borderBottom: '1px solid #C8C4D9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxSizing: 'border-box',
          zIndex: 50,
        }}
      >
        <button
          type="button"
          className="mobileNavBack"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <IoMdArrowBack size={20} />
        </button>
        <button
          type="button"
          className="mobileMenuTrigger"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <HiDotsVertical size={22} />
        </button>
        <div
          className="passwordSecurityNavBrand"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <IoCarOutline size={24} color="#1A3C6E" />
          <div
            className="passwordSecurityBrandText"
            style={{
              color: '#1A3C6E',
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Auto-Naija Mart
          </div>
        </div>

        <div
          className={`passwordSecurityMobileTitle${activeItem === 'help' ? ' helpSupportMobileTitle' : ''}`}
          style={{ display: 'none' }}
        >
          <div
            className={`passwordSecurityMobileTitleText${activeItem === 'help' ? ' helpSupportMobileTitleText' : ' passwordOnlyMobileTitleText'}`}
            style={{
              fontSize: activeItem === 'help' ? '28px' : '36px',
              fontWeight: 700,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {mobileTitle}
          </div>
          {mobileSubtitle && <div>{mobileSubtitle}</div>}
        </div>

        <div
          className="passwordSecurityNavLinks"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            color: '#474556',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <span>Home</span>
          <span>Search</span>
          <Link href="/seller-chat-screens" style={{ color: 'inherit', textDecoration: 'none' }}>Chat</Link>
          <span>Order</span>
          <span>Profile</span>
        </div>
      </header>

      {mobileMenuOpen ? (
        <MobileMenu activeItem={activeItem} onClose={() => setMobileMenuOpen(false)} />
      ) : null}

      <aside
        className="passwordSecuritySidebar dashboardSidebar"
        style={{
          width: '280px',
          backgroundColor: '#F0ECFB',
          padding: '24px 20px',
          boxSizing: 'border-box',
          position: 'fixed',
          top: '64px',
          left: 0,
          bottom: 0,
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#3A00E5',
              color: '#1A3C6E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            A
          </div>
          <div>
            <div
              style={{
                color: '#1B1A25',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Auto-Naija Mart
            </div>
            <div
              style={{
                color: '#474556',
                fontSize: '11px',
                fontWeight: 400,
                lineHeight: 1.2,
                marginTop: '4px',
              }}
            >
              Automotive Marketplace
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {menuItems.map(({ label, icon: Icon, href, key }) => {
            const isActive = activeItem === key

            return (
              <Link
                key={label}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  color: isActive ? '#B5AFFF' : '#474556',
                  fontSize: '14px',
                  fontWeight: 500,
                  backgroundColor: isActive ? '#3A00E5' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </aside>

      <main
        className="passwordSecurityMain dashboardMain"
        style={{
          marginLeft: '280px',
          minHeight: '100vh',
          boxSizing: 'border-box',
          padding: '96px 40px 32px',
        }}
      >
        {children}
      </main>

      <nav className="mobileBottomNav" aria-label="Mobile navigation">
        {[
          { label: 'Home', icon: MdHomeFilled, href: '/', key: 'dashboard' },
          { label: 'Search', icon: IoMdSearch, href: '/', key: 'search' },
          { label: 'Chat', icon: MdOutlineMessage, href: '/', key: 'chat' },
          { label: 'Order', icon: MdOutlineShoppingCart, href: '/', key: 'orders' },
          { label: 'Profile', icon: CgProfile, href: '/password-security', key: 'profile' },
        ].map(({ label, icon: Icon, href, key }) => {
          const isActive = key === 'profile'
            ? activeItem === 'profile' || activeItem === 'settings' || activeItem === 'help'
            : activeItem === key

          return (
            <Link
              key={label}
              href={href}
              className={`mobileBottomNavItem${isActive ? ' is-active' : ''}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

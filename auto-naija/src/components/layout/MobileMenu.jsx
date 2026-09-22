'use client'

import React from 'react'
import Link from 'next/link'
import { LuLayoutDashboard, LuCircleHelp } from 'react-icons/lu'
import { MdOutlineInventory2, MdOutlineShoppingCart, MdPeopleAlt, MdOutlineAssignmentReturn } from 'react-icons/md'
import { IoSettingsOutline, IoAnalyticsOutline, IoLogOutOutline } from 'react-icons/io5'
import { BsGrid3X3Gap, BsCash } from 'react-icons/bs'
import { RiTruckLine } from 'react-icons/ri'
import { GiMegaphone } from 'react-icons/gi'
import { PiBookOpenText } from 'react-icons/pi'
import { CiMail } from 'react-icons/ci'

const mobileMenuItems = [
  { label: 'Dashboard', icon: LuLayoutDashboard, href: '/', key: 'dashboard' },
  { label: 'Inventory', icon: MdOutlineInventory2, href: '/', key: 'inventory' },
  { label: 'Orders', icon: MdOutlineShoppingCart, href: '/', key: 'orders' },
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

export default function MobileMenu({ activeItem, onClose }) {
  return (
    <>
      <button className="mobileMenuBackdrop" type="button" onClick={onClose} aria-label="Close menu" />
      <aside className="mobileMenuPanel" aria-label="Mobile sidebar menu">
        <div className="mobileMenuUser">
          <div className="mobileMenuAvatar">A</div>
          <div>
            <div className="mobileMenuUserName">Auto-Naija Mart</div>
            <div className="mobileMenuUserSubtitle">Automotive Marketplace</div>
          </div>
        </div>

        <div className="mobileMenuItems">
          {mobileMenuItems.map(({ label, icon: Icon, href, key }) => (
            <Link
              key={key}
              href={href}
              onClick={onClose}
              className={`mobileMenuItem${activeItem === key ? ' is-active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}

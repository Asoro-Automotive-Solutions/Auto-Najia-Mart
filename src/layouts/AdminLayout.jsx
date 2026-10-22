import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Scale,
  Store,
  Shield,
  CreditCard,
  ShieldCheck,
  UserCheck,
  Headphones,
  Search,
  BarChart3,
  Bell,
  KeyRound,
  LogOut,
  User,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react'
import EditProfileModal from '../components/EditProfileModal'

const navItems = [
  { name: 'Overview', path: '/admin', icon: LayoutDashboard },
  { name: 'Buyers Management', path: '/admin/buyers', icon: Users },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Disputes', path: '/admin/disputes', icon: Scale },
  { name: 'Items Store', path: '/admin/items-store', icon: Store },
  { name: 'Escrow', path: '/admin/escrow', icon: Shield },
  { name: 'Financial', path: '/admin/financial', icon: CreditCard },
  { name: 'Seller Approval', path: '/admin/seller-approval', icon: ShieldCheck },
  { name: 'Sellers Management', path: '/admin/sellers-management', icon: UserCheck },
  { name: 'Support', path: '/admin/support', icon: Headphones },
  { name: 'Content Moderation', path: '/admin/moderation', icon: Search },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { name: 'Notification', path: '/admin/notifications', icon: Bell, badge: 3 },
  { name: 'Permissions', path: '/admin/permissions', icon: KeyRound },
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [profileToast, setProfileToast] = useState(false)
  const [profileName, setProfileName] = useState('Admin User')

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of the Admin Portal?')) {
      navigate('/admin/login')
    }
  }

  const handleSaveProfile = (data) => {
    if (data.firstName && data.lastName) {
      setProfileName(`${data.firstName} ${data.lastName}`)
    }
    setProfileToast(true)
    setTimeout(() => setProfileToast(false), 3500)
  }

  return (
    <div className="min-h-screen bg-[#fcfbfe] flex flex-col md:flex-row text-slate-800">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#5227d8] text-white flex items-center justify-center font-bold text-xs">
            AP
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Marketplace Admin</h1>
            <p className="text-[11px] text-slate-500">System Control Panel</p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between z-50 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 flex items-center gap-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-[#5227d8] text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-indigo-950/20">
              AP
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1a0868] tracking-tight">Marketplace Admin</h2>
              <p className="text-[11px] text-slate-400 font-medium">System Control Panel</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-0.5 flex-1 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                location.pathname === item.path ||
                (item.path === '/admin' && (location.pathname === '/admin' || location.pathname === '/admin/overview'))

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-[#ece8fb] text-[#4d22d2] font-semibold border-r-4 border-[#5227d8]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#4d22d2] stroke-[2.3]' : 'text-slate-500 stroke-[1.8]'
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Admin User Profile & Logout Footer */}
        <div className="p-3.5 border-t border-slate-200/90 bg-slate-50/50 flex items-center justify-between">
          <div
            onClick={() => setIsEditProfileOpen(true)}
            title="Click to edit profile"
            className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-80 transition-opacity group"
          >
            <div className="w-8 h-8 rounded-full bg-[#ece8fb] text-[#5227d8] group-hover:bg-[#5227d8] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-[#5227d8] transition-colors">
                {profileName}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">Super Admin</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {/* Profile Updated Toast */}
        {profileToast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm border border-slate-700 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Profile changes saved successfully!</span>
          </div>
        )}
        {children}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          firstName: profileName.split(' ')[0] || 'Admin',
          lastName: profileName.split(' ')[1] || 'User',
          email: 'admin@autonaija.market',
          phoneNumber: '+234 800 123 4567',
          address: '15 Silicon Valley Close',
          city: 'Lagos',
          country: 'Nigeria',
          state: 'Lagos State'
        }}
      />
    </div>
  )
}

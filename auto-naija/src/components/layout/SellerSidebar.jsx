import Image from 'next/image'
import Link from 'next/link'

const navigationItems = [
	{ label: 'Dashboard', href: '/', icon: 'dashboard', width: 18, height: 18 },
	{ label: 'Listings', href: '/', icon: 'listings', width: 18, height: 16 },
	{ label: 'Chat', href: '/seller-chat-screens', icon: 'chat', width: 20, height: 20 },
	{ label: 'Orders', href: '/order-confirmation', icon: 'orders', width: 20, height: 20 },
	{ label: 'Profile', href: '/password-security', icon: 'profile', width: 16, height: 16 },
	{ label: 'Settings', href: '/password-security', icon: 'settings', width: 20, height: 20 },
]

const asset = (name) => `/seller-chat-assets/${name}`

export default function SellerSidebar({ activeItem, userAvatar = asset('admin-user-avatar.png') }) {
	return (
		<aside className="sellerChatNavigation" aria-label="Seller navigation">
			<Link className="sellerChatBrand" href="/" aria-label="Auto-Naija Mart home">
				<span className="sellerChatBrandWordmark">Auto-Naija<br />Mart</span>
			</Link>
			<nav className="sellerChatNavigationLinks" aria-label="Main navigation">
				{navigationItems.map((item) => (
					<Link
						key={item.label}
						href={item.href}
						className={`sellerChatNavigationLink${activeItem === item.label ? ' is-active' : ''}`}
						aria-current={activeItem === item.label ? 'page' : undefined}
					>
						<Image src={asset(`${item.icon}.svg`)} alt="" width={item.width} height={item.height} />
						<span>{item.label}</span>
					</Link>
				))}
			</nav>
			<div className="sellerChatUser">
				<Image className="sellerChatUserAvatar" src={userAvatar} alt="" width={40} height={40} />
				<div className="sellerChatUserDetails">
					<div className="sellerChatUserName">Admin User</div>
					<div className="sellerChatUserEmail">admin@autonaija.com</div>
				</div>
			</div>
		</aside>
	)
}
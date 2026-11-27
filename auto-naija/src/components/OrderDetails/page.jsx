'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const asset = (name) => `/mobile-order-assets/${name}`

export default function OrderDetails() {
	const [shipmentStatus, setShipmentStatus] = useState('Needs Dispatch')
	const [markMessage, setMarkMessage] = useState('')
	const [moreMenuOpen, setMoreMenuOpen] = useState(false)

	const markShipped = () => {
		setShipmentStatus('Shipped')
		setMarkMessage('Order marked as shipped.')
	}

	const copyOrderNumber = async () => {
		try {
			await navigator.clipboard.writeText('ANM-8821')
			setMarkMessage('Order number copied.')
		} catch {
			setMarkMessage('Unable to copy order number.')
		}
		setMoreMenuOpen(false)
	}

	return (
		<main className="mobileOrderDetailsPage">
			<header className="mobileOrderDetailsHeader">
				<Link className="mobileOrderDetailsBack" href="/order-tracking-summary" aria-label="Back to tracking summary">
					<Image src={asset('order-details-back.svg')} alt="" width={16} height={16} />
				</Link>
				<h1>#ANM-8821</h1>
				<div className="mobileOrderDetailsMenuWrap">
					<button className="mobileOrderDetailsMore" type="button" aria-label="More order actions" aria-expanded={moreMenuOpen} onClick={() => setMoreMenuOpen((open) => !open)}>
						<Image src={asset('order-details-more.svg')} alt="" width={4} height={16} />
					</button>
					{moreMenuOpen ? <div className="mobileOrderDetailsMenu"><button type="button" onClick={copyOrderNumber}>Copy order number</button><Link href="/order-tracking-summary" onClick={() => setMoreMenuOpen(false)}>Tracking summary</Link></div> : null}
				</div>
			</header>

			<div className="mobileOrderDetailsScroll">
				<section className="mobileSellerOrderDetailsCard" aria-label="Buyer and product details">
					<div className="mobileSellerOrderBuyer">
						<Image src={asset('order-details-buyer.png')} alt="" width={40} height={40} />
						<div><strong>Trevor Philip</strong><span>Buyer</span></div>
					</div>
					<div className="mobileSellerOrderProduct">
						<div className="mobileSellerOrderProductImage"><Image src={asset('order-details-item.png')} alt="Toyota Corolla 2016 Suspension" fill sizes="64px" /></div>
						<div className="mobileSellerOrderProductCopy">
							<h2>Toyota Corolla 2016 Suspension</h2>
							<div><strong>₦70,000.00</strong><span>Quantity: <b>1</b></span></div>
						</div>
						<strong className="mobileSellerOrderProductTotal">₦70,000.00</strong>
					</div>
					<dl className="mobileSellerOrderLogistics">
						<div><dt>Pickup Option</dt><dd>GIG Courier</dd></div>
						<div><dt>Address</dt><dd>12, Oba Akran Ave. Ikeja, Lagos State</dd></div>
						<div><dt>Phone Number</dt><dd>+234 2323 23232 2323</dd></div>
					</dl>
				</section>

				<section className="mobileSellerEscrowCard" aria-label="Payment and shipping status">
					<div className="mobileSellerEscrowHeader">
						<span className="mobileSellerEscrowBadge"><span className="mobileSellerEscrowIcon" aria-hidden="true" />Locked Escrow</span>
						<div className="mobileSellerEscrowAmount"><strong>₦70,000.00</strong><span><Image src={asset('order-details-calendar.svg')} alt="" width={9} height={10} />Dec 12</span></div>
					</div>
					<div className="mobileSellerOrderStatus"><span>Status</span><strong className={shipmentStatus === 'Shipped' ? 'is-shipped' : ''}>{shipmentStatus}</strong></div>
				</section>
			</div>

			<footer className="mobileOrderDetailsFooter">
				{markMessage ? <p role="status">{markMessage}</p> : null}
				<button type="button" onClick={markShipped} disabled={shipmentStatus === 'Shipped'}>{shipmentStatus === 'Shipped' ? 'Shipped' : 'Mark Shipped'}</button>
			</footer>
		</main>
	)
}
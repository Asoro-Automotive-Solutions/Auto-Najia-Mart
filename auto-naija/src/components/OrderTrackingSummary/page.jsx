'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SellerSidebar from '../layout/SellerSidebar'

const asset = (name) => `/order-tracking-assets/${name}`
const sellerAvatar = '/order-confirmation-assets/admin-user-avatar.jpeg'

export default function OrderTrackingSummary() {
	const [trackingCopied, setTrackingCopied] = useState(false)
	const [fulfillmentCopied, setFulfillmentCopied] = useState(false)
	const [moreMenuOpen, setMoreMenuOpen] = useState(false)
	const [fulfillmentEditing, setFulfillmentEditing] = useState(false)
	const [carrier, setCarrier] = useState('GIG Logistics')
	const [detailsDialog, setDetailsDialog] = useState(null)

	const copyTrackingId = async () => {
		try {
			await navigator.clipboard.writeText('TRK-99281723')
		} catch {
			setTrackingCopied(false)
			return
		}
		setTrackingCopied(true)
	}

	const copyFulfillmentId = async () => {
		try {
			await navigator.clipboard.writeText('GIG-883-X992')
			setFulfillmentCopied(true)
		} catch {
			setFulfillmentCopied(false)
		}
	}

	return (
		<main className="sellerTrackingPage">
			<SellerSidebar activeItem="Orders" userAvatar={sellerAvatar} />
			<section className="sellerTrackingMain">
				<header className="sellerTrackingTopBar" aria-label="Account tools">
					<div className="sellerTrackingTopBarActions">
						<button type="button" aria-label="Notifications"><Image src={asset('notification.svg')} alt="" width={16} height={20} /></button>
						<button type="button" aria-label="Help"><Image src={asset('help.svg')} alt="" width={20} height={20} /></button>
						<span aria-hidden="true" />
					</div>
				</header>
				<div className="sellerTrackingScrollArea">
					<div className="sellerTrackingContent">
						<section className="sellerTrackingLeft" aria-label="Tracking details">
							<header className="sellerTrackingOrderHeader">
								<div className="sellerTrackingOrderTitle">
									<Link className="sellerTrackingBack" href="/order-confirmation" aria-label="Back to order confirmation">
										<Image src={asset('back.svg')} alt="" width={13.333} height={13.333} />
									</Link>
									<h1>#ANM-8821</h1>
								</div>
								<div className="sellerTrackingMoreWrap">
									<button className="sellerTrackingMoreButton" type="button" aria-label="More order actions" aria-expanded={moreMenuOpen} onClick={() => setMoreMenuOpen((open) => !open)}>
										<Image src={asset('more.svg')} alt="" width={3.333} height={13.333} />
									</button>
									{moreMenuOpen ? <div className="sellerTrackingMoreMenu"><button type="button" onClick={copyTrackingId}>{trackingCopied ? 'Tracking ID copied' : 'Copy tracking number'}</button><button type="button" onClick={() => { setDetailsDialog('tracking'); setMoreMenuOpen(false) }}>View tracking details</button><button type="button" onClick={() => { window.print(); setMoreMenuOpen(false) }}>Print order summary</button></div> : null}
								</div>
							</header>

							<h2 className="sellerTrackingSectionTitle">Tracking Details</h2>

							<section className="sellerTrackingPartCard" aria-label="Tracked item">
								<div className="sellerTrackingPartImage">
									<Image src={asset('corolla-suspension.png')} alt="Toyota Corolla 2016 suspension" fill sizes="80px" />
								</div>
								<div className="sellerTrackingPartCopy">
									<h3>Toyota Corolla 2016 Suspension</h3>
									<p><strong>₦70,000.00</strong><i aria-hidden="true" />Quantity: 1</p>
								</div>
							</section>

							<section className="sellerTrackingRouteCard" aria-label="Shipment route">
								<div><dt>From</dt><dd>John&apos;s Auto Parts, Lagos</dd></div>
								<div><dt>Destination</dt><dd>John Doe, Benin</dd></div>
								<div><dt>Customer</dt><dd>John Doe</dd></div>
								<div><dt>In Status</dt><dd className="is-current">In Transit</dd></div>
							</section>

							<section className="sellerTrackingTimeline" aria-label="Delivery timeline">
								<ol>
									<li className="is-current"><span className="sellerTrackingTimelineDot" /><div><strong>Out for delivery</strong><small>Feb 20th</small></div></li>
									<li><span className="sellerTrackingTimelineDot" /><div><span>Moving from</span><small>Feb 20th</small></div></li>
									<li><span className="sellerTrackingTimelineDot" /><div><span>Delivered</span><small>Feb 20th</small></div></li>
								</ol>
							</section>
						</section>

						<aside className="sellerTrackingSummary" aria-label="Transaction summary">
							<header className="sellerTrackingSummaryHeader">
								<div className="sellerTrackingSummaryMeta"><span className="sellerTrackingResolvedBadge">Resolved Dispute</span><span>Order #ORD-7829-1A</span></div>
								<h2>Transaction Summary</h2>
								<p>Closed on Oct 24, 2023</p>
							</header>

							<div className="sellerTrackingHero">
								<Image className="sellerTrackingHeroBackground" src={asset('fuel-pump-background.png')} alt="" fill priority sizes="352px" />
								<Image className="sellerTrackingHeroProduct" src={asset('fuel-pump-product.png')} alt="High-flow mechanical fuel pump" fill priority sizes="320px" />
							</div>

							<section className="sellerTrackingProductDetails">
								<h3>High-Flow Mechanical Fuel Pump</h3>
								<p>SKU: FP-V8-PRO-400</p>
								<p>Condition: New</p>
								<button type="button" onClick={() => setDetailsDialog('listing')}>
									<Image src={asset('external-link.svg')} alt="" width={12} height={12} />
									<span>View Listing</span>
								</button>
							</section>

							<section className="sellerTrackingSummarySection sellerTrackingBuyerDetails">
								<h3><Image src={asset('buyer.svg')} alt="" width={16} height={16} /><span>Buyer Details</span></h3>
								<strong>Oluwaseun Davies</strong>
								<p>Lagos, Nigeria</p>
								<button type="button" onClick={() => setDetailsDialog('buyer')}>Contact Buyer</button>
							</section>

							<section className="sellerTrackingSummarySection sellerTrackingFulfillment">
								<div className="sellerTrackingFulfillmentHeading"><h3><Image src={asset('truck.svg')} alt="" width={22} height={16} /><span>Fulfillment</span></h3><button type="button" onClick={() => setFulfillmentEditing((editing) => !editing)}>{fulfillmentEditing ? 'Save' : 'Edit'}</button></div>
								{fulfillmentEditing ? <select value={carrier} onChange={(event) => setCarrier(event.target.value)} aria-label="Fulfillment provider"><option>GIG Logistics</option><option>Courier</option><option>Pickup</option></select> : <strong>{carrier}</strong>}
								<div className="sellerTrackingIdRow"><span>ID: GIG-883-X992</span><button type="button" onClick={copyFulfillmentId} aria-label={fulfillmentCopied ? 'Fulfillment ID copied' : 'Copy fulfillment ID'} title={fulfillmentCopied ? 'Copied' : 'Copy fulfillment ID'}><Image src={asset('copy.svg')} alt="" width={9.917} height={11.667} /></button></div>
								<p>Delivered: Oct 20, 2023</p>
							</section>

							<section className="sellerTrackingFinancials">
								<h3>Financial Breakdown</h3>
								<dl>
									<div><dt>Original Price</dt><dd>₦ 45,000.00</dd></div>
									<div><dt>Shipping (GIG)</dt><dd>₦ 3,500.00</dd></div>
									<div><dt>Platform Fee (5%)</dt><dd className="is-deduction">- ₦ 2,250.00</dd></div>
									<div><dt>Dispute Adjustment</dt><dd className="is-deduction">- ₦ 5,000.00</dd></div>
								</dl>
								<div className="sellerTrackingPayout"><div><strong>Final Payout</strong><b>₦ 41,250.00</b></div><span>Settled to Wallet</span></div>
							</section>

							<div className="sellerTrackingActions">
								<button className="sellerTrackingInvoiceButton" type="button" onClick={() => window.print()}><span>Download PDF Invoice</span><Image src={asset('download.svg')} alt="" width={12} height={12} /></button>
								<Link className="sellerTrackingSupportButton" href="/help-support"><span>Contact Support</span><Image src={asset('support.svg')} alt="" width={13.5} height={15.75} /></Link>
							</div>
						</aside>
					</div>
				</div>
			</section>

			{detailsDialog ? <div className="sellerTrackingDialogBackdrop" role="presentation" onClick={() => setDetailsDialog(null)}><section className="sellerTrackingDialog" role="dialog" aria-modal="true" aria-labelledby="sellerTrackingDialogTitle" onClick={(event) => event.stopPropagation()}><button type="button" aria-label="Close details" onClick={() => setDetailsDialog(null)}>×</button><h2 id="sellerTrackingDialogTitle">{detailsDialog === 'buyer' ? 'Buyer Details' : detailsDialog === 'listing' ? 'Listing Details' : 'Tracking Details'}</h2>{detailsDialog === 'buyer' ? <p>Oluwaseun Davies · Lagos, Nigeria</p> : detailsDialog === 'listing' ? <p>High-Flow Mechanical Fuel Pump · SKU FP-V8-PRO-400 · New</p> : <p>Tracking ID #TRK-99281723 · Current status: In Transit</p>}</section></div> : null}
		</main>
	)
}
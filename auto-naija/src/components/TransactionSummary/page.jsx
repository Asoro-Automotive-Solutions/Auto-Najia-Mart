'use client'

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const iconAsset = (name) => `/order-tracking-assets/${name}`
const mobileAsset = (name) => `/mobile-seller-assets/${name}`

export default function TransactionSummary() {
	const [fulfillmentCopied, setFulfillmentCopied] = useState(false)

	const copyFulfillmentId = async () => {
		try {
			await navigator.clipboard.writeText('GIG-883-X992')
			setFulfillmentCopied(true)
		} catch {
			setFulfillmentCopied(false)
		}
	}

	return (
		<main className="mobileTransactionSummaryPage">
			<header className="mobileTransactionHeader">
				<Link href="/order-tracking-summary" aria-label="Back to tracking details">
					<Image src="/mobile-seller-assets/chat-back.svg" alt="" width={16} height={16} />
					<strong>Seller Portal</strong>
				</Link>
				<button type="button" aria-label="Notifications">
					<Image src={mobileAsset('notification.svg')} alt="" width={16} height={20} />
				</button>
			</header>

			<div className="mobileTransactionScroll">
				<header className="mobileTransactionHeading">
					<div><span>Resolved Dispute</span><small>Order #ORD-7829-1A</small></div>
					<h1>Transaction Summary</h1>
					<p>Closed on Oct 24, 2023</p>
				</header>

				<section className="mobileTransactionProductCard" aria-label="Product summary">
					<div className="mobileTransactionProductImage">
						<Image src="/mobile-order-assets/transaction-fuel-pump.png" alt="High-flow mechanical fuel pump" fill sizes="328px" />
					</div>
					<div className="mobileTransactionProductCopy">
						<h2>High-Flow Mechanical Fuel Pump</h2>
						<p>SKU: FP-V8-PRO-400</p>
						<p>Condition: New</p>
						<Link href="/seller-chat-screens"><span aria-hidden="true">↗</span> View Listing</Link>
					</div>
				</section>

				<section className="mobileTransactionInfoCard" aria-labelledby="mobileBuyerDetailsHeading">
					<h2 id="mobileBuyerDetailsHeading"><Image src={iconAsset('buyer.svg')} alt="" width={16} height={16} />Buyer Details</h2>
					<strong>Oluwaseun Davies</strong>
					<p>Lagos, Nigeria</p>
					<Link href="/seller-chat-screens">Contact Buyer</Link>
				</section>

				<section className="mobileTransactionInfoCard" aria-labelledby="mobileFulfillmentHeading">
					<h2 id="mobileFulfillmentHeading"><Image src={iconAsset('truck.svg')} alt="" width={22} height={16} />Fulfillment</h2>
					<strong>GIG Logistics</strong>
					<p className="mobileTransactionFulfillmentId">ID: GIG-883-X992<button type="button" aria-label={fulfillmentCopied ? 'Fulfillment ID copied' : 'Copy fulfillment ID'} title={fulfillmentCopied ? 'Copied' : 'Copy fulfillment ID'} onClick={copyFulfillmentId}><span aria-hidden="true" /></button></p>
					<p>Delivered: Oct 20, 2023</p>
				</section>

				<section className="mobileTransactionFinancialCard" aria-labelledby="mobileFinancialHeading">
					<h2 id="mobileFinancialHeading">Financial Breakdown</h2>
					<dl>
						<div><dt>Original Price</dt><dd>₦ 45,000.00</dd></div>
						<div><dt>Shipping (GIG)</dt><dd>₦ 3,500.00</dd></div>
						<div><dt>Platform Fee (5%)</dt><dd className="is-negative">- ₦ 2,250.00</dd></div>
						<div><dt>Dispute Adjustment</dt><dd className="is-negative">- ₦ 5,000.00</dd></div>
					</dl>
					<div className="mobileTransactionPayout">
						<div><strong>Final Payout</strong><b>₦ 41,250.00</b></div>
						<span>Settled to Wallet</span>
					</div>
				</section>

				<div className="mobileTransactionActions">
					<button type="button" onClick={() => window.print()}>Download PDF Invoice<Image src={iconAsset('download.svg')} alt="" width={12} height={12} /></button>
					<Link href="/help-support">Contact Support<Image src={iconAsset('support.svg')} alt="" width={13.5} height={15.75} /></Link>
				</div>
			</div>

			<nav className="mobileTransactionBottomNav" aria-label="Mobile navigation">
				<Link href="/"><Image src={mobileAsset('nav-home.svg')} alt="" width={16} height={18} /><span>Home</span></Link>
				<Link href="/"><Image src="/seller-chat-assets/listings.svg" alt="" width={18} height={16} /><span>Listings</span></Link>
				<Link href="/seller-chat-screens"><Image src={mobileAsset('nav-chat.svg')} alt="" width={20} height={20} /><span>Chat</span></Link>
				<Link className="is-active" href="/order-confirmation"><Image src={mobileAsset('nav-orders.svg')} alt="" width={22} height={16} /><span>Orders</span></Link>
				<Link href="/password-security"><Image src={mobileAsset('nav-profile.svg')} alt="" width={16} height={16} /><span>Profile</span></Link>
			</nav>
		</main>
	)
}
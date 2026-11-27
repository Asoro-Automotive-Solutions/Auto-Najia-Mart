'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SellerSidebar from '../layout/SellerSidebar'

const asset = (name) => `/order-confirmation-assets/${name}`

const checklistItems = [
	{
		id: 'available',
		label: 'Parts are available',
		description: 'I physically have the item ready for packaging.',
	},
	{
		id: 'delivery',
		label: 'Parts is sent for delivery to location',
		description: 'I have hand over to a Courier to deliver to the agreed location.',
	},
]

export default function OrderConfirmation() {
	const router = useRouter()
	const [checkedItems, setCheckedItems] = useState({})
	const [validationMessage, setValidationMessage] = useState('')
	const allItemsChecked = checklistItems.every((item) => checkedItems[item.id])

	const toggleChecklistItem = (id) => {
		setCheckedItems((items) => ({ ...items, [id]: !items[id] }))
		setValidationMessage('')
	}

	const sendConfirmation = () => {
		if (!allItemsChecked) {
			setValidationMessage('Confirm both checklist items before sending the order confirmation.')
			return
		}
		router.push('/order-tracking-summary')
	}

	return (
		<main className="sellerOrderPage">
			<SellerSidebar activeItem="Orders" userAvatar={asset('admin-user-avatar.jpeg')} />
			<header className="sellerOrderMobileHeader">
				<Link className="sellerOrderMobileBack" href="/seller-chat-screens" aria-label="Back to chat">
					<Image src={asset('back.svg')} alt="" width={16} height={16} />
				</Link>
				<h1>Confirm Order</h1>
				<span aria-hidden="true" />
			</header>
			<section className="sellerOrderMain">
				<header className="sellerOrderTopBar" aria-label="Account tools">
					<div className="sellerOrderTopBarActions">
						<button type="button" aria-label="Notifications"><Image src={asset('notification.svg')} alt="" width={16} height={20} /></button>
						<button type="button" aria-label="Help"><Image src={asset('help.svg')} alt="" width={20} height={20} /></button>
					</div>
				</header>
				<div className="sellerOrderScrollArea">
					<div className="sellerOrderContent">
						<header className="sellerOrderPageHeading">
							<Link className="sellerOrderBackButton" href="/seller-chat-screens" aria-label="Back to chat">
								<Image src={asset('back.svg')} alt="" width={16} height={16} />
							</Link>
							<div>
								<h1>Confirm Order</h1>
								<p>Order #ANM-8821</p>
							</div>
						</header>

						<section className="sellerOrderCard sellerAgreedTerms" aria-labelledby="sellerAgreedTermsHeading">
							<h2 id="sellerAgreedTermsHeading">Agreed Terms</h2>
							<div className="sellerAgreedItem">
								<div className="sellerAgreedItemImage">
									<Image className="sellerAgreedDesktopImage" src={asset('alternator-product.jpeg')} alt="Toyota Camry 2018 Alternator" width={96} height={96} />
									<Image className="sellerAgreedMobileImage" src="/mobile-order-assets/alternator-product.png" alt="" fill sizes="80px" />
								</div>
								<div className="sellerAgreedItemDetails">
									<h3>Toyota Camry 2018 Alternator (OEM Grade)</h3>
									<p>Quantity: <strong>1 Unit</strong></p>
									<div className="sellerAgreedItemPrice">₦70,000</div>
								</div>
							</div>
						</section>

						<section className="sellerOrderCard sellerConfirmationChecklist" aria-labelledby="sellerChecklistHeading">
							<h2 id="sellerChecklistHeading">
								<Image src={asset('checklist.svg')} alt="" width={20} height={18} />
								<span>Confirmation Checklist</span>
							</h2>
							<p className="sellerChecklistIntro">Please confirm the following before sending the final agreement to the buyer.</p>
							<div className="sellerChecklistItems">
								{checklistItems.map((item) => (
									<label className={`sellerChecklistItem${checkedItems[item.id] ? ' is-checked' : ''}`} key={item.id}>
										<input type="checkbox" checked={Boolean(checkedItems[item.id])} onChange={() => toggleChecklistItem(item.id)} />
										<span className="sellerChecklistCheckbox" aria-hidden="true">
											{!checkedItems[item.id] ? <Image src={asset('checkbox.svg')} alt="" width={20} height={20} /> : null}
										</span>
										<span className="sellerChecklistCopy">
											<strong>{item.label}</strong>
											<span>{item.description}</span>
										</span>
									</label>
								))}
							</div>
						</section>

						<section className="sellerOrderCard sellerLogisticsCard" aria-labelledby="sellerLogisticsHeading">
							<h2 id="sellerLogisticsHeading">Logistics Details</h2>
							<dl className="sellerLogisticsDetails">
								<div><dt>Delivery Fee</dt><dd>₦7,000</dd></div>
								<div><dt>Delivery/Pickup Option</dt><dd>GIG Courier</dd></div>
								<div><dt>Address</dt><dd>12, Oba Akran Ave, Ikeja, Lagos State</dd></div>
								<div><dt>Phone Number</dt><dd>+234 2323 23232 2323</dd></div>
							</dl>
						</section>

						<div className="sellerOrderSubmitArea">
							<button className="sellerOrderSubmitButton" type="button" onClick={sendConfirmation}>
								<Image src={asset('send-confirmation.svg')} alt="" width={15.833} height={13.333} />
								<span>Send Confirmation to Buyer</span>
							</button>
							{validationMessage ? <p className={`sellerOrderFeedback${allItemsChecked ? ' is-success' : ''}`} role="status">{validationMessage}</p> : null}
							<p className="sellerOrderCommitment">By sending this confirmation, you commit to fulfilling this order under Auto-Naija Mart&apos;s seller terms of service.</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import SellerSidebar from '../layout/SellerSidebar'

const initialChats = [
	{
		id: 'john',
		name: "John's Auto Parts",
		avatar: '/seller-chat-assets/john-parts-avatar.png',
		headerAvatar: '/seller-chat-assets/john-parts-header.png',
		time: '2m ago',
		preview: 'Is the Toyota Corolla 2010 alternator still available?',
		context: 'Inquiry: Corolla Alternator',
		unreadCount: 1,
		awaitingAction: false,
	},
	{
		id: 'amina',
		name: 'Amina Bello',
		avatar: '/seller-chat-assets/amina-bello-avatar.png',
		time: '1h ago',
		preview: 'I have transferred the funds for the brake pads.',
		context: 'Order #NG-8472',
		unreadCount: 2,
		awaitingAction: true,
	},
	{
		id: 'emeka',
		name: 'Emeka Motors Ltd',
		avatar: null,
		time: 'Yesterday',
		preview: 'Thanks, the delivery arrived in good condition.',
		context: 'Read',
		unreadCount: 0,
		awaitingAction: false,
	},
]

const initialThreads = {
	john: [
		{ id: 'john-1', sender: 'buyer', text: 'Hello, is this suspension still available? I need it for a 2018 model.' },
		{ id: 'john-2', sender: 'seller', text: "Yes, it's available and it fits perfectly for the 2018 model. It's an OEM part." },
		{ id: 'john-3', sender: 'buyer', text: 'Great. Can you do ₦40,000? I can come pick it up today.' },
		{ id: 'john-4', sender: 'seller', text: 'I can do ₦42,000 final price. Here is the formal offer.' },
	],
	amina: [
		{ id: 'amina-1', sender: 'buyer', text: 'I have transferred the funds for the brake pads.' },
		{ id: 'amina-2', sender: 'seller', text: 'Thanks, I will confirm the payment shortly.' },
	],
	emeka: [{ id: 'emeka-1', sender: 'buyer', text: 'Thanks, the delivery arrived in good condition.' }],
}

const asset = (name) => `/seller-chat-assets/${name}`

export default function SellerChatScreens() {
	const [chats, setChats] = useState(initialChats)
	const [selectedChatId, setSelectedChatId] = useState('john')
	const [activeFilter, setActiveFilter] = useState('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [threads, setThreads] = useState(initialThreads)
	const [messageDraft, setMessageDraft] = useState('')
	const [offerPrice, setOfferPrice] = useState('₦42,000')
	const [isEditingOffer, setIsEditingOffer] = useState(false)
	const [offerResent, setOfferResent] = useState(false)
	const [orderDetailsOpen, setOrderDetailsOpen] = useState(false)
	const [paymentConfirmed, setPaymentConfirmed] = useState(false)
	const [recording, setRecording] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const imageInputRef = useRef(null)
	const attachmentInputRef = useRef(null)
	const selectedChat = chats.find((chat) => chat.id === selectedChatId)
	const unreadCount = chats.reduce((count, chat) => count + chat.unreadCount, 0)
	const filteredChats = chats.filter((chat) => {
		const searchableText = `${chat.name} ${chat.preview} ${chat.context}`.toLowerCase()
		const matchesSearch = searchableText.includes(searchQuery.trim().toLowerCase())
		const matchesFilter = activeFilter === 'all'
			|| (activeFilter === 'unread' && chat.unreadCount > 0)
			|| (activeFilter === 'awaiting-action' && chat.awaitingAction)
		return matchesSearch && matchesFilter
	})
	const currentThread = selectedChat ? threads[selectedChat.id] || [] : []

	const selectChat = (chat) => {
		setSelectedChatId(chat.id)
		setChats((items) => items.map((item) => (
			item.id === chat.id ? { ...item, unreadCount: 0 } : item
		)))
	}

	const sendMessage = (event) => {
		event.preventDefault()
		const text = messageDraft.trim()
		if (!text || !selectedChat) return
		setThreads((items) => ({
			...items,
			[selectedChat.id]: [...(items[selectedChat.id] || []), {
				id: `${selectedChat.id}-${Date.now()}`,
				sender: 'seller',
				text,
			}],
		}))
		setChats((items) => items.map((chat) => (
			chat.id === selectedChat.id
				? { ...chat, preview: text, time: 'Just now', awaitingAction: false }
				: chat
		)))
		setMessageDraft('')
	}

	const confirmPayment = () => {
		setPaymentConfirmed(true)
		setChats((items) => items.map((chat) => (
			chat.id === 'amina' ? { ...chat, awaitingAction: false } : chat
		)))
	}

	return (
		<main className={`sellerChatPage${selectedChat ? ' is-conversation-open' : ''}`}>
			<SellerSidebar activeItem="Chat" />

			<section className="sellerChatList" aria-label="Chats">
				<header className="sellerChatListHeader">
					<h1 className="sellerChatTitle">Chat Center</h1>
					<label className="sellerChatSearch">
						<Image src={asset('search.svg')} alt="" width={15} height={15} />
						<input type="search" placeholder="Search chats, buyers, or orders..." aria-label="Search chats, buyers, or orders" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
					</label>
					<div className="sellerChatFilters" role="tablist" aria-label="Chat filters">
						<button className={`sellerChatFilter${activeFilter === 'all' ? ' is-active' : ''}`} type="button" role="tab" aria-selected={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>All Chats</button>
						<button className={`sellerChatFilter${activeFilter === 'unread' ? ' is-active' : ''}`} type="button" role="tab" aria-selected={activeFilter === 'unread'} onClick={() => setActiveFilter('unread')}>Unread({unreadCount})</button>
						<button className={`sellerChatFilter${activeFilter === 'awaiting-action' ? ' is-active' : ''}`} type="button" role="tab" aria-selected={activeFilter === 'awaiting-action'} onClick={() => setActiveFilter('awaiting-action')}>Awaiting Action</button>
					</div>
				</header>
				<div className="sellerChatCards">
					{filteredChats.map((chat) => (
						<article className={`sellerChatCard${selectedChatId === chat.id ? ' is-selected' : ''}`} key={chat.id}>
							<button className="sellerChatCardMain" type="button" onClick={() => selectChat(chat)}>
								{chat.avatar ? <Image className="sellerChatCardAvatar" src={chat.avatar} alt="" width={48} height={48} /> : <span className="sellerChatCardAvatar sellerChatCardInitial" aria-hidden="true">E</span>}
								<span className="sellerChatCardText">
									<span className="sellerChatCardHeading"><span className="sellerChatCardName">{chat.name}</span><span className="sellerChatCardTime">{chat.time}</span></span>
									<span className="sellerChatCardPreview">{chat.preview}</span>
									<span className={`sellerChatCardContext${chat.id === 'john' ? ' is-inquiry' : ''}`}>
										<Image
											src={asset(chat.id === 'john' ? 'inquiry.svg' : chat.id === 'amina' ? 'order.svg' : 'read.svg')}
											alt=""
											width={chat.id === 'amina' ? 10.5 : chat.id === 'emeka' ? 12.775 : 11.667}
											height={chat.id === 'amina' ? 11.667 : chat.id === 'emeka' ? 7.015 : 11.667}
										/>
										<span>{chat.context}</span>
									</span>
								</span>
							</button>
							{chat.id === 'john' ? <div className="sellerChatCardActions sellerChatCardActionsEnd"><button className="sellerChatReplyButton" type="button" onClick={() => selectChat(chat)}>Reply Now</button></div> : null}
							{chat.id === 'amina' ? <div className="sellerChatCardActions"><button className="sellerChatOrderButton" type="button" onClick={() => setOrderDetailsOpen(true)}>View Order</button><button className="sellerChatConfirmButton" type="button" onClick={confirmPayment} disabled={paymentConfirmed}>{paymentConfirmed ? 'Payment Confirmed' : 'Confirm Payment'}</button></div> : null}
						</article>
					))}
					{filteredChats.length === 0 ? <p className="sellerChatEmptyList">No chats match this filter.</p> : null}
				</div>
			</section>

			<section className="sellerConversation" aria-label="Conversation">
				{selectedChat ? <>
					<header className="sellerConversationHeader">
						<div className="sellerConversationIdentity">
							<button className="sellerConversationBack" type="button" aria-label="Back to chats" onClick={() => setSelectedChatId(null)}><span aria-hidden="true">‹</span></button>
							{selectedChat.headerAvatar || selectedChat.avatar ? <Image className="sellerConversationAvatar" src={selectedChat.headerAvatar || selectedChat.avatar} alt="" width={40} height={40} /> : <span className="sellerConversationAvatar sellerChatCardInitial" aria-hidden="true">E</span>}
							<div><div className="sellerConversationNameRow"><h2 className="sellerConversationName">{selectedChat.name}</h2><span className="sellerConversationOnlineDot" aria-label="Online" /></div><p className="sellerConversationPresence">Active now</p></div>
						</div>
						<div className="sellerConversationMenuWrap">
							<button className="sellerConversationMenuButton" type="button" aria-label="More conversation options" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Image src={asset('more.svg')} alt="" width={4} height={16} /></button>
							{menuOpen ? <div className="sellerConversationMenu"><button type="button" onClick={() => { setOrderDetailsOpen(true); setMenuOpen(false) }}>View order details</button><button type="button" onClick={() => setMenuOpen(false)}>Close menu</button></div> : null}
						</div>
					</header>
					<section className="sellerProductContext" aria-label="Order item">
						<div className="sellerProductImageFrame"><Image className="sellerProductImage" src={asset('suspension-strut.png')} alt="Toyota Corolla suspension strut" width={112} height={55} /></div>
						<div className="sellerProductDetails"><h3>Toyota Corolla Suspension Strut (Front Right)</h3><p><span>Condition: <strong>Brand New</strong></span><i aria-hidden="true" /><b>₦45,000</b></p></div>
						<button className="sellerProductDetailsButton" type="button" onClick={() => setOrderDetailsOpen(true)}>View Details</button>
					</section>
					<div className="sellerConversationMessages" aria-live="polite">
						<div className="sellerConversationDate">Today, 10:24 AM</div>
						{currentThread.map((message) => <div className={`sellerChatMessageRow is-${message.sender}`} key={message.id}><p className="sellerChatMessage">{message.text}</p></div>)}
						{selectedChat.id === 'john' ? <div className="sellerOfferRow"><section className="sellerOfferCard" aria-label="Special offer">
							<div className="sellerOfferHeading"><div className="sellerOfferLabel"><Image src={asset('offer-tag.svg')} alt="" width={15} height={15} /><strong>Special Offer</strong></div>{isEditingOffer ? <input className="sellerOfferPriceInput" aria-label="Offer price" value={offerPrice} onChange={(event) => setOfferPrice(event.target.value)} onBlur={() => setIsEditingOffer(false)} onKeyDown={(event) => { if (event.key === 'Enter') setIsEditingOffer(false) }} /> : <strong className="sellerOfferPrice">{offerPrice}</strong>}</div>
							<p className="sellerOfferProduct">Toyota Corolla Suspension Strut (Front Right)</p>
							<div className="sellerOfferActions"><button type="button" onClick={() => setIsEditingOffer((editing) => !editing)}>{isEditingOffer ? 'Save' : 'Edit'}</button><button className="is-resend" type="button" onClick={() => setOfferResent(true)}>{offerResent ? 'Resent' : 'Resend'}</button></div>
						</section></div> : null}
					</div>
					<footer className="sellerChatComposerFooter">
						<form className="sellerChatComposer" onSubmit={sendMessage}>
							<input ref={imageInputRef} className="sellerChatHiddenFileInput" type="file" accept="image/*" aria-label="Choose an image" />
							<input ref={attachmentInputRef} className="sellerChatHiddenFileInput" type="file" aria-label="Choose an attachment" />
							<button className="sellerChatComposerTool" type="button" aria-label="Add image" onClick={() => imageInputRef.current?.click()}><Image src={asset('image.svg')} alt="" width={14} height={14} /></button>
							<button className="sellerChatComposerTool" type="button" aria-label="Attach file" onClick={() => attachmentInputRef.current?.click()}><span className="sellerChatAttachmentIcon" aria-hidden="true" /></button>
							<textarea value={messageDraft} rows={1} placeholder="Type a message..." aria-label="Type a message" onChange={(event) => setMessageDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form.requestSubmit() } }} />
							<button className={`sellerChatComposerTool${recording ? ' is-recording' : ''}`} type="button" aria-label={recording ? 'Stop recording' : 'Record audio'} aria-pressed={recording} onClick={() => setRecording((value) => !value)}><Image src={asset('microphone.svg')} alt="" width={14} height={19} /></button>
							<button className="sellerChatSendButton" type="submit" aria-label="Send message"><Image src={asset('send.svg')} alt="" width={15.833} height={13.333} /></button>
						</form>
					</footer>
				</> : <div className="sellerConversationEmpty">Select a chat to open the conversation.</div>}
			</section>

			{orderDetailsOpen ? <div className="sellerOrderDialogBackdrop" role="presentation" onClick={() => setOrderDetailsOpen(false)}><section className="sellerOrderDialog" role="dialog" aria-modal="true" aria-labelledby="sellerOrderDialogTitle" onClick={(event) => event.stopPropagation()}><button className="sellerOrderDialogClose" type="button" aria-label="Close details" onClick={() => setOrderDetailsOpen(false)}>×</button><h2 id="sellerOrderDialogTitle">Order details</h2><p>Toyota Corolla Suspension Strut (Front Right)</p><div><span>Condition</span><strong>Brand New</strong></div><div><span>Asking price</span><strong>₦45,000</strong></div></section></div> : null}
		</main>
	)
}
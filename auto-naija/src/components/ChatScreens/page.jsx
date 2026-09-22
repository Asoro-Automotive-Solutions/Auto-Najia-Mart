'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoCarOutline } from 'react-icons/io5'
import { IoMdSearch } from 'react-icons/io'
import { BsCheckAll } from 'react-icons/bs'
import { IoMdArrowBack, IoMdCall } from 'react-icons/io'
import { IoMdSend } from 'react-icons/io'
import { HiDotsVertical } from 'react-icons/hi'
import { FaRegSquare } from 'react-icons/fa6'
import { RiLock2Line } from 'react-icons/ri'
import { CiCircleInfo } from 'react-icons/ci'
import { LuLockKeyhole } from 'react-icons/lu'
import { MdHomeFilled, MdOutlineMessage, MdOutlineShoppingCart } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import MobileMenu from '../layout/MobileMenu'
import seller1 from '../../assets/images/seller1.png'
import seller2 from '../../assets/images/seller2.png'
import seller3 from '../../assets/images/seller3.png'
import engineImage from '../../assets/images/engine.png'
import { IoShieldOutline } from 'react-icons/io5'

const activeSellers = [
  { image: seller1, name: 'Reliable Autos', ring: true },
  { image: seller2, name: 'German Parts', ring: false },
  { image: seller3, name: "Mike's Garage", ring: true },
]

const initialRecentMessages = [
  {
    image: seller1,
    name: 'Reliable Autos',
    time: '10:42 AM',
    message: 'Okay, I look forward to seeing you this afternoon for pickup',
    sent: false,
    ring: true,
  },
  {
    image: seller2,
    name: 'German Parts',
    time: 'Yesterday',
    message: 'The brake pads are in stock. Let me know when you want them.',
    sent: false,
    ring: false,
  },
  {
    image: seller3,
    name: "Mike's Garage",
    time: 'Monday',
    message: 'Thanks for the quick confirmation. See…',
    sent: true,
    ring: true,
  },
]

const ChatScreens = () => {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  const [recentMessages, setRecentMessages] = useState(initialRecentMessages)
  const [conversationMessages, setConversationMessages] = useState({})
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSendMessage = (event) => {
    event.preventDefault()

    const message = messageInput.trim()
    if (!message || !selectedMessage) return

    setConversationMessages((messages) => ({
      ...messages,
      [selectedMessage.name]: [
        ...(messages[selectedMessage.name] || []),
        { message, time: 'Just now' },
      ],
    }))
    setRecentMessages((messages) => messages.map((conversation) => (
      conversation.name === selectedMessage.name
        ? {
            ...conversation,
            sellerMessage: conversation.sellerMessage || conversation.message,
            message,
            time: 'Just now',
            sent: true,
          }
        : conversation
    )))
    setMessageInput('')
  }

  return (
    <main className={`chatScreen${selectedMessage ? ' is-conversation-open' : ''}${paymentOpen ? ' is-payment-open' : ''}`}>
      <header className="chatTopNav">
        <Link href="/" className="chatTopNavBrand">
          <IoCarOutline size={24} />
          <span>Auto-Naija Mart</span>
        </Link>
        <nav className="chatTopNavLinks" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/">Search</Link>
          <Link href="/chat-screens">Chat</Link>
          <Link href="/">Order</Link>
          <Link href="/password-security">Profile</Link>
        </nav>
      </header>
      {mobileMenuOpen ? (
        <MobileMenu activeItem="messages" onClose={() => setMobileMenuOpen(false)} />
      ) : null}
      <aside className="chatSidebar">
        <h1 className="chatSidebarTitle">Chat</h1>

        <div className="chatSearch">
          <IoMdSearch size={20} />
          <input type="search" placeholder="Search conversations" aria-label="Search conversations" />
        </div>

        <h2 className="chatSectionTitle">Active Sellers</h2>

        <div className="chatActiveSellers">
          {activeSellers.map((seller) => (
            <div className="chatSellerStatus" key={seller.name}>
              <div className={`chatSellerAvatar${seller.ring ? ' has-ring' : ''}`}>
                <Image src={seller.image} alt={seller.name} fill sizes="64px" />
                <span className="chatOnlineDot" />
              </div>
              <span className="chatSellerName">{seller.name}</span>
            </div>
          ))}
        </div>

        <h2 className="chatSectionTitle chatRecentTitle">Recent Messages</h2>

        <div className="chatRecentMessages">
          {recentMessages.map((conversation) => (
            <button
              className={`chatRecentMessage${selectedMessage?.name === conversation.name ? ' is-selected' : ''}`}
              key={conversation.name}
              type="button"
              onClick={() => setSelectedMessage(conversation)}
            >
              <Image
                className="chatRecentAvatar"
                src={conversation.image}
                alt={conversation.name}
                width={48}
                height={48}
              />
              <div className="chatRecentMessageBody">
                <div className="chatRecentMessageHeader">
                  <span className="chatRecentMessageName">{conversation.name}</span>
                  <span className="chatRecentMessageTime">{conversation.time}</span>
                </div>
                <div className="chatRecentMessagePreview">
                  {conversation.sent ? <BsCheckAll className="chatSentTicks" size={16} /> : null}
                  <span>{conversation.message}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="chatConversationArea" aria-label="Conversation area">
        {selectedMessage ? (
          <>
            <header className="chatConversationHeader">
              <button
                type="button"
                className="chatConversationBack"
                onClick={() => setSelectedMessage(null)}
                aria-label="Back to recent messages"
              >
                <IoMdArrowBack size={22} />
              </button>
              <Image
                className="chatConversationAvatar"
                src={selectedMessage.image}
                alt={selectedMessage.name}
                width={48}
                height={48}
              />
              <div className="chatConversationSeller">
                <div className="chatConversationName">{selectedMessage.name}</div>
                <div className="chatConversationStatus">
                  <span className={`chatConversationStatusDot${selectedMessage.ring ? ' is-online' : ''}`} />
                  {selectedMessage.ring ? 'Online' : 'Offline'}
                </div>
              </div>
              <div className="chatConversationActions">
                <button type="button" aria-label="Call seller">
                  <IoMdCall size={21} />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open conversation menu"
                >
                  <HiDotsVertical size={22} />
                </button>
              </div>
            </header>
            <div className="chatRequestedPartCard">
              <Image
                className="chatRequestedPartImage"
                src={engineImage}
                alt="Toyota Corolla Engine Block"
                width={64}
                height={64}
              />
              <div className="chatRequestedPartDetails">
                <div className="chatRequestedPartName">Toyota Corolla Engine Block (2.5L)</div>
                <div className="chatRequestedPartMeta">
                  <span className="chatEscrowLabel">
                    <IoShieldOutline size={14} />
                    Escrow Protected
                  </span>
                  <span>• Ref: REQ-0992</span>
                </div>
              </div>
              <div className="chatRequestedPartPrice">₦450,000</div>
            </div>
            <div className="chatConversationMessages">
              <div className="chatSentMessage">
                <div className="chatFullMessage is-sent">
                  <span>I would like to negotiate the price a bit. Can you do 420,000?</span>
                  <span className="chatMessageMeta">
                    <span className="chatMessageTime">10:40 AM</span>
                    <BsCheckAll className="chatSentTicks" size={16} />
                  </span>
                </div>
              </div>
              <div className="chatReceivedMessage">
                <Image
                  className="chatMessageSellerIcon"
                  src={selectedMessage.image}
                  alt=""
                  width={20}
                  height={20}
                />
                <div className="chatFullMessage is-received">
                  <span>{selectedMessage.sellerMessage || selectedMessage.message}</span>
                  <span className="chatMessageMeta">
                    <span className="chatMessageTime">{selectedMessage.time}</span>
                  </span>
                </div>
              </div>
              {conversationMessages[selectedMessage.name]?.map((sentMessage, index) => (
                <div className="chatSentMessage" key={`${sentMessage.time}-${index}`}>
                  <div className="chatFullMessage is-sent">
                    <span>{sentMessage.message}</span>
                    <span className="chatMessageMeta">
                      <span className="chatMessageTime">{sentMessage.time}</span>
                      <BsCheckAll className="chatSentTicks" size={16} />
                    </span>
                  </div>
                </div>
              ))}
              <div className="chatTypingIndicator">
                <Image
                  className="chatTypingAvatar"
                  src={selectedMessage.image}
                  alt=""
                  width={20}
                  height={20}
                />
                <div className="chatTypingDots" aria-label="Seller is typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <form className="chatComposer" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Input message here"
                aria-label="Input message here"
                value={messageInput}
                onChange={(event) => setMessageInput(event.target.value)}
              />
              <button
                type="submit"
                className={`chatSendButton${messageInput.trim() ? ' has-message' : ''}`}
                aria-label="Send message"
                disabled={!messageInput.trim()}
              >
                <IoMdSend size={22} />
              </button>
            </form>
            {!paymentOpen ? (
              <div className="chatPaymentPanel">
              <div className="chatPaymentHeader">
                <div className="chatAgreedPriceLabel">
                  <FaRegSquare size={16} />
                  <span>Agreed Price</span>
                </div>
                <div className="chatAgreedPrice">₦420,000</div>
              </div>
              <button type="button" className="chatEscrowButton" onClick={() => setPaymentOpen(true)}>
                <RiLock2Line size={18} />
                <span>Pay via Escrow</span>
              </button>
              <div className="chatPaymentNote">Funds held securely until part is received and verified.</div>
              </div>
            ) : null}
            {paymentOpen ? (
              <aside className="chatNegotiationPanel" aria-label="Negotiation details">
                <div className="chatNegotiationMobileHeader">
                  <button type="button" onClick={() => setPaymentOpen(false)} aria-label="Back to chat">
                    <IoMdArrowBack size={22} />
                  </button>
                  <span>Negotiation Details</span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open negotiation menu"
                  >
                    <HiDotsVertical size={22} />
                  </button>
                </div>
                <div className="chatNegotiationHeading">
                  <span>Negotiation Details</span>
                  <span className="chatPendingBadge">Pending</span>
                </div>
                <div className="chatOrderSummaryCard">
                  <div className="chatOrderSummaryTitle">ORDER SUMMARY</div>
                  <div className="chatOrderSummaryRow">
                    <span>Original price</span>
                    <span className="chatOriginalPrice">₦450,000</span>
                  </div>
                  <div className="chatAgreedPriceBox">
                    <div className="chatOrderSummaryRow">
                      <span className="chatAgreedSummaryLabel">
                        <FaRegSquare size={14} />
                        Agreed price
                      </span>
                      <span className="chatAgreedSummaryPrice">₦420,000</span>
                    </div>
                  </div>
                  <div className="chatOrderSummaryRow chatSmallSummaryRow">
                    <span>Delivery (Ikeja)</span>
                    <span>₦5,000</span>
                  </div>
                  <div className="chatOrderSummaryRow chatSmallSummaryRow">
                    <span className="chatFeeLabel">
                      Escrow Fee (1.5%) <CiCircleInfo size={15} />
                    </span>
                    <span>₦6,300</span>
                  </div>
                  <div className="chatOrderSummaryDivider" />
                  <div className="chatOrderSummaryRow chatTotalRow">
                    <span>Total to Pay</span>
                    <span>₦431,300</span>
                  </div>
                </div>
                <div className="chatSecureEscrowCard">
                  <LuLockKeyhole width={16} height={21} />
                  <div>
                    <div className="chatSecureEscrowTitle">Secure Escrow Payment</div>
                    <div className="chatSecureEscrowCopy">
                      Funds are held securely and only released to the seller<br />
                      once you receive and verify the item.
                    </div>
                  </div>
                </div>
                <div className="chatNegotiationPayment">
                  <button type="button" className="chatEscrowButton">
                    <RiLock2Line size={18} />
                    <span>Pay via Escrow</span>
                  </button>
                  <div className="chatPaymentNote">By proceeding, you agree to our terms.</div>
                </div>
              </aside>
            ) : null}
          </>
        ) : null}
      </section>
      <nav className="mobileBottomNav chatMobileBottomNav" aria-label="Mobile navigation">
        <Link className="mobileBottomNavItem" href="/">
          <MdHomeFilled size={16} />
          <span>Home</span>
        </Link>
        <Link className="mobileBottomNavItem" href="/">
          <IoMdSearch size={16} />
          <span>Search</span>
        </Link>
        <Link className="mobileBottomNavItem is-active" href="/chat-screens">
          <MdOutlineMessage size={16} />
          <span>Chat</span>
        </Link>
        <Link className="mobileBottomNavItem" href="/">
          <MdOutlineShoppingCart size={16} />
          <span>Order</span>
        </Link>
        <Link className="mobileBottomNavItem" href="/password-security">
          <CgProfile size={16} />
          <span>Profile</span>
        </Link>
      </nav>
    </main>
  )
}

export default ChatScreens

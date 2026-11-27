'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoMdArrowBack } from 'react-icons/io'
import { HiDotsVertical } from 'react-icons/hi'
import { RxExit } from 'react-icons/rx'
import { PiInfoFill } from 'react-icons/pi'
import MobileMenu from '../layout/MobileMenu'

const LogoutConfirmation = () => {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div
      className="logoutConfirmationOverlay"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#302F3A',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="logoutConfirmationCard"
        style={{
          width: '448px',
          maxWidth: '100%',
          height: 'auto',
          maxHeight: 'calc(100vh - 48px)',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          overflow: 'hidden',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="logoutConfirmationHeader"
          style={{
            height: '56px',
            backgroundColor: '#2700A6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '0 16px',
            boxSizing: 'border-box',
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            className="logoutConfirmationBack"
            onClick={() => router.back()}
            aria-label="Go back"
            style={{
              position: 'absolute',
              left: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              padding: 0,
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <IoMdArrowBack size={20} />
          </button>
          <button
            type="button"
            className="logoutConfirmationMenuTrigger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiDotsVertical size={22} />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Logout
            </div>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 400,
                lineHeight: 1.2,
                marginTop: '2px',
              }}
            >
              Confirm your action
            </div>
          </div>
        </div>

        <div
          className="logoutConfirmationBody"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '28px 24px 24px',
            boxSizing: 'border-box',
            overflowY: 'auto',
          }}
        >
          <div
            className="logoutConfirmationIcon"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#FFE8E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#BA1A1A',
              flexShrink: 0,
            }}
          >
            <RxExit size={24} />
          </div>

          <div
            className="logoutConfirmationTitle"
            style={{
              marginTop: '18px',
              textAlign: 'center',
              color: '#1B1A25',
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            Are you sure you
            <br />
            want to log out?
          </div>

          <div
            className="logoutConfirmationSubtitle"
            style={{
              marginTop: '12px',
              textAlign: 'center',
              color: '#61646B',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            <span className="logoutConfirmationDesktopCopy">
              You&apos;ll need to log in again to access your account,
              <br />
              track orders, and chat with sellers.
            </span>
            <span className="logoutConfirmationMobileCopy">
              You&apos;ll need to log in again to access
              <br />
              your account, track orders, and chat
              <br />
              with sellers.
            </span>
          </div>

          <div
            className="logoutConfirmationWarning"
            style={{
              width: '384px',
              maxWidth: '100%',
              marginTop: '22px',
              backgroundColor: '#FFDAD6',
              borderRadius: '8px',
              padding: '14px 16px',
              boxSizing: 'border-box',
            }}
          >
            <div
              className="logoutConfirmationWarningTitle"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <PiInfoFill size={16} color="#BA1A1A" />
              <div
                style={{
                  color: '#1B1A25',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Before you go
              </div>
            </div>

            <div
              className="logoutConfirmationWarningText"
              style={{
                marginTop: '8px',
                color: '#61646B',
                fontSize: '11px',
                fontWeight: 400,
                lineHeight: 1.45,
              }}
            >
              Make sure you&apos;ve saved any important information
              <br />
              Pending orders will remain in your account
              <br />
              You can log back in anytime
            </div>
          </div>

          <div
            className="logoutConfirmationButtons"
            style={{
              width: '100%',
              marginTop: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              className="logoutConfirmationPrimary"
              style={{
                width: '384px',
                maxWidth: '100%',
                height: '44px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#BA1A1A',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Yes, Logout
            </button>

            <button
              type="button"
              className="logoutConfirmationSecondary"
              style={{
                width: '384px',
                maxWidth: '100%',
                height: '44px',
                borderRadius: '8px',
                border: '1px solid #C8C4D9',
                backgroundColor: '#EAE6F5',
                color: '#1B1A25',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>

          <div
            className="logoutConfirmationFooter"
            style={{
              marginTop: '16px',
              color: '#61646B',
              fontSize: '11px',
              fontWeight: 400,
              lineHeight: 1.4,
              textAlign: 'center',
            }}
          >
            Need help? Contact support@autopartpro.com
          </div>
        </div>
      </div>
      {mobileMenuOpen ? (
        <MobileMenu activeItem="logout" onClose={() => setMobileMenuOpen(false)} />
      ) : null}
    </div>
  )
}

export default LogoutConfirmation

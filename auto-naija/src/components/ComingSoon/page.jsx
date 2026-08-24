import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdAnalytics } from "react-icons/md"
import { BiSolidBellRing } from "react-icons/bi"
import { GrFormPreviousLink } from "react-icons/gr"
import comingSoonBg from '../../assets/images/coming soon bg.png'

const Page = () => {
  return (
    <div
      className="comingSoonPage"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Image
        src={comingSoonBg}
        alt="Coming soon background"
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          zIndex: 0,
        }}
      />
      <div
        className="comingSoonContent"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <div
          className="comingSoonIcon"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#1A3C6E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MdAnalytics size={32} color="#FFFFFF" />
        </div>
        <div
          className="comingSoonTitle"
          style={{
            color: '#1A3C6E',
            fontSize: '34px',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Wholesale Analytics
        </div>
        <div
          className="comingSoonBadge"
          style={{
            padding: '6px 16px',
            border: '1px solid #C8C4D9',
            borderRadius: '999px',
            backgroundColor: '#EAE6F5',
            color: '#474556',
            fontSize: '14px',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          COMING SOON
        </div>
        <div
          className="comingSoonCopy"
          style={{
            color: '#474556',
            fontSize: '16px',
            fontWeight: 400,
            textAlign: 'center',
            lineHeight: '1.6',
            maxWidth: '720px',
          }}
        >
          <div>We are engineering a powerful new suite of tools to give you deep insights into your</div>
          <div>wholesale automotive inventory and escrow transactions.</div>
        </div>
        <div
          className="comingSoonCard"
          style={{
            width: '448px',
            height: '298px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            className="comingSoonCardTitle"
            style={{
              color: '#1B1A25',
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            Get Notified
          </div>
          <div
            className="comingSoonCardText"
            style={{
              color: '#61646B',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '1.5',
            }}
          >
            Be the first to know when Wholesale Analytics goes
            <br />
            live.
          </div>
          <div className="comingSoonFieldWrap" style={{ position: 'relative', width: '382px', marginTop: '6px' }}>
            <div
              className="comingSoonFieldLabel"
              style={{
                position: 'absolute',
                top: '0',
                left: '12px',
                transform: 'translateY(-50%)',
                backgroundColor: '#FFFFFF',
                padding: '0 4px',
                color: '#61646B',
                fontSize: '11px',
                fontWeight: 400,
                zIndex: 1,
              }}
            >
              Email Address
            </div>
            <input
              type="email"
              placeholder="Enter your business email"
              className="comingSoonInput"
              style={{
                width: '382px',
                height: '50px',
                border: '1px solid #C8C4D9',
                borderRadius: '8px',
                padding: '0 16px',
                boxSizing: 'border-box',
                fontSize: '16px',
                fontWeight: 400,
                color: '#1B1A25',
                outline: 'none',
                display: 'block',
              }}
            />
          </div>
          <button
            type="button"
            className="comingSoonButton"
            style={{
              marginTop: '4px',
              backgroundColor: '#1A3C6E',
              color: '#FFFFFF',
              width: '382px',
              height: '44px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '15px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <span>Notify Me</span>
            <BiSolidBellRing />
          </button>
        </div>
        <Link
          href="/404"
          className="comingSoonLink"
          style={{
            color: '#1A3C6E',
            fontSize: '14px',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          <GrFormPreviousLink />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  )
}

export default Page

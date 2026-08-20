import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { IoMdHome } from "react-icons/io"
import image404 from '../../assets/images/404error.png'

const page = props => {
  return (
    <div
      className="page404"
      style={{
        backgroundColor: '#F7F9FC',
        minHeight: '100vh',
        padding: '16px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="card404"
        style={{
          backgroundColor: '#FFFFFF',
          width: 'min(672px, 100%)',
          height: 'auto',
          minHeight: '762px',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '32px 24px',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="image404"
          style={{
            position: 'relative',
            width: 'min(448px, 100%)',
            aspectRatio: '4 / 3',
            border: '1px solid #C8C4D9',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <Image src={image404} alt="404 error" fill style={{ objectFit: 'cover' }} />
        </div>
        <div
          className="title404"
          style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            color: '#1A3C6E',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          404
        </div>
        <div
          className="headline404"
          style={{
            fontSize: 'clamp(24px, 5vw, 30px)',
            fontWeight: 600,
            color: '#000000',
            textAlign: 'center',
          }}
        >
          Oops! This part is missing
        </div>
        <div
          className="body404"
          style={{
            fontSize: 'clamp(14px, 3.6vw, 18px)',
            fontWeight: 400,
            color: '#61646B',
            textAlign: 'center',
            lineHeight: '1.6',
            maxWidth: '560px',
            whiteSpace: 'pre-line',
          }}
        >
          It looks like we couldn&apost find the page or
          {'\n'}
          component you were looking for. It might
          {'\n'}
          have been removed, renamed, or is
          {'\n'}
          temporarily out of stock in our digital garage.
        </div>
        <Link
          href="/"
          className="homeButton404"
          style={{
            marginTop: '12px',
            textDecoration: 'none',
            backgroundColor: '#1A3C6E',
            paddingTop: '12px',
            paddingRight: '16px',
            paddingBottom: '12px',
            paddingLeft: '16px',
            fontSize: 'clamp(14px, 3vw, 15px)',
            fontWeight: 500,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            maxWidth: '100%',
          }}
        >
          <IoMdHome />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  )
}

// page.propTypes = {

// }

export default page

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoCarOutline } from 'react-icons/io5'
import { FaHeart } from 'react-icons/fa'
import { BsShop } from 'react-icons/bs'
import { MdOutlineMessage } from 'react-icons/md'
import brakeImg from '../../assets/images/brakes.png'
import airFilterImg from '../../assets/images/air filter.png'
import shocksImg from '../../assets/images/shocks.png'
import plugsImg from '../../assets/images/plugs.png'

const items = [
  {
    title: 'OEM Brake Pad Set',
    subtitle: 'Front Axle, Ceramic Material',
    seller: 'Brake & Autoparts Lagos',
    fit1: 'Fits: Toyota Corolla 2018-2020, Toyota',
    fit2: 'Avalon 2019-2020',
    price: '₦37,000',
    image: brakeImg,
  },
  {
    title: 'Premium Air Filter',
    subtitle: 'Cabin Air Filter, Activated Carbon',
    seller: 'Auto Care Hub Abuja',
    fit1: 'Fits: Honda Accord 2013-2017, Honda',
    fit2: 'Civic 2016-2021',
    price: '₦12,500',
    image: airFilterImg,
  },
  {
    title: 'Rear Shock Absorber',
    subtitle: 'Gas-charged, Twin-tube design',
    seller: 'Genuine Parts NG',
    fit1: 'Fits: Nissan Altima 2013-2018',
    fit2: '',
    price: '₦45,000',
    image: shocksImg,
  },
  {
    title: 'Iridium Spark Plug Set (4pcs)',
    subtitle: 'Long-life Iridium Center Electrode',
    seller: 'Lagos Auto Spares',
    fit1: 'Universal fit for most modern 4-cylinder',
    fit2: 'engines',
    price: '₦18,500',
    image: plugsImg,
  },
]

const Page = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5FAFF',
      }}
    >
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: '#FCF8FF',
          borderBottom: '1px solid #C8C4D9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxSizing: 'border-box',
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <IoCarOutline size={24} color="#1A3C6E" />
          <div
            style={{
              color: '#1A3C6E',
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Auto-Naija Mart
          </div>
        </div>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            color: '#474556',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Home
          </Link>
          <span>Search</span>
          <span>Chat</span>
          <span>Order</span>
          <span>Profile</span>
        </nav>
      </header>

      <main
        style={{
          paddingTop: '64px',
          minHeight: '100vh',
          boxSizing: 'border-box',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '32px',
        }}
      >
        <div
          style={{
            maxWidth: '1176px',
            margin: '0 auto',
            paddingTop: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                color: '#1B1A25',
                fontSize: '34px',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Favourites
            </div>
            <div
              style={{
                color: '#61646B',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              4 Items
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '18px',
            }}
          >
            {items.map((item) => (
              <article
                key={item.title}
                style={{
                  width: '274px',
                  maxWidth: '100%',
                  height: '456px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #C8C4D9',
                  borderRadius: '12px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '192px',
                    backgroundColor: '#F6F1FF',
                    position: 'relative',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '240px',
                      height: '130px',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: '#1A3C6E',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 400,
                      lineHeight: 1,
                      zIndex: 1,
                    }}
                  >
                    NEW
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      color: '#BA1A1A',
                      zIndex: 1,
                    }}
                  >
                    <FaHeart size={18} />
                  </div>
                </div>

                <div
                  style={{
                    padding: '16px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      color: '#1B1A25',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      textAlign: 'left',
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      width: '100%',
                      marginTop: '6px',
                      color: '#61646B',
                      fontSize: '11px',
                      fontWeight: 400,
                      lineHeight: 1.4,
                      textAlign: 'left',
                    }}
                  >
                    {item.subtitle}
                  </div>

                  <div
                    style={{
                      width: '100%',
                      marginTop: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#1B1A25',
                      fontSize: '11px',
                      fontWeight: 400,
                      lineHeight: 1.4,
                      textAlign: 'left',
                    }}
                  >
                    <BsShop size={14} />
                    <span>{item.seller}</span>
                  </div>

                  <div
                    style={{
                      width: '100%',
                      marginTop: '12px',
                      minHeight: '50px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #C8C4D9',
                      borderRadius: '4px',
                      padding: '8px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '2px',
                    }}
                  >
                    <div
                      style={{
                        color: '#61646B',
                        fontSize: '11px',
                        fontWeight: 400,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.fit1}
                    </div>
                    {item.fit2 ? (
                      <div
                        style={{
                          color: '#61646B',
                          fontSize: '11px',
                          fontWeight: 400,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.fit2}
                      </div>
                    ) : null}
                  </div>

                  <div
                    style={{
                      width: '100%',
                      marginTop: '12px',
                      color: '#1A3C6E',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 1.2,
                      textAlign: 'left',
                    }}
                  >
                    {item.price}
                  </div>

                  <button
                    type="button"
                    style={{
                      width: '100%',
                      height: '48px',
                      marginTop: '12px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#1A3C6E',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <MdOutlineMessage size={18} />
                    <span>Chat With Seller</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoCarOutline } from 'react-icons/io5'
import { IoIosArrowForward } from 'react-icons/io'
import { VscVerifiedFilled } from 'react-icons/vsc'
import { CiLocationOn } from 'react-icons/ci'
import { CiStar } from 'react-icons/ci'
import { IoCalendarClearOutline } from 'react-icons/io5'
import { IoShareSocialOutline } from 'react-icons/io5'
import { MdOutlineMessage } from 'react-icons/md'
import { MdCarRepair } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdEngineering } from 'react-icons/md'
import { HiOutlineBolt } from 'react-icons/hi2'
import { RiShieldKeyholeLine } from 'react-icons/ri'
import { FaArrowRight } from 'react-icons/fa6'
import sellerBg from '../../assets/images/seller bg.png'

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
          minHeight: '100vh',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '88px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '6px',
            color: '#61646B',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: 1.2,
            maxWidth: '1168px',
            margin: '0 auto',
          }}
        >
          <span>Marketplace</span>
          <IoIosArrowForward size={12} />
          <span>Suppliers</span>
          <IoIosArrowForward size={12} />
          <span style={{ color: '#1B1A25' }}>Autoparts Lagos</span>
        </div>

        <div
          style={{
            maxWidth: '1168px',
            margin: '20px auto 0',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '192px',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image
              src={sellerBg}
              alt="Seller background"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div
            style={{
              width: '100%',
              height: '104px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #C8C4D9',
              borderTop: 'none',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
              boxSizing: 'border-box',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: '32px',
              top: '148px',
              width: '128px',
              height: '128px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              boxSizing: 'border-box',
              overflow: 'hidden',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1A3C6E',
              fontSize: '34px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
            }}
          >
            AL
          </div>

          <div
            style={{
              position: 'absolute',
              left: '184px',
              top: '214px',
              display: 'flex',
              alignItems: 'center',
            gap: '12px',
            zIndex: 2,
          }}
        >
            <div
              style={{
                color: '#1B1A25',
                fontSize: '24px',
                fontWeight: 700,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              Autoparts Lagos
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                height: '28px',
                width: '152px',
                boxSizing: 'border-box',
                borderRadius: '4px',
                backgroundColor: 'rgba(26, 60, 110, 0.10)',
                color: '#1A3C6E',
                whiteSpace: 'nowrap',
              }}
            >
              <VscVerifiedFilled size={14} />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                Verified Business
              </span>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: '184px',
              top: '252px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              color: '#61646B',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: 1.2,
              zIndex: 2,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CiLocationOn size={14} />
              <span>Ladipo Market, Lagos</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CiStar size={14} />
              <span>4.8 (1,245 Reviews)</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <IoCalendarClearOutline size={14} />
              <span>Joined 2015</span>
            </span>
          </div>

          <div
            style={{
              position: 'absolute',
              right: '24px',
              top: '214px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 2,
            }}
          >
            <button
              type="button"
              style={{
                width: '99px',
                height: '46px',
                borderRadius: '8px',
                border: '1px solid #787588',
                backgroundColor: '#FFFFFF',
                color: '#1B1A25',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <IoShareSocialOutline size={16} />
              <span>Share</span>
            </button>

            <button
              type="button"
              style={{
                width: '176px',
                height: '46px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#1A3C6E',
                color: '#FFFFFF',
                fontSize: '14px',
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
        </div>

        <div
          style={{
            maxWidth: '1168px',
            margin: '24px auto 0',
            borderBottom: '1px solid #C8C4D9',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            boxSizing: 'border-box',
          }}
        >
          {[
            { label: 'Product Overview', active: false },
            { label: 'Reviews', active: false },
            { label: 'About', active: true },
            { label: 'Refund Policy', active: false },
          ].map((tab) => (
            <div
              key={tab.label}
              style={{
                padding: '14px 0 12px',
                color: tab.active ? '#1A3C6E' : '#474556',
                fontSize: '14px',
                fontWeight: tab.active ? 700 : 500,
                borderBottom: tab.active ? '2px solid #1A3C6E' : '2px solid transparent',
                marginBottom: '-1px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: '1168px',
            margin: '24px auto 0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '25px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '770px',
              maxWidth: '100%',
              minHeight: '236px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #C8C4D9',
              borderRadius: '12px',
              boxSizing: 'border-box',
              padding: '24px',
            }}
          >
            <div
              style={{
                color: '#1B1A25',
                fontSize: '28px',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '12px',
              }}
            >
              About This Seller
            </div>

            <div
              style={{
                color: '#474556',
                fontSize: '14px',
                fontWeight: 400,
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
            }}
          >
              {`Autoparts Lagos is a verified business specializing in genuine and aftermarket auto parts for all major
car brands. Operating from Ladipo Market, we have been serving the Lagos automotive community since
2015.

We pride ourselves on fast fulfillment, quality parts, and excellent customer service. All our parts come
with warranties where applicable. Our team of experienced mechanics and parts specialists are always
available to help you find the exact fit for your vehicle.`}
            </div>
          </div>

          <div
            style={{
              width: '373px',
              maxWidth: '100%',
              minHeight: '236px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #C8C4D9',
              borderRadius: '12px',
              boxSizing: 'border-box',
              padding: '24px',
            }}
          >
            <div
              style={{
                color: '#1B1A25',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '18px',
              }}
            >
              Seller Performance
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      color: '#474556',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}
                  >
                    Response Rate
                  </span>
                  <span
                    style={{
                      color: '#1B1A25',
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    98%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '9999px',
                    backgroundColor: '#E5E0EF',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '98%',
                      height: '100%',
                      backgroundColor: '#1A3C6E',
                    }}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      color: '#474556',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}
                  >
                    On-time Delivery
                  </span>
                  <span
                    style={{
                      color: '#1B1A25',
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    95%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '9999px',
                    backgroundColor: '#E5E0EF',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '95%',
                      height: '100%',
                      backgroundColor: '#1A3C6E',
                    }}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      color: '#474556',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}
                  >
                    Order Defect Rate
                  </span>
                  <span
                    style={{
                      color: '#1B1A25',
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    0.5%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '9999px',
                    backgroundColor: '#E5E0EF',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '0.5%',
                      height: '100%',
                      backgroundColor: '#1A3C6E',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: '1168px',
            margin: '24px auto 0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '25px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '770px',
              maxWidth: '100%',
              minHeight: '236px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #C8C4D9',
              borderRadius: '12px',
              boxSizing: 'border-box',
              padding: '24px',
            }}
          >
            <div
              style={{
                color: '#1B1A25',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '16px',
              }}
            >
              Specialties
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '12px',
              }}
            >
              {[
                {
                  icon: MdCarRepair,
                  title: 'Brake Systems',
                  copy: 'Pads, rotors, calipers, and fluid systems.',
                },
                {
                  icon: IoSettingsOutline,
                  title: 'Suspension Components',
                  copy: 'Shocks, struts, control arms, and bushings.',
                },
                {
                  icon: MdEngineering,
                  title: 'Engine Parts',
                  copy: 'Cylinder heads, pistons, belts, and gaskets.',
                },
                {
                  icon: HiOutlineBolt,
                  title: 'Electrical Systems',
                  copy: 'Alternators, starters, sensors, and wiring.',
                },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    style={{
                      height: '74px',
                      border: '1px solid #C8C4D9',
                      borderRadius: '12px',
                      boxSizing: 'border-box',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(26, 60, 110, 0.10)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1A3C6E',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={19} />
                    </div>
                    <div>
                      <div
                        style={{
                          color: '#1B1A25',
                          fontSize: '14px',
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          color: '#61646B',
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: 1.3,
                          marginTop: '4px',
                        }}
                      >
                        {item.copy}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            style={{
              width: '373px',
              maxWidth: '100%',
              height: '154px',
              backgroundColor: '#F0ECFB',
              border: '1px solid rgba(200, 196, 217, 0.5)',
              borderRadius: '12px',
              boxSizing: 'border-box',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px',
                }}
              >
                <RiShieldKeyholeLine size={16} color="#1A3C6E" />
                <div
                  style={{
                    color: '#1B1A25',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  Refund Policy Highlight
                </div>
              </div>

              <div
                style={{
                  color: '#474556',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Returns accepted within 14 days of delivery. Parts
                <br />
                must be uninstalled and in original packaging.
              </div>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#1A3C6E',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.2,
                cursor: 'pointer',
                width: 'fit-content',
              }}
            >
              <span>Read full policy</span>
              <FaArrowRight size={14} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page

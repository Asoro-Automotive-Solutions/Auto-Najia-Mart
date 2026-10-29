'use client'

import React from 'react'
import DashboardShell from '../layout/DashboardShell'
import { IoIosHelpCircle } from 'react-icons/io'
import { IoMdSearch } from 'react-icons/io'
import { MdOutlineMessage } from 'react-icons/md'
import { MdOutlineLocalPhone } from 'react-icons/md'
import { MdOutlineEmail } from 'react-icons/md'
import { CiCircleInfo } from 'react-icons/ci'
import { FaAngleDown } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'

const page = () => {
  return (
    <DashboardShell
      activeItem="help"
      mobileTitle="Help & Support"
      mobileSubtitle=""
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '20px',
          boxSizing: 'border-box',
        }}
      >
        <section
          className="helpSupportHero"
          style={{
            width: '880px',
            maxWidth: '100%',
            minHeight: '302px',
            padding: '48px',
            borderRadius: '16px',
            background: 'linear-gradient(90deg, #2700A6 0%, #3A00E5 100%)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <IoIosHelpCircle size={30} color="#FFFFFF" />

          <div
            className="helpSupportHeroTitle"
            style={{
              marginTop: '18px',
              color: '#FFFFFF',
              fontSize: '34px',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            How can we help?
          </div>

          <div
            className="helpSupportHeroCopy"
            style={{
              marginTop: '10px',
              color: '#E4DFFF',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Get quick answers or contact our<span className="helpSupportMobileBreak"><br /></span> support team
          </div>

          <form
            className="helpSupportSearch"
            onSubmit={(event) => event.preventDefault()}
            style={{
              marginTop: '28px',
              width: '512px',
              maxWidth: '100%',
              height: '56px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px 0 20px',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <IoMdSearch size={20} color="#61646B" />
            <input
              type="text"
              placeholder="Search for healp..."
              aria-label="Search for help"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                marginLeft: '10px',
                color: '#61646B',
                fontSize: '16px',
                fontWeight: 400,
                backgroundColor: 'transparent',
                minWidth: 0,
              }}
            />
            <button
              className="helpSupportSearchButton"
              type="button"
              style={{
                width: '95px',
                height: '36px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: '#2700A6',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              Search
            </button>
          </form>
        </section>

        <div
          style={{
            width: '880px',
            maxWidth: '100%',
            marginTop: '28px',
          }}
        >
          <div
            className="helpSupportSectionHeading"
            style={{
              color: '#1B1A25',
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            Contact Support
          </div>

          <div
            className="helpSupportContactGrid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '24px',
            }}
          >
            <article
              style={{
                height: '142px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #C8C4D9',
                borderRadius: '12px',
                padding: '20px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: '#F6F1FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2700A6',
                  flexShrink: 0,
                }}
              >
                <MdOutlineMessage size={24} />
              </div>
              <div
                style={{
                  color: '#1B1A25',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Live Chat
              </div>
              <div
                style={{
                  color: '#61646B',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Chat with our support<span className="helpSupportContactBreak"><br /></span> team.
              </div>
            </article>

            <article
              style={{
                height: '142px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #C8C4D9',
                borderRadius: '12px',
                padding: '20px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: '#F6F1FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#A14000',
                  flexShrink: 0,
                }}
              >
                <MdOutlineLocalPhone size={24} />
              </div>
              <div
                style={{
                  color: '#1B1A25',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Call Us
              </div>
              <div
                style={{
                  color: '#61646B',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                +234 800 567 9874
              </div>
            </article>

            <article
              style={{
                height: '142px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #C8C4D9',
                borderRadius: '12px',
                padding: '20px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: '#F6F1FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2700A6',
                  flexShrink: 0,
                }}
              >
                <MdOutlineEmail size={24} />
              </div>
              <div
                style={{
                  color: '#1B1A25',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Email Us
              </div>
              <div
                style={{
                  color: '#61646B',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                support@shop.com
              </div>
            </article>
          </div>
        </div>

        <div
          style={{
            width: '880px',
            maxWidth: '100%',
            marginTop: '28px',
          }}
        >
          <div
            className="helpSupportSectionHeading"
            style={{
              color: '#1B1A25',
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            Popular Questions
          </div>

          <div
            style={{
              width: '100%',
              height: '160px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #C8C4D9',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            {[
              'How do i track my orders?',
              'What payment methods are accepted?',
              'How does Escrow Protection work?',
            ].map((question, index) => (
              <div key={question}>
                <div
                  style={{
                    height: '53px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1B1A25',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    <CiCircleInfo size={18} />
                    <span>{question}</span>
                  </div>
                  <FaAngleDown size={16} color="#1B1A25" />
                </div>
                {index < 2 && (
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: '#E5E0EF',
                      width: '100%',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: '880px',
            maxWidth: '100%',
            marginTop: '28px',
          }}
        >
          <div
            className="helpSupportSectionHeading"
            style={{
              color: '#1B1A25',
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            Quick Help
          </div>

          <div
            className="helpSupportQuickHelpCard"
            style={{
              width: '100%',
              minHeight: '118px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #C8C4D9',
              borderRadius: '12px',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <div className="helpSupportQuickHelpItem">
              <div className="helpSupportQuickHelpTitle">Report a problem</div>
              <div className="helpSupportQuickHelpCopy">
                Having an issue with a transaction or the platform? Let us know.
              </div>
            </div>
            <div className="helpSupportQuickHelpDivider" />
            <div className="helpSupportQuickHelpItem">
              <div className="helpSupportQuickHelpTitle">Suggest a feature</div>
              <div className="helpSupportQuickHelpCopy">
                Share your ideas to improve the AutoPart app.
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: '880px',
            maxWidth: '100%',
            marginTop: '28px',
            height: '66px',
            backgroundColor: '#F6F1FF',
            border: '1px solid #C5C0FF',
            borderRadius: '12px',
            boxSizing: 'border-box',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2700A6',
              flexShrink: 0,
            }}
          >
            <IoMdTime size={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div
              style={{
                color: '#1B1A25',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Monday - Friday: 8:00 AM - 11:00 PM (WAT)
            </div>
            <div
              style={{
                color: '#61646B',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Saturday - Sunday: 9:00 AM - 11:00 PM (WAT)
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

export default page

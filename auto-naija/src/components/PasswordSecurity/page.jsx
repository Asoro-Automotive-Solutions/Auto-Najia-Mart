'use client'

import React, { useState } from 'react'
import DashboardShell from '../layout/DashboardShell'
import { GoShieldLock } from "react-icons/go"
import { BsKey } from "react-icons/bs"
import { IoPhonePortraitOutline } from "react-icons/io5"
import { IoFingerPrintSharp } from "react-icons/io5"
import { RxCountdownTimer } from "react-icons/rx"
import { IoLogOutOutline } from "react-icons/io5"
import { IoIosArrowForward } from "react-icons/io"

const PasswordSecurity = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false)

  return (
    <DashboardShell activeItem="settings">
      <div className="passwordSecurityHeadingWrap">
        <div
          className="passwordSecurityTitle"
          style={{
            color: '#1B1A25',
            fontSize: '28px',
            fontWeight: 700,
            marginBottom: '8px',
          }}
        >
          Password & Security
        </div>
        <div
          className="passwordSecuritySubtitle"
          style={{
            color: '#474556',
            fontSize: '14px',
            fontWeight: 400,
            marginBottom: '24px',
          }}
        >
          Keep your account secure and manage your login methods.
        </div>
      </div>

      <div
        className="passwordSecurityStatusCard"
        style={{
          width: '768px',
          maxWidth: '100%',
          height: '138px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #C8C4D9',
          borderRadius: '12px',
          padding: '20px 24px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            className="passwordSecurityStatusIcon"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#EAF4FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <GoShieldLock size={22} color="#1A3C6E" />
          </div>
          <div>
            <div
              className="passwordSecurityStatusTitle"
              style={{
                color: '#1B1A25',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Account Prottected
            </div>
            <div
              className="passwordSecurityStatusCopy"
              style={{
                color: '#474556',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: 1.4,
                marginTop: '4px',
              }}
            >
              Your security is good. Consider enabling 2FA.
            </div>
          </div>
        </div>

        <div
          className="passwordSecurityScoreRow"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '18px',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              color: '#474556',
              fontSize: '11px',
              fontWeight: 400,
            }}
          >
            Security Score
          </div>
          <div
            style={{
              color: '#474556',
              fontSize: '11px',
              fontWeight: 400,
            }}
          >
            75%
          </div>
        </div>

        <div
          className="passwordSecurityScoreBar"
          style={{
            width: '718px',
            maxWidth: '100%',
            height: '8px',
            backgroundColor: '#E5E0EF',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '75%',
              height: '100%',
              backgroundColor: '#1A3C6E',
              borderRadius: '999px',
            }}
          />
        </div>
      </div>

      <div
        className="passwordSecuritySectionHeading"
        style={{
          color: '#1B1A25',
          fontSize: '16px',
          fontWeight: 700,
          marginTop: '28px',
          marginBottom: '12px',
        }}
      >
        SECURITY SETTINGS
      </div>

      <div
        className="passwordSecuritySettingsCard"
        style={{
          width: '768px',
          maxWidth: '100%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #C8C4D9',
          borderRadius: '12px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          className="passwordSecuritySettingRow"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="passwordSecuritySettingIcon"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#EAF4FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <BsKey size={18} color="#1A3C6E" />
            </div>
            <div>
              <div
                className="passwordSecuritySettingTitle"
                style={{
                  color: '#1B1A25',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Changed Password
              </div>
              <div
                className="passwordSecuritySettingCopy"
                style={{
                  color: '#474556',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginTop: '4px',
                }}
              >
                Last changed 3 months ago
              </div>
            </div>
          </div>
          <div
            className="passwordSecurityAction"
            style={{
              color: '#1A3C6E',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Change
          </div>
        </div>
        <div style={{ height: '1px', backgroundColor: '#E5E0EF' }} />
        <div
          className="passwordSecuritySettingRow"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="passwordSecuritySettingIcon"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#EAF4FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IoPhonePortraitOutline size={18} color="#1A3C6E" />
            </div>
            <div>
              <div
                className="passwordSecuritySettingTitle"
                style={{
                  color: '#1B1A25',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Two-factor Authentication
              </div>
              <div
                className="passwordSecuritySettingCopy"
                style={{
                  color: '#474556',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginTop: '4px',
                }}
              >
                Add and extra layer of security
              </div>
            </div>
          </div>
          <div
            className="passwordSecurityAction"
            style={{
              color: '#1A3C6E',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Set-up
          </div>
        </div>
        <div className="passwordSecurityMobileSettingRow">
          <div className="passwordSecurityMobileSettingInfo">
            <div className="passwordSecuritySettingIcon">
              <IoFingerPrintSharp size={20} color="#1A3C6E" />
            </div>
            <div>
              <div className="passwordSecuritySettingTitle">Biometric Login</div>
              <div className="passwordSecuritySettingCopy">Use fingerprint or face ID</div>
            </div>
          </div>
          <button
            type="button"
            className={`passwordSecurityToggle${biometricEnabled ? ' is-enabled' : ''}`}
            onClick={() => setBiometricEnabled((enabled) => !enabled)}
            aria-label="Toggle Biometric Login"
            aria-pressed={biometricEnabled}
          >
            <span />
          </button>
        </div>
        <div className="passwordSecurityMobileSettingDivider" />
        <div className="passwordSecurityMobileSettingRow">
          <div className="passwordSecurityMobileSettingInfo">
            <div className="passwordSecuritySettingIcon">
              <RxCountdownTimer size={20} color="#1A3C6E" />
            </div>
            <div>
              <div className="passwordSecuritySettingTitle">Active Sessions</div>
              <div className="passwordSecuritySettingCopy">Manage your logged-in devices</div>
            </div>
          </div>
          <div className="passwordSecurityAction passwordSecurityMobileAction">View</div>
        </div>
      </div>

      <div
        className="passwordSecuritySectionHeading"
        style={{
          color: '#1B1A25',
          fontSize: '16px',
          fontWeight: 700,
          marginTop: '28px',
          marginBottom: '12px',
        }}
      >
        RECENT LOGIN ACTIVITY
      </div>

      <div
        className="passwordSecurityActivityCard"
        style={{
          width: '768px',
          maxWidth: '100%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #C8C4D9',
          borderRadius: '12px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          className="passwordSecurityActivityRow"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="passwordSecurityDot"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#22C55E',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <div
                  className="passwordSecurityDeviceTitle"
                  style={{
                    color: '#1B1A25',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  iPhone 14 Pro
                </div>
                <div
                  className="passwordSecurityCurrentBadge"
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#3A00E5',
                    color: '#B5AFFF',
                    fontSize: '11px',
                    fontWeight: 500,
                  }}
                >
                  Current
                </div>
              </div>
              <div
                className="passwordSecurityMeta"
                style={{
                  color: '#474556',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginTop: '4px',
                }}
              >
                Lagos, Nigeria <span style={{ margin: '0 6px' }}>•</span> Just now
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: '1px', backgroundColor: '#E5E0EF' }} />
        <div
          className="passwordSecurityActivityRow"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="passwordSecurityDot"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#E5E0EF',
                flexShrink: 0,
              }}
            />
            <div>
              <div
                className="passwordSecurityDeviceTitle"
                style={{
                  color: '#1B1A25',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                MacBook Pro M2
              </div>
              <div
                className="passwordSecurityMeta"
                style={{
                  color: '#474556',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginTop: '4px',
                }}
              >
                Lagos, Nigeria <span style={{ margin: '0 6px' }}>•</span> 2 days ago
              </div>
            </div>
          </div>
          <div
            style={{
              color: '#1A3C6E',
              cursor: 'pointer',
            }}
          >
            <IoLogOutOutline size={18} />
          </div>
        </div>
      </div>

      <div
        className="passwordSecuritySessionsLinkWrap"
        style={{
          width: '768px',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '8px',
          paddingRight: '24px',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="passwordSecuritySessionsLink"
          style={{
            color: '#1A3C6E',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          View All Sessions
        </div>
      </div>

      <div
        className="passwordSecurityDangerHeading"
        style={{
          color: '#BA1A1A',
          fontSize: '14px',
          fontWeight: 500,
          marginTop: '28px',
          marginBottom: '12px',
        }}
      >
        DANGER ZONE
      </div>

      <div
        className="passwordSecurityDangerCard"
        style={{
          width: '768px',
          maxWidth: '100%',
          height: '74px',
          backgroundColor: '#FFF1F0',
          border: '1px solid #BA1A1A',
          borderRadius: '12px',
          padding: '12px 24px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            className="passwordSecurityDangerTitle"
            style={{
              color: '#1B1A25',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Deactivate Account
          </div>
          <div
            className="passwordSecurityDangerCopy"
            style={{
              color: '#474556',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Temporarily disable your account
          </div>
        </div>
        <div
          className="passwordSecurityDangerAction"
          style={{
            color: '#1A3C6E',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IoIosArrowForward size={18} />
        </div>
      </div>
    </DashboardShell>
  )
}

export default PasswordSecurity

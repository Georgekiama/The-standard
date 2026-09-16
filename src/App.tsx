import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import andyPhoto from '@/imports/andyy.jpg'
import javantePhoto from '@/imports/javonte-1.jpeg'
import introVideo from '@/imports/golf222.mp4'
import aboutBg from '@/imports/aboutimage.png'
import aboutVideo from '@/imports/about_vid_6.mp4'
import cinematicVideo from '@/imports/cinematic__new_vid.mp4'
import atlantaVideo from '@/imports/atlanta_footage.mp4'

import nilImg from '@/imports/NIL-STANDARD.png'
import golfImg from '@/imports/golfimagee.png'
import footballHeroImg from '@/imports/nil_1-1.JPG'
import coachingImg from '@/imports/coaching_oppot.jpeg'
import coachingOpp5Img from '@/imports/coach_oppotunity5.png'
import contractNegImg from '@/imports/contract_negoatiation_3.png'
import coachingRepImg from '@/imports/coaching_rep.jpeg'
import coachingRepPngImg from '@/imports/coaching_rep.png'
import generalManagerImg from '@/imports/GENEral_manager_44.png'
import communityImpactImg from '@/imports/community_impact.jpg'
import brandPartnershipImg from '@/imports/brand_partneship.jpg'
import lifeAfterSports1 from '@/imports/life_after_sports.jpeg'
import lifeAfterSports2 from '@/imports/life_after_sport_2.jpeg'
import lifeAfterSports3 from '@/imports/coaching_oppot-1.jpeg'
import connSteelerImg from '@/imports/conn_steeler.jpeg'
import superbowlImg from '@/imports/superbowl.jpeg'
import worldChampionImg from '@/imports/world_champion.jpeg'
import settingStandardImg from '@/imports/settign_th_standard_image.jpg'
import thisIsStandard1 from '@/imports/this_is_the_standard.jpeg'
import thisIsStandard2 from '@/imports/this_is_the_standard_2.jpeg'
import img1340 from '@/imports/IMG_1340.JPG'
import connLawLogo from '@/imports/ConnLaw_4C_Horiz-4.jpg'
import standardLogoImg from '@/imports/logo_4.png'
import golfHeroImg from '@/imports/golf_image2.jpg'
import nil1Img from '@/imports/nil_1.JPG'
import nil2Img from '@/imports/nil_2.JPG'
import nil3Img from '@/imports/nil_3.jpeg'
import athleticDirectorsImg from '@/imports/athleteic_directors.png'
import executivePlacementImg from '@/imports/executive_placement.jpg'
import wealthMgmtImg from '@/imports/wealth_management.jpg'
import financialPlanningImg from '@/imports/financial_planning.jpg'
import businessConsultingImg from '@/imports/business_consulting.jpg'
import legacyImpactImg from '@/imports/charitable_foundation_image.jpg'
import legalBackingImg from '@/imports/legal_backing-1.jpg'
import riskMgmtImg from '@/imports/risk_management-1.jpg'

import communityImpactNewImg from '@/imports/community_impact.JPG'
import buildYourTeamProtectImg from '@/imports/build_your_team_protect_your_future.JPG'
import buildYourTeamImg from '@/imports/build_your_team.JPG'
import publicSpeaking2Img from '@/imports/public_speaking_2.jpeg'
import publicSpeaking22Img from '@/imports/public_speaking_22.jpeg'
import clientRelationsImg from '@/imports/client_relations.JPG'
import advisoryImg from '@/imports/advisory_image1.png'
import charitable1Img from '@/imports/charitable_1.JPG'
import charitable2Img from '@/imports/charitable_2.jpg'

// ── NAV TREE ──────────────────────────────────────────────────────────────────

type NavTree = Record<string, Record<string, string[]>>

const NAV_TREE: NavTree = {
  REPRESENT: {
    Athletes: ['NFLPA', 'NIL', 'Pro & Collegiate Golf'],
    Coaches: ['Coaching Representation', 'Coaching Opportunities', 'Contract Negotiation'],
    Executives: ['Executive Placement', 'General Managers', 'Collegiate Athletic Directors'],
  },
  BUILD: {
    Trust: ['Client Relations', 'Personal Advisory', 'Build Your Team. Protect Your Future.'],
    Wealth: ['Wealth Management', 'Financial Planning', 'Investment Coordination'],
    Business: ['Brand Partnerships', 'Marketing Opportunities', 'Business Consulting', 'Entrepreneurship', 'Company Formation'],
    Legacy: ['Community Impact', 'Charitable Foundations', 'Public Speaking', 'Life After Sports'],
  },
  PROTECT: {
    'Legal Backing': ['Contract Review', 'Contract Negotiation', 'Business Law', 'Intellectual Property'],
    'Risk Management': ['Reputation Management', 'Compliance'],
    'Crisis Awareness': ['Crisis Communications', 'Public Relations Support', 'Social Media Guidance'],
  },
}

// ── PAGE TYPE ─────────────────────────────────────────────────────────────────

type AppPage =
  | { type: 'home' }
  | { type: 'pillar'; pillar: string; l2: string | null; l3: string | null }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'apply' }

// ── HOOKS ─────────────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref: ref as React.RefObject<any>, visible }
}

function useCountUp(target: number, duration = 2400, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    const timer = setInterval(() => {
      frame++
      const progress = Math.min(frame / totalFrames, 1)
      setCount(Math.round(target * ease(progress)))
      if (frame >= totalFrames) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

// ── LOGO MARK (inline SVG — transparent canvas, no JPEG box) ──────────────────

function LogoMark({ uid = 'lg', style }: { uid?: string; style?: React.CSSProperties }) {
  const g = (s: string) => `${uid}_${s}`
  return (
    <svg
      viewBox="0 0 430 156"
      aria-label="The Standard Sports & Entertainment Group"
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        <linearGradient id={g('m')} x1="0" y1="32" x2="0" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#8AAABB" />
          <stop offset="18%"  stopColor="#D4E2EE" />
          <stop offset="40%"  stopColor="#9AAABA" />
          <stop offset="60%"  stopColor="#485262" />
          <stop offset="80%"  stopColor="#1A2232" />
          <stop offset="100%" stopColor="#364858" />
        </linearGradient>
      </defs>

      {/* THE */}
      <text
        x="2" y="38"
        style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: '17px' }}
        letterSpacing="8"
        fill="#9AAFC0"
      >THE</text>

      {/* STANDARD */}
      <text
        x="0" y="116"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: '80px',
        }}
        letterSpacing="3"
        fill={`url(#${g('m')})`}
      >STANDARD</text>

      {/* SPORTS & ENTERTAINMENT GROUP */}
      <text
        x="2" y="144"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 400,
          fontSize: '14px',
        }}
        letterSpacing="4"
        fill="#C2CED8"
      >SPORTS &amp; ENTERTAINMENT GROUP</text>
    </svg>
  )
}

// ── LOGO ──────────────────────────────────────────────────────────────────────

function Logo({ onClick }: { onClick?: () => void }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        background: 'transparent',
        border: 'none',
        padding: 0,
      }}
    >
      <img
        src={standardLogoImg}
        alt="The Standard Sports & Entertainment Group"
        style={{
          width: 'clamp(120px, 14vw, 190px)',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
          opacity: 0.94,
          transition: 'opacity 0.18s ease',
        }}
        onMouseEnter={onClick ? (e) => { (e.currentTarget as HTMLImageElement).style.opacity = '1' } : undefined}
        onMouseLeave={onClick ? (e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.92' } : undefined}
      />
    </Tag>
  )
}

// ── CASCADING NAV ─────────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

function CascadingNav({
  onNavigate,
  onUtility,
}: {
  onNavigate: (l1: string, l2: string, l3: string) => void
  onUtility: (page: string) => void
}) {
  const isMobile = useIsMobile()

  // Desktop state
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null)
  const [hoveredL2, setHoveredL2] = useState<string | null>(null)

  // Mobile accordion state
  const [openPillar, setOpenPillar] = useState<string | null>(null)
  const [openL2, setOpenL2] = useState<string | null>(null)

  const l2Keys = hoveredPillar ? Object.keys(NAV_TREE[hoveredPillar]) : []
  const l3Items = hoveredPillar && hoveredL2 ? (NAV_TREE[hoveredPillar][hoveredL2] || []) : []

  /* ── MOBILE: tap-accordion ── */
  if (isMobile) {
    return (
      <div className="flex flex-col w-full h-full overflow-y-auto" style={{ paddingTop: '100px', paddingBottom: '16px' }}>
        <div className="flex-1">
          {Object.keys(NAV_TREE).map(pillar => {
            const isPillarOpen = openPillar === pillar
            return (
              <div key={pillar} style={{ borderBottom: '1px solid #111' }}>
                {/* L1 */}
                <button
                  className="w-full text-left flex items-center justify-between"
                  style={{ paddingTop: '10px', paddingBottom: '10px' }}
                  onClick={() => {
                    setOpenPillar(isPillarOpen ? null : pillar)
                    setOpenL2(null)
                  }}
                >
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(2.4rem, 11vw, 3.6rem)',
                    lineHeight: 1.0,
                    letterSpacing: '0.06em',
                    color: isPillarOpen ? '#C4C0B8' : '#ffffff',
                    transition: 'color 0.18s ease',
                    userSelect: 'none',
                  }}>
                    {pillar}
                  </span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '18px',
                    color: isPillarOpen ? '#C4C0B8' : '#444',
                    transition: 'transform 0.22s ease, color 0.18s ease',
                    transform: isPillarOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                    lineHeight: 1,
                    marginRight: '4px',
                  }}>+</span>
                </button>

                {/* L2 accordion */}
                <div style={{
                  maxHeight: isPillarOpen ? '1200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.38s ease',
                }}>
                  <div style={{ paddingBottom: '12px', paddingLeft: '4px' }}>
                    {Object.keys(NAV_TREE[pillar]).map(l2 => {
                      const isL2Open = openL2 === l2
                      return (
                        <div key={l2} style={{ marginBottom: '4px' }}>
                          {/* L2 row */}
                          <button
                            className="w-full text-left flex items-center justify-between"
                            style={{ paddingTop: '7px', paddingBottom: '7px' }}
                            onClick={() => setOpenL2(isL2Open ? null : l2)}
                          >
                            <span style={{
                              fontFamily: "'Oswald', sans-serif",
                              fontSize: '1rem',
                              fontWeight: 500,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: isL2Open ? '#C4C0B8' : '#bbb',
                              transition: 'color 0.15s ease',
                            }}>
                              {l2}
                            </span>
                            <span style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '14px',
                              color: isL2Open ? '#C4C0B8' : '#888',
                              transition: 'transform 0.2s ease, color 0.15s ease',
                              transform: isL2Open ? 'rotate(45deg)' : 'rotate(0deg)',
                              display: 'inline-block',
                              lineHeight: 1,
                              marginRight: '4px',
                            }}>+</span>
                          </button>

                          {/* L3 list */}
                          <div style={{
                            maxHeight: isL2Open ? '600px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease',
                          }}>
                            <div style={{ paddingLeft: '12px', paddingBottom: '8px', paddingTop: '2px' }}>
                              {NAV_TREE[pillar][l2].map(l3 => (
                                <button
                                  key={l3}
                                  onClick={() => onNavigate(pillar, l2, l3)}
                                  className="w-full text-left flex items-center gap-3"
                                  style={{ paddingTop: '5px', paddingBottom: '5px' }}
                                >
                                  <span style={{ color: '#C4C0B8', fontSize: '7px', opacity: 0.8 }}>→</span>
                                  <span style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.8rem',
                                    fontWeight: 400,
                                    letterSpacing: '0.03em',
                                    color: '#E8D89A',
                                  }}>
                                    {l3}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Utility links */}
        <div className="flex flex-col gap-5 pt-8">
          {['Home', 'About', 'Contact', 'Athlete Application'].map(page => (
            <button
              key={page}
              onClick={() => onUtility(page)}
              className="text-left"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.2em',
                color: '#999',
                textTransform: 'uppercase',
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    )
  }

  /* ── DESKTOP: hover columns (unchanged) ── */
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center">
        <div
          className="flex gap-12 lg:gap-20 items-start"
          onMouseLeave={() => { setHoveredPillar(null); setHoveredL2(null) }}
        >
          {/* L1 Pillars */}
          <div className="flex flex-col" style={{ gap: '2px' }}>
            {Object.keys(NAV_TREE).map(pillar => {
              const isActive = hoveredPillar === pillar
              const isDimmed = !!hoveredPillar && !isActive
              return (
                <button
                  key={pillar}
                  onMouseEnter={() => { setHoveredPillar(pillar); setHoveredL2(null) }}
                  className="text-left"
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
                      lineHeight: 1.0,
                      letterSpacing: '0.06em',
                      color: isActive ? '#C4C0B8' : isDimmed ? '#1e1e1e' : '#ffffff',
                      transition: 'color 0.18s ease',
                      display: 'block',
                      userSelect: 'none',
                    }}
                  >
                    {pillar}
                  </span>
                </button>
              )
            })}
          </div>

          {/* L2 Categories */}
          <div
            className="flex flex-col justify-center"
            style={{
              gap: '10px',
              minWidth: '220px',
              opacity: hoveredPillar ? 1 : 0,
              transform: hoveredPillar ? 'translateX(0)' : 'translateX(-12px)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
              pointerEvents: hoveredPillar ? 'auto' : 'none',
            }}
          >
            {l2Keys.map(l2 => {
              const isActive = hoveredL2 === l2
              const isDimmed = !!hoveredL2 && !isActive
              return (
                <button
                  key={l2}
                  onMouseEnter={() => setHoveredL2(l2)}
                  className="text-left"
                >
                  <span
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 'clamp(1rem, 1.6vw, 1.5rem)',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: isActive ? '#C4C0B8' : isDimmed ? '#333' : '#c0b99a',
                      transition: 'color 0.15s ease',
                      display: 'block',
                    }}
                  >
                    {l2}
                  </span>
                </button>
              )
            })}
          </div>

          {/* L3 Services — click to navigate */}
          <div
            className="flex flex-col justify-center"
            style={{
              gap: '8px',
              minWidth: '230px',
              opacity: hoveredL2 && l3Items.length ? 1 : 0,
              transform: hoveredL2 && l3Items.length ? 'translateX(0)' : 'translateX(-12px)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              pointerEvents: hoveredL2 && l3Items.length ? 'auto' : 'none',
            }}
          >
            {l3Items.map(l3 => (
              <button
                key={l3}
                onClick={() => onNavigate(hoveredPillar!, hoveredL2!, l3)}
                className="text-left group flex items-center gap-3"
              >
                <span style={{ color: '#C4C0B8', fontSize: '7px', opacity: 0.6 }}>→</span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    color: '#E8D89A',
                    transition: 'color 0.12s ease',
                  }}
                  className="group-hover:!text-white"
                >
                  {l3}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Utility links */}
      <div className="flex gap-8 pb-10">
        {['Home', 'About', 'Contact', 'Athlete Application'].map(page => (
          <button
            key={page}
            onClick={() => onUtility(page)}
            className="text-left group"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              color: '#888',
              textTransform: 'uppercase',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}


// ── SPLASH VIDEO ──────────────────────────────────────────────────────────────

function AutoPlayVideo({ src, style, className }: { src: string; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const tryPlay = () => video.play().catch(() => {})
    video.load()
    if (video.readyState >= 3) {
      tryPlay()
    } else {
      video.addEventListener('canplay', tryPlay, { once: true })
    }
    return () => video.removeEventListener('canplay', tryPlay)
  }, [src])

  return (
    <video
      ref={ref} src={src} autoPlay loop muted playsInline
      className={className}
      style={{ objectFit: isMobile ? 'contain' : 'cover', ...style }}
    />
  )
}

function SplashVideo({ onDone }: { onDone: () => void }) {
  const isMobile = useIsMobile()
  const [fading, setFading] = useState(false)
  const [skipVisible, setSkipVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const finishedRef = useRef(false)

  const finish = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    setFading(true)
    setTimeout(onDone, 900)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Force play — autoPlay attribute alone can be blocked in some contexts
    video.play().catch(() => finish())

    // Show skip after 1.2s
    const skipTimer = setTimeout(() => setSkipVisible(true), 1200)

    // Hard fallback: if onEnded never fires within 30s, finish anyway
    const fallback = setTimeout(finish, 30000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: '#000',
        opacity: fading ? 0 : 1,
        transition: fading ? 'opacity 0.9s ease' : undefined,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <video
        ref={videoRef}
        src={introVideo}
        muted
        playsInline
        onEnded={() => setTimeout(finish, 1600)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: isMobile ? 'contain' : 'cover',
          objectPosition: 'center center',
          filter: 'brightness(1.55) contrast(1.12) saturate(1.08)',
        }}
      />
      {skipVisible && (
        <button
          onClick={finish}
          style={{
            position: 'absolute', bottom: '28px', right: '32px',
            fontFamily: "'Inter', sans-serif", fontSize: '9px',
            letterSpacing: '0.26em', color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase', background: 'none',
            border: 'none', cursor: 'pointer',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
        >
          Skip ✕
        </button>
      )}
    </div>
  )
}

// ── NAV OVERLAY ───────────────────────────────────────────────────────────────

function NavOverlay({
  isOpen,
  onClose,
  onNavigate,
  onUtility,
}: {
  isOpen: boolean
  onClose: () => void
  onNavigate: (l1: string, l2: string, l3: string) => void
  onUtility: (page: string) => void
}) {
  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        backgroundColor: '#0A0A0A',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0s linear 0.3s',
      }}
    >
      <div className="absolute top-7 left-10">
        <Logo onClick={() => { onClose(); onUtility('Home') }} />
      </div>
      <button
        onClick={onClose}
        className="absolute top-8 right-10 transition-colors duration-150"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: '#333' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = '#333')}
      >
        CLOSE ✕
      </button>
      <div className="h-full flex items-center px-10 md:px-20">
        <CascadingNav
          onNavigate={(l1, l2, l3) => { onClose(); onNavigate(l1, l2, l3) }}
          onUtility={page => { onClose(); onUtility(page) }}
        />
      </div>
    </div>
  )
}

// ── INNER PAGE SHELL ──────────────────────────────────────────────────────────

function InnerShell({
  children,
  onBack,
  onOpenNav,
}: {
  children: React.ReactNode
  onBack: () => void
  onOpenNav: () => void
}) {
  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', overflowX: 'hidden' }}>
      <div
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-10"
        style={{ paddingTop: '24px', paddingBottom: '20px', backgroundColor: 'rgba(10,10,10,0.96)', borderBottom: '1px solid #0e0e10' }}
      >
        <Logo onClick={onBack} />
        <button
          onClick={onOpenNav}
          className="flex flex-col group"
          style={{ gap: '5px' }}
          aria-label="Open navigation"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block transition-colors duration-150"
              style={{ width: '22px', height: '1px', backgroundColor: '#444' }}
            />
          ))}
        </button>
      </div>
      {children}
    </div>
  )
}

// ── SCROLL REVEAL WRAPPER ─────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'right' | 'none'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const fromTransform =
    direction === 'up' ? 'translateY(32px)' :
    direction === 'right' ? 'translateX(24px)' : 'none'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : fromTransform,
        transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── HERO ──────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  { src: settingStandardImg, alt: 'Setting The Standard', position: 'center top' },
]

function HomepageHero({ onCTA }: { onCTA: (action: string) => void }) {
  const [loaded, setLoaded] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setSlideIndex(i => (i + 1) % HERO_SLIDES.length), 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative w-full flex flex-col justify-center overflow-hidden"
      style={{ height: isMobile ? '40vh' : '100vh', minHeight: isMobile ? '240px' : '600px' }}
    >
      {/* Slideshow background */}
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
        {HERO_SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: slide.position,
              opacity: i === slideIndex ? 0.84 : 0,
              filter: 'brightness(1.08) contrast(1.08) saturate(1.1)',
              transform: i === slideIndex ? 'scale(1.06)' : 'scale(1.0)',
              transition: i === slideIndex
                ? 'opacity 1.8s ease, transform 8s ease'
                : 'opacity 1.4s ease, transform 1.4s ease',
            }}
          />
        ))}
        {/* Left text protection */}
        <div className="absolute inset-0" style={{ background: isMobile ? 'rgba(10,10,10,0.52)' : 'linear-gradient(to right, rgba(10,10,10,0.92) 35%, rgba(10,10,10,0.18) 75%, rgba(10,10,10,0.5) 100%)' }} />
        {/* Bottom fade */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 45%)' }} />
        {/* Subtle top vignette */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 20%)' }} />
      </div>

      <div className="relative px-8 md:px-20 lg:px-28" style={{ maxWidth: isMobile ? '100%' : '68%' }}>
        {[
          { text: 'Setting The Standard.', type: 'h1' },
          { text: 'Athlete Representation.', type: 'sub', gold: true },
          { text: 'NIL.', type: 'sub' },
          { text: 'Legal Protection.', type: 'sub' },
          { text: 'Legacy Building.', type: 'sub' },
        ].map(({ text, type, gold }, i) => (
          <div
            key={text}
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(18px)',
              transition: `opacity 0.9s ease ${280 + i * 130}ms, transform 0.9s ease ${280 + i * 130}ms`,
            }}
          >
            {type === 'h1' ? (
              <h1
                className="text-white"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3.8rem, 7.8vw, 9.5rem)',
                  letterSpacing: '0.06em',
                  lineHeight: 0.92,
                  marginBottom: '30px',
                }}
              >
                {text}
              </h1>
            ) : (
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: gold ? 'clamp(1.05rem, 1.7vw, 1.55rem)' : 'clamp(0.95rem, 1.5vw, 1.35rem)',
                  fontWeight: gold ? 500 : 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: gold ? '#C4C0B8' : '#555',
                  marginBottom: '9px',
                }}
              >
                {text}
              </p>
            )}
          </div>
        ))}

        <div
          className="flex flex-wrap gap-3 mt-10"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1100ms' }}
        >
          <button
            onClick={() => onCTA('apply')}
            className="px-8 py-[13px] transition-all duration-200"
            style={{
              backgroundColor: '#C4C0B8',
              color: '#0A0A0A',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#8C8884' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C4C0B8' }}
          >
            Become an Athlete
          </button>
          <button
            onClick={() => onCTA('partner')}
            className="px-8 py-[13px] transition-all duration-200"
            style={{
              border: '1px solid rgba(196,192,184,0.45)',
              color: '#C4C0B8',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 500,
              fontSize: '12px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4C0B8'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(196,192,184,0.45)'; e.currentTarget.style.color = '#C4C0B8' }}
          >
            Partner With Us
          </button>
          <button
            onClick={() => onCTA('contact')}
            className="px-8 py-[13px] transition-all duration-200"
            style={{
              color: '#444',
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 300,
              fontSize: '12px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#aaa' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#444' }}
          >
            Contact Us
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.18 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.32em', color: '#fff', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(255,255,255,0.5)' }} />
      </div>
    </section>
  )
}

// ── SECTION 2: WHY THE STANDARD ───────────────────────────────────────────────

function WhyTheStandard() {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      ref={ref}
      className="py-28 md:py-40"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto px-10 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-16 lg:gap-28 items-start">

          {/* Left: headline */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(36px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: '#C4C0B8',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontWeight: 500,
              }}
            >
              Why The Standard
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3rem, 4.5vw, 5rem)',
                lineHeight: 0.94,
                letterSpacing: '0.03em',
              }}
            >
              More Than
              <br />
              Representation.
            </h2>
            <div style={{ width: '36px', height: '1px', backgroundColor: '#C4C0B8', marginTop: '24px' }} />
          </div>

          {/* Right: three pillars as flowing editorial copy */}
          <div className="flex flex-col" style={{ gap: '48px' }}>
            {[
              {
                label: 'REPRESENT',
                heading: 'Elite Athlete Representation',
                body: 'Contract negotiation, transfer portal navigation, NFL preparation, and NIL strategy. We work exclusively for the athlete. Not the league, not the brand, not the school.',
                delay: 80,
              },
              {
                label: 'PROTECT',
                heading: 'Legal Backing Through Conn Law Firm',
                body: 'Every athlete deserves a dedicated legal team. Contract review, intellectual property, compliance, and risk management backed by Conn Law Firm from the first signing.',
                delay: 180,
              },
              {
                label: 'BUILD',
                heading: 'Long-Term Wealth, Brand, and Legacy',
                body: 'Business formation, brand development, financial planning, and community impact strategy. The goal is not the next deal. The goal is a career that funds a life.',
                delay: 280,
              },
            ].map(item => (
              <div
                key={item.label}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(20px)',
                  transition: `opacity 0.9s ease ${item.delay}ms, transform 0.9s ease ${item.delay}ms`,
                }}
              >
                <div className="flex items-start gap-7">
                  <span
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.28em',
                      color: '#C4C0B8',
                      textTransform: 'uppercase',
                      paddingTop: '5px',
                      flexShrink: 0,
                    }}
                  >
                    {item.label}
                  </span>
                  <div>
                    <h3
                      className="text-white"
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 'clamp(1.1rem, 1.7vw, 1.45rem)',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}
                    >
                      {item.heading}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '15px',
                        color: '#666',
                        fontWeight: 300,
                        lineHeight: 1.9,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── SECTION 3: STATS ──────────────────────────────────────────────────────────

function StatBlock({
  value,
  suffix,
  label,
  delay,
  active,
}: {
  value: number
  suffix: string
  label: string
  delay: number
  active: boolean
}) {
  const count = useCountUp(value, 2200, active)
  return (
    <div
      className="flex flex-col items-center text-center"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
      }}
    >
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(2.8rem, 4.5vw, 5rem)',
          color: '#C4C0B8',
          lineHeight: 1,
          letterSpacing: '0.06em',
        }}
      >
        {count}{suffix}
      </span>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          color: '#555',
          fontWeight: 400,
          letterSpacing: '0.06em',
          lineHeight: 1.5,
          maxWidth: '150px',
          marginTop: '12px',
        }}
      >
        {label}
      </p>
    </div>
  )
}

function AnimatedStats() {
  const { ref, visible } = useScrollReveal()
  const stats = [
    { value: 750, suffix: '+', label: 'NFL executive and personnel relationships' },
    { value: 300, suffix: '+', label: 'College coach and personnel relationships' },
    { value: 8, suffix: '', label: 'UFL General Manager relationships' },
    { value: 100, suffix: '%', label: 'Athlete-centric representation' },
  ]
  return (
    <section
      ref={ref}
      className="py-24 md:py-36"
      style={{ backgroundColor: '#0C0C0F' }}
    >
      <div className="max-w-7xl mx-auto px-10 md:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <StatBlock key={s.label} {...s} delay={i * 110} active={visible} />
          ))}
        </div>
        <p
          className="text-center mt-14"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.22em', color: '#222', textTransform: 'uppercase' }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;
        </p>
      </div>
    </section>
  )
}

// ── SECTION 4: THE STANDARD DIFFERENCE ────────────────────────────────────────

function StandardDifference() {
  const { ref, visible } = useScrollReveal()

  const traditional = [
    { n: '01', text: 'Signs Athlete' },
    { n: '02', text: 'Negotiates Deal' },
    { n: '03', text: 'Collects Commission' },
    { n: '04', text: 'Moves On' },
  ]
  const standard = [
    { n: '01', text: 'Evaluate Athlete' },
    { n: '02', text: 'Invest Resources' },
    { n: '03', text: 'Build Brand' },
    { n: '04', text: 'Create Content' },
    { n: '05', text: 'Generate Opportunities' },
    { n: '06', text: 'Legal Protection' },
    { n: '07', text: 'Build Business' },
    { n: '08', text: 'Create Legacy' },
  ]

  return (
    <section
      ref={ref}
      className="py-28 md:py-40"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto px-10 md:px-20">
        <div
          className="mb-16"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease' }}
        >
          <h2
            className="text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.8rem, 4.2vw, 4.8rem)',
              letterSpacing: '0.06em',
            }}
          >
            The Standard Difference.
          </h2>
          <div style={{ width: '28px', height: '1px', backgroundColor: '#1e1e21', marginTop: '14px' }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Traditional */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.9s ease 80ms, transform 0.9s ease 80ms',
            }}
          >
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.3em',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Traditional Agency
            </p>
            {traditional.map((item, i) => (
              <div
                key={item.n}
                className="flex items-center gap-6"
                style={{
                  padding: '14px 0',
                  borderBottom: '1px solid #111114',
                }}
              >
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '11px', color: '#252528', fontWeight: 300, letterSpacing: '0.1em', minWidth: '26px' }}>
                  {item.n}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#444', fontWeight: 300 }}>
                  {item.text}
                </span>
                {i === traditional.length - 1 && (
                  <span
                    className="ml-auto"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#252528', fontStyle: 'italic', letterSpacing: '0.04em' }}
                  >
                    end of service
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* The Standard */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.9s ease 220ms, transform 0.9s ease 220ms',
            }}
          >
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                color: '#C4C0B8',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              The Standard
            </p>
            {standard.map(item => (
              <div
                key={item.n}
                className="flex items-center gap-6"
                style={{ padding: '13px 0', borderBottom: '1px solid #111114' }}
              >
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', color: '#C4C0B8', letterSpacing: '0.12em', minWidth: '26px' }}>
                  {item.n}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14.5px', color: '#ccc', fontWeight: 400 }}>
                  {item.text}
                </span>
              </div>
            ))}
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '10px', color: '#C4C0B8', letterSpacing: '0.18em', fontWeight: 300, textTransform: 'uppercase' }}>
                Ongoing. For life.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PHOTO BREAK ───────────────────────────────────────────────────────────────

const PHOTO_BREAK_SLIDES = [
  { src: thisIsStandard1, pos: 'center 15%' },
  { src: img1340,         pos: 'center 18%' },
  { src: thisIsStandard2, pos: 'center 15%' },
]

function PhotoBreak() {
  const { ref, visible } = useScrollReveal(0.05)
  const [slideIndex, setSlideIndex] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex(i => (i + 1) % PHOTO_BREAK_SLIDES.length)
      setDir(d => (d === 1 ? -1 : 1))
    }, 4800)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ backgroundColor: '#0A0A0A', padding: 'clamp(48px, 7vw, 96px) 0' }}
    >
      <div className="max-w-7xl mx-auto px-10 md:px-20 flex flex-col md:flex-row items-center gap-12 md:gap-20">

        {/* Quote — left */}
        <blockquote
          className="flex-1"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 200ms, transform 1s ease 200ms',
          }}
        >
          <p
            className="text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(1.9rem, 3.2vw, 3.6rem)',
              letterSpacing: '0.06em',
              lineHeight: 1.1,
            }}
          >
            "This isn't just another sports agency.
            <br />
            <span style={{ color: '#C4C0B8' }}>This is The Standard."</span>
          </p>
        </blockquote>

        {/* Image window — right */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{
            width: 'clamp(260px, 36vw, 460px)',
            height: 'clamp(300px, 42vw, 520px)',
            borderRadius: '4px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(24px)',
            transition: 'opacity 1s ease 350ms, transform 1s ease 350ms',
          }}
        >
          {PHOTO_BREAK_SLIDES.map((slide, i) => {
            const active = i === slideIndex
            return (
              <img
                key={slide.src}
                src={slide.src}
                alt="The Standard"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: slide.pos,
                  opacity: active ? 1 : 0,
                  transform: active
                    ? 'translateX(0%) scale(1.02)'
                    : `translateX(${dir * 5}%) scale(1.0)`,
                  transition: active
                    ? 'opacity 1.2s ease, transform 6s ease'
                    : 'opacity 1s ease, transform 1s ease',
                  filter: 'brightness(1.02) contrast(1.06) saturate(1.06)',
                }}
              />
            )
          })}
          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.5), transparent)' }} />
        </div>

      </div>
    </section>
  )
}

// ── SECTION 5: WHO WE REPRESENT ───────────────────────────────────────────────

// ── SECTION 6: OUR SERVICES ───────────────────────────────────────────────────

function OurServices() {
  const { ref, visible } = useScrollReveal()

  const columns = [
    {
      pillar: 'REPRESENT',
      services: [
        { title: 'Athlete Representation', desc: 'Contract negotiation, transfer portal, NFL preparation' },
        { title: 'NIL Strategy', desc: 'Brand partnerships, collectives, revenue sharing' },
        { title: 'Contract Negotiation', desc: 'Professional and collegiate contracts' },
        { title: 'Marketing', desc: 'Campaign development, content creation, media kit' },
        { title: 'Business Planning', desc: 'Financial structure from day one' },
      ],
    },
    {
      pillar: 'BUILD',
      services: [
        { title: 'Brand Development', desc: 'Identity, positioning, and market strategy' },
        { title: 'Marketing Advances', desc: 'Investment model, not a cash advance' },
        { title: 'Business Formation', desc: 'Company structure, entrepreneurship, consulting' },
        { title: 'Wealth Management', desc: 'Financial planning and investment coordination' },
        { title: 'Community Impact', desc: 'Charitable foundations and public speaking' },
      ],
    },
    {
      pillar: 'PROTECT',
      services: [
        { title: 'Legal Services', desc: 'Full legal backing through Conn Law Firm' },
        { title: 'Risk Management', desc: 'Reputation, compliance, career risk assessment' },
        { title: 'Media & PR', desc: 'Crisis communications and public relations support' },
        { title: 'Intellectual Property', desc: 'Trademark, brand protection, and licensing' },
        { title: 'Compliance', desc: 'NCAA, NIL, and professional league compliance' },
      ],
    },
  ]

  return (
    <section
      ref={ref}
      className="py-28 md:py-40"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto px-10 md:px-20">
        <div
          className="mb-16"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease' }}
        >
          <h2
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem, 4.2vw, 4.8rem)', letterSpacing: '0.06em' }}
          >
            Our Services.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
          {columns.map((col, ci) => (
            <div
              key={col.pillar}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.9s ease ${ci * 130}ms, transform 0.9s ease ${ci * 130}ms`,
              }}
            >
              <div style={{ marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #1a1a1d' }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.35rem', color: '#C4C0B8', letterSpacing: '0.1em' }}>
                  {col.pillar}
                </span>
              </div>
              <div className="flex flex-col" style={{ gap: '28px' }}>
                {col.services.map(svc => (
                  <div key={svc.title}>
                    <h4
                      className="text-white"
                      style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.98rem', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '6px' }}
                    >
                      {svc.title}
                    </h4>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#555', fontWeight: 300, lineHeight: 1.7 }}>
                      {svc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SECTION 7: CONN LAW FIRM ──────────────────────────────────────────────────


function ConnLawMark({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="-12 -8 352 124"
      aria-label="Conn Law"
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      <text x="44" y="82" textAnchor="middle"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 'bold', fontStyle: 'italic', fontSize: '84px' }}
        fill="#0E3C52">C</text>

      <text x="53" y="85" textAnchor="start"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 'bold', fontSize: '55px' }}
        fill="#7B3B1C">L</text>

      <line x1="91" y1="10" x2="91" y2="94" stroke="#B89448" strokeWidth="1.5"/>

      <text x="104" y="47"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '25px' }}
        letterSpacing="4"
        fill="#0E3C52">CONN</text>

      <text x="104" y="77"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '25px' }}
        letterSpacing="4"
        fill="#0E3C52">LAW</text>
    </svg>
  )
}

function ConnLawFirm() {
  const { ref, visible } = useScrollReveal()

  const capabilities = [
    'Contract Review & Negotiation',
    'Intellectual Property & Trademark',
    'Business Formation & Corporate Law',
    'Litigation Support',
    'Compliance & Regulatory Guidance',
    'Mediation & Arbitration',
    'NIL Negotiations',
    'Overall Risk Management',
    'Estate Planning',
  ]

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1779700210487-a01758a3c55a?w=1920&h=1080&fit=crop&auto=format"
          alt="Executive conference room overlooking city at sunset"
          className="w-full h-full object-cover"
          style={{ opacity: 0.52, filter: 'contrast(1.05) saturate(0.85) brightness(1.08)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.88) 40%, rgba(10,10,10,0.45) 100%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-10 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Left: editorial */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 1s ease, transform 1s ease',
            }}
          >
            <p
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.3em', color: '#484848', textTransform: 'uppercase', marginBottom: '20px' }}
            >
              Legal Partnership
            </p>
            <h2
              className="text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem, 4.5vw, 5.5rem)', lineHeight: 0.93, letterSpacing: '0.05em', marginBottom: '28px' }}
            >
              Powered by
              <br />
              <span style={{ color: '#C4C0B8' }}>Conn Law Firm.</span>
            </h2>
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.95, maxWidth: '500px', marginBottom: '36px' }}
            >
              Most agencies hand you a contract and tell you to find a lawyer. At The Standard, legal protection is built in from the start. Every client benefits from a dedicated legal relationship with Andy Conn, founder of Conn Law Firm, who serves as Of Counsel and handles everything from contract review to intellectual property to long-term risk management.
            </p>
            <div style={{ paddingTop: '24px', borderTop: '1px solid #141417' }}>
              <div className="flex flex-col gap-5">
                <div>
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.95rem', fontWeight: 400, color: '#777', letterSpacing: '0.05em' }}>
                    Andy Conn
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#383838', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '3px' }}>
                    Founder & Legal Counsel · Conn Law Firm
                  </p>
                </div>
                <div style={{ backgroundColor: '#fff', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', flexShrink: 0 }}>
                  <img src={connLawLogo} alt="Conn Law" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: capability list */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 1s ease 180ms, transform 1s ease 180ms',
            }}
          >
            {capabilities.map((cap, i) => (
              <div
                key={cap}
                className="flex items-center gap-4"
                style={{
                  padding: '14px 0',
                  borderBottom: '1px solid #0f0f12',
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.6s ease ${280 + i * 55}ms`,
                }}
              >
                <span style={{ color: '#C4C0B8', fontSize: '7px', flexShrink: 0 }}>◆</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13.5px', color: '#888', fontWeight: 300, letterSpacing: '0.04em' }}>
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── SECTION 8: BRANDS ─────────────────────────────────────────────────────────


// ── SECTION 9: PODCAST ────────────────────────────────────────────────────────

const EPISODE_SEGMENTS = [
  {
    n: '01',
    title: 'Around the League',
    duration: '10 min',
    desc: 'Transfer portal news, NIL developments, Revenue-sharing updates, NFL Draft and recruiting news',
  },
  {
    n: '02',
    title: 'Athlete Spotlight',
    duration: '10 min',
    desc: 'Feature one current client or rising athlete; their journey, preparation, and lessons',
  },
  {
    n: '03',
    title: 'The Standard Conversation',
    duration: '25–35 min',
    desc: 'Long-form interview with college coaches, NFL executives, general managers, attorneys, brand executives, financial advisors, current or former athletes, and sports performance specialists',
  },
  {
    n: '04',
    title: 'The Business of Sports',
    duration: '10 min',
    desc: 'Contracts, NIL strategy, branding, wealth building, taxes, business ownership, and philanthropy',
  },
  {
    n: '05',
    title: 'Ask The Standard',
    duration: '5–10 min',
    desc: 'Answer questions submitted by athletes and parents',
  },
]

function PodcastSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      ref={ref}
      className="py-24 md:py-36"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto px-10 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">

          {/* ── Left Column ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            {/* Eyebrow */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.28em',
                color: '#C4C0B8',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              The Podcast
            </p>
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C4C0B8', marginBottom: '20px' }} />

            {/* Title */}
            <h2
              className="text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                letterSpacing: '0.06em',
                lineHeight: 0.92,
                marginBottom: '20px',
              }}
            >
              Setting The
              <br />
              Standard
            </h2>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13.5px',
                color: '#C4C0B8',
                fontWeight: 300,
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: '18px',
              }}
            >
              Conversations That Build Champions On and Off the Field.
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#666',
                fontWeight: 300,
                lineHeight: 1.85,
                marginBottom: '32px',
              }}
            >
              60–75 minutes of structured, high-value conversation every week. Coaches, executives, attorneys, brands, and athletes{'  '}the conversations that change careers.
            </p>

            {/* Latest Episode Card */}
            <div
              style={{
                backgroundColor: '#0D0D10',
                border: '1px solid #161619',
                padding: '24px 28px 22px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '0.28em',
                  color: '#C4C0B8',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Latest Episode
              </p>

              <p
                className="text-white"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.1,
                  marginBottom: '8px',
                }}
              >
                Episode Coming Soon
              </p>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11.5px',
                  color: '#484848',
                  fontWeight: 300,
                  letterSpacing: '0.06em',
                  marginBottom: '20px',
                }}
              >
                First episode in production
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mb-5">
                <button
                  className="px-6 py-[10px] transition-all duration-200"
                  style={{
                    backgroundColor: '#C4C0B8',
                    color: '#0A0A0A',
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600,
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#8C8884' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C4C0B8' }}
                >
                  Watch
                </button>
                <button
                  className="px-6 py-[10px] transition-all duration-200"
                  style={{
                    border: '1px solid rgba(196,192,184,0.45)',
                    color: '#C4C0B8',
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 500,
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4C0B8'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(196,192,184,0.45)'; e.currentTarget.style.color = '#C4C0B8' }}
                >
                  Listen
                </button>
              </div>

              {/* Platform links */}
              <div className="flex gap-6">
                {['Spotify', 'Apple Podcasts', 'YouTube'].map(platform => (
                  <span
                    key={platform}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '9px',
                      letterSpacing: '0.18em',
                      color: '#383838',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#888' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#383838' }}
                  >
                    {platform} →
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Weekly Structure ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.9s ease 180ms, transform 0.9s ease 180ms',
            }}
          >
            {/* Eyebrow */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.28em',
                color: '#C4C0B8',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Weekly Episode Structure
            </p>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#C4C0B8', marginBottom: '0', opacity: 0.35 }} />

            {/* Segments */}
            <div className="flex flex-col">
              {EPISODE_SEGMENTS.map((seg, i) => (
                <div
                  key={seg.n}
                  className="flex items-start gap-6 py-6"
                  style={{
                    borderBottom: i < EPISODE_SEGMENTS.length - 1 ? '1px solid #111114' : 'none',
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.7s ease ${280 + i * 80}ms`,
                  }}
                >
                  {/* Number */}
                  <span
                    className="shrink-0"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.3rem',
                      color: '#8C8884',
                      letterSpacing: '0.06em',
                      lineHeight: 1,
                      paddingTop: '2px',
                      minWidth: '28px',
                    }}
                  >
                    {seg.n}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h4
                        className="text-white"
                        style={{
                          fontFamily: "'Oswald', sans-serif",
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {seg.title}
                      </h4>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '11px',
                          color: '#555',
                          fontWeight: 300,
                          letterSpacing: '0.06em',
                        }}
                      >
                        {seg.duration}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12.5px',
                        color: '#555',
                        fontWeight: 300,
                        lineHeight: 1.7,
                      }}
                    >
                      {seg.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── SECTION 10: CTA ───────────────────────────────────────────────────────────

function CTASection({ onCTA }: { onCTA: (action: string) => void }) {
  const { ref, visible } = useScrollReveal()
  return (
    <section
      ref={ref}
      className="relative py-36 md:py-52 overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 60%, #111114 0%, #0A0A0A 65%)' }} />
      <div className="relative max-w-4xl mx-auto px-10 md:px-20 text-center">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 1s ease, transform 1s ease' }}>
          <h2
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 6vw, 6.5rem)', letterSpacing: '0.06em', lineHeight: 0.93, marginBottom: '20px' }}
          >
            Ready to Set
            <br />
            <span style={{ color: '#C4C0B8' }}>The Standard?</span>
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '13.5px', color: '#484848', fontWeight: 300, lineHeight: 1.85, maxWidth: '500px', margin: '0 auto 44px' }}
          >
            Athlete representation, legal protection through Conn Law Firm, NIL strategy, and long-term brand development. One agency. Every resource you need to build a career that outlasts the game.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onCTA('apply')}
              className="px-10 py-[14px] transition-all duration-200"
              style={{ backgroundColor: '#C4C0B8', color: '#0A0A0A', fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#8C8884' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C4C0B8' }}
            >
              Become an Athlete
            </button>
            <button
              onClick={() => onCTA('contact')}
              className="px-10 py-[14px] transition-all duration-200"
              style={{ border: '1px solid rgba(196,192,184,0.45)', color: '#C4C0B8', fontFamily: "'Oswald', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4C0B8'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(196,192,184,0.45)'; e.currentTarget.style.color = '#C4C0B8' }}
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

function Footer({ onUtility }: { onUtility: (page: string) => void }) {
  const navLinks = ['About', 'Represent', 'Build', 'Protect', 'Contact']
  const socials = [
    {
      aria: 'Instagram',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      aria: 'X (Twitter)',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      aria: 'YouTube',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer style={{ backgroundColor: '#060608' }}>
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-10 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.6fr] gap-12 md:gap-8">

          {/* Left: brand logo + tagline */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <LogoMark uid="lm_f" style={{ width: '180px', height: 'auto', opacity: 0.88 }} />
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11.5px',
                color: '#484848',
                fontWeight: 300,
                letterSpacing: '0.06em',
              }}
            >
              Athlete Representation • NIL • Legal Protection
            </p>
          </div>

          {/* Middle: navigation */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.28em',
                color: '#C4C0B8',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              Navigation
            </p>
            <nav className="flex flex-col gap-[10px]">
              {navLinks.map(link => (
                <button
                  key={link}
                  onClick={() => onUtility(link)}
                  className="text-left transition-colors duration-150"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#aaa',
                    letterSpacing: '0.03em',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#aaa' }}
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: connect + social + CTA */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.28em',
                color: '#C4C0B8',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Connect
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: '#777',
                fontWeight: 300,
                marginBottom: '12px',
              }}
            >
              Follow us
            </p>

            {/* Social icon circles */}
            <div className="flex gap-3 mb-6">
              {socials.map(s => (
                <button
                  key={s.aria}
                  aria-label={s.aria}
                  className="flex items-center justify-center transition-all duration-150"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #2a2a2d',
                    color: '#666',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#C4C0B8'
                    e.currentTarget.style.color = '#C4C0B8'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#2a2a2d'
                    e.currentTarget.style.color = '#666'
                  }}
                >
                  {s.icon}
                </button>
              ))}
            </div>

            {/* Book Consultation button — gold outlined */}
            <button
              onClick={() => onUtility('Contact')}
              className="w-full py-3 transition-all duration-200"
              style={{
                border: '1px solid #C4C0B8',
                color: '#C4C0B8',
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#C4C0B8'
                e.currentTarget.style.color = '#0A0A0A'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#C4C0B8'
              }}
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-10 md:px-12 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Left: policy links + copyright */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <button
                  className="transition-colors duration-150"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#383838', letterSpacing: '0.06em' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#666' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#383838' }}
                >
                  Privacy Policy
                </button>
                <span style={{ color: '#1e1e21', fontSize: '10px' }}>|</span>
                <button
                  className="transition-colors duration-150"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#383838', letterSpacing: '0.06em' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#666' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#383838' }}
                >
                  Terms of Service
                </button>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#252528', letterSpacing: '0.06em' }}>
                © 2026 THE STANDARD Sports Group LLC
              </p>
            </div>

            {/* Right: powered by */}
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#252528', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Powered by
              </span>
              <div style={{ backgroundColor: '#fff', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', flexShrink: 0, opacity: 0.85 }}>
                <img src={connLawLogo} alt="Conn Law" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── PILLAR PAGE ───────────────────────────────────────────────────────────────

const PILLAR_META: Record<string, { tagline: string; body: string; img: string }> = {
  REPRESENT: {
    tagline: 'Athlete-first representation.',
    body: "Contract negotiation. Transfer portal guidance. NIL strategy. NFL preparation.\n\nFrom the first recruiting call to the professional contract, we work exclusively for the athlete. Not the league, not the brand, and not the school.\n\nEvery decision is built around protecting the athlete's future while maximizing the opportunities in front of them.",
    img: 'https://images.unsplash.com/photo-1563149957-5fb7ca053543?w=1920&h=1080&fit=crop&auto=format',
  },
  BUILD: {
    tagline: 'Beyond the contract.',
    body: 'Brand development, marketing advances, business formation, wealth management, and community impact strategy. The game ends. The business does not have to.',
    img: 'https://images.unsplash.com/photo-1740933084056-078fac872bff?w=1920&h=1080&fit=crop&auto=format',
  },
  PROTECT: {
    tagline: 'Legal excellence, built in.',
    body: 'Contract review, intellectual property protection, risk management, and crisis communications backed by Conn Law Firm. Every athlete deserves a legal team from day one.',
    img: 'https://images.unsplash.com/photo-1775144657566-e5b093073baf?w=1920&h=1080&fit=crop&auto=format',
  },
}

// Per-l3-page body copy overrides — keyed by "PILLAR|L2|L3"
const L3_BODY: Record<string, string> = {
  'REPRESENT|Athletes|NFLPA': "## Contract Representation. Player Representation. Career Strategy. NFL Preparation.\n\nFrom the first conversation through the negotiation of a professional contract, we advocate for the player's interests at every stage of the process. Our approach is centered on contract strategy, compensation, employment terms, career opportunities, and long-term professional development.\n\nWe represent the player. Not the team, not the league, and not the other side of the negotiation.\n\nEvery negotiation is approached with one objective: protect the player's interests, maximize his value, and position him for long-term success both on and off the field.",
  'REPRESENT|Athletes|Pro & Collegiate Golf': "## Contract Representation. Brand Partnerships. NIL & Collective Strategy. Career Development.\n\nWe represent **collegiate golfers** in navigating NIL opportunities, collective deals, brand partnerships, and the business opportunities surrounding their athletic careers.\n\nFor **professional golfers**, we provide contract review, negotiation support, and representation designed to help protect their interests and maximize the value of their professional opportunities.\n\nFrom collegiate competition to the professional level, we help golfers navigate the business side of the game by reviewing agreements, negotiating terms, developing partnerships, and positioning athletes for long-term success.",
  'REPRESENT|Coaches|Coaching Representation': "Coaching careers are built on leadership, preparation, and the right opportunities. At The Standard, we represent coaches through every stage of their professional journey, from emerging leaders pursuing their next opportunity to experienced coaches negotiating high-level positions.\n\nWe advocate exclusively for the coach, providing strategic guidance during hiring processes, contract negotiations, career transitions, and long-term professional planning. Our relationship-first approach ensures every decision is aligned with your goals, your values, and your future.",
  'REPRESENT|Coaches|Coaching Opportunities': "The right opportunity can define the next chapter of a coaching career.\n\nThe Standard works with coaches as they pursue collegiate and professional opportunities, providing guidance throughout the search, evaluation, interview, and hiring process. We help position coaches for roles that match their experience, leadership, and long-term vision while representing their interests every step of the way.",
  'REPRESENT|Coaches|Contract Negotiation': "Every contract shapes more than compensation. It shapes the future of a coaching career.\n\nWe represent coaches during contract negotiations with preparation, strategy, and discretion, ensuring every agreement reflects the coach's value, protects long-term interests, and creates the strongest foundation for continued success.",
  'REPRESENT|Executives|Executive Placement': "## Executive Placement. Strategic Connections.\n\nThe Standard provides **confidential executive placement and career advisory services** for leaders across professional and collegiate sports.\n\nOur network extends across **professional sports organizations, collegiate athletics, university leadership, front offices, coaching staffs, ownership groups, and industry decision-makers.** We leverage those relationships to create access to opportunities that may never reach a traditional job board.\n\nWe don't believe executive placement should be transactional.\n\n**We learn the executive. We understand the opportunity. We make the connection.**\n\nFrom identifying potential opportunities to positioning candidates, facilitating introductions, reviewing contracts, negotiating terms, and supporting the transition, The Standard remains focused on putting the right executive in the right room for the right opportunity.",
  'REPRESENT|Executives|General Managers': "## General Manager Representation. Executive Placement. Career Strategy.\n\nThe Standard works with **General Managers and senior football executives** navigating career advancement, organizational transitions, and the next opportunity.\n\nOur approach to executive placement is built around **relationships, discretion, and a deep understanding of the sports industry.** Through our extensive network across professional and collegiate athletics, we identify opportunities that align with an executive's experience, leadership profile, and long-term career objectives.\n\nFrom evaluating opportunities and positioning an executive for consideration to navigating negotiations and transitions, **we work behind the scenes to help executives make their next move with purpose.**",
  'REPRESENT|Executives|Collegiate Athletic Directors': "## Athletic Director Representation. Executive Placement. Institutional Leadership.\n\nThe Standard works with **collegiate Athletic Directors and senior athletics executives** seeking leadership opportunities, navigating institutional transitions, and positioning themselves for the next stage of their careers.\n\nOur executive placement model is relationship-driven and highly confidential. We utilize our **network across college athletics, professional sports, university leadership, and the broader sports industry** to identify opportunities that align with an executive's leadership experience, institutional vision, and career objectives.\n\nWe help executives navigate the entire process from **identifying and evaluating opportunities to positioning, contract review, negotiation, and transition strategy.**",
  'BUILD|Trust|Build Your Team. Protect Your Future.': "## Build Your Team. Protect Your Future.\n\nSuccess for an athlete is bigger than what happens on the field. The right professional team can protect an athlete's career, finances, family, and long-term wealth.\n\nAt The Standard, we help athletes build that team by identifying and vetting the professionals they need most before they need them.\n\nWe help athletes evaluate and connect with trusted professionals across five critical areas: **legal, tax, wealth management, real estate, and insurance/risk protection.**\n\n**Five Professionals. One Trusted Team.**",
  'BUILD|Wealth|Wealth Management': "## Build Wealth. Manage It With Purpose.\n\nAs an athlete's career grows, so does the importance of having the right strategy around their wealth. The Standard helps athletes navigate wealth-management options by connecting them with trusted financial professionals and helping them evaluate the people and strategies presented to them.\n\nWhether an athlete already has an advisor or is looking to build a professional financial team, we help facilitate the right conversations and make sure the athlete understands the options available to them.",
  'BUILD|Wealth|Financial Planning': "## Plan Beyond the Playing Years.\n\nAn athlete's earning window can be short, but the financial impact of a career can last a lifetime.\n\nThe Standard helps athletes explore financial-planning strategies designed around their individual careers, income, goals, family, and long-term future.\n\nWe can introduce athletes to preferred financial professionals within our network or help them evaluate professionals and opportunities that come directly to them, giving the athlete greater confidence before making important financial decisions.",
  'BUILD|Wealth|Investment Coordination': "## Turn Opportunity Into Ownership.\n\nAthletes are constantly presented with investment opportunities, from real estate and private businesses to traditional financial markets and entrepreneurial ventures.\n\nThe Standard helps athletes navigate those opportunities by coordinating conversations with trusted investment professionals and helping organize the right people around the decision-making process.\n\nThrough our preferred network or by helping athletes explore opportunities brought to them, we focus on making sure athletes have the information, professional guidance, and perspective necessary to make informed decisions about where their money goes.",
  'BUILD|Business|Marketing Opportunities': "## Turn Your Platform Into Opportunity.\n\nAn athlete's name, story, audience, and influence can create opportunities far beyond competition.\n\nThe Standard helps athletes identify and evaluate marketing opportunities that align with their brand, career, values, and long-term goals.\n\nWe help facilitate connections with brands, companies, and strategic partners while helping athletes understand the value of the opportunities presented to them.\n\nWhether an opportunity comes through our network or directly to the athlete, we help create a thoughtful process for evaluating what makes sense and what moves the athlete's brand forward.",
  'BUILD|Business|Business Consulting': "## Build Beyond the Game.\n\nAthletes are increasingly becoming entrepreneurs, investors, creators, and business owners.\n\nThe Standard helps athletes think strategically about the businesses they want to build, the opportunities they want to pursue, and the professionals they need around them.\n\nFrom evaluating an idea to developing a business strategy and identifying the right resources, we help athletes approach entrepreneurship with the same intentionality they bring to their careers.",
  'BUILD|Business|Business Formation': "## Turn the Idea Into a Business.\n\nBuilding a business starts with more than a great idea.\n\nThe Standard helps athletes navigate the early stages of turning an opportunity into an organized business venture by helping them understand the professionals, structures, and resources involved in getting started.\n\nWe can help coordinate conversations with attorneys, accountants, financial professionals, and other trusted advisors so athletes can make informed decisions about how to structure and develop their businesses.",
  'BUILD|Business|Entrepreneurship': "## Think Like an Owner.\n\nAthletic success can open doors to entrepreneurship, but building something lasting requires strategy beyond the spotlight.\n\nThe Standard helps athletes explore entrepreneurial opportunities, develop business concepts, evaluate potential partnerships, and connect with people who can help turn ideas into viable ventures.\n\nOur goal is to help athletes move from simply being the face of a business to understanding how to **build, operate, and grow something they own.**",
  'BUILD|Business|Company Formation': "## Build Something You Own.\n\nFrom an athlete's first business idea to a fully developed company, The Standard helps coordinate the resources necessary to move from concept to execution.\n\nWe help athletes identify the appropriate legal, financial, operational, and business professionals to assist with company formation and development.\n\nWhether launching a personal brand, investment company, operating business, or new venture, we help athletes build a foundation designed for where they want the business to go, not simply where it starts.",
  'BUILD|Legacy|Charitable Foundations': "## Build a Legacy That Gives Back.\n\nAn athlete's influence can extend far beyond the playing field.\n\nThe Standard helps athletes explore the process of turning their personal passions and commitment to community into meaningful philanthropic initiatives.\n\nWhether establishing a charitable foundation, scholarship program, community initiative, or other giving platform, we help coordinate the professionals and resources needed to build something sustainable.\n\nOur goal is to help athletes create a legacy that continues to impact people long after their playing career ends.",
  'BUILD|Legacy|Life After Sports': "## Prepare for What Comes Next.\n\nEvery athletic career eventually enters a new chapter.\n\nThe Standard helps athletes begin preparing for life beyond competition before that transition arrives.\n\nWe help athletes explore opportunities in business, entrepreneurship, investing, coaching, broadcasting, leadership, philanthropy, and other professional pursuits while connecting them with the people and resources that can help turn those interests into a second career.\n\n**The goal isn't simply to prepare for the end of a career. It is to build what comes next.**",
  'BUILD|Legacy|Public Speaking': "## Turn Your Voice Into Influence.\n\nAn athlete's story, experience, and perspective can create opportunities long after the final whistle.\n\nThe Standard helps athletes develop and explore opportunities in public speaking, appearances, panels, corporate events, schools, community programs, and other platforms where their voice can create value.\n\nWe help athletes understand how to position their story, identify the right opportunities, and build a speaking platform that can become an extension of their personal brand and long-term legacy.",
  'PROTECT|Legal Backing|Contract Review': "## Know What You're Signing.\n\nAthletes encounter contracts at every stage of their careers, from NIL agreements and endorsement deals to professional contracts, business agreements, and partnerships.\n\nThe Standard helps athletes navigate the contract-review process by coordinating access to qualified legal professionals who can review agreements, identify important provisions, and help athletes understand the obligations and opportunities in front of them before they sign.",
  'PROTECT|Legal Backing|Contract Negotiation': "## Know Your Value. Negotiate Accordingly.\n\nThe right contract can shape an athlete's career, finances, and future opportunities.\n\nThe Standard helps coordinate the negotiation process by connecting athletes with appropriate legal and professional resources to evaluate terms, identify areas for negotiation, and advocate for the athlete's interests.\n\n**Make sure the athlete understands the deal and has the right people at the table before agreeing to it.**",
  'PROTECT|Legal Backing|Business Law': "## Protect What You Build.\n\nAs athletes become entrepreneurs, investors, and business owners, their legal needs extend beyond their playing contracts.\n\nThe Standard helps athletes coordinate access to legal professionals who can assist with business matters, agreements, partnerships, entity structures, and other legal considerations that arise as an athlete builds beyond the game.",
  'PROTECT|Legal Backing|Intellectual Property': "## Own Your Name. Protect Your Brand.\n\nAn athlete's name, image, likeness, personal brand, content, and creative work can become some of their most valuable assets.\n\nThe Standard helps athletes understand and protect those assets by coordinating access to qualified intellectual-property professionals who can advise on trademarks, brand protection, licensing, content, and other intellectual-property matters.\n\n**Your name is an asset. Your brand is an asset. Build it and protect it accordingly.**",
  'PROTECT|Risk Management|Reputation Management': "## Protect the Name Behind the Brand.\n\nAn athlete's reputation can be one of their most valuable assets and one of the easiest to put at risk.\n\nThe Standard helps athletes proactively think about how their actions, partnerships, public profile, and business decisions can affect their reputation and long-term brand.\n\nWe help coordinate access to trusted professionals who can provide guidance when reputational issues arise and help athletes make thoughtful decisions before a situation becomes a larger problem.",
  'PROTECT|Risk Management|Compliance': "## Stay Ahead of the Rules.\n\nThe opportunities surrounding an athlete can come with complex rules, policies, contractual obligations, and regulatory requirements.\n\nThe Standard helps athletes navigate those considerations by coordinating with appropriate legal, compliance, and professional resources.\n\nWhether dealing with NIL, professional sports, endorsements, business activities, or other opportunities, we help athletes identify potential issues and connect with the right professionals to address them.",
  'PROTECT|Crisis Awareness|Crisis Communications': "## When the Moment Matters, So Does the Message.\n\nWhen an athlete faces a difficult or high-profile situation, how they communicate can be just as important as what happened.\n\nThe Standard helps athletes coordinate with experienced communications professionals to develop thoughtful messaging, navigate media attention, and communicate with the appropriate audiences.\n\nOur focus is helping athletes respond with clarity, professionalism, and purpose when the pressure is at its highest.",
  'PROTECT|Crisis Awareness|Public Relations Support': "## Protect the Story. Protect the Athlete.\n\nAthletes operate in an environment where a single moment can quickly become a national conversation.\n\nThe Standard helps coordinate public-relations support when athletes need assistance managing media attention, public perception, or significant career moments.\n\nThrough our professional network, we can help connect athletes with experienced PR professionals who understand the demands of sports, entertainment, and public-facing careers.",
  'PROTECT|Crisis Awareness|Social Media Guidance': "## Your Platform. Your Reputation. Your Responsibility.\n\nSocial media is an extension of an athlete's brand and everything posted can have lasting consequences.\n\nThe Standard helps athletes approach their digital presence strategically by providing guidance around content, public communication, brand alignment, and situations that may create reputational risk.\n\nWe help athletes understand that their platform is not simply a marketing tool. **It is part of their professional identity.**",
}

// Per-pillar cinematic hero videos — only shown on the top-level pillar page (l2=null, l3=null)
const PILLAR_VIDEO: Record<string, string> = {
  REPRESENT: atlantaVideo,
}

// Dedicated hero background images for specific sub-pages (swap placeholders when client supplies assets)
const PILLAR_HERO_IMG: Record<string, string> = {
  'REPRESENT|Athletes|NFLPA': 'https://images.unsplash.com/photo-1696542095242-53305aaa6d9c?w=1920&h=1080&fit=crop&auto=format',
  'REPRESENT|Athletes|Pro & Collegiate Golf': 'https://images.unsplash.com/photo-1763917343408-4cfcc6bdd381?w=1920&h=1080&fit=crop&auto=format',
  'REPRESENT|Coaches|Coaching Representation': coachingRepPngImg,
  'REPRESENT|Coaches|Coaching Opportunities': coachingOpp5Img,
  'REPRESENT|Coaches|Contract Negotiation': contractNegImg,
  'REPRESENT|Executives|Executive Placement': 'https://images.unsplash.com/photo-1758518730037-a16581a040e8?w=1920&h=1080&fit=crop&auto=format',
  'REPRESENT|Executives|General Managers': generalManagerImg,
  'REPRESENT|Executives|Collegiate Athletic Directors': athleticDirectorsImg,
  'BUILD|Wealth|Wealth Management':      'https://images.unsplash.com/photo-1610374792793-f016b77ca51a?w=1920&h=1080&fit=crop&auto=format',
  'BUILD|Wealth|Financial Planning':     'https://images.unsplash.com/photo-1714974528718-b3b52f91c334?w=1920&h=1080&fit=crop&auto=format',
  'BUILD|Wealth|Investment Coordination':'https://images.unsplash.com/photo-1780733064275-d1ade9b83a3d?w=1920&h=1080&fit=crop&auto=format',
  'BUILD|Business|Brand Partnerships':   brandPartnershipImg,
  'BUILD|Business|Marketing Opportunities':'https://images.unsplash.com/photo-1758613654806-fa787b741bba?w=1920&h=1080&fit=crop&auto=format',
  'BUILD|Business|Business Consulting':  'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1920&h=1080&fit=crop&auto=format',
  'BUILD|Business|Business Formation':   'https://images.unsplash.com/photo-1758518730327-98070967caab?w=1920&h=1080&fit=crop&auto=format',
  'BUILD|Business|Entrepreneurship':     'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&h=1080&fit=crop&auto=format',
  'BUILD|Business|Company Formation':    'https://images.unsplash.com/photo-1758518729912-bf3a84c400e0?w=1920&h=1080&fit=crop&auto=format',
  'BUILD|Trust|Client Relations':        clientRelationsImg,
  'BUILD|Trust|Personal Advisory':       advisoryImg,
  'PROTECT|Legal Backing|Contract Negotiation':      'https://images.unsplash.com/photo-1758518730083-4c12527b6742?w=1920&h=1080&fit=crop&auto=format',
  'PROTECT|Legal Backing|Business Law':              'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=1920&h=1080&fit=crop&auto=format',
  'PROTECT|Legal Backing|Intellectual Property':     'https://images.unsplash.com/photo-1645658043538-fc2bb1702cfe?w=1920&h=1080&fit=crop&auto=format',
  'PROTECT|Risk Management|Reputation Management':   'https://images.unsplash.com/photo-1695388474402-ed805a890d8d?w=1920&h=1080&fit=crop&auto=format',
  'PROTECT|Risk Management|Compliance':              'https://images.unsplash.com/photo-1583521214690-73421a1829a9?w=1920&h=1080&fit=crop&auto=format',
  'PROTECT|Crisis Awareness|Crisis Communications':  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1920&h=1080&fit=crop&auto=format',
  'PROTECT|Crisis Awareness|Public Relations Support':'https://images.unsplash.com/photo-1529362487499-b149087a4f62?w=1920&h=1080&fit=crop&auto=format',
  'PROTECT|Crisis Awareness|Social Media Guidance':  'https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?w=1920&h=1080&fit=crop&auto=format',
}

// Per-page hero height overrides — desktop height (mobile stays at 40vh)
const PILLAR_HERO_HEIGHT: Record<string, string> = {
  'BUILD|Legacy|Community Impact':                      '62vh',
  'BUILD|Trust|Build Your Team. Protect Your Future.':  '62vh',
  'BUILD|Legacy|Public Speaking':                       '62vh',
  'BUILD|Trust|Client Relations':                       '62vh',
  'BUILD|Trust|Personal Advisory':                      '62vh',
  'BUILD|Legacy|Charitable Foundations':                '62vh',
}

// Per-page object-position overrides for hero images (single and slideshow)
const PILLAR_HERO_POS: Record<string, string> = {
  'REPRESENT|Athletes|NFLPA':                        'center 40%',
  'REPRESENT|Athletes|Pro & Collegiate Golf':        'center 30%',
  'REPRESENT|Coaches|Coaching Representation':       'center 35%',
  'REPRESENT|Coaches|Coaching Opportunities':        'center 40%',
  'REPRESENT|Executives|Executive Placement':        'center 35%',
  'REPRESENT|Executives|Collegiate Athletic Directors': 'center 30%',
  'BUILD|Legacy|Community Impact':                     '78% 20%',
  'BUILD|Trust|Build Your Team. Protect Your Future.': '78% 20%',
  'BUILD|Legacy|Public Speaking':                      '78% 20%',
  'BUILD|Legacy|Charitable Foundations':               '78% 20%',
  'BUILD|Trust|Client Relations':                      '78% 20%',
  'BUILD|Trust|Personal Advisory':                     '85% center',
  'BUILD|Legacy|Life After Sports':                  '78% 20%',
  'BUILD|Business|Brand Partnerships':               'center center',
}

// Pages where the image should show in full (contain) rather than crop (cover)
const PILLAR_HERO_FIT: Record<string, 'cover' | 'contain'> = {
  'BUILD|Legacy|Life After Sports':                     'contain',
  'BUILD|Legacy|Charitable Foundations':                'contain',
  'BUILD|Legacy|Community Impact':                      'contain',
  'BUILD|Trust|Build Your Team. Protect Your Future.':  'contain',
  'BUILD|Legacy|Public Speaking':                       'contain',
  'BUILD|Trust|Client Relations':                       'contain',
  'BUILD|Trust|Personal Advisory':                      'contain',
}

// Per-page filter overrides — use to boost brightness on darker source images
const PILLAR_HERO_FILTER: Record<string, string> = {
  'REPRESENT|Coaches|Coaching Representation':          'brightness(1.55) contrast(1.12) saturate(1.14)',
  'REPRESENT|Coaches|Contract Negotiation':             'brightness(1.55) contrast(1.12) saturate(1.14)',
  'REPRESENT|Executives|Collegiate Athletic Directors': 'brightness(1.6) contrast(1.12) saturate(1.14)',
  'REPRESENT|Executives|General Managers':              'brightness(1.6) contrast(1.12) saturate(1.14)',
  'BUILD|Trust|Build Your Team. Protect Your Future.':  'brightness(1.5) contrast(1.1) saturate(1.08)',
  'BUILD|Wealth|Wealth Management':                     'brightness(1.4) contrast(1.1) saturate(1.1)',
  'BUILD|Wealth|Financial Planning':                    'brightness(1.45) contrast(1.1) saturate(1.1)',
  'BUILD|Wealth|Investment Coordination':               'brightness(1.4) contrast(1.1) saturate(1.08)',
  'BUILD|Business|Marketing Opportunities':             'brightness(1.5) contrast(1.12) saturate(1.12)',
  'BUILD|Business|Business Consulting':                 'brightness(1.45) contrast(1.1) saturate(1.1)',
  'BUILD|Business|Business Formation':                  'brightness(1.4) contrast(1.1) saturate(1.08)',
  'BUILD|Business|Entrepreneurship':                    'brightness(1.4) contrast(1.1) saturate(1.08)',
  'BUILD|Business|Company Formation':                   'brightness(1.4) contrast(1.1) saturate(1.08)',
  'BUILD|Legacy|Charitable Foundations':                'brightness(1.5) contrast(1.1) saturate(1.12)',
  'BUILD|Legacy|Community Impact':                      'brightness(1.35) contrast(1.08) saturate(1.06)',
  'BUILD|Legacy|Public Speaking':                       'brightness(1.45) contrast(1.1) saturate(1.08)',
  'PROTECT|Legal Backing|Contract Review':              'brightness(1.45) contrast(1.1) saturate(1.08)',
  'PROTECT|Legal Backing|Contract Negotiation':         'brightness(1.42) contrast(1.1) saturate(1.08)',
  'PROTECT|Legal Backing|Business Law':                 'brightness(1.5) contrast(1.1) saturate(1.1)',
  'PROTECT|Legal Backing|Intellectual Property':        'brightness(1.45) contrast(1.1) saturate(1.08)',
  'PROTECT|Risk Management|Reputation Management':      'brightness(1.48) contrast(1.1) saturate(1.1)',
  'PROTECT|Risk Management|Compliance':                 'brightness(1.45) contrast(1.1) saturate(1.08)',
  'PROTECT|Crisis Awareness|Crisis Communications':     'brightness(1.5) contrast(1.12) saturate(1.1)',
  'PROTECT|Crisis Awareness|Public Relations Support':  'brightness(1.52) contrast(1.12) saturate(1.1)',
  'PROTECT|Crisis Awareness|Social Media Guidance':     'brightness(1.42) contrast(1.1) saturate(1.08)',
}

// Pages with multiple hero images — rendered as a cinematic slideshow
const PILLAR_HERO_SLIDES: Record<string, string[]> = {
  'REPRESENT|Athletes|NIL': [nil1Img, nil2Img, nil3Img],
  'BUILD|Legacy|Community Impact': [communityImpactNewImg, communityImpactImg],
  'BUILD|Legacy|Life After Sports': [lifeAfterSports1, lifeAfterSports2, lifeAfterSports3],
  'BUILD|Trust|Build Your Team. Protect Your Future.': [buildYourTeamProtectImg, buildYourTeamImg],
  'BUILD|Legacy|Public Speaking': [publicSpeaking2Img, publicSpeaking22Img],
  'BUILD|Legacy|Charitable Foundations': [charitable1Img, charitable2Img],
}

// Secondary cinematic images keyed by "PILLAR|L2|L3" or "PILLAR|L2" or "PILLAR"
// Add new entries here as images arrive — no other changes needed.
const SECONDARY_HERO: Record<string, string> = {
  'REPRESENT|Athletes|NIL': nilImg,
  'REPRESENT|Athletes|Pro & Collegiate Golf': golfImg,
  'BUILD|Wealth|Wealth Management': wealthMgmtImg,
  'BUILD|Wealth|Financial Planning': financialPlanningImg,
  'BUILD|Wealth|Investment Coordination': financialPlanningImg,
  'BUILD|Business|Brand Partnerships': businessConsultingImg,
  'BUILD|Business|Marketing Opportunities': businessConsultingImg,
  'BUILD|Business|Business Consulting': businessConsultingImg,
  'BUILD|Business|Entrepreneurship': businessConsultingImg,
  'BUILD|Business|Company Formation': businessConsultingImg,
  'BUILD|Legacy|Community Impact': legacyImpactImg,
  'BUILD|Legacy|Charitable Foundations': legacyImpactImg,
  'PROTECT|Legal Backing': legalBackingImg,
  'PROTECT|Risk Management': riskMgmtImg,
}

function renderRichText(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} style={{ color: '#b0aca4', fontWeight: 500 }}>{part.slice(2, -2)}</strong>
      : part
  )
}

function PillarPage({
  pillar,
  l2,
  l3,
  onBack,
  onOpenNav,
}: {
  pillar: string
  l2: string | null
  l3: string | null
  onBack: () => void
  onOpenNav: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const isMobile = useIsMobile()
  const pillarVideoRef = useRef<HTMLVideoElement>(null)
  const { ref, visible } = useScrollReveal()
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [pillar, l2, l3])
  useEffect(() => {
    const video = pillarVideoRef.current
    if (!video) return
    const tryPlay = () => video.play().catch(() => {})
    video.load()
    if (video.readyState >= 3) { tryPlay() } else { video.addEventListener('canplay', tryPlay, { once: true }) }
    return () => video.removeEventListener('canplay', tryPlay)
  }, [pillar])

  const meta = PILLAR_META[pillar]
  const title = l3 || l2 || pillar
  const bodyText = (l3 && l2 ? L3_BODY[`${pillar}|${l2}|${l3}`] : null) ?? meta.body

  // Slideshow for pages with multiple hero images
  const heroSlides = PILLAR_HERO_SLIDES[`${pillar}|${l2}|${l3}`] ?? null
  const [slideIndex, setSlideIndex] = useState(0)
  const [slideDir, setSlideDir] = useState(1)
  useEffect(() => {
    if (!heroSlides || heroSlides.length <= 1) return
    setSlideIndex(0)
    const id = setInterval(() => {
      setSlideIndex(i => (i + 1) % heroSlides.length)
      setSlideDir(d => -d)
    }, 4500)
    return () => clearInterval(id)
  }, [heroSlides])

  // Resolve secondary image: try most-specific key first, then fall back to l2, then pillar
  const secondaryImg =
    (l3 && l2 ? SECONDARY_HERO[`${pillar}|${l2}|${l3}`] : undefined) ??
    (l2 ? SECONDARY_HERO[`${pillar}|${l2}`] : undefined) ??
    SECONDARY_HERO[pillar] ??
    null

  // Cross-fade state: alternates between primary (false) and secondary (true)
  const [showSecondary, setShowSecondary] = useState(false)
  useEffect(() => {
    if (!secondaryImg || heroSlides) { setShowSecondary(false); return }
    const id = setInterval(() => setShowSecondary(s => !s), 6000)
    return () => clearInterval(id)
  }, [secondaryImg, heroSlides, pillar, l2, l3])

  return (
    <InnerShell onBack={onBack} onOpenNav={onOpenNav}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: isMobile ? '40vh' : (PILLAR_HERO_HEIGHT[`${pillar}|${l2}|${l3}`] || '100vh'), minHeight: isMobile ? '240px' : '600px' }}>
        {/* Primary background */}
        {PILLAR_VIDEO[pillar] && !l2 && !l3 ? (
          <video
            ref={pillarVideoRef}
            key={pillar}
            src={PILLAR_VIDEO[pillar]}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: isMobile ? 'contain' : 'cover', opacity: 0.88, filter: 'brightness(1.65) contrast(1.12) saturate(1.18)' }}
          />
        ) : heroSlides ? (
          /* Cinematic slideshow for NIL and any multi-image pages */
          <div className="absolute inset-0 overflow-hidden">
            {heroSlides.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={title}
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: PILLAR_HERO_FIT[`${pillar}|${l2}|${l3}`] || 'cover',
                  objectPosition: PILLAR_HERO_POS[`${pillar}|${l2}|${l3}`] || 'center center',
                  opacity: i === slideIndex ? 0.88 : 0,
                  transform: i === slideIndex
                    ? 'scale(1.04) translateX(0%)'
                    : `scale(1.0) translateX(${slideDir * 3}%)`,
                  transition: i === slideIndex
                    ? 'opacity 1.2s ease, transform 5s ease'
                    : 'opacity 1s ease, transform 1s ease',
                  filter: PILLAR_HERO_FILTER[`${pillar}|${l2}|${l3}`] || 'brightness(1.05) contrast(1.08) saturate(1.08)',
                }}
              />
            ))}
          </div>
        ) : (
          <img
            src={PILLAR_HERO_IMG[`${pillar}|${l2}|${l3}`] || meta.img}
            alt={title}
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: PILLAR_HERO_FIT[`${pillar}|${l2}|${l3}`] || 'cover',
              objectPosition: PILLAR_HERO_POS[`${pillar}|${l2}|${l3}`] || 'center center',
              opacity: secondaryImg && showSecondary ? 0 : 0.88,
              filter: PILLAR_HERO_FILTER[`${pillar}|${l2}|${l3}`] || 'brightness(1.05) contrast(1.08) saturate(1.08)',
              transition: 'opacity 2.5s ease',
            }}
          />
        )}
        {/* Secondary cinematic image — only cross-fades on single-image sub-pages */}
        {secondaryImg && !heroSlides && !(PILLAR_VIDEO[pillar] && !l2 && !l3) && (
          <img
            src={secondaryImg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: showSecondary ? 0.72 : 0,
              filter: 'brightness(1.6) contrast(1.15) saturate(1.28)',
              transition: 'opacity 2.5s ease',
            }}
          />
        )}
        <div className="absolute inset-0" style={{ background: isMobile ? 'rgba(10,10,10,0.55)' : 'linear-gradient(to right, rgba(10,10,10,0.9) 30%, rgba(10,10,10,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 60%)' }} />

        <div className="relative h-full flex flex-col justify-end px-8 md:px-20 lg:px-28 pb-14 md:pb-20" style={{ maxWidth: isMobile ? '100%' : '65%' }}>
          <p
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.32em',
              color: '#C4C0B8',
              textTransform: 'uppercase',
              marginBottom: '10px',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.8s ease 200ms',
            }}
          >
            {meta.tagline}
          </p>
          <h1
            className="text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(4rem, 8vw, 9rem)',
              letterSpacing: '0.06em',
              lineHeight: 0.9,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 340ms, transform 0.9s ease 340ms',
            }}
          >
            {title}
          </h1>
          {l2 && l2 !== l3 && (
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(0.85rem, 1.4vw, 1.2rem)',
                fontWeight: 300,
                color: '#555',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                marginTop: '8px',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.9s ease 480ms',
              }}
            >
              {pillar} · {l2}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 1s ease, transform 1s ease' }}>
            <h2
              className="text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 4rem)', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '24px' }}
            >
              {l3 ? l3 : `The ${pillar} Pillar.`}
            </h2>
            {bodyText.split('\n\n').map((para, i, arr) =>
              para.startsWith('## ') ? (
                <p key={i} style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(0.78rem, 1.05vw, 0.92rem)', fontWeight: 500, letterSpacing: '0.16em', color: '#C4C0B8', textTransform: 'uppercase', lineHeight: 1.65, marginBottom: '28px' }}>
                  {para.slice(3)}
                </p>
              ) : (
                <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.95, marginBottom: i < arr.length - 1 ? '16px' : 0 }}>
                  {renderRichText(para)}
                </p>
              )
            )}
            <div className="mt-12">
              <button
                className="px-8 py-[13px] transition-all duration-200"
                style={{ backgroundColor: '#C4C0B8', color: '#0A0A0A', fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#8C8884' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C4C0B8' }}
              >
                Book Consultation
              </button>
            </div>
          </div>

          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(20px)', transition: 'opacity 1s ease 180ms, transform 1s ease 180ms' }}>
            <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.3em', color: '#333', textTransform: 'uppercase', marginBottom: '20px' }}>
              Services Within {pillar}
            </p>
            {Object.entries(NAV_TREE[pillar]).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: '20px' }}>
                <p
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    color: cat === l2 ? '#C4C0B8' : '#444',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {cat}
                </p>
                <div style={{ paddingLeft: '12px', borderLeft: '1px solid #111114', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {(items as string[]).map(item => (
                    <span
                      key={item}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        color: item === l3 ? '#aaa' : '#2a2a2d',
                        fontWeight: item === l3 ? 400 : 300,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ── BOARDROOM AND THE COURTROOM — shown only on Contract Negotiation ── */}
      {pillar === 'REPRESENT' && l2 === 'Coaches' && l3 === 'Contract Negotiation' && (
        <div style={{ borderTop: '1px solid #0e0e10', backgroundColor: '#060608' }}>
          <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-24 items-start">
              <div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.08em', color: '#fff', lineHeight: 1.05 }}>The Boardroom<br />and the<br />Courtroom</p>
              </div>
              <div className="flex flex-col gap-8">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  Andy maintains a full-time law practice handling complex litigation matters across a wide range of subject areas, including products liability, medical malpractice and other high-stakes litigation.
                </p>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.28em', color: '#333', textTransform: 'uppercase', marginBottom: '18px' }}>Courtroom Results</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ backgroundColor: '#0d0d0f' }}>
                    {[
                      { amount: '$40M', label: 'Wrongful-death judgment' },
                      { amount: '$17.33M', label: 'Wrongful-death medical malpractice verdict' },
                      { amount: '$16.4M', label: 'Wrongful-death medical malpractice verdict' },
                      { amount: '$8M', label: 'Wrongful-death settlement' },
                      { amount: '$7.25M', label: 'Toxic-tort settlement' },
                      { amount: '$4M', label: 'Wrongful-death settlement' },
                    ].map(item => (
                      <div key={item.amount + item.label} style={{ backgroundColor: '#0A0A0A', padding: '20px 18px 22px' }}>
                        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.06em', color: '#C4C0B8', lineHeight: 1 }}>{item.amount}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#444', fontWeight: 300, lineHeight: 1.55, marginTop: '6px' }}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  That same tenacity translates into the sports world. The courtroom and the athletic front office aren't as different as they may appear.
                </p>
                <div className="flex flex-col gap-[6px]">
                  {['Preparation.', 'Strategy.', 'Relationships.'].map(word => (
                    <div key={word} className="flex items-center gap-3">
                      <span style={{ color: '#C4C0B8', fontSize: '5px', opacity: 0.45, flexShrink: 0 }}>◆</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#666', fontWeight: 300 }}>{word}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  And both require someone willing to fight for the person sitting across the table.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer onUtility={() => {}} />
    </InnerShell>
  )
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────

function AboutSectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal(0.06)
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.95s ease ${delay}ms, transform 0.95s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

function AboutPlaceholder({ label }: { label: string }) {
  return (
    <div style={{ padding: '48px 0', borderTop: '1px solid #0d0d0f' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.3em', color: '#252528', textTransform: 'uppercase' }}>
        {label}: Content being prepared.
      </p>
    </div>
  )
}

function AboutPage({ onBack, onOpenNav }: { onBack: () => void; onOpenNav: () => void }) {
  const isMobile = useIsMobile()
  const aboutVideoRef = useRef<HTMLVideoElement>(null)
  const [heroLoaded, setHeroLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHeroLoaded(true), 120); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const video = aboutVideoRef.current
    if (!video) return
    const tryPlay = () => video.play().catch(() => {})
    video.load()
    if (video.readyState >= 3) { tryPlay() } else { video.addEventListener('canplay', tryPlay, { once: true }) }
    return () => video.removeEventListener('canplay', tryPlay)
  }, [])

  return (
    <InnerShell onBack={onBack} onOpenNav={onOpenNav}>

      {/* ── 3. OUR STORY ── */}
      <div style={{ borderBottom: '1px solid #0e0e10', paddingTop: 'clamp(88px, 13vh, 130px)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-20">
          <AboutSectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-24 items-start">
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.3em', color: '#484848', textTransform: 'uppercase', marginBottom: '14px' }}>Our Story</p>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#252528' }} />
              </div>
              <div className="flex flex-col gap-6">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  The Standard Sports &amp; Entertainment Group was built on a simple belief:
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: '#aaa', fontWeight: 300, lineHeight: 1.75, fontStyle: 'italic', borderLeft: '2px solid #C4C0B8', paddingLeft: '20px' }}>
                  "Athletes deserve more than representation. They deserve people in their corner who genuinely understand the journey."
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  That belief comes from experience, not theory.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  The Standard brings together Javonte Middleton and Andy Conn, two people who have spent their careers on different sides of the sports and business world, but share the same philosophy: relationships matter, preparation matters, and the people you surround yourself with can change the trajectory of your career.
                </p>
              </div>
            </div>
          </AboutSectionReveal>
        </div>
      </div>

      {/* ── 4. LEADERSHIP ── */}
      <div style={{ borderBottom: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-24">
          <AboutSectionReveal>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.3em', color: '#484848', textTransform: 'uppercase', marginBottom: '52px' }}>Leadership</p>
          </AboutSectionReveal>
          <div className="flex flex-col gap-20 md:gap-32">
            {[
              {
                name: 'Andy Conn',
                title: 'Founder & Legal/Of Counsel, Conn Law Firm',
                photo: andyPhoto,
                alt: 'Andy Conn',
                responsibilities: ['Legal review', 'Litigation support', 'Compliance', 'Mediation', 'Arbitration', 'NIL negotiations', 'Client development', 'Overall Risk Management'],
                delay: 0,
              },
              {
                name: 'Javonte Middleton',
                title: 'Director of Athlete Relations & Partnerships',
                photo: javantePhoto,
                alt: 'Javonte Middleton',
                responsibilities: ['Athlete acquisition', 'NIL negotiations', 'Brand partnerships', 'Brand relationships', 'Sponsorship development', 'Client development', 'Client services'],
                delay: 80,
              },
            ].map(person => (
              <AboutSectionReveal key={person.name} delay={person.delay}>
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] gap-10 md:gap-16 items-start">
                  <div style={{ backgroundColor: '#0C0C0F', flexShrink: 0 }}>
                    <img src={person.photo} alt={person.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div className="pt-0 md:pt-3">
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 600, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1, marginBottom: '10px' }}>{person.name}</h3>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '10px', color: '#C4C0B8', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 400, marginBottom: '28px' }}>{person.title}</p>
                    <div style={{ width: '32px', height: '1px', backgroundColor: '#C4C0B8', opacity: 0.4, marginBottom: '28px' }} />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.28em', color: '#333', textTransform: 'uppercase', marginBottom: '18px' }}>Areas of Focus</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-[6px]">
                      {person.responsibilities.map(r => (
                        <div key={r} className="flex items-center gap-3">
                          <span style={{ color: '#C4C0B8', fontSize: '5px', opacity: 0.45, flexShrink: 0 }}>◆</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#555', fontWeight: 300, letterSpacing: '0.01em' }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AboutSectionReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. THE NETWORK ── */}
      <div style={{ borderBottom: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-20">
          <AboutSectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-24 items-start">
              <div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.08em', color: '#fff' }}>The Network</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.22em', color: '#484848', textTransform: 'uppercase', marginTop: '8px' }}>Relationships Are the Foundation.</p>
              </div>
              <div className="flex flex-col gap-6">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  Over the years, Javonte has developed an extensive network of college football coaches and staff, professional executives, scouts, athletic personnel, brand representatives and people working throughout the sports industry.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  But the value of that network isn't simply a number.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#aaa', fontWeight: 300, lineHeight: 1.75, fontStyle: 'italic', borderLeft: '2px solid #C4C0B8', paddingLeft: '20px' }}>
                  "It's the relationships behind it. The Standard believes in calling the person who actually knows the person."
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  Whether an athlete is entering the transfer portal, searching for the right coaching opportunity, exploring professional opportunities, pursuing NIL partnerships, or preparing for life after football, access matters.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  Javonte's relationships with coaches and executives across the country, across multiple levels and sports, give The Standard the ability to have conversations that aren't always available through traditional channels.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  And perhaps most importantly, many of those relationships are genuine. The Standard isn't built around collecting names. It's built around knowing people, earning trust, and picking up the phone.
                </p>
              </div>
            </div>
          </AboutSectionReveal>
        </div>
      </div>

      {/* ── 6. FROM ATHLETE TO ADVOCATE ── */}
      <div style={{ borderBottom: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-20">
          <AboutSectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-24 items-start">
              <div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.08em', color: '#fff', lineHeight: 1.05 }}>From Athlete<br />to Advocate</p>
              </div>
              <div className="flex flex-col gap-6">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  Javonte's work with athletes has taken that philosophy one step further. He has helped athletes navigate major career decisions, including the transfer portal, NIL opportunities, brand relationships and professional aspirations.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  Some of those athletes have gone on to reach the next level after putting in the work required to get there. That's the part of this business that means the most.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#aaa', fontWeight: 300, lineHeight: 1.75, fontStyle: 'italic', borderLeft: '2px solid #C4C0B8', paddingLeft: '20px' }}>
                  "Watching an athlete become the person they said they wanted to become."
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  The Standard doesn't promise an athlete a professional career. It promises something more important: a team of people committed to helping them maximize the opportunity in front of them.
                </p>
              </div>
            </div>
          </AboutSectionReveal>
        </div>
      </div>

      {/* ── 8. WHY THE STANDARD — 3 PANELS ── */}
      <div style={{ borderBottom: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-24">
          <AboutSectionReveal>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.3em', color: '#484848', textTransform: 'uppercase', marginBottom: '44px' }}>Why The Standard</p>
          </AboutSectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: '#0e0e10' }}>
            {[
              { pillar: 'REPRESENT', delay: 0, desc: 'Elite athlete representation. From the first recruiting call to the professional contract, we work exclusively for the athlete. Contract negotiation, transfer portal guidance, NIL strategy, and NFL preparation.' },
              { pillar: 'BUILD', delay: 100, desc: 'Long-term wealth, brands, businesses, and legacies. Brand development, marketing advances, business formation, wealth management, and community impact strategy. The game ends. The business does not have to.' },
              { pillar: 'PROTECT', delay: 200, desc: 'Legal support backed by Conn Law Firm. Contract review, intellectual property protection, risk management, and crisis communications. Every athlete deserves a legal team from day one.' },
            ].map(({ pillar, delay, desc }) => (
              <AboutSectionReveal key={pillar} delay={delay}>
                <div style={{ backgroundColor: '#0A0A0A', padding: '40px 32px 44px', borderTop: '2px solid #C4C0B8', height: '100%' }}>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.6rem', letterSpacing: '0.08em', color: '#fff', marginBottom: '20px' }}>{pillar}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#555', fontWeight: 300, lineHeight: 1.9 }}>{desc}</p>
                </div>
              </AboutSectionReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── 9. MORE THAN REPRESENTATION ── */}
      <div style={{ borderBottom: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-12 lg:gap-28 items-start">
            <AboutSectionReveal>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.3em', color: '#484848', textTransform: 'uppercase', marginBottom: '20px' }}>Our Philosophy</p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.4rem, 4.5vw, 4.8rem)', letterSpacing: '0.06em', color: '#ffffff', lineHeight: 0.92 }}>
                More Than<br />Representation.
              </h2>
            </AboutSectionReveal>
            <AboutSectionReveal delay={120}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9, marginBottom: '28px' }}>
                The Standard is not simply a sports agency. We are an athlete development and investment platform. Our approach combines:
              </p>
              <div style={{ width: '100%', height: '1px', backgroundColor: '#111', marginBottom: '28px' }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[10px] gap-x-10 mb-10">
                {[
                  'Elite contract negotiation',
                  'Legal protection through Conn Law Firm',
                  'Strategic NIL and marketing representation',
                  'Long-term business planning',
                  'Brand development',
                  'Community impact strategy',
                  'Career transition planning',
                  'Relationship-driven opportunity creation',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <span style={{ color: '#C4C0B8', fontSize: '5px', opacity: 0.45, marginTop: '7px', flexShrink: 0 }}>◆</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#555', fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ width: '100%', height: '1px', backgroundColor: '#111', marginBottom: '28px' }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#484848', fontWeight: 300, lineHeight: 1.9, fontStyle: 'italic' }}>
                "Our objective is not only to secure the next deal, but to build sustainable careers, enduring brands, and lifelong legacies for every athlete we represent."
              </p>
            </AboutSectionReveal>
          </div>
        </div>
      </div>

      {/* ── 10. LEGACY MATTERS ── */}
      <div style={{ borderBottom: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-20">
          <AboutSectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-24 items-start">
              <div className="flex flex-col gap-4">
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.08em', color: '#fff', lineHeight: 1.05 }}>Legacy<br />Matters</p>
                <img src={connSteelerImg} alt="Legacy Matters" style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '2px' }} />
              </div>
              <div className="flex flex-col gap-6">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.28em', color: '#484848', textTransform: 'uppercase', marginBottom: '2px' }}>Andy Conn</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  Andy is a husband and father of three, and his passion for children and families is reflected in his community involvement. He serves on the Board of Brightside Child and Family Advocacy in Savannah, formerly Chatham County CASA, which advocates for children and adolescents in foster care.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  He has also volunteered with Make-A-Wish Georgia, is involved with the Kids Cancer Alliance in Louisville, Kentucky, and participates in the CJA program providing legal representation to indigent clients in the U.S. District Court for the Southern District of Georgia.
                </p>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#111', margin: '8px 0' }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.28em', color: '#484848', textTransform: 'uppercase', marginBottom: '2px' }}>Javonte Middleton</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  For Javonte, service has similarly been a defining part of his life, including work with organizations focused on education, youth development, health and community advancement in Savannah.
                </p>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#111', margin: '8px 0' }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#aaa', fontWeight: 300, lineHeight: 1.9, fontStyle: 'italic', borderLeft: '2px solid #C4C0B8', paddingLeft: '20px' }}>
                  "Because we believe an athlete's legacy shouldn't be measured solely by statistics, contracts or championships. It should also be measured by the lives they impact."
                </p>
              </div>
            </div>
          </AboutSectionReveal>
        </div>
      </div>

      {/* ── 11. THE STANDARD — closing manifesto ── */}
      <div style={{ borderBottom: '1px solid #0e0e10', backgroundColor: '#060608' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-20">
          <AboutSectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-24 items-start">
              <div className="flex flex-col gap-4">
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '0.08em', color: '#fff' }}>The Standard</p>
                <img src={superbowlImg} alt="The Standard" style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '2px' }} />
              </div>
              <div className="flex flex-col gap-6">
                <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: '#C4C0B8', textTransform: 'uppercase', marginBottom: '4px' }}>Different backgrounds. One philosophy.</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  Javonte knows what it feels like to be the athlete. Andy knows what it feels like to sit across the table and fight for the client.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  Together, we understand the locker room, the sideline, the front office, the boardroom and the courtroom. We've been around the game. We've competed in it. We've worked inside it. We've built relationships within it.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  And we've watched athletes put in the work to turn potential into opportunity. Now, we're building something designed to help the next generation do the same.
                </p>
                <div style={{ borderTop: '1px solid #111', paddingTop: '28px', marginTop: '8px' }}>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '0.06em', color: '#ffffff', lineHeight: 1.2, marginBottom: '20px' }}>
                    The Standard isn't just about where an athlete is today.<br />It's about where they can go next.
                  </p>
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '11px', letterSpacing: '0.3em', color: '#C4C0B8', textTransform: 'uppercase' }}>
                    The Standard Sports &amp; Entertainment Group
                  </p>
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '10px', letterSpacing: '0.22em', color: '#484848', textTransform: 'uppercase', marginTop: '6px' }}>
                    Represent. Build. Protect.
                  </p>
                </div>
              </div>
            </div>
          </AboutSectionReveal>
        </div>
      </div>

      {/* ── 12. OUR APPROACH ── */}
      <div style={{ borderBottom: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-20">
          <AboutSectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-24 items-start">
              <div className="flex flex-col gap-4">
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.08em', color: '#fff' }}>Our Approach</p>
                <img src={worldChampionImg} alt="Our Approach" style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '2px' }} />
              </div>
              <div className="flex flex-col gap-6">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  At The Standard, we believe representation should be personal. Every athlete has a different story, different goals, and a different path to the next level. Our job is to understand that path, build the right relationships around it, and create opportunities that align with who the athlete is, not simply what they can do on the field.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#666', fontWeight: 300, lineHeight: 1.9 }}>
                  We don't believe in transactional relationships. We believe in genuine relationships that last beyond a contract, a season, or a roster spot. From coaches and front-office executives to brands, media, business leaders, and other athletes, we leverage the relationships we've built throughout the sports world to help our clients navigate the opportunities in front of them while positioning them for what comes next.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#aaa', fontWeight: 300, lineHeight: 1.75, fontStyle: 'italic', borderLeft: '2px solid #C4C0B8', paddingLeft: '20px' }}>
                  "Because when an athlete trusts you with their career, you owe them more than representation. You owe them a standard."
                </p>
              </div>
            </div>
          </AboutSectionReveal>
        </div>
      </div>

      {/* ── 1. HERO — text left, video right ── */}
      <div style={{ backgroundColor: '#0A0A0A', paddingTop: 'clamp(48px, 8vh, 80px)', paddingBottom: 'clamp(48px, 8vh, 80px)', borderBottom: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-14 items-center">

            {/* Left: text */}
            <div>
              <p style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '10px', fontWeight: 400, letterSpacing: '0.38em',
                color: '#C4C0B8', textTransform: 'uppercase', marginBottom: '20px',
                opacity: heroLoaded ? 1 : 0, transition: 'opacity 0.8s ease 200ms',
              }}>
                About The Standard
              </p>
              <h1 className="text-white" style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem, 5.5vw, 6.5rem)',
                letterSpacing: '0.06em', lineHeight: 0.92,
                opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateY(0)' : 'translateY(28px)',
                transition: 'opacity 0.9s ease 380ms, transform 0.9s ease 380ms',
              }}>
                Built by People Who<br />Understand the Game.
              </h1>
            </div>

            {/* Right: video — full view, no crop */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: '16/9',
                borderRadius: '3px',
                backgroundColor: '#0e0e10',
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateX(0)' : 'translateX(20px)',
                transition: 'opacity 0.9s ease 500ms, transform 0.9s ease 500ms',
              }}
            >
              <video
                ref={aboutVideoRef}
                src={aboutVideo}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'contain', objectPosition: 'center center' }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── 2. MISSION + VISION ── */}
      <div style={{ borderBottom: '1px solid #0e0e10' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28">
            {[
              { label: 'Mission', delay: 0, text: 'To protect, develop, and maximize the value of athletes by combining elite representation, legal excellence, and meaningful business guidance.' },
              { label: 'Vision', delay: 160, text: 'To become the premier athlete representation and sports business agency in the Southeast while setting the national standard for athlete advocacy, trust, transparency, and long-term wealth creation.' },
            ].map(({ label, delay, text }) => (
              <AboutSectionReveal key={label} delay={delay}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.32em', color: '#C4C0B8', textTransform: 'uppercase', marginBottom: '14px' }}>{label}</p>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#C4C0B8', opacity: 0.35, marginBottom: '22px' }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#777', fontWeight: 300, lineHeight: 1.9, fontStyle: 'italic' }}>"{text}"</p>
              </AboutSectionReveal>
            ))}
          </div>
        </div>
      </div>

      <Footer onUtility={() => {}} />
    </InnerShell>
  )
}

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────

function ContactPage({ onBack, onOpenNav }: { onBack: () => void; onOpenNav: () => void }) {
  const { ref, visible } = useScrollReveal(0.05)

  return (
    <InnerShell onBack={onBack} onOpenNav={onOpenNav}>
      <div className="pt-36 pb-24 max-w-7xl mx-auto px-10 md:px-20">
        <h1 className="text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(4rem, 7vw, 8rem)', letterSpacing: '0.06em', lineHeight: 0.9 }}>
          Contact.
        </h1>
        <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.78rem', color: '#C4C0B8', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 400, marginTop: '10px', marginBottom: '56px' }}>
          Book a Consultation
        </p>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <form
            onSubmit={e => e.preventDefault()}
            className="flex flex-col gap-8"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}
          >
            {[
              { label: 'Full Name', type: 'text', placeholder: 'Your name' },
              { label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
              { label: 'Phone Number', type: 'tel', placeholder: 'Your phone number' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.28em', color: '#383838', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full bg-transparent"
                  style={{ borderBottom: '1px solid #141417', paddingBottom: '10px', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#888', fontWeight: 300 }}
                />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.28em', color: '#383838', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Message</label>
              <textarea
                rows={4}
                className="w-full bg-transparent resize-none"
                style={{ borderBottom: '1px solid #141417', paddingBottom: '10px', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#888', fontWeight: 300 }}
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-8 py-[13px] transition-all duration-200"
                style={{ backgroundColor: '#C4C0B8', color: '#0A0A0A', fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#8C8884' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C4C0B8' }}
              >
                Submit
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-10" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease 180ms' }}>
            {[
              { label: 'Phone', value: 'Coming soon' },
              { label: 'Email', value: 'Coming soon' },
              { label: 'Office', value: 'Coming soon' },
              { label: 'Social Media', value: 'Coming soon' },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.28em', color: '#383838', textTransform: 'uppercase', marginBottom: '6px' }}>{item.label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#2a2a2d', fontWeight: 300 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer onUtility={() => {}} />
    </InnerShell>
  )
}

// ── ATHLETE APPLICATION ───────────────────────────────────────────────────────

const APP_STEPS = [
  {
    n: 1,
    label: 'Basic Information',
    fields: [
      { label: 'First Name', type: 'text', placeholder: 'First name' },
      { label: 'Last Name', type: 'text', placeholder: 'Last name' },
      { label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
      { label: 'Phone Number', type: 'tel', placeholder: 'Your phone number' },
      { label: 'Date of Birth', type: 'date', placeholder: '' },
    ],
  },
  {
    n: 2,
    label: 'Athletic Information',
    fields: [
      { label: 'School / University', type: 'text', placeholder: 'Current school' },
      { label: 'Height', type: 'text', placeholder: 'e.g. 6\'2"' },
      { label: 'Weight', type: 'text', placeholder: 'lbs' },
      { label: 'Position', type: 'text', placeholder: 'Your position' },
      { label: 'Years of Eligibility Remaining', type: 'number', placeholder: '0–5' },
      { label: 'Transfer Portal Status', type: 'text', placeholder: 'Entered / Not entered' },
    ],
  },
  {
    n: 3,
    label: 'Social Media',
    fields: [
      { label: 'Instagram Handle', type: 'text', placeholder: '@handle' },
      { label: 'TikTok Handle', type: 'text', placeholder: '@handle' },
      { label: 'X (Twitter) Handle', type: 'text', placeholder: '@handle' },
      { label: 'YouTube Channel', type: 'text', placeholder: 'Channel name or URL' },
    ],
  },
  {
    n: 4,
    label: 'Brand Questions',
    fields: [
      { label: 'Career Goals', type: 'textarea', placeholder: 'Where do you want to be in 5 years?' },
      { label: 'Community Service', type: 'textarea', placeholder: 'Describe your community involvement' },
      { label: 'Business Interests', type: 'textarea', placeholder: 'What business ventures interest you?' },
    ],
  },
  {
    n: 5,
    label: 'Uploads',
    fields: [
      { label: 'Hudl / Highlight Reel Link', type: 'url', placeholder: 'https://hudl.com/...' },
      { label: 'Additional Highlights URL', type: 'url', placeholder: 'YouTube, NCSA, etc.' },
      { label: 'Resume / Bio', type: 'file', placeholder: 'Upload PDF' },
      { label: 'Media Kit', type: 'file', placeholder: 'Upload PDF' },
    ],
  },
]

function AthleteApplication({ onBack, onOpenNav }: { onBack: () => void; onOpenNav: () => void }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const current = APP_STEPS[step]

  return (
    <InnerShell onBack={onBack} onOpenNav={onOpenNav}>
      <div className="min-h-screen flex flex-col pt-28 pb-20 max-w-3xl mx-auto px-10 md:px-20">
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3.5rem', color: '#C4C0B8', letterSpacing: '0.06em', lineHeight: 1 }}>
              Application Received.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#484848', fontWeight: 300, marginTop: '16px', lineHeight: 1.8 }}>
              The Standard team will review your application and reach out within 48 hours.
            </p>
            <button
              onClick={onBack}
              className="mt-10 transition-colors duration-150"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: '10px', letterSpacing: '0.22em', color: '#383838', textTransform: 'uppercase' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C4C0B8' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#383838' }}
            >
              ← Back to Home
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '0.06em', lineHeight: 0.93 }}>
                Athlete Application.
              </h1>
              <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.78rem', fontWeight: 400, color: '#C4C0B8', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '8px' }}>
                5-Step Process
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-14">
              <div className="flex items-center gap-0 mb-4">
                {APP_STEPS.map((s, i) => (
                  <div key={s.n} className="flex items-center flex-1">
                    <div
                      className="flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: i < step ? '#C4C0B8' : i === step ? '#C4C0B8' : '#0e0e10',
                        border: i > step ? '1px solid #1e1e21' : 'none',
                      }}
                    >
                      {i < step ? (
                        <span style={{ fontSize: '10px', color: '#0A0A0A' }}>✓</span>
                      ) : (
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', color: i === step ? '#0A0A0A' : '#2a2a2d', letterSpacing: '0.06em' }}>
                          {s.n}
                        </span>
                      )}
                    </div>
                    {i < APP_STEPS.length - 1 && (
                      <div style={{ flex: 1, height: '1px', backgroundColor: i < step ? '#C4C0B8' : '#111114', transition: 'background-color 0.4s ease' }} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {APP_STEPS.map((s, i) => (
                  <span
                    key={s.n}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '8.5px',
                      letterSpacing: '0.12em',
                      color: i === step ? '#888' : '#252528',
                      textTransform: 'uppercase',
                      width: `${100 / APP_STEPS.length}%`,
                      textAlign: i === 0 ? 'left' : i === APP_STEPS.length - 1 ? 'right' : 'center',
                    }}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1">
              <div className="mb-10">
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '6rem', color: '#0e0e10', letterSpacing: '0.06em', lineHeight: 1, display: 'block', marginBottom: '-10px' }}>
                  0{current.n}
                </span>
                <h2 className="text-white" style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {current.label}
                </h2>
              </div>

              <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-8">
                {current.fields.map(f => (
                  <div key={f.label}>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', letterSpacing: '0.28em', color: '#383838', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                      {f.label}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        placeholder={f.placeholder}
                        className="w-full bg-transparent resize-none"
                        style={{ borderBottom: '1px solid #141417', paddingBottom: '10px', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#888', fontWeight: 300 }}
                      />
                    ) : f.type === 'file' ? (
                      <div style={{ borderBottom: '1px solid #141417', paddingBottom: '10px' }}>
                        <label className="cursor-pointer">
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#2a2a2d', fontWeight: 300 }}>Choose file →</span>
                          <input type="file" className="hidden" />
                        </label>
                      </div>
                    ) : (
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full bg-transparent"
                        style={{ borderBottom: '1px solid #141417', paddingBottom: '10px', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#888', fontWeight: 300 }}
                      />
                    )}
                  </div>
                ))}
              </form>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-14 pt-8" style={{ borderTop: '1px solid #0e0e10' }}>
              <button
                onClick={() => step > 0 ? setStep(s => s - 1) : onBack()}
                className="transition-colors duration-150"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: '10px', letterSpacing: '0.22em', color: '#333', textTransform: 'uppercase' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#888' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#333' }}
              >
                ← {step === 0 ? 'Back' : 'Previous'}
              </button>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.15em', color: '#252528' }}>
                Step {step + 1} of {APP_STEPS.length}
              </div>
              {step < APP_STEPS.length - 1 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="px-6 py-3 transition-all duration-200"
                  style={{ backgroundColor: '#C4C0B8', color: '#0A0A0A', fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#8C8884' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C4C0B8' }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  className="px-6 py-3 transition-all duration-200"
                  style={{ backgroundColor: '#C4C0B8', color: '#0A0A0A', fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#8C8884' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C4C0B8' }}
                >
                  Submit Application
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </InnerShell>
  )
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<AppPage>({ type: 'home' })
  const [navOpen, setNavOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const handleSplashDone = () => setShowSplash(false)

  const goHome = () => setPage({ type: 'home' })

  const handleNavigate = (l1: string, l2: string, l3: string) => {
    setPage({ type: 'pillar', pillar: l1, l2, l3 })
    setNavOpen(false)
  }

  const handleUtility = (name: string) => {
    if (name === 'Home') setPage({ type: 'home' })
    else if (name === 'About') setPage({ type: 'about' })
    else if (name === 'Contact') setPage({ type: 'contact' })
    else if (name === 'Athlete Application') setPage({ type: 'apply' })
    else if (name === 'REPRESENT') setPage({ type: 'pillar', pillar: 'REPRESENT', l2: null, l3: null })
    else if (name === 'BUILD') setPage({ type: 'pillar', pillar: 'BUILD', l2: null, l3: null })
    else if (name === 'PROTECT') setPage({ type: 'pillar', pillar: 'PROTECT', l2: null, l3: null })
  }

  const handleCTA = (action: string) => {
    if (action === 'apply') setPage({ type: 'apply' })
    else if (action === 'contact' || action === 'consult' || action === 'partner') setPage({ type: 'contact' })
  }

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [page])

  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', position: 'relative' }}>
      {showSplash && <SplashVideo onDone={handleSplashDone} />}
      <NavOverlay
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        onNavigate={handleNavigate}
        onUtility={name => { setNavOpen(false); handleUtility(name) }}
      />

      {page.type === 'home' && (
        <div style={{ backgroundColor: '#0A0A0A' }}>
          {/* ── Landing: full-screen nav with cinematic video bg ── */}
          <div
            className="relative flex flex-col overflow-hidden"
            style={{ minHeight: '100vh', padding: '0 24px 0 24px' }}
          >
            {/* Cinematic video background */}
            <AutoPlayVideo
              src={cinematicVideo}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.88, filter: 'brightness(1.65) contrast(1.12) saturate(1.18)' }}
            />
            {/* Light vignette — preserves text legibility without killing the image */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.62) 25%, rgba(10,10,10,0.18) 70%, rgba(10,10,10,0.22) 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.45) 0%, transparent 45%)' }} />

            <div className="absolute top-7 left-6 md:left-10 z-10">
              <Logo onClick={goHome} />
            </div>

            <div className="flex-1 flex items-start md:items-center pt-20 md:pt-16 pb-6 relative z-10" style={{ width: '100%' }}>
              <div style={{ width: '100%' }}>
                <CascadingNav onNavigate={handleNavigate} onUtility={handleUtility} />
              </div>
            </div>

            {/* Subtle scroll cue */}
            <div
              className="absolute bottom-8 right-10 flex flex-col items-center gap-2 z-10"
              style={{ opacity: 0.22 }}
            >
              <div style={{ width: '1px', height: '40px', backgroundColor: '#ffffff' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', letterSpacing: '0.32em', color: '#fff', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>
                Scroll
              </span>
            </div>
          </div>

          {/* ── Homepage content sections ── */}
          <AnimatedStats />
          <HomepageHero onCTA={handleCTA} />
          <WhyTheStandard />
          <StandardDifference />
          <PhotoBreak />
          <OurServices />
          <ConnLawFirm />
          <PodcastSection />
          <CTASection onCTA={handleCTA} />
          <Footer onUtility={handleUtility} />
        </div>
      )}

      {page.type === 'pillar' && (
        <PillarPage
          key={`${page.pillar}-${page.l2}-${page.l3}`}
          pillar={page.pillar}
          l2={page.l2}
          l3={page.l3}
          onBack={goHome}
          onOpenNav={() => setNavOpen(true)}
        />
      )}

      {page.type === 'about' && (
        <AboutPage key="about" onBack={goHome} onOpenNav={() => setNavOpen(true)} />
      )}

      {page.type === 'contact' && (
        <ContactPage key="contact" onBack={goHome} onOpenNav={() => setNavOpen(true)} />
      )}

      {page.type === 'apply' && (
        <AthleteApplication key="apply" onBack={goHome} onOpenNav={() => setNavOpen(true)} />
      )}
    </div>
  )
}

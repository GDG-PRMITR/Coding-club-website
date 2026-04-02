'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Check, Copy, ExternalLink, Maximize, ZoomIn, ZoomOut } from 'lucide-react'
import { getOutboundPath } from '@/lib/outbound-links'

type Sc2026HelpPageProps = {
  fontClassName: string
}

type CountdownState = {
  days: string
  hours: string
  minutes: string
  seconds: string
  showDays: boolean
  showSeconds: boolean
  closed: boolean
}

const referralCode = 'XR3UEP'

const navItems = [
  { id: 'step-1', label: 'H2S Account' },
  { id: 'step-2', label: 'GDP Public Profile' },
  { id: 'step-3', label: 'Referral Code' },
  { id: 'step-4', label: 'Registration' },
]

const showcaseSteps = [
  {
    title: '1. Create Team',
    description:
      "Go to the 'Team Management' tab on your dashboard and click on the 'Create a Team' button.",
    image: '/assets/screenshots/ss-create-team.png',
    alt: 'Create team screenshot',
  },
  {
    title: '2. Add Team Details',
    description:
      "Fill in your unique team name, add a description, and upload your team's logo in the popup.",
    image: '/assets/screenshots/ss-add-team-details.png',
    alt: 'Add team details screenshot',
  },
  {
    title: '3. Invite Members',
    description:
      "Click 'Copy Link' under the Invite Member card to get your unique team invitation URL.",
    image: '/assets/screenshots/ss-invite-members.png',
    alt: 'Invite members screenshot',
  },
  {
    title: '4. Join via Link',
    description:
      "Teammates should paste the copied link in their browser and click 'Join Team' to send a request.",
    image: '/assets/screenshots/ss-join-via-link.png',
    alt: 'Join via link screenshot',
    memberHighlight: 'Performed by the Team Member, not the leader.',
  },
  {
    title: '5. Manage Requests',
    description:
      "View incoming requests in the 'Requests Received' list and click 'Accept' to finalize your squad.",
    image: '/assets/screenshots/ss-manage-requests.png',
    alt: 'Manage requests screenshot',
  },
]

function getCountdownState(): CountdownState {
  const countdownTarget = new Date('2026-04-15T21:02:00+05:30').getTime()
  const distance = countdownTarget - Date.now()

  if (distance <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      showDays: false,
      showSeconds: false,
      closed: true,
    }
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    showDays: days > 0,
    showSeconds: days === 0,
    closed: false,
  }
}

export function Sc2026HelpPage({ fontClassName }: Sc2026HelpPageProps) {
  const [activeNav, setActiveNav] = useState('step-1')
  const [activeShowcase, setActiveShowcase] = useState(0)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<CountdownState>(getCountdownState)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [zoom, setZoom] = useState(1)
  const [hasMounted, setHasMounted] = useState(false)
  const manualNavClickRef = useRef(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.step-plain'))
    if (!sections.length) return

    let timeoutId: number | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        if (manualNavClickRef.current) return

        if (timeoutId) {
          window.clearTimeout(timeoutId)
        }

        timeoutId = window.setTimeout(() => {
          const visibleSections = entries.filter((entry) => entry.isIntersecting)
          if (!visibleSections.length) return

          const bestMatch = [...visibleSections].sort((a, b) => {
            const aDistance = Math.abs(a.boundingClientRect.top - 100)
            const bDistance = Math.abs(b.boundingClientRect.top - 100)
            return aDistance - bDistance
          })[0]

          if (bestMatch?.target?.id) {
            setActiveNav(bestMatch.target.id)
          }
        }, 100)
      },
      {
        threshold: [0, 0.1, 0.2, 0.5, 1],
        rootMargin: '-100px 0px -70% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownState())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!lightbox) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(null)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [lightbox])

  const handleSectionNav = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    manualNavClickRef.current = true
    setActiveNav(sectionId)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })

    window.setTimeout(() => {
      manualNavClickRef.current = false
    }, 800)
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const tempInput = document.createElement('input')
        tempInput.value = text
        document.body.appendChild(tempInput)
        tempInput.select()
        document.execCommand('copy')
        document.body.removeChild(tempInput)
      }

      setCopiedKey(key)
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current))
      }, 2000)
    } catch (error) {
      console.error('Unable to copy text', error)
    }
  }

  const lightboxImage = (src: string, alt: string) => {
    setZoom(1)
    setLightbox({ src, alt })
  }

  const countdownContent = useMemo(() => {
    if (countdown.closed) {
      return <span className="deadline-closed">Registration Closed</span>
    }

    return (
      <div className="timer-display" id="reg-countdown">
        {countdown.showDays && (
          <>
            <div className="timer-segment">
              <span className="segment-value">{countdown.days}</span>
              <span className="segment-label">Days</span>
            </div>
            <span className="timer-divider">:</span>
          </>
        )}
        <div className="timer-segment">
          <span className="segment-value">{countdown.hours}</span>
          <span className="segment-label">Hrs</span>
        </div>
        <span className="timer-divider">:</span>
        <div className="timer-segment">
          <span className="segment-value">{countdown.minutes}</span>
          <span className="segment-label">Min</span>
        </div>
        {countdown.showSeconds && (
          <>
            <span className="timer-divider">:</span>
            <div className="timer-segment">
              <span className="segment-value">{countdown.seconds}</span>
              <span className="segment-label">Sec</span>
            </div>
          </>
        )}
      </div>
    )
  }, [countdown])

  return (
    <main className={`sc2026-page ${fontClassName}`}>
      <nav className="top-logo-bar theme-dark">
        <Image src="/assets/logos/gdg-on-campus-dark.png" alt="GDG On Campus PRMIT&R" className="top-bar-logo" width={1718} height={220} style={{ height: "32px", width: "auto" }} priority />
        <Image src="/assets/logos/h2s-dark.png" alt="Hack2Skill" className="top-bar-logo" width={1355} height={510} style={{ height: "32px", width: "auto" }} priority />
      </nav>

      <header className="hero">
        <div className="video-container">
          {hasMounted && (
            <>
              <video autoPlay muted loop playsInline className="hero-video-full web-video" suppressHydrationWarning>
                <source src="/assets/videos/heroweb.mp4.mp4" type="video/mp4" />
              </video>
              <video autoPlay muted loop playsInline className="hero-video-full mobile-video" suppressHydrationWarning>
                <source src="/assets/videos/heromobile.mp4.mp4" type="video/mp4" />
              </video>
            </>
          )}
        </div>
      </header>

      <div className="hero-cta-floating">
        <div className="secondary-info-card">
          <div className="info-icon-circle">?</div>
          <div className="info-content">
            <p className="info-text">
              This is a step-by-step guide to help you through the Solution Challenge registration. Find the official
              campaign link in <strong>Step 4</strong> below.
            </p>
          </div>
        </div>

        <div className="registration-deadline-card">
          <p className="deadline-label">Registration Ends on</p>
          <p className="deadline-time-text">Wed, Apr 15, 2026 9:02 PM (IST)</p>
          {countdownContent}
        </div>

        <button
          type="button"
          className={`referral-card-dark${copiedKey === 'hero-referral' ? ' is-copied' : ''}`}
          onClick={() => copyToClipboard(referralCode, 'hero-referral')}
        >
          <div className="card-accents">
            <span className="accent-dot blue" />
            <span className="accent-dot red" />
            <span className="accent-dot yellow" />
            <span className="accent-dot green" />
          </div>
          <p className="card-label">Your referral code</p>
          <div className="card-code">{copiedKey === 'hero-referral' ? 'Copied!' : referralCode}</div>
          <p className="card-hint">tap to copy</p>
        </button>
      </div>

      <section id="onboarding" className="onboarding">
        <div className="onboarding-grid">
          <div className="overview-left">
            <h2 className="overview-title">10 minutes setup only.</h2>
          </div>
          <div className="overview-right">
            <p>
              Registering for the <span className="highlight-blue">Solution Challenge 2026</span> requires a few
              essential pre-requisites.
            </p>
            <p>
              To make your journey smoother,{' '}
              <a
                href={getOutboundPath('gdg-community')}
                className="link-red-underline"
              >
                GDG On Campus PRMIT&R
              </a>{' '}
              has designed this guide to walk you through the setup process step-by-step.
            </p>
            <p>Follow the instructions below.</p>
          </div>

          <div className="onboarding-flex-nav">
            <nav className="steps-nav-vertical" id="stepsNav" aria-label="Onboarding steps">
              <div className="steps-nav">
                {navItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`step-nav-item${activeNav === item.id ? ' active' : ''}`}
                    onClick={(event) => {
                      event.preventDefault()
                      handleSectionNav(item.id)
                    }}
                  >
                    <span className="nav-step-num">{index + 1}. </span>
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="nav-extra-logo">
                <Image src="/assets/logos/build-with-ai.png" alt="Build with AI" className="side-nav-logo" width={1096} height={388} style={{ width: "140px", height: "auto" }} priority />
              </div>
            </nav>
          </div>

          <div className="steps-cards-container">
            <div id="step-1" className="step-plain">
              <h3 className="step-plain-title">H2S Account</h3>
              <p className="step-plain-text">
                To participate in the Solution Challenge 2026, sign up or log in to the <strong>Hack2Skill</strong>{' '}
                platform. Use the button below to access your account.
              </p>
              <a href={getOutboundPath('hack2skill-login')} className="btn-h2s-gradient">
                Hack2Skill Account
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </a>
            </div>

            <div id="step-2" className="step-plain">
              <h3 className="step-plain-title">GDP Public Profile</h3>
              <ol className="step-list">
                <li>
                  <div className="flex-step-content">
                    <span className="flex-text-side" style={{ fontSize: '1.15em' }}>
                      Sign in or create your Google Developer Account
                    </span>
                    <div className="flex-img-side">
                      <a href={getOutboundPath('gdp-program')} className="btn-compact-blue">
                        GDP Account
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex-step-content">
                    <span className="flex-text-side">
                      Navigate to <strong>My Profile</strong> tab, or click the following link button.
                    </span>
                    <div className="flex-img-side">
                      <a href={getOutboundPath('gdp-profile')} className="btn-compact-blue">
                        My Profile
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex-step-content">
                    <div className="flex-text-side">
                      <span>
                        Click on <strong>Set a custom web address</strong> as shown in the screenshot.
                      </span>
                      <p className="step-plain-text subtle-note">
                        (You&apos;ll be redirected to the Accounts tab in GDP Profile Settings.)
                      </p>
                    </div>
                    <div className="flex-img-side">
                      <Image
                        src="/assets/screenshots/ss-set-address-button.png"
                        className="step-img-placeholder"
                        alt="Set custom web address screenshot"
                        width={1280}
                        height={720}
                        sizes="(max-width: 992px) 100vw, 40vw"
                        onClick={() => lightboxImage('/assets/screenshots/ss-set-address-button.png', 'Set custom web address screenshot')}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex-step-content">
                    <div className="flex-text-side">
                      <span>
                        Under <strong>Accounts</strong> tab:
                      </span>
                      <ul className="sub-step-list">
                        <li>
                          Change profile privacy settings to <strong>Public</strong>
                        </li>
                        <li>Enter a custom web address.</li>
                      </ul>
                    </div>
                    <div className="flex-img-side">
                      <Image
                        src="/assets/screenshots/ss-gdp-profile-settings.png"
                        className="step-img-placeholder"
                        alt="Accounts settings screenshot"
                        width={1280}
                        height={720}
                        sizes="(max-width: 992px) 100vw, 40vw"
                        onClick={() => lightboxImage('/assets/screenshots/ss-gdp-profile-settings.png', 'Accounts settings screenshot')}
                      />
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <div id="step-3" className="step-plain">
              <h3 className="step-plain-title">Referral Code</h3>
              <div className="flex-step-content">
                <div className="flex-text-side">
                  <p className="step-plain-text">
                    Use this referral code during registration so our team can provide <strong>direct support and
                      guidance</strong> throughout your journey.
                  </p>
                  <p className="step-plain-text">
                    <span className="red-hint">Use it on the next step.</span>
                  </p>
                </div>
                <div className="flex-img-side">
                  <button
                    type="button"
                    className={`referral-card-light${copiedKey === 'light-referral' ? ' is-copied' : ''}`}
                    onClick={() => copyToClipboard(referralCode, 'light-referral')}
                  >
                    <div className="card-accents">
                      <span className="accent-dot blue" />
                      <span className="accent-dot red" />
                      <span className="accent-dot yellow" />
                      <span className="accent-dot green" />
                    </div>
                    <p className="card-label">PRMIT&R Code</p>
                    <div className="card-code">{copiedKey === 'light-referral' ? 'Copied!' : referralCode}</div>
                    <p className="card-hint">tap to copy code</p>
                  </button>
                </div>
              </div>
            </div>

            <div id="step-4" className="step-plain">
              <h3 className="step-plain-title">Actual Registration Process</h3>
              <ol className="step-list-blue">
                <li>
                  <div className="flex-step-content">
                    <div className="flex-text-side">
                      <span>
                        Visit the official <strong>Solution Challenge</strong> page to begin the registration process.
                      </span>
                    </div>
                    <div className="flex-img-side">
                      <a
                        href={getOutboundPath('solution-challenge')}
                        className="btn-yellow-solid"
                      >
                        Solution Challenge 2026
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex-step-content">
                    <div className="flex-text-side">
                      <span>
                        Click on <strong>Register Now</strong> on the top right or center of the page.
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex-step-content">
                    <div className="flex-text-side">
                      <span>
                        Fill in your <strong>personal and academic details</strong>:
                      </span>
                      <div className="details-list">
                        <details className="details-item">
                          <summary className="details-summary">Personal Info</summary>
                          <div className="details-content">
                            <ul className="details-sub-list">
                              <li>Full Name</li>
                              <li>Email Address</li>
                              <li>WhatsApp Number</li>
                              <li>Alternate Number</li>
                              <li>Date of Birth</li>
                              <li>Gender</li>
                            </ul>
                          </div>
                        </details>
                        <details className="details-item">
                          <summary className="details-summary">Location</summary>
                          <div className="details-content">
                            <ul className="details-sub-list">
                              <li>Country</li>
                              <li>State</li>
                              <li>City</li>
                            </ul>
                          </div>
                        </details>
                        <details className="details-item">
                          <summary className="details-summary">Academic</summary>
                          <div className="details-content">
                            <ul className="details-sub-list">
                              <li>Occupation (College Student)</li>
                              <li>College Name</li>
                              <li>Degree</li>
                              <li>Stream / Specialization</li>
                              <li>Passout Year</li>
                            </ul>
                          </div>
                        </details>
                        <details className="details-item">
                          <summary className="details-summary">Profiles &amp; Verification</summary>
                          <div className="details-content">
                            <ul className="details-sub-list">
                              <li>LinkedIn Profile URL</li>
                              <li>College ID Card (Image/PDF)</li>
                            </ul>
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex-step-content">
                    <div className="flex-text-side">
                      <span>
                        Paste the <strong>GDP custom web address</strong> (for example, g.dev/yourname) that you created
                        earlier.
                      </span>
                      <div className="action-stack">
                        <a href={getOutboundPath('gdp-profile-me')} className="btn-compact-blue">
                          GDP Profile
                          <ArrowUpRight size={14} strokeWidth={2.5} />
                        </a>
                      </div>
                    </div>
                    <div className="flex-img-side">
                      <Image
                        src="/assets/screenshots/ss-registration-gdp-url.png"
                        className="step-img-placeholder"
                        alt="GDP URL registration screenshot"
                        width={1280}
                        height={720}
                        sizes="(max-width: 992px) 100vw, 40vw"
                        onClick={() => lightboxImage('/assets/screenshots/ss-registration-gdp-url.png', 'GDP URL registration screenshot')}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex-step-content">
                    <div className="flex-text-side">
                      <span>Under the referral section:</span>
                      <ul className="sub-step-list">
                        <li>
                          Mark <strong>Were you referred to this hackathon by a GDG on Campus Organizer?</strong> as{' '}
                          <strong>Yes</strong>.
                        </li>
                        <li>Paste the referral code.</li>
                      </ul>
                      <div className="action-stack">
                        <button
                          type="button"
                          className={`referral-card-horizontal${copiedKey === 'horizontal-referral' ? ' is-copied' : ''}`}
                          onClick={() => copyToClipboard(referralCode, 'horizontal-referral')}
                        >
                          <div className="card-accents">
                            <span className="accent-dot blue" />
                            <span className="accent-dot red" />
                            <span className="accent-dot yellow" />
                            <span className="accent-dot green" />
                          </div>
                          <p className="card-label">Referral Code</p>
                          <div className="card-code">{referralCode}</div>
                          <p className="card-hint">
                            {copiedKey === 'horizontal-referral' ? 'copied' : 'tap to copy'}
                          </p>
                        </button>
                      </div>
                    </div>
                    <div className="flex-img-side">
                      <Image
                        src="/assets/screenshots/ss-registration-referral.png"
                        className="step-img-placeholder"
                        alt="Referral registration screenshot"
                        width={1280}
                        height={720}
                        sizes="(max-width: 992px) 100vw, 40vw"
                        onClick={() => lightboxImage('/assets/screenshots/ss-registration-referral.png', 'Referral registration screenshot')}
                      />
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="team-formation" className="team-formation-section">
        <div className="team-grid">
          <div className="overview-left">
            <h2 className="overview-title">Team Formation</h2>
          </div>
          <div className="overview-right ">
            <p>As you are now registered, you are required to form a team.</p>
            <p>
              You may have a team of <span className="highlight-blue">1 to 4 participants</span>, but need a team
              created even for a single participant too.
            </p>
            <a
              href={getOutboundPath('h2s-dashboard')}
              className="btn-h2s-gradient" style={{ marginTop: 0, marginBottom: 24 }}
            >
              Open Dashboard
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
            <p>Follow the steps below to manage your squad.</p>
          </div>

          <div className="showcase-left">
            {showcaseSteps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                className={`showcase-step${activeShowcase === index ? ' active' : ''}${index === 3 ? ' showcase-member-step' : ''}`}
                onClick={() => setActiveShowcase(index)}
              >
                <h4>{step.title}</h4>
                <p className="step-desc">
                  {step.description}
                  {step.memberHighlight ? <span className="member-highlight">{step.memberHighlight}</span> : null}
                </p>
              </button>
            ))}
          </div>

          <div className="showcase-right">
            {showcaseSteps.map((step, index) => (
              <Image
                key={step.image}
                src={step.image}
                fill
                sizes="(max-width: 992px) 100vw, 45vw"
                className={`showcase-img${activeShowcase === index ? ' active' : ''}`}
                alt={step.alt}
                onClick={() => activeShowcase === index && lightboxImage(step.image, step.alt)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="good-luck-section">
        <div className="good-luck-row">
          <Image src="/assets/images/good-luck-1.svg" alt="Luck 1" width={48} height={48} />
          <Image src="/assets/images/good-luck-2.svg" alt="Luck 2" width={48} height={48} />
          <Image src="/assets/images/good-luck-3.svg" alt="Luck 3" width={48} height={48} />
          <h2 className="good-luck-text">Good Luck!</h2>
          <Image src="/assets/images/good-luck-4.svg" alt="Luck 4" width={48} height={48} />
          <Image src="/assets/images/good-luck-5.svg" alt="Luck 5" width={48} height={48} />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-logos">
              <Image src="/assets/logos/gdg-on-campus-dark.png" alt="GDG On Campus PRMIT&R" className="footer-logo" width={1718} height={220} style={{ height: "36px", width: "auto" }} />
              <Image src="/assets/logos/h2s-dark.png" alt="Hack2Skill" className="footer-logo" width={1355} height={510} style={{ height: "36px", width: "auto" }} />
            </div>
            <p className="footer-text">
              This is a community onboarding page created by <strong>GDG On Campus PRMIT&R</strong> to help students
              register for Solution Challenge 2026. We are not the official organizers but community advocates.
            </p>
          </div>

          <div className="footer-right">
            <h3 className="contact-title">Contact Us</h3>
            <div className="contact-methods">
              <div className="contact-card">
                <p className="contact-label">Kartik Akhade</p>
                <button
                  type="button"
                  className={`copy-pill${copiedKey === 'kartik-email' ? ' is-copied' : ''}`}
                  onClick={() => copyToClipboard('kartikakhade12@gmail.com', 'kartik-email')}
                >
                  <span className="copy-text">kartikakhade12@gmail.com</span>
                  <span className="icon-wrapper">
                    <Copy className="copy-icon" size={18} />
                    <Check className="check-icon" size={18} />
                  </span>
                </button>
                <a
                  href={getOutboundPath('kartik-gmail')}
                  className="contact-action-btn red"
                  style={{ marginBottom: '8px' }}
                >
                  Open in Gmail
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </a>

                <button
                  type="button"
                  className={`copy-pill${copiedKey === 'kartik-whatsapp' ? ' is-copied' : ''}`}
                  onClick={() => copyToClipboard('+919284173690', 'kartik-whatsapp')}
                >
                  <span className="copy-text">+91 9284173690</span>
                  <span className="icon-wrapper">
                    <Copy className="copy-icon" size={18} />
                    <Check className="check-icon" size={18} />
                  </span>
                </button>
                <a
                  href={getOutboundPath('kartik-whatsapp')}
                  className="contact-action-btn green"
                >
                  Chat on WhatsApp
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </a>
              </div>

              <div className="contact-card">
                <p className="contact-label">Sampada Deshmukh</p>
                <button
                  type="button"
                  className={`copy-pill${copiedKey === 'sampada-email' ? ' is-copied' : ''}`}
                  onClick={() => copyToClipboard('sdeshmukh0903@gmail.com', 'sampada-email')}
                >
                  <span className="copy-text">sdeshmukh0903@gmail.com</span>
                  <span className="icon-wrapper">
                    <Copy className="copy-icon" size={18} />
                    <Check className="check-icon" size={18} />
                  </span>
                </button>
                <a
                  href={getOutboundPath('sampada-gmail')}
                  className="contact-action-btn red"
                  style={{ marginBottom: '8px' }}
                >
                  Open in Gmail
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </a>

                <button
                  type="button"
                  className={`copy-pill${copiedKey === 'sampada-whatsapp' ? ' is-copied' : ''}`}
                  onClick={() => copyToClipboard('+918668773592', 'sampada-whatsapp')}
                >
                  <span className="copy-text">+91 8668773592</span>
                  <span className="icon-wrapper">
                    <Copy className="copy-icon" size={18} />
                    <Check className="check-icon" size={18} />
                  </span>
                </button>
                <a
                  href={getOutboundPath('sampada-whatsapp')}
                  className="contact-action-btn green"
                >
                  Chat on WhatsApp
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>

          <p className="footer-credits">
            Site Created by: <br /> <strong>Vedant Mali, Sneha Giri, Kartik Shriwas, Lavannya Deshpande &amp; Google Antigravity</strong>
          </p>
        </div>
      </footer>

      {lightbox ? (
        <div className="image-modal active" onClick={() => setLightbox(null)} role="presentation">
          <div className="modal-controls" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="control-btn"
              onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
              title="Zoom In"
            >
              <ZoomIn size={20} />
            </button>
            <button
              type="button"
              className="control-btn"
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
              title="Zoom Out"
            >
              <ZoomOut size={20} />
            </button>
            <button type="button" className="control-btn" onClick={() => setZoom(1)} title="Zoom Reset">
              <Maximize size={20} />
            </button>
            <div className="control-divider" />
            <a href={lightbox.src} target="_blank" rel="noreferrer" className="control-btn" title="Open in New Tab">
              <ExternalLink size={20} />
            </a>
            <button
              type="button"
              className="control-btn close"
              onClick={() => setLightbox(null)}
              title="Close"
            >
              <span style={{ fontSize: '24px', lineHeight: 1 }}>×</span>
            </button>
          </div>
          <div className="modal-image-container">
            <Image
              className="modal-content"
              src={lightbox.src}
              alt={lightbox.alt}
              width={1600}
              height={900}
              sizes="100vw"
              style={{ transform: `scale(${zoom})` }}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      ) : null}
    </main>
  )
}

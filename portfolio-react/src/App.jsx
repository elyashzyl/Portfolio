import { useState, useEffect, useRef, useCallback } from 'react'
import Splash from './components/Splash'
import Panel from './components/Panel'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ApproachSection from './components/ApproachSection'
import DevSection from './components/DevSection'
import PhotoSection from './components/PhotoSection'
import DesignSection from './components/DesignSection'
import PrinciplesSection from './components/PrinciplesSection'
import ContactSection from './components/ContactSection'
import './App.css'

const sections = [
  { id: 'hero', label: 'Hello' },
  { id: 'about', label: 'About' },
  { id: 'approach', label: 'Approach' },
  { id: 'dev', label: 'Dev' },
  { id: 'photo', label: 'Photo' },
  { id: 'design', label: 'Design' },
  { id: 'principles', label: 'Principles' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState(0)
  const [splashDone, setSplashDone] = useState(false)
  const [time, setTime] = useState('00:00:00')
  const cursorRing = useRef(null)

  const updateTime = useCallback(() => {
    const now = new Date()
    setTime(
      `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    )
  }, [])

  useEffect(() => {
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [updateTime])

  useEffect(() => {
    if (!entered) return
    const ring = cursorRing.current
    if (!ring) return

    const onMove = (e) => {
      ring.style.left = e.clientX + 'px'
      ring.style.top = e.clientY + 'px'
    }

    const addHover = () => ring.classList.add('hovering')
    const removeHover = () => ring.classList.remove('hovering')

    document.addEventListener('mousemove', onMove)
    const targets = document.querySelectorAll('a, button, .disc-card, .skill-row, .photo-cell, .design-cell, .principle-card, .about__card, .contact__link')
    targets.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      targets.forEach(el => { el.removeEventListener('mouseenter', addHover); el.removeEventListener('mouseleave', removeHover) })
    }
  }, [entered])

  useEffect(() => {
    const ring = cursorRing.current
    if (!ring) return
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = '' }
  }, [])

  useEffect(() => {
    if (!entered) return
    const panels = document.querySelectorAll('.panel')
    const onScroll = () => {
      let best = 0, bestRatio = 0
      panels.forEach((p, i) => {
        const rect = p.getBoundingClientRect()
        const vis = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))
        const ratio = vis / rect.height
        if (ratio > bestRatio) { bestRatio = ratio; best = i }
      })
      setActive(best)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [entered])

  useEffect(() => {
    if (!entered) return
    const t = setTimeout(() => setSplashDone(true), 1400)
    return () => clearTimeout(t)
  }, [entered])

  const handleEnter = () => setEntered(true)
  const scrollTo = (idx) => {
    document.querySelectorAll('.panel')[idx]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="cursor" ref={cursorRing} />

      {!entered && <Splash onEnter={handleEnter} time={time} />}

      {entered && (
        <>
          <div className="bg-grid" />
          <div className="deco deco--circle" />
          <div className="deco deco--square" />
          <div className="deco deco--ring" />

          <div className="progress">
            <div className="progress__bar" style={{ width: `${((active + 1) / sections.length) * 100}%` }} />
          </div>

          <div className="site open">
            <div className="site__chrome">
              <span className="site__brand">Ely<span className="splash__brand-dot">.</span></span>
              <span className="site__chrome-meta">{time} EST</span>
            </div>

            <div className="nav-dots">
              {sections.map((s, i) => (
                <button key={s.id} className={`nav-dot ${i === active ? 'active' : ''}`} onClick={() => scrollTo(i)} aria-label={s.label} />
              ))}
            </div>

            <Panel id="hero" number="01" category="Hello" bg="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80">
              <HeroSection />
            </Panel>
            <Panel id="about" number="02" category="About Me" bg="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80">
              <AboutSection />
            </Panel>
            <Panel id="approach" number="03" category="Approach">
              <ApproachSection />
            </Panel>
            <Panel id="dev" number="04" category="Web Development" bg="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80">
              <DevSection />
            </Panel>
            <Panel id="photo" number="05" category="Photography" bg="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80">
              <PhotoSection />
            </Panel>
            <Panel id="design" number="06" category="Graphic Design" bg="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80">
              <DesignSection />
            </Panel>
            <Panel id="principles" number="07" category="Principles">
              <PrinciplesSection />
            </Panel>
            <Panel id="contact" number="08" category="Let's Talk">
              <ContactSection time={time} />
            </Panel>
          </div>
        </>
      )}

      {!splashDone && (
        <div className={`lens-loader ${entered ? 'open' : ''}`}>
          <div className="lens__matte lens__matte--top" />
          <div className="lens__matte lens__matte--bottom" />
        </div>
      )}
    </>
  )
}

export default App

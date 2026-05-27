import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const iconSvgs = {
  dev: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  photo: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  design: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

const disciplines = [
  {
    icon: iconSvgs.dev, title: 'Web Developer',
    desc: 'Building robust, scalable applications with modern frameworks and clean architecture.',
    tags: ['React', 'Vue', 'Node.js', 'Laravel', 'MySQL']
  },
  {
    icon: iconSvgs.photo, title: 'Photographer',
    desc: 'Capturing stories through the lens — portraits, landscapes, and visual storytelling.',
    tags: ['Portrait', 'Landscape', 'Street', 'Event', 'Editorial']
  },
  {
    icon: iconSvgs.design, title: 'Graphic Designer',
    desc: 'Crafting brand identities, visual assets, and design systems that communicate clearly.',
    tags: ['Branding', 'UI/UX', 'Print', 'Typography', 'Illustration']
  }
]

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

function HeroSection() {
  const [localTime, setLocalTime] = useState(() =>
    new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: true })
  )

  useEffect(() => {
    const id = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: true }))
    }, 60000)
    return () => clearInterval(id)
  }, [])

  const meta = [
    { label: 'Based', value: 'Philippines' },
    { label: 'Local', value: localTime },
    { label: 'Status', value: 'Open to work' },
    { label: 'Email', value: 'ely.ashzyl@gmail.com' },
  ]

  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="hero">
        <div className="hero__text">
          <motion.p variants={fadeUp} className="hero__eyebrow">
            <span className="hero__eyebrow-dash">—</span> Designer &amp; Developer
          </motion.p>

          <motion.h2 variants={fadeUp} className="hero__name">Ely</motion.h2>

          <motion.p variants={fadeUp} className="hero__desc">
            A multidisciplinary creator working across web development, photography,
            and graphic design. Every project is an opportunity to tell a story.
          </motion.p>
        </div>

        <motion.div variants={fadeRight} className="hero__portrait-col">
          <div className="hero__portrait-frame" style={{ padding: 0 }}>
            <span className="hero__frame-corner hero__frame-corner--tl" />
            <span className="hero__frame-corner hero__frame-corner--tr" />
            <span className="hero__frame-corner hero__frame-corner--bl" />
            <span className="hero__frame-corner hero__frame-corner--br" />
            <img src="/profile.png" alt="Ely portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="hero__caption">
            <span>Ely — Portrait</span>
            <span>2026</span>
          </div>
        </motion.div>

        <motion.ul variants={fadeUp} className="hero__meta">
          {meta.map((m) => (
            <li key={m.label}>
              <span>{m.label}</span>
              <em>{m.label === 'Status' && <span className="hero__dot" />}{m.value}</em>
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div variants={stagger} className="disc-grid">
        {disciplines.map((d) => (
          <motion.div key={d.title} variants={fadeUp} className="disc-card">
            <div className="disc-icon">{d.icon}</div>
            <h3 className="disc-title">{d.title}</h3>
            <p className="disc-desc">{d.desc}</p>
            <div className="disc-tags">
              {d.tags.map((t) => (<span key={t} className="disc-tag">{t}</span>))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default HeroSection

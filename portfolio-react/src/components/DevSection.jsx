import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const skills = [
  { name: 'HTML', tag: 'Markup' },
  { name: 'CSS / Tailwind', tag: 'Styling' },
  { name: 'JavaScript', tag: 'Language' },
  { name: 'React', tag: 'Framework' },
  { name: 'Vue', tag: 'Framework' },
  { name: 'Node.js', tag: 'Runtime' },
  { name: 'Laravel', tag: 'Backend' },
  { name: 'MySQL', tag: 'Database' },
  { name: 'Figma', tag: 'Design' },
]

const projects = [
  { id: '01', title: 'POS System', year: '2026', meta: 'Kamog Sablan Multipurpose Cooperative', preview: '/KSMPC.png', live: '#' },
  { id: '02', title: 'School System', year: '2025', meta: "San Luis King's Kids Christian Academy", preview: '/SLKKCA.png', live: '#' },
  { id: '03', title: 'Birthing Home System', year: '2026', meta: 'Bani Birthing Home', preview: '/Bani-Birthing-System.png', live: '#' },
]

function DevSection() {
  const [viewMode, setViewMode] = useState('phone')

  useEffect(() => {
    setViewMode('phone')
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <span className="panel__dock-intro">The stack I reach for</span>

      <motion.div className="skills-list"
        initial="hidden" whileInView="show" viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
      >
        {skills.map((s, i) => (
          <motion.div key={s.name} className="skill-row"
            variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
          >
            <span className="skill-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="skill-name">{s.name}</span>
            <span className="skill-tag">{s.tag}</span>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ marginTop: '3rem' }}>
        <span className="panel__dock-intro" style={{ color: 'rgba(245,158,11,0.3)' }}>Recent Projects</span>
        <motion.div className="project-grid"
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {projects.map((p) => (
            <motion.div key={p.id}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="project-cell"
              onClick={() => p.live && p.live !== '#' && window.open(p.live, '_blank')}
            >
              {p.preview ? (
                <img src={p.preview} alt={p.title} className="project-cell__img" />
              ) : (
                <>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <circle cx="9" cy="9" r="2.5" />
                  <path d="M22 15l-5-5-4 4-3-3-5 5" />
                </svg>
                <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--muted)' }}>{p.id}</span>
                </>
              )}
              <div className="photo-overlay" style={{ flexDirection: 'column', gap: '0.3rem' }}>
                <strong style={{ fontSize: '0.85rem' }}>{p.title}</strong>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{p.meta} — {p.year}</span>
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="live-demo-btn" onClick={(e) => e.stopPropagation()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DevSection

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

const designs = [
  { label: 'Elyx Studio', meta: 'Brand Identity', src: '/brand.png' },
  { label: 'UI/UX Design', meta: 'Website Design', src: '/uiux.png' },
  { label: 'Typography', meta: 'Menu Design', src: '/menu.png' },
  { label: 'Packaging', meta: 'Product Design', src: '/photo4.png' },
  { label: 'Poster Series', meta: 'Print Design', src: '/photo5.png' },
  { label: 'Social Media', meta: 'Digital Graphics', src: '/photo6.png' },
]

function DesignSection() {
  const [zoomImg, setZoomImg] = useState(null)

  useEffect(() => {
    if (!zoomImg) return
    const onKey = (e) => { if (e.key === 'Escape') setZoomImg(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [zoomImg])
  return (
    <>
      {zoomImg && createPortal(
        <div className="lightbox" onClick={() => setZoomImg(null)}>
          <img src={zoomImg} alt="" />
        </div>,
        document.body
      )}
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="design__header">
        <span className="panel__dock-intro" style={{ margin: 0 }}>Visual identity</span>
        <span className="design__header-line" />
      </div>

      <motion.p
        style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: 480, margin: '0 0 1.5rem' }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Designing visual languages that speak — from brand identities to user interfaces.
        Every project is an exercise in clarity and purpose.
      </motion.p>

      <motion.div className="design-grid"
        initial="hidden" whileInView="show" viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      >
        {designs.map((d, i) => (
          <motion.div key={d.label}
            variants={{
              hidden: { opacity: 0, scale: 0.85, filter: 'blur(6px)' },
              show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="design-cell"
            onClick={() => d.src && setZoomImg(d.src)}
          >
            {d.src && <img src={d.src} alt={d.label} className="design-cell__img" />}
            <div className="photo-overlay" style={{ flexDirection: 'column', gap: '0.3rem' }}>
              <strong style={{ fontSize: '0.85rem' }}>{d.label}</strong>
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{d.meta}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    </>
  )
}

export default DesignSection
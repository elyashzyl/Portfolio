import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

const photos = [
  { id: 1, label: 'Mountain Light', meta: 'Landscape', src: '/photo1.png' },
  { id: 2, label: 'Urban Frames', meta: 'Street', src: '/photo2.png' },
  { id: 3, label: 'Portrait Study', meta: 'Portrait', src: '/photo3.png' },
  { id: 4, label: 'Street Wear', meta: 'Vivid', src: '/photo4.png' },
  { id: 5, label: 'Minimalist Streetwear', meta: 'Shadow', src: '/photo5.png' },
  { id: 6, label: 'Hoodie Product', meta: 'Depth', src: '/photo6.png' },
  { id: 7, label: 'Nature Landscape', meta: 'Motion', src: '/photo7.png' },
  { id: 8, label: 'Rock Texture', meta: 'Texture', src: '/photo8.png' },
  { id: 9, label: 'Green House', meta: 'Mood', src: '/photo9.png' },
  { id: 10, label: 'Rock with Sea', meta: 'Grain', src: '/photo10.png' },
]

function PhotoSection() {
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
      <span className="panel__dock-intro">Through the lens</span>

      <motion.p
        style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: 500, marginBottom: '0.5rem' }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Capturing moments that tell stories — from sweeping landscapes to intimate
        portraits. Every frame is an exercise in composition, light, and emotion.
      </motion.p>

      <motion.div className="photo-grid"
        initial="hidden" whileInView="show" viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
      >
        {photos.map((p, i) => (
          <motion.div key={p.id}
            variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
            className="photo-cell"
            style={{ background: i % 2 === 0 ? 'var(--surface)' : '#0f0f0f' }}
            onClick={() => p.src && setZoomImg(p.src)}
          >
            {p.src ? (
              <img src={p.src} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <circle cx="9" cy="11" r="3" />
                <path d="M21 15l-5-5L5 19" />
              </svg>
            )}
            <div className="photo-overlay" style={{ flexDirection: 'column', gap: '0.3rem' }}>
              <strong style={{ fontSize: '0.8rem' }}>{p.label}</strong>
              <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{p.meta}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    </>
  )
}

export default PhotoSection
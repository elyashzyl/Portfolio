import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

function Panel({ id, number, category, bg, children }) {
  const imgRef = useRef(null)

  useEffect(() => {
    if (!bg || !imgRef.current) return
    const img = imgRef.current

    const onScroll = () => {
      const rect = img.closest('.panel').getBoundingClientRect()
      const speed = 0.03
      const y = rect.top * speed
      img.style.transform = `scale(1.05) translateY(${y}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [bg])

  return (
    <motion.section
      id={id} className="panel" data-section={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="panel__section-beam" />
      {bg ? (
        <div className="panel__bg">
          <img ref={imgRef} src={bg} alt="" loading="lazy" />
          <div className="overlay" />
        </div>
      ) : (
        <div className="panel__grid" />
      )}
      <motion.div
        className="panel__content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <header className="panel__header">
          <span className="panel__number">{number}</span>
          <span className="panel__divider" />
          <span className="panel__category">{category}</span>
        </header>
        {children}
      </motion.div>
      <motion.span
        className="panel__big-title"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {category}
      </motion.span>
    </motion.section>
  )
}

export default Panel

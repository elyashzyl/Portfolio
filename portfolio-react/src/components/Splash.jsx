import { useState } from 'react'
import { motion } from 'framer-motion'

const titleWords = ['Hi,', "I'm", 'Ely.', 'A', 'multi-disciplinary', 'creator', 'building', 'across', 'code,', 'lens', '&', 'design.']

function Splash({ onEnter, time }) {
  const [holding, setHolding] = useState(false)

  return (
    <div className="splash">
      <div className="splash__noise" />
      <div className="splash__light" />
      <div className="splash__beam splash__beam--2" />

      <div className="splash__top">
        <motion.span
          className="splash__brand"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ely<span className="splash__brand-dot">.</span>
        </motion.span>
        <motion.span
          className="splash__meta"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          PORTFOLIO — 2026
        </motion.span>
      </div>

      <div className="splash__center">
        <h1 className="splash__title" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.25em' }}>
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={word === 'Ely' ? { color: 'var(--accent)' } : {}}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="splash__sub"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Web developer · Photographer · Graphic designer — crafting visual and digital
          experiences that speak. Welcome to my portfolio.
        </motion.p>

        <motion.div
          className={`splash__hold-btn ${holding ? 'holding' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onMouseDown={() => setHolding(true)}
          onMouseUp={() => setHolding(false)}
          onMouseLeave={() => setHolding(false)}
          onTouchStart={() => setHolding(true)}
          onTouchEnd={() => setHolding(false)}
        >
          <div className="splash__hold-track">
            <div className="splash__hold-fill" onTransitionEnd={() => { if (holding) onEnter() }} />
          </div>
          <span className="splash__hold-text">Hold to Enter</span>
        </motion.div>
      </div>

      <motion.div
        className="splash__bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="splash__frame-counter">[ {time} ]</span>
        <span>EST. PH — 2026</span>
      </motion.div>
    </div>
  )
}

export default Splash
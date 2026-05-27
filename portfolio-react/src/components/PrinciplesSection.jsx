import { motion } from 'framer-motion'

const principles = [
  'Structure comes before decoration.',
  'Every screen should be easy to scan.',
  'Motion should guide, never distract.',
  'Responsive design is part of the idea.',
  'Design and code should stay close.',
  'Light and composition tell the story.',
]

function PrinciplesSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <span className="panel__dock-intro">What guides the work</span>

      <motion.div className="principles-grid"
        initial="hidden" whileInView="show" viewport={{ once: true }}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
      >
        {principles.map((p, i) => (
          <motion.div key={i} className="principle-card"
            variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
          >
            <span className="principle-num">{String(i + 1).padStart(2, '0')}</span>
            <p className="principle-text">{p}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="principle-sign"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        I build around clarity, usability, and careful execution — so every project feels
        polished from concept to completion.
      </motion.p>
    </motion.div>
  )
}

export default PrinciplesSection

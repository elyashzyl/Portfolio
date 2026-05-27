import { motion } from 'framer-motion'

const steps = [
  {
    num: '01', name: 'Listen',
    copy: 'Every project starts with understanding — the goal, the audience, the story. Whether it is code, a photograph, or a brand identity, I listen first.'
  },
  {
    num: '02', name: 'Create',
    copy: 'Ideas take shape through sketching, prototyping, and experimentation. Low-fidelity first, then refined until every element has a purpose.'
  },
  {
    num: '03', name: 'Deliver',
    copy: 'Craft meets execution. Clean code, composed frames, and cohesive visuals — delivered with care and attention to every detail.'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

function ApproachSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <span className="panel__dock-intro">How I work</span>
      <motion.p
        className="approach__lede"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        Clean design, careful engineering. Every detail is chosen on purpose —
        whether in code, composition, or color.
      </motion.p>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="approach__steps">
        {steps.map((s) => (
          <motion.div key={s.num} variants={item} className="approach__step">
            <span className="approach__num">{s.num}</span>
            <h3 className="approach__name">{s.name}</h3>
            <p className="approach__copy">{s.copy}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ApproachSection

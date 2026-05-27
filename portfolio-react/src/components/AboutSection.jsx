import { motion } from 'framer-motion'

const cards = [
  {
    num: '01', title: 'Experience',
    copy: 'I work across web development, photography, and graphic design — building applications, capturing visual stories, and crafting brand identities for clients across different industries. Every project is approached with the same dedication to quality and detail.'
  },
  {
    num: '02', title: 'Education & Certifications',
    copy: 'BSIT Graduate with a passion for continuous learning. Certified in Computer Systems Servicing NC II, Creative Web Design. Currently expanding skills in advanced photography techniques and design systems.'
  },
  {
    num: '03', title: 'Focus Areas',
    copy: 'Web development with modern JavaScript frameworks, portrait and landscape photography, and brand identity design. I love the intersection of technology and art — where clean code meets visual storytelling.'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

function AboutSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <span className="panel__dock-intro">Professional Background</span>

      <motion.p
        className="about__lede"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        I am a multi-disciplinary creative professional with experience in web development,
        photography, and graphic design — specializing in building digital experiences
        that are as functional as they are beautiful.
      </motion.p>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}
      >
        {cards.map((card) => (
          <motion.div key={card.num} variants={item} className="about__card">
            <span className="about__card-num">{card.num}</span>
            <h3 className="about__card-title">{card.title}</h3>
            <p className="about__card-copy">{card.copy}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default AboutSection

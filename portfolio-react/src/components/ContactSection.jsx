import { motion } from 'framer-motion'

const links = [
  { label: 'GitHub', url: 'https://github.com/elyashzyl' },
  { label: 'Instagram', url: 'https://www.instagram.com/axhzyx/' },
]

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

function ContactSection({ time }) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <span className="panel__dock-intro">Let&rsquo;s Talk</span>

      <motion.h2 variants={fadeUp} className="contact__title">
        Let&rsquo;s build<br />
        <em>something beautiful</em><br />
        together.
      </motion.h2>

      <motion.a variants={fadeUp} className="contact__email" href="mailto:ely.ashzyl@gmail.com">
        <span className="contact__email-label">Email me</span>
        <span className="contact__email-value">ely.ashzyl@gmail.com</span>
        <span className="contact__email-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.a>

      <motion.div variants={fadeUp} className="contact__aside">
        <div className="contact__block">
          <p className="contact__block-label">Elsewhere</p>
          <ul className="contact__links">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.url} className="contact__link">{l.label} <span>&rarr;</span></a>
              </li>
            ))}
          </ul>
        </div>
        <div className="contact__block">
          <p className="contact__block-label">Availability</p>
          <p className="contact__avail"><span className="contact__dot" /> Open to work — 2026</p>
          <p className="contact__where">Based in the Philippines · Working remotely worldwide</p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="contact__footer">
        <span>&copy; Dumsang, Angelika Gernade.</span>
        <span>Designed &amp; built with care</span>
      </motion.div>
    </motion.div>
  )
}

export default ContactSection

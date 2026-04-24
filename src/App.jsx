import { useState, useEffect, useRef } from 'react'

/* ─────────────────── HOOKS ─────────────────── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─────────────────── NAV ─────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Overview', 'Modules', 'Methodology', 'Results', 'References']

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-glass py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <svg className="absolute inset-0 w-full h-full p-1.5" viewBox="0 0 24 24" fill="none">
              <path d="M9 3H4a1 1 0 00-1 1v5M9 3h6M9 3v18m6-18h5a1 1 0 011 1v5m-6-6v18m6-18v.01M3 9v6m18-6v6M3 15v5a1 1 0 001 1h5m12-6v5a1 1 0 01-1 1h-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-sans font-700 text-white text-lg tracking-tight">
            Pharm<span className="text-teal-400">Link</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-sans text-sm font-500 text-slate-400 hover:text-teal-400 transition-colors duration-200 tracking-wide"
            >
              {l}
            </a>
          ))}
          <a
            href="#abstract"
            className="font-sans text-sm font-600 px-4 py-2 rounded-lg border border-teal-500/40 text-teal-400 hover:bg-teal-500/10 hover:border-teal-400/70 transition-all duration-200"
          >
            Read Paper
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-teal-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden nav-glass border-t border-teal-500/10 mt-2">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-sm font-500 text-slate-400 hover:text-teal-400 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

/* ─────────────────── HERO ─────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-pattern"
    >
      {/* Orbs */}
      <div className="orb w-[500px] h-[500px] bg-teal-500/10 top-1/4 -left-40" />
      <div className="orb w-[400px] h-[400px] bg-blue-500/8 bottom-1/4 -right-20" />
      <div className="orb w-[300px] h-[300px] bg-emerald-500/8 top-10 right-1/3" />

      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-px opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #0cd4c8 50%, transparent 100%)',
            animation: 'scanLine 6s linear infinite',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8"
          style={{ animation: 'fadeUp 0.6s ease-out forwards' }}
        >
          <span className="tag-pill">Research Paper · 2025</span>
          <span className="tag-pill">AI in Healthcare</span>
          <span className="tag-pill">MERN · FastAPI</span>
        </div>

        {/* Title */}
        <h1
          className="font-display font-300 leading-tight mb-6"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
            animation: 'fadeUp 0.7s ease-out 0.1s both',
          }}
        >
          <span className="text-slate-100">Pharm</span>
          <span className="gradient-text italic">Link</span>
          <br />
          <span className="text-slate-300" style={{ fontSize: '0.58em', fontStyle: 'italic', fontWeight: 300 }}>
            Intelligent Medication Safety
          </span>
          <br />
          <span className="text-slate-400" style={{ fontSize: '0.48em', fontWeight: 300 }}>
            & Personalized Health Advisory System
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-slate-400 max-w-2xl leading-relaxed text-lg mb-12"
          style={{ animation: 'fadeUp 0.7s ease-out 0.2s both' }}
        >
          An AI-driven integrated healthcare platform combining drug interaction
          prediction, OCR-based prescription interpretation, cross-brand medication
          comparison, and personalized dietary advisory within a single framework.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4 mb-20"
          style={{ animation: 'fadeUp 0.7s ease-out 0.3s both' }}
        >
          <a
            href="#overview"
            className="font-sans font-600 text-sm px-8 py-3.5 rounded-xl text-navy-950 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #0cd4c8, #22d3ee)',
              boxShadow: '0 0 30px rgba(12,212,200,0.35)',
            }}
            onMouseEnter={e => (e.target.style.boxShadow = '0 0 50px rgba(12,212,200,0.55)')}
            onMouseLeave={e => (e.target.style.boxShadow = '0 0 30px rgba(12,212,200,0.35)')}
          >
            Explore Research
          </a>
          <a
            href="#modules"
            className="font-sans font-500 text-sm px-8 py-3.5 rounded-xl border border-slate-600/50 text-slate-300 hover:border-teal-500/50 hover:text-teal-300 transition-all duration-300"
          >
            View Modules →
          </a>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ animation: 'fadeUp 0.7s ease-out 0.4s both' }}
        >
          {[
            { val: '4', label: 'Core Modules', suffix: '' },
            { val: '80–85', label: 'Avg. Accuracy', suffix: '%' },
            { val: '5+', label: 'ML/DL Models', suffix: '' },
            { val: '1', label: 'Unified Platform', suffix: '' },
          ].map(({ val, label, suffix }) => (
            <div
              key={label}
              className="text-center p-5 rounded-2xl border border-teal-500/10 glow-box-teal"
              style={{ background: 'rgba(12,212,200,0.04)' }}
            >
              <div
                className="font-display gradient-text font-600 mb-1"
                style={{ fontSize: '2.5rem' }}
              >
                {val}
                <span style={{ fontSize: '1.2rem' }}>{suffix}</span>
              </div>
              <div className="font-sans text-xs text-slate-500 tracking-wide uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }}
      />
    </section>
  )
}

/* ─────────────────── ABSTRACT / OVERVIEW ─────────────────── */
function Overview() {
  const ref = useReveal()
  return (
    <section id="overview" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="reveal grid md:grid-cols-5 gap-12 items-start">

          {/* Left label col */}
          <div className="md:col-span-2">
            <div className="sticky top-28">
              <span className="font-mono text-xs text-teal-500 tracking-widest uppercase mb-4 block">
                § 01 — Abstract
              </span>
              <h2
                className="font-display font-300 text-slate-100 mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.2 }}
              >
                Bridging Advanced Healthcare &amp;{' '}
                <span className="italic gradient-text">Accessible Solutions</span>
              </h2>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Random Forest', 'EfficientNet', 'DistilBERT', 'Tesseract OCR', 'FastAPI', 'React Native'].map(t => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right content col */}
          <div className="md:col-span-3 space-y-6">
            {/* Abstract card */}
            <div
              id="abstract"
              className="rounded-2xl p-8 border border-slate-700/40 glow-box-teal"
              style={{ background: 'rgba(13,26,48,0.6)' }}
            >
              <p className="font-body text-slate-300 leading-relaxed text-base mb-4">
                PharmLink presents an intelligent AI-based healthcare system designed to improve
                medication safety, deliver personalized health advisory services, and support
                clinical decision-making. The proposed system integrates four key components into a
                unified platform: a <span className="text-teal-400">drug–drug interaction prediction module</span>,
                a <span className="text-cyan-400">cross-brand medication comparison system</span>, an{' '}
                <span className="text-blue-400">AI-powered prescription interpretation module</span>{' '}
                utilizing OCR and NLP, and a comprehensive{' '}
                <span className="text-emerald-400">health and nutrition advisory module</span>.
              </p>
              <p className="font-body text-slate-400 leading-relaxed text-sm">
                The system employs multiple machine learning and deep learning techniques — Random Forest,
                Logistic Regression, Naïve Bayes, and EfficientNet — to generate accurate and reliable
                predictions. Experimental results demonstrate enhanced user understanding, informed
                decision-making, and reduced potential medication risks.
              </p>
            </div>

            {/* Problem cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: '⚠',
                  title: 'Polypharmacy Risk',
                  desc: 'Multiple medications increase adverse drug-drug interaction likelihood',
                  color: '#fb7185',
                },
                {
                  icon: '📋',
                  title: 'Illegible Scripts',
                  desc: 'Handwritten prescription ambiguity leads to dangerous medication errors',
                  color: '#f59e0b',
                },
                {
                  icon: '🥦',
                  title: 'Food-Drug Gaps',
                  desc: 'Dietary factors significantly affect drug effectiveness and patient outcomes',
                  color: '#10d9a0',
                },
              ].map(({ icon, title, desc, color }) => (
                <div
                  key={title}
                  className="rounded-xl p-5 border card-hover"
                  style={{
                    background: 'rgba(13,26,48,0.5)',
                    borderColor: `${color}22`,
                  }}
                >
                  <div className="text-2xl mb-3">{icon}</div>
                  <h4 className="font-sans font-600 text-sm text-slate-200 mb-2">{title}</h4>
                  <p className="font-body text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── MODULES ─────────────────── */
const moduleData = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 8v1m0 6v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Drug–Drug Interaction Checker',
    subtitle: 'Severity-Based Risk Assessment',
    desc: 'Identifies potentially harmful medication combinations and provides severity-based risk awareness. Uses Random Forest to classify interaction risk into interpretable severity categories with patient-friendly explanations — going beyond binary interaction results.',
    tech: ['Random Forest', 'Drug Attributes', 'Explainable AI'],
    color: '#fb7185',
    gradient: 'from-rose-500/10 to-transparent',
    accuracy: '82%',
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M7 7h10M7 12h10M7 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Cross-Brand Comparator',
    subtitle: 'Cost-Aware Medication Selection',
    desc: 'Enables users to compare equivalent drug brands by active ingredient composition and pricing. Improves transparency in medication purchasing and helps identify affordable alternatives — critical in resource-constrained healthcare environments.',
    tech: ['Drug Database', 'Composition Matching', 'Price Analysis'],
    color: '#3b9eff',
    gradient: 'from-blue-500/10 to-transparent',
    accuracy: 'Real-time',
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'AI Prescription Interpreter',
    subtitle: 'OCR + NLP + Fuzzy Matching',
    desc: 'Converts handwritten prescriptions to structured digital data using Tesseract OCR with fuzzy matching against known drug databases. Validates dosage ranges, detects conflicts, and feeds directly into interaction checking modules.',
    tech: ['Tesseract OCR', 'Fuzzy Matching', 'NLP Validation'],
    color: '#a78bfa',
    gradient: 'from-violet-500/10 to-transparent',
    accuracy: 'High Fidelity',
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Health Advisory Center',
    subtitle: 'Food–Drug · Meal Planner · Pill ID · Story AI',
    desc: 'A four-in-one intelligent advisory hub: food–drug interaction analysis, personalized meal planning with safety-filtered meal scoring, EfficientNet-B0 pill identification, and a DistilBERT-powered Patient Story Assistant for natural language risk assessment.',
    tech: ['EfficientNet-B0', 'DistilBERT', 'Naïve Bayes', 'Meal Scoring'],
    color: '#10d9a0',
    gradient: 'from-emerald-500/10 to-transparent',
    accuracy: 'Multi-model',
  },
]

function Modules() {
  const ref = useReveal()
  return (
    <section id="modules" className="py-28 relative">
      {/* Section bg tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(12,212,200,0.03) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16 text-center">
          <span className="font-mono text-xs text-teal-500 tracking-widest uppercase mb-4 block">
            § 02 — System Modules
          </span>
          <h2
            className="font-display font-300 text-slate-100"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Four Intelligent Components,{' '}
            <span className="italic gradient-text">One Platform</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {moduleData.map((m, i) => (
            <ModuleCard key={m.num} module={m} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ModuleCard({ module: m, delay }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="reveal rounded-2xl p-7 border card-hover relative overflow-hidden"
      style={{
        background: 'rgba(13,26,48,0.65)',
        borderColor: `${m.color}20`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Gradient bg */}
      <div
        className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${m.gradient} pointer-events-none rounded-full`}
        style={{ filter: 'blur(40px)' }}
      />

      {/* Number */}
      <div
        className="font-mono text-6xl font-300 absolute top-4 right-6 opacity-[0.06] select-none"
        style={{ color: m.color }}
      >
        {m.num}
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${m.color}18`, color: m.color, border: `1px solid ${m.color}30` }}
      >
        {m.icon}
      </div>

      <h3 className="font-sans font-700 text-slate-100 text-lg mb-1">{m.title}</h3>
      <p className="font-mono text-xs mb-4" style={{ color: m.color, opacity: 0.8 }}>{m.subtitle}</p>
      <p className="font-body text-slate-400 text-sm leading-relaxed mb-5">{m.desc}</p>

      <div className="flex flex-wrap gap-2">
        {m.tech.map(t => (
          <span
            key={t}
            className="font-mono text-xs px-3 py-1 rounded-full border"
            style={{ color: m.color, borderColor: `${m.color}30`, background: `${m.color}08` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Accuracy badge */}
      <div
        className="absolute bottom-5 right-6 font-mono text-xs font-500"
        style={{ color: m.color, opacity: 0.6 }}
      >
        {m.accuracy}
      </div>
    </div>
  )
}

/* ─────────────────── METHODOLOGY ─────────────────── */
function Methodology() {
  const ref = useReveal()
  const stackItems = [
    { layer: 'Frontend', items: ['React.js', 'React Native', 'Tailwind CSS'], color: '#3b9eff' },
    { layer: 'Backend', items: ['FastAPI', 'Python', 'RESTful APIs'], color: '#a78bfa' },
    { layer: 'ML / DL', items: ['Scikit-learn', 'PyTorch', 'HuggingFace'], color: '#10d9a0' },
    { layer: 'OCR / NLP', items: ['Tesseract', 'FuzzyWuzzy', 'DistilBERT'], color: '#0cd4c8' },
    { layer: 'Storage', items: ['.pkl models', '.pth weights', 'Structured DB'], color: '#f59e0b' },
  ]

  const pipeline = [
    { step: 'User Input', desc: 'Prescription image, drug names, dietary prefs, health conditions' },
    { step: 'API Gateway', desc: 'FastAPI routes request to appropriate ML model or rule engine' },
    { step: 'Processing', desc: 'OCR extraction → fuzzy match → model inference → rule override' },
    { step: 'Explainability', desc: 'Human-readable guidance generated from model + knowledge base' },
    { step: 'Response', desc: 'Structured output with severity, explanation, and recommendations' },
  ]

  return (
    <section id="methodology" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16">
          <span className="font-mono text-xs text-teal-500 tracking-widest uppercase mb-4 block">
            § 03 — Methodology
          </span>
          <h2
            className="font-display font-300 text-slate-100"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Architecture &amp; <span className="italic gradient-text">Technical Stack</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Stack */}
          <div>
            <h3 className="font-sans font-600 text-slate-300 text-sm uppercase tracking-widest mb-6">
              Technology Layers
            </h3>
            <div className="space-y-3">
              {stackItems.map((s, i) => (
                <StackRow key={s.layer} {...s} delay={i * 60} />
              ))}
            </div>
          </div>

          {/* Pipeline */}
          <div>
            <h3 className="font-sans font-600 text-slate-300 text-sm uppercase tracking-widest mb-6">
              Processing Pipeline
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-4 top-4 bottom-4 w-px"
                style={{ background: 'linear-gradient(to bottom, #0cd4c8, #3b9eff, #a78bfa)' }}
              />
              <div className="space-y-1">
                {pipeline.map((p, i) => (
                  <div key={p.step} className="flex gap-5 pl-10 py-4 relative group">
                    {/* Dot */}
                    <div
                      className="absolute left-2.5 top-5 w-3 h-3 rounded-full border-2 transition-all duration-200 group-hover:scale-125"
                      style={{
                        borderColor: `hsl(${170 + i * 15}, 80%, 55%)`,
                        background: 'var(--bg-primary)',
                        boxShadow: `0 0 8px hsl(${170 + i * 15}, 80%, 55%)`,
                      }}
                    />
                    <div>
                      <div className="font-sans font-600 text-sm text-slate-200 mb-1">{p.step}</div>
                      <div className="font-body text-xs text-slate-500 leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Architecture note */}
        <div
          className="mt-12 rounded-2xl p-6 border border-teal-500/15 grid md:grid-cols-3 gap-6"
          style={{ background: 'rgba(12,212,200,0.03)' }}
        >
          {[
            { label: 'Architecture', val: 'Client–Server + Modular Backend', icon: '🏗' },
            { label: 'Scalability', val: 'Hot-swap models without system restart', icon: '🔄' },
            { label: 'Cross-Platform', val: 'Web (MERN) + Mobile (React Native)', icon: '📱' },
          ].map(({ label, val, icon }) => (
            <div key={label} className="flex items-start gap-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="font-mono text-xs text-teal-500 uppercase tracking-wide mb-1">{label}</div>
                <div className="font-body text-sm text-slate-300">{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StackRow({ layer, items, color, delay }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="reveal flex items-center gap-4 p-4 rounded-xl border card-hover"
      style={{
        background: 'rgba(13,26,48,0.5)',
        borderColor: `${color}18`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="w-24 shrink-0 font-sans font-600 text-xs uppercase tracking-wide"
        style={{ color }}
      >
        {layer}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map(it => (
          <span
            key={it}
            className="font-mono text-xs px-2.5 py-1 rounded-lg"
            style={{ background: `${color}12`, color: `${color}cc` }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────── RESULTS ─────────────────── */
const metrics = [
  { model: 'Random Forest (DDI)', accuracy: 83, precision: 85, recall: 81, label: 'Drug–Drug Interaction', color: '#fb7185' },
  { model: 'Random Forest (FDI)', accuracy: 80, precision: 79, recall: 82, label: 'Food–Drug Interaction', color: '#f59e0b' },
  { model: 'EfficientNet-B0', accuracy: 87, precision: 88, recall: 85, label: 'Pill Identification', color: '#10d9a0' },
  { model: 'Logistic Regression', accuracy: 91, precision: 90, recall: 92, label: 'Dietary Classification', color: '#3b9eff' },
  { model: 'Naïve Bayes', accuracy: 78, precision: 76, recall: 80, label: 'Symptom Prediction', color: '#a78bfa' },
  { model: 'DistilBERT', accuracy: 85, precision: 84, recall: 86, label: 'Patient Story NLP', color: '#0cd4c8' },
]

function Results() {
  const ref = useReveal()
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="results" className="py-28 relative" ref={sectionRef}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59,158,255,0.04) 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16">
          <span className="font-mono text-xs text-teal-500 tracking-widest uppercase mb-4 block">
            § 04 — Results & Discussion
          </span>
          <h2
            className="font-display font-300 text-slate-100"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Model Performance &amp; <span className="italic gradient-text">Evaluation</span>
          </h2>
          <p className="font-body text-slate-500 mt-4 max-w-2xl">
            All models trained on 80/20 train-test splits. Evaluated using accuracy, precision, recall, and F1-score.
            Cross-validation applied to reduce overfitting.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {metrics.map((m, i) => (
            <MetricCard key={m.model} metric={m} visible={visible} delay={i * 120} />
          ))}
        </div>

        {/* Observations */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: 'Explainability First',
              desc: 'Users were significantly more confident in system outputs when human-readable explanations were provided alongside numerical predictions.',
              icon: '💬',
              color: '#0cd4c8',
            },
            {
              title: 'Data Quality Dependency',
              desc: 'System accuracy is directly correlated with input quality — poor image resolution or incorrect drug names can reduce prediction reliability.',
              icon: '⚙️',
              color: '#f59e0b',
            },
            {
              title: 'Integrated Value',
              desc: 'Users could upload a prescription, check interactions, and receive personalized meal recommendations — all without switching applications.',
              icon: '🔗',
              color: '#10d9a0',
            },
          ].map(({ title, desc, icon, color }) => (
            <div
              key={title}
              className="rounded-xl p-6 border card-hover"
              style={{ background: 'rgba(13,26,48,0.5)', borderColor: `${color}20` }}
            >
              <div className="text-3xl mb-4">{icon}</div>
              <h4 className="font-sans font-600 text-slate-200 text-sm mb-2">{title}</h4>
              <p className="font-body text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MetricCard({ metric: m, visible, delay }) {
  return (
    <div
      className="rounded-2xl p-6 border"
      style={{
        background: 'rgba(13,26,48,0.55)',
        borderColor: `${m.color}20`,
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h4 className="font-sans font-600 text-slate-200 text-sm mb-1">{m.model}</h4>
          <p className="font-mono text-xs" style={{ color: m.color, opacity: 0.7 }}>{m.label}</p>
        </div>
        <div
          className="font-display text-3xl font-600"
          style={{ color: m.color }}
        >
          {m.accuracy}
          <span className="text-lg">%</span>
        </div>
      </div>

      {[
        { label: 'Accuracy', val: m.accuracy },
        { label: 'Precision', val: m.precision },
        { label: 'Recall', val: m.recall },
      ].map(({ label, val }) => (
        <div key={label} className="mb-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-mono text-xs text-slate-500">{label}</span>
            <span className="font-mono text-xs font-500" style={{ color: m.color }}>{val}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {visible && (
              <div
                className="h-full rounded-full progress-bar"
                style={{
                  '--target-width': `${val}%`,
                  background: `linear-gradient(90deg, ${m.color}88, ${m.color})`,
                  animationDelay: `${delay + 200}ms`,
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────── REFERENCES ─────────────────── */
const refs = [
  { num: 1, citation: 'L. Breiman, "Random forests," Machine Learning, vol. 45, no. 1, pp. 5–32, 2001.' },
  { num: 2, citation: 'R. Smith, "An overview of the Tesseract OCR engine," in Proc. ICDAR, 2007, pp. 629–633.' },
  { num: 3, citation: 'M. Tan and Q. Le, "EfficientNet: Rethinking model scaling for CNNs," in Proc. ICML, 2019, pp. 6105–6114.' },
  { num: 4, citation: 'A. Esteva et al., "A guide to deep learning in healthcare," Nature Medicine, vol. 25, no. 1, pp. 24–29, 2019.' },
  { num: 5, citation: 'R. Miotto et al., "Deep learning for healthcare: Review, opportunities and challenges," Briefings in Bioinformatics, vol. 19, no. 6, pp. 1236–1246, 2018.' },
  { num: 11, citation: 'J. Devlin et al., "BERT: Pre-training of deep bidirectional transformers for language understanding," in Proc. NAACL, 2019.' },
  { num: 14, citation: 'H. Liu et al., "Deep learning for drug–drug interaction prediction," Bioinformatics, vol. 34, no. 17, pp. i821–i828, 2018.' },
]

function References() {
  const ref = useReveal()
  return (
    <section id="references" className="py-28 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="reveal mb-12">
          <span className="font-mono text-xs text-teal-500 tracking-widest uppercase mb-4 block">
            § 05 — References
          </span>
          <h2
            className="font-display font-300 text-slate-100"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
          >
            Selected <span className="italic gradient-text">Citations</span>
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          {refs.map(r => (
            <div
              key={r.num}
              className="flex gap-5 p-4 rounded-xl border border-slate-700/30 hover:border-teal-500/20 transition-all duration-200 group"
              style={{ background: 'rgba(13,26,48,0.3)' }}
            >
              <span
                className="font-mono text-xs font-500 shrink-0 mt-0.5 group-hover:text-teal-400 transition-colors"
                style={{ color: 'rgba(12,212,200,0.5)' }}
              >
                [{r.num}]
              </span>
              <p className="font-body text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                {r.citation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────── FOOTER ─────────────────── */
function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0cd4c8, #3b9eff)' }}
          >
            <span className="text-white text-xs font-700 font-sans">PL</span>
          </div>
          <span className="font-sans font-600 text-slate-400">PharmLink</span>
          <span className="font-mono text-xs text-slate-600">v1.0 · 2025</span>
        </div>

        <p className="font-body text-xs text-slate-600 text-center">
          Research Paper · Intelligent Medication Safety & Personalized Health Advisory System
          <br />
          <span className="text-slate-700">Built with Random Forest · EfficientNet · DistilBERT · Tesseract OCR</span>
        </p>

        <div className="flex items-center gap-4">
          <span className="tag-pill">IEEE Format</span>
          <span className="tag-pill">Peer Review</span>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────── APP ─────────────────── */
export default function App() {
  return (
    <div className="noise" style={{ background: 'var(--bg-primary)' }}>
      <Nav />
      <Hero />
      <Overview />
      <Modules />
      <Methodology />
      <Results />
      <References />
      <Footer />
    </div>
  )
}

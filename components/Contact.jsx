'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  EnvelopeSimple,
  PaperPlaneRight,
  CheckCircle,
  ArrowCounterClockwise,
  User,
  ChatCircleText,
  ArrowRight,
} from '@phosphor-icons/react';

const CONTACT_EMAIL = 'team@touchgrassdevs.foo';

// Inline SVG icons for guaranteed cross-origin rendering
const SocialIcons = {
  GitHub: (
    <svg viewBox="0 0 24 24" className="w-[52%] h-[52%]" fill="#181717">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="w-[52%] h-[52%]" fill="#0077B5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" className="w-[52%] h-[52%]" fill="url(#igGrad)">
      <defs>
        <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="5%" stopColor="#fdf497"/>
          <stop offset="45%" stopColor="#fd5949"/>
          <stop offset="60%" stopColor="#d6249f"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="w-[52%] h-[52%]">
      <path fill="#F24E1E" d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"/>
      <path fill="#FF7262" d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z"/>
      <path fill="#A259FF" d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z"/>
      <path fill="#1ABCFE" d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z"/>
      <path fill="#0ACF83" d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z"/>
    </svg>
  ),
};

const socialLinks = [
  { icon: SocialIcons.GitHub,   href: 'https://github.com',    label: 'GitHub',    color: '#181717' },
  { icon: SocialIcons.LinkedIn, href: 'https://linkedin.com',  label: 'LinkedIn',  color: '#0077B5' },
  { icon: SocialIcons.Instagram,href: 'https://instagram.com', label: 'Instagram', color: '#E1306C' },
  { icon: SocialIcons.Figma,    href: 'https://figma.com',     label: 'Figma',     color: '#A259FF' },
];

export default function Contact() {
  const containerRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Scroll Progress logic for lid opening
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Laptop opens smoothly from flat closed (-75deg) to fully upright (0deg) on scroll
  const lidRotateX = useTransform(scrollYProgress, [0.08, 0.35, 0.65, 0.92], [-75, 0, 0, -75]);
  const smoothLidRotate = useSpring(lidRotateX, { stiffness: 100, damping: 18 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-20 md:py-28 lg:py-32 pb-28 lg:pb-40 bg-[#fcfbf9] border-t border-luxury-border scroll-mt-24 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[420px] h-[420px] rounded-full bg-[#3fae6a]/4 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-8%] w-[450px] h-[450px] rounded-full bg-[#c4a265]/3 pointer-events-none" />

      {/* Subtle background dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e2e7_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Premium Light Card */}
          <motion.div
            className="lg:col-span-6 relative rounded-[28px] h-[380px] lg:h-[400px] overflow-hidden flex flex-col justify-between cursor-default select-none bg-white border border-[#0b120e]/8"
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            style={{
              boxShadow: '0 4px 6px -1px rgba(11,18,14,0.04), 0 20px 50px -8px rgba(11,18,14,0.08)',
            }}
          >
            {/* Ambient corner glows */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-40 pointer-events-none blur-3xl" style={{ background: 'radial-gradient(circle, #3fae6a22 0%, transparent 70%)' }} />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-30 pointer-events-none blur-2xl" style={{ background: 'radial-gradient(circle, #c4a26522 0%, transparent 70%)' }} />

            {/* Subtle dot pattern */}
            <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0b120e18 1.2px, transparent 1.2px)', backgroundSize: '20px 20px' }} />

            {/* Top: badge + heading */}
            <div className="relative z-10 p-7 sm:p-8 pb-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-grass-accent/25 bg-grass-accent/8 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-grass-accent animate-pulse" />
                <span className="text-[8px] font-mono tracking-widest uppercase text-grass-accent font-bold">Available for collabs</span>
              </div>
              <h2 className="text-[1.85rem] sm:text-[2.1rem] font-sans font-bold leading-[1.1] tracking-tight text-[#0a1411]">
                Let's build something
                <br/>
                <span className="text-grass-accent">legendary.</span>
              </h2>
              <p className="mt-2.5 text-[11px] sm:text-xs text-sage-500 font-light leading-relaxed">
                no cap, we build different. 🔥
              </p>
            </div>

            {/* Middle: email card */}
            <div className="relative z-10 px-7 sm:px-8">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group/em flex items-center gap-3.5 relative rounded-2xl border border-[#0b120e]/8 bg-[#f5f8f5] hover:bg-[#eef5ee] hover:border-grass-accent/30 transition-all duration-300 px-4 py-3 overflow-hidden shadow-[0_1px_4px_rgba(11,18,14,0.05)]"
              >
                {/* Left green accent line */}
                <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-grass-accent via-grass-accent/60 to-transparent" />

                {/* Icon */}
                <div className="w-8 h-8 rounded-xl bg-grass-accent/10 border border-grass-accent/20 flex items-center justify-center text-grass-accent group-hover/em:bg-grass-accent group-hover/em:text-white transition-all duration-300 shrink-0 ml-1">
                  <EnvelopeSimple size={14} weight="bold" />
                </div>

                {/* Text stack */}
                <div className="flex flex-col min-w-0">
                  <span className="text-[8px] font-mono tracking-[0.15em] uppercase text-sage-400 font-bold leading-none mb-0.5">drop a line</span>
                  <span className="font-mono text-[10.5px] font-medium text-[#0a1411] truncate group-hover/em:text-grass-accent transition-colors duration-200">
                    {CONTACT_EMAIL}
                  </span>
                </div>

                {/* CTA chip */}
                <div className="ml-auto shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-grass-accent/10 border border-grass-accent/20 group-hover/em:bg-grass-accent group-hover/em:border-grass-accent transition-all duration-300">
                  <span className="text-[8px] font-mono font-bold tracking-wider uppercase text-grass-accent group-hover/em:text-white transition-colors duration-300">Write</span>
                  <ArrowRight size={9} className="text-grass-accent group-hover/em:text-white group-hover/em:translate-x-0.5 transition-all duration-200" />
                </div>
              </a>
            </div>

            {/* Bottom: social row */}
            <div className="relative z-10 p-7 sm:p-8 pt-0">
              <div className="border-t border-[#0b120e]/6 pt-4 flex items-center justify-between">
                <span className="text-[9px] font-mono tracking-widest text-sage-400 uppercase font-bold">
                  Find us on
                </span>
                <div className="flex gap-2">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      className="w-9 h-9 rounded-[22%] bg-white border border-[#0b120e]/10 shadow-[0_2px_8px_rgba(11,18,14,0.05),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_6px_16px_rgba(11,18,14,0.10)] hover:border-[#0b120e]/20 flex items-center justify-center transition-all duration-200 cursor-pointer relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 opacity-0 hover:opacity-8 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${social.color} 0%, transparent 70%)` }}
                      />
                      <div className="relative z-10 flex items-center justify-center w-full h-full">
                        {social.icon}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D CSS Laptop (Facing straight forward matching reference image) */}
          <div 
            className="lg:col-span-6 relative flex flex-col items-center justify-center w-full h-[360px] sm:h-[420px] md:h-[450px] lg:h-[400px] overflow-visible"
            style={{ perspective: '1400px' }}
          >
            {/* Laptop Container - Direct front flat view (rotateX: 0, rotateY: 0) */}
            <motion.div
              style={{
                rotateX: 0, 
                rotateY: 0,
                transformStyle: 'preserve-3d',
              }}
              className="relative flex flex-col items-center justify-center transition-all duration-300 scale-[0.52] sm:scale-[0.66] md:scale-[0.8] lg:scale-[0.9] overflow-visible translate-y-4 sm:translate-y-6 lg:translate-y-8"
            >
              
              {/* 1. LAPTOP LID (Slightly narrower than base to mimic image profile) */}
              <motion.div
                style={{
                  rotateX: smoothLidRotate,
                  transformOrigin: 'bottom center',
                  transformStyle: 'preserve-3d',
                }}
                className="w-[320px] h-[210px] md:w-[460px] md:h-[300px] bg-black border-[1.5px] border-[#d4d4d8] rounded-t-2xl relative shadow-2xl flex flex-col z-20"
              >
                {/* Bezel Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 md:w-16 md:h-3.5 bg-black rounded-b-md z-30 flex items-center justify-center pointer-events-none">
                  <span className="w-0.5 h-0.5 rounded-full bg-[#1c1d21] mr-[1px]" />
                  <span className="w-0.5 h-0.5 rounded-full bg-[#27c93f]/40" />
                </div>

                {/* Ultra-thin bezel inner display screen */}
                <div className="w-full h-full bg-black flex flex-col p-[2px] md:p-[3px] rounded-t-xl overflow-hidden relative">
                  
                  {/* Clean light-themed display content with ambient background mesh */}
                  <div className="w-full h-[calc(100%-8px)] md:h-[calc(100%-12px)] bg-gradient-to-br from-white via-[#f7f9f6] to-[#ecf3ee] flex flex-col p-3 md:p-4 rounded-t-lg overflow-hidden relative shadow-inner">
                    
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-[#0a1411]/5 pb-2 mb-2 md:mb-3 select-none">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      
                      {/* Brand Label */}
                      <span className="text-[10px] font-mono text-sage-400 font-bold tracking-widest uppercase">
                        touchgrass.devs
                      </span>
                      
                      {/* Online Status Indicator */}
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse" />
                        <span className="text-[8px] font-mono text-sage-400 uppercase tracking-wider">Online</span>
                      </div>
                    </div>

                    {/* Form fields on screen */}
                    <div className="flex-1 flex flex-col justify-between">
                      <AnimatePresence mode="wait">
                        {!submitted ? (
                          <motion.form
                            key="light-screen-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="flex flex-col justify-between h-full space-y-2"
                          >
                            <div className="space-y-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                
                                {/* Name Box */}
                                <div 
                                  className={`relative px-3 pt-2 pb-1.5 rounded-xl border transition-all duration-300 flex flex-col justify-between h-12 shadow-sm ${
                                    focusedField === 'name' 
                                      ? 'border-grass-accent bg-white ring-1 ring-grass-accent/25' 
                                      : 'border-luxury-border/80 bg-white/60 hover:bg-white'
                                  }`}
                                >
                                  <label htmlFor="name" className="text-[7.5px] font-mono tracking-widest text-sage-400 uppercase font-bold select-none leading-none flex items-center gap-1">
                                    <User size={9} weight="bold" />
                                    <span>Your Name</span>
                                  </label>
                                  <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Name"
                                    className="w-full bg-transparent border-0 p-0 text-xs text-[#0a1411] placeholder-sage-300 focus:outline-none focus:ring-0 mt-0.5 font-sans"
                                  />
                                </div>

                                {/* Email Box */}
                                <div 
                                  className={`relative px-3 pt-2 pb-1.5 rounded-xl border transition-all duration-300 flex flex-col justify-between h-12 shadow-sm ${
                                    focusedField === 'email' 
                                      ? 'border-grass-accent bg-white ring-1 ring-grass-accent/25' 
                                      : 'border-luxury-border/80 bg-white/60 hover:bg-white'
                                  }`}
                                >
                                  <label htmlFor="email" className="text-[7.5px] font-mono tracking-widest text-sage-400 uppercase font-bold select-none leading-none flex items-center gap-1">
                                    <EnvelopeSimple size={9} weight="bold" />
                                    <span>Email address</span>
                                  </label>
                                  <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="hello@brand.com"
                                    className="w-full bg-transparent border-0 p-0 text-xs text-[#0a1411] placeholder-sage-300 focus:outline-none focus:ring-0 mt-0.5 font-sans"
                                  />
                                </div>
                              </div>

                              {/* Message Textarea Box */}
                              <div 
                                className={`relative px-3 pt-2 pb-1.5 rounded-xl border transition-all duration-300 flex flex-col h-20 md:h-28 shadow-sm ${
                                  focusedField === 'message' 
                                    ? 'border-grass-accent bg-white ring-1 ring-grass-accent/25' 
                                    : 'border-luxury-border/80 bg-white/60 hover:bg-white'
                                }`}
                              >
                                <label htmlFor="message" className="text-[7.5px] font-mono tracking-widest text-sage-400 uppercase font-bold select-none leading-none mb-1 flex items-center gap-1">
                                  <ChatCircleText size={9} weight="bold" />
                                  <span>Message</span>
                                </label>
                                <textarea
                                  id="message"
                                  name="message"
                                  required
                                  value={formData.message}
                                  onChange={handleChange}
                                  onFocus={() => setFocusedField('message')}
                                  onBlur={() => setFocusedField(null)}
                                  placeholder="Write something..."
                                  className="w-full bg-transparent border-0 p-0 text-xs text-[#0a1411] placeholder-sage-300 focus:outline-none focus:ring-0 resize-none h-full mt-0.5 font-sans leading-relaxed"
                                />
                              </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                              <motion.button
                                type="submit"
                                disabled={submitting}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="w-full py-2.5 rounded-full bg-grass-accent hover:bg-sage-950 text-white font-sans font-bold text-xs uppercase tracking-widest shadow-sm hover:shadow transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                              >
                                {submitting ? (
                                  <span>Sending...</span>
                                ) : (
                                  <>
                                    <PaperPlaneRight size={13} weight="bold" />
                                    <span>Send Message</span>
                                  </>
                                )}
                              </motion.button>
                            </div>
                          </motion.form>
                        ) : (
                          <motion.div
                            key="light-screen-success"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center space-y-4 h-full py-4 bg-white rounded-xl shadow-inner border border-luxury-border/60"
                          >
                            <div className="w-12 h-12 rounded-full bg-grass-accent/10 flex items-center justify-center border border-grass-accent/20">
                              <CheckCircle size={24} weight="bold" className="text-grass-accent" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-sans font-bold text-[#0a1411] tracking-tight">
                                Message Sent
                              </h3>
                              <p className="text-xs text-sage-600 font-light max-w-xs leading-relaxed">
                                Thank you for reaching out! We have received your inquiry and will follow up with you within 24 hours.
                              </p>
                            </div>
                            <button
                              onClick={resetForm}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-luxury-border text-[9px] font-mono uppercase text-sage-600 hover:text-sage-950 hover:border-grass-accent transition-colors cursor-pointer"
                            >
                              <ArrowCounterClockwise size={11} weight="bold" />
                              Send another
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                  {/* Bottom Bezel Strip */}
                  <div className="h-2 md:h-3.5 bg-black w-full flex items-center justify-center select-none rounded-b-lg">
                    <span className="text-[6.5px] md:text-[8px] font-sans font-medium text-[#fafaf9]/35 tracking-wider">
                      touchgrass devs
                    </span>
                  </div>

                </div>

              </motion.div>

              {/* 2. LAPTOP BASE (Detailed Keyboard Deck Well - rotated 75deg matching lid footprint) */}
              <div
                style={{
                  transform: 'rotateX(75deg)',
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  marginTop: '-2px',
                }}
                className="w-[320px] h-[210px] md:w-[460px] md:h-[300px] bg-[#e4e4e7] border-b border-[#a1a1aa] rounded-b-2xl relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] z-10 p-2.5 md:p-3 select-none pointer-events-none"
              >
                {/* Screen Hinge Connection */}
                <div className="absolute inset-x-4 top-1 h-[2px] bg-black/40 rounded-full" />
                
                {/* Recessed Keyboard Deck Area */}
                <div className="w-full h-[58%] bg-[#121214] border border-[#000000]/40 rounded-xl p-1.5 md:p-2 mt-3 md:mt-4 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)] flex items-center justify-between gap-1.5 md:gap-2">
                  
                  {/* Left Speaker Grille */}
                  <div className="w-2.5 md:w-4 h-full bg-[#1c1c1f] rounded-md bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[size:3.5px_3.5px] opacity-75" />

                  {/* Simulated Keyboard Matrix Grid */}
                  <div className="flex-1 h-full grid grid-rows-5 gap-0.5 md:gap-1.5">
                    <div className="flex gap-0.5 w-full justify-between h-full opacity-90">
                      {Array.from({ length: 14 }).map((_, k) => (
                        <div key={k} className="bg-[#242426] rounded-[1px] md:rounded-[2px] grow border-b-[1px] border-black shadow-[0_0.5px_1px_rgba(0,0,0,0.3)]" />
                      ))}
                    </div>
                    <div className="flex gap-0.5 w-full justify-between h-full opacity-95">
                      {Array.from({ length: 14 }).map((_, k) => (
                        <div key={k} className="bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] grow border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                      ))}
                    </div>
                    <div className="flex gap-0.5 w-full justify-between h-full opacity-95">
                      {Array.from({ length: 13 }).map((_, k) => (
                        <div key={k} className="bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] grow border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                      ))}
                    </div>
                    <div className="flex gap-0.5 w-full justify-between h-full opacity-95">
                      {Array.from({ length: 12 }).map((_, k) => (
                        <div key={k} className="bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] grow border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                      ))}
                    </div>
                    <div className="flex gap-0.5 w-full justify-between h-full opacity-95">
                      <div className="w-[12%] bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                      <div className="w-[8%] bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                      <div className="w-[10%] bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                      {/* Spacebar Key */}
                      <div className="w-[40%] bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                      <div className="w-[10%] bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                      <div className="w-[8%] bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                      <div className="w-[12%] bg-[#1c1c1e] rounded-[2px] md:rounded-[3px] border-b-[1.5px] border-black shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]" />
                    </div>
                  </div>

                  {/* Right Speaker Grille */}
                  <div className="w-2.5 md:w-4 h-full bg-[#1c1c1f] rounded-md bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[size:3.5px_3.5px] opacity-75" />

                </div>

                {/* Recessed Trackpad Area */}
                <div className="w-28 h-10 md:w-40 md:h-[60px] bg-[#c2c2c6] border border-[#27272a]/20 rounded-xl mx-auto mt-3 md:mt-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)]" />

                {/* Base Rubber Support Feet */}
                <div className="absolute left-8 bottom-[-2px] w-4 h-[2px] md:left-12 md:bottom-[-3px] md:w-6 md:h-[3px] bg-[#27272a] rounded-b-sm" />
                <div className="absolute right-8 bottom-[-2px] w-4 h-[2px] md:right-12 md:bottom-[-3px] md:w-6 md:h-[3px] bg-[#27272a] rounded-b-sm" />
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

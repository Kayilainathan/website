'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FacebookLogo,
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  CaretDown,
} from '@phosphor-icons/react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const socialLinks = [
    { icon: <FacebookLogo size={16} weight="fill" />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <LinkedinLogo size={16} weight="fill" />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <TwitterLogo size={16} weight="fill" />, href: 'https://twitter.com', label: 'Twitter/X' },
    { icon: <InstagramLogo size={16} weight="fill" />, href: 'https://instagram.com', label: 'Instagram' },
  ];

  const columns = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#hero' },
        { label: 'Press and Media', href: '#services' },
        { label: 'Careers', href: '#hero' },
        { label: 'Partners', href: '#services' },
        { label: 'Legal', href: '#contact' },
        { label: 'Privacy & Policy', href: '#contact' },
        { label: 'Affiliates', href: '#services' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Client support', href: 'mailto:team@touchgrassdevs.foo' },
        { label: 'Help center', href: 'mailto:team@touchgrassdevs.foo' },
        { label: 'Terms of Service', href: '#contact' },
        { label: 'Hire a Partner', href: '#contact' },
        { label: 'Vibe Check', href: '#services' },
        { label: 'Events', href: '#philosophy' },
      ],
    },
    {
      title: 'Developers',
      links: [
        { label: 'touchgrass.devs', href: 'https://github.com' },
        { label: 'API documentation', href: '#expertise' },
        { label: 'Office Hours', href: '#contact' },
      ],
    },
    {
      title: 'Products',
      links: [
        { label: 'Web Templates', href: '#services' },
        { label: 'SaaS Boilerplates', href: '#services' },
        { label: 'Discord Bots', href: '#services' },
        { label: 'Enterprise Suite', href: '#services' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Web Engineering', href: '#services' },
        { label: 'Custom App Design', href: '#services' },
        { label: 'Workflow Pipelines', href: '#services' },
        { label: 'AI Model Integration', href: '#services' },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#0b1612] text-white pt-20 pb-12 overflow-hidden select-none border-t border-white/5">
      {/* Subtle brand glow behind layers */}
      <div className="absolute top-[20%] left-[10%] w-[380px] h-[380px] rounded-full bg-grass-accent/5 premium-blur-orb pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gold-accent/5 premium-blur-orb pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Newsletter Subscription Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-12 border-b border-white/10">
          <div className="max-w-md">
            <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white leading-tight">
              Subscribe to our newsletter
            </h3>
          </div>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={subscribed ? "Thank you!" : "Enter your email"}
              disabled={subscribed}
              className="px-5 py-3 rounded-full bg-white/5 border border-white/10 focus:border-grass-accent focus:bg-white/10 text-xs text-white focus:outline-none placeholder-sage-400 w-full sm:w-64 transition-all duration-300"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={subscribed}
              className="px-6 py-3 rounded-full bg-grass-accent hover:bg-[#3fae6a]/90 text-white font-sans font-bold text-xs uppercase tracking-wider shadow transition-colors duration-300 whitespace-nowrap cursor-pointer"
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </motion.button>
          </form>
        </div>

        {/* 5-Column Navigation Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 pb-12 border-b border-white/5">
          {columns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-mono tracking-widest text-[#3fae6a] uppercase font-bold">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs text-sage-400 font-light">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.href} className="hover:text-white hover:underline decoration-[#3fae6a] transition-all duration-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 text-[10px] text-sage-500 font-mono">
          {/* Language selector */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-sage-400 hover:text-white transition-colors duration-300 text-[10px]">
              <span>English (US)</span>
              <CaretDown size={10} />
            </button>
          </div>

          <div>
            &copy; 2026 Touchgrass.DEVS. All rights reserved.
          </div>

          {/* Social Icons - Circle Dark filled buttons */}
          <div className="flex gap-2.5">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:border-grass-accent hover:bg-grass-accent text-sage-400 hover:text-white transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

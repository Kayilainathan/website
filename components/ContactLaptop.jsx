'use client';

import { motion, useTransform, useSpring } from 'framer-motion';
import styles from './ContactLaptop.module.css';

export default function ContactLaptop({ scrollProgress }) {
  // Map scroll progress (0.1 to 0.45 of the section scroll range) to lid rotation
  // 0 degrees is flat (closed), -110 degrees is tilted back (fully open)
  const rawLidRotation = useTransform(scrollProgress, [0.1, 0.45], [0, -112]);
  
  // Apply a smooth spring transition to the lid rotation for a physics-based feel
  const lidRotation = useSpring(rawLidRotation, {
    stiffness: 85,
    damping: 18,
    mass: 1.2,
    restDelta: 0.001
  });

  // Generate rows of keyboard keys
  const keyboardRows = [
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5], // Function row
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5], // Numbers
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // QWERTY
    [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.2], // ASDF
    [2.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.7], // ZXCV
    [1.5, 1.2, 1.2, 5.5, 1.2, 1.2, 1.5] // Spacebar / arrows
  ];

  return (
    <div className={styles.laptopContainer}>
      <div className={styles.laptop3d}>
        {/* Glowing stacked shadow plates underneath the laptop base to create depth */}
        <div className={styles.shadowPlate1} />
        <div className={styles.shadowPlate2} />
        <div className={styles.shadowPlate3} />

        {/* Laptop Base (Chassis) */}
        <div className={styles.base}>
          {/* Keyboard Well */}
          <div className={styles.keyboardArea}>
            {keyboardRows.map((row, rIdx) => (
              <div key={rIdx} className={styles.keyRow}>
                {row.map((weight, kIdx) => (
                  <div
                    key={kIdx}
                    className={`${styles.key} ${
                      rIdx === 5 && kIdx === 3 ? 'bg-grass-accent/30 border border-grass-accent/50 shadow-[0_0_8px_rgba(63,174,106,0.4)]' : ''
                    }`}
                    style={{ flexGrow: weight }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Trackpad */}
          <div className={styles.trackpad} />

          {/* Side panels (thickness layers) */}
          <div className={styles.sideFront} />
          <div className={styles.sideLeft}>
            {/* USB-C side ports */}
            <div className="absolute top-1/2 left-[30px] -translate-y-1/2 w-4 h-1 bg-[#1e293b] rounded-sm" />
            <div className="absolute top-1/2 left-[48px] -translate-y-1/2 w-4 h-1 bg-[#1e293b] rounded-sm" />
          </div>
          <div className={styles.sideRight} />
        </div>

        {/* Laptop Lid (Screen) */}
        <motion.div 
          className={styles.lid} 
          style={{ rotateX: lidRotation }}
        >
          {/* Inside Face (Actual screen display) - Visible when open */}
          <div className={styles.screenFace}>
            {/* Screen Header Bar */}
            <div className="flex items-center justify-between px-3 py-1 bg-slate-100/80 border-b border-slate-200/60 backdrop-blur-sm select-none">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-[6px] font-mono text-slate-500 font-medium">touchgrass.devs</div>
              <div className="w-5" /> {/* Spacer */}
            </div>

            {/* Screen Content Viewport (IDE/Terminal Theme - Light Mode) */}
            <div className={styles.screenViewport}>
              <div className="text-grass-accent font-bold select-none mb-1 text-[7px]">
                $ npm run dev --touchgrass
              </div>
              <div className="space-y-1 font-mono text-[6px]">
                <div>
                  <span className="text-sage-500">Ready in </span>
                  <span className="text-grass-accent font-semibold">1.42s</span>
                </div>
                <div>
                  <span className="text-sage-500">- Local: </span>
                  <span className="underline text-grass-accent-light">http://localhost:3000</span>
                </div>
                <div className="pt-1 text-gold-accent font-medium">
                  // Freelance Team Configuration:
                </div>
                <div className="flex justify-between pl-2">
                  <span className="text-sage-500">developers:</span>
                  <span className="text-sage-800 font-semibold">[&apos;Craft&apos;, &apos;Code&apos;, &apos;Design&apos;, &apos;Support&apos;]</span>
                </div>
                <div className="flex justify-between pl-2">
                  <span className="text-sage-500">rate_card:</span>
                  <span className="text-sage-800 font-semibold">honest_pricing: true</span>
                </div>
                <div className="flex justify-between pl-2">
                  <span className="text-sage-500">work_ethic:</span>
                  <span className="text-grass-accent font-semibold">touch_grass: true</span>
                </div>
                <div className="pt-2 text-sage-400 flex items-center gap-1">
                  <span>Compilation successful. Watching for changes...</span>
                  <span className="w-1 h-2.5 bg-grass-accent inline-block animate-pulse shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Outside Face (Aluminum / Glass back with logo) - Visible when closed */}
          <div className={styles.lidBack}>
            <div className={styles.lidLogo}>
              &gt;_
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

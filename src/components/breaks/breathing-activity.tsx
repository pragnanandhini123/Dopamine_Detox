'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phases = [
  { duration: 4000, text: 'Breathe In...' },
  { duration: 4000, text: 'Hold' },
  { duration: 6000, text: 'Breathe Out...' },
  { duration: 2000, text: 'Pause' },
];

export function BreathingActivity() {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prevIndex) => (prevIndex + 1) % phases.length);
    }, phases[phaseIndex].duration);

    return () => clearInterval(interval);
  }, [phaseIndex]);

  const currentPhase = phases[phaseIndex];
  const isBreathingIn = currentPhase.text === 'Breathe In...';
  const isHolding = currentPhase.text === 'Hold';

  // We are using framer-motion here for smoother animations
  // Add framer-motion to dependencies: npm install framer-motion
  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-4 bg-background rounded-lg">
      <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64">
        <motion.div
          className="absolute bg-primary/20 rounded-full"
          animate={{
            scale: isBreathingIn ? 1.2 : isHolding ? 1.2 : 0.8,
            opacity: isBreathingIn ? 0.8 : isHolding ? 0.8 : 0.5
          }}
          transition={{ duration: phases[phaseIndex].duration / 1000, ease: "easeInOut" }}
          style={{ width: '100%', height: '100%' }}
        />
        <motion.div
          className="absolute bg-primary rounded-full"
          animate={{
            scale: isBreathingIn ? 1 : 0.6,
          }}
          transition={{ duration: phases[phaseIndex].duration / 1000, ease: "easeInOut" }}
           style={{ width: '100%', height: '100%' }}
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPhase.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="z-10 text-2xl font-semibold text-primary-foreground"
          >
            {currentPhase.text}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="text-muted-foreground text-center">Follow the guide to recenter your focus.</p>
    </div>
  );
}

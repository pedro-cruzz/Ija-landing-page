"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Fan, Zap } from "lucide-react";

const dronePropellers = [
  { positionY: "-top-2", positionX: "-left-2", rotation: 360 },
  { positionY: "-top-2", positionX: "-right-2", rotation: -360 },
  { positionY: "-bottom-2", positionX: "-left-2", rotation: -360 },
  { positionY: "-bottom-2", positionX: "-right-2", rotation: 360 },
];

function CodeDrone() {
  return (
    <div className="relative z-10 flex h-40 w-40 items-center justify-center">
      <div className="absolute h-2 w-[120%] rotate-45 rounded-full bg-slate-700"></div>
      <div className="absolute h-2 w-[120%] -rotate-45 rounded-full bg-slate-700"></div>

      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-blue-400 bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.6)]">
        <Zap className="h-8 w-8 fill-white text-white" />
      </div>

      {dronePropellers.map((propeller) => (
        <motion.div
          key={`${propeller.positionY}-${propeller.positionX}`}
          animate={{ rotate: propeller.rotation }}
          transition={{ repeat: Infinity, duration: 0.2, ease: "linear" }}
          className={`absolute ${propeller.positionY} ${propeller.positionX} rounded-full border border-slate-600 bg-slate-800 p-1 shadow-lg`}
        >
          <Fan className="h-10 w-10 text-sky-400 opacity-80" />
        </motion.div>
      ))}
    </div>
  );
}

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [startExit, setStartExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartExit(true);
      setTimeout(onComplete, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={startExit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]"
    >
      <motion.p
        animate={startExit ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        className="mb-12 animate-pulse text-xs font-bold uppercase tracking-[0.3em] text-sky-500"
      >
        LIGANDO MOTORES...
      </motion.p>

      <motion.div
        className="relative flex items-center justify-center"
        initial={{ y: 0, scale: 1 }}
        animate={
          startExit ? { y: -600, scale: 1.5, rotate: 0 } : { y: [-10, 10, -10] }
        }
        transition={
          startExit
            ? { duration: 0.8, ease: "backIn" }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <svg
          className="pointer-events-none absolute -top-20 z-0 h-[600px] w-[600px] opacity-60"
          viewBox="0 0 100 100"
        >
          <motion.path
            d="M 50 50 Q 40 80 0 150"
            animate={
              startExit
                ? { d: "M 50 50 L 0 150" }
                : { d: "M 50 50 Q 40 80 0 150" }
            }
            transition={{ duration: 0.8, ease: "backIn" }}
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          <motion.path
            d="M 50 50 Q 60 80 100 150"
            animate={
              startExit
                ? { d: "M 50 50 L 100 150" }
                : { d: "M 50 50 Q 60 80 100 150" }
            }
            transition={{ duration: 0.8, ease: "backIn" }}
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>

        <CodeDrone />
      </motion.div>
    </motion.div>
  );
}

export default Preloader;

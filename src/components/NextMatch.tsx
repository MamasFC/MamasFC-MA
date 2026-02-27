import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const targetDate = new Date("2026-02-27T23:30:00"); // Fecha y hora de la final

const NextMatch = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.mins },
    { label: "SEG", value: timeLeft.secs },
  ];

  return (
    <section id="proximos" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-primary" />
          <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">
            PRÓXIMO PARTIDO
          </span>
        </div>

        <div className="glow-border bg-card p-8 sm:p-12 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-32 h-32 bg-primary/5"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
          />

          {/* 
            ╔════════════════════════════════════════════════════════════════════╗
            ║   ¡DESCOMENTA TODO ESTE BLOQUE CUANDO GANEN LA FINAL!             ║
            ║   Ponlo en este mismo componente o en una página de celebración   ║
            ╚════════════════════════════════════════════════════════════════════╝
          

           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden"
          >
            
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-400 to-primary opacity-30"
            />

            
            <motion.h2
              initial={{ y: -200, scale: 0.3 }}
              animate={{
                y: 0,
                scale: [0.8, 1.3, 0.9, 1.4, 1],
                rotate: [0, -8, 6, -10, 0],
              }}
              transition={{
                duration: 1.4,
                type: "spring",
                stiffness: 80,
                damping: 8,
                times: [0, 0.3, 0.6, 0.8, 1],
              }}
              className="text-6xl sm:text-8xl md:text-10xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-primary to-yellow-400 drop-shadow-[0_0_40px_rgba(255,215,0,0.9)] tracking-widest z-10"
            >
              ¡CAMPEONES!
            </motion.h2>

           
           
            
            <motion.div
              className="absolute text-8xl sm:text-10xl z-20"
              initial={{ x: "-120%", y: "-50%", rotate: -45, opacity: 0 }}
              animate={{
                x: "120%",
                opacity: [0, 1, 0],
                rotate: [-45, 45],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            >
              🏆
            </motion.div>

            <motion.div
              className="absolute text-8xl sm:text-10xl z-20"
              initial={{ x: "120%", y: "30%", rotate: 30, opacity: 0 }}
              animate={{
                x: "-120%",
                opacity: [0, 1, 0],
                rotate: [30, -50, 30],
              }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                delay: 0.8,
                ease: "easeInOut",
              }}
            >
              ⚽
            </motion.div>

            
            <motion.div
              className="absolute inset-0 bg-white pointer-events-none"
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0.8, 1.5, 0.8],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatDelay: 2.8,
                times: [0, 0.1, 0.3],
              }}
            />
          </motion.div> */}

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-20">
            <div className="flex items-center gap-6 sm:gap-10">
              {/* MAMAS FC */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm bg-primary/20 border border-primary/30 flex items-center justify-center mb-3">
                  <img
                    src="/EscudoVerde.jpg"
                    alt="Mamas FC"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                  />
                </div>
                <span className="font-display text-sm tracking-wider text-foreground font-semibold">
                  MAMAS FC
                </span>
              </div>

              <div className="text-center">
                <span className="font-display text-3xl sm:text-4xl font-bold text-muted-foreground">
                  VS
                </span>
                <div className="mt-1 text-xs font-body text-muted-foreground">
                  VIERNES 27/02 · 23:30
                </div>
                <div className="mt-1 px-2 py-0.5 bg-secondary/20 text-secondary font-display text-[10px] tracking-wider">
                  LA FINAL - PEGECHE
                </div>
              </div>

              {/* RIVAL */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm bg-muted flex items-center justify-center mb-3">
                  <img
                    src="/Escudos/wpk.jpg"
                    alt="WPK"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                  />
                </div>
                <span className="font-display text-sm tracking-wider text-muted-foreground font-semibold">
                  WPK
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              {timeUnits.map((unit) => (
                <div key={unit.label} className="text-center">
                  <div className="bg-muted w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2">
                    <span className="font-display text-2xl sm:text-3xl font-bold text-primary">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NextMatch;
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const targetDate = new Date("2026-02-18T21:23:00");

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
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-primary" />
          <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">PRÓXIMO PARTIDO</span>
        </div>

        <div className="glow-border bg-card p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 sm:gap-10">

              {/* MAMAS */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm bg-primary/20 border border-primary/30 flex items-center justify-center mb-3">
                  <img 
                     src="/EscudoVerde.jpg" 
                     alt="Mamas FC" 
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                     />
                </div>
                <span className="font-display text-sm tracking-wider text-foreground font-semibold">MAMAS FC</span>
              </div>

              <div className="text-center">
                <span className="font-display text-3xl sm:text-4xl font-bold text-muted-foreground">VS</span>
                <div className="mt-1 text-xs font-body text-muted-foreground">MARTES 18/02 · 23:00</div>
                <div className="mt-1 px-2 py-0.5 bg-secondary/20 text-secondary font-display text-[10px] tracking-wider">PEGECHE</div>
              </div>
              
              {/* vs EQUIPO */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm bg-muted flex items-center justify-center mb-3">
                  <img 
                     src="/Escudos/Hawks.jpg" 
                     alt="Hawks FC" 
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                     />
                </div>
                <span className="font-display text-sm tracking-wider text-muted-foreground font-semibold">HAWKS FC</span>
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
                  <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">{unit.label}</span>
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
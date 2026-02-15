import { motion } from "framer-motion";
import heroBg from "@/assets/FondoMamas.png";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden noise-overlay">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Estadio" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">BIENVENIDOS A</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold leading-[0.9] mb-6"
        >
          <span className="text-foreground">MAMAS</span>
          <br />
          <span className="glow-text text-primary">FC</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-muted-foreground text-lg sm:text-xl max-w-lg mb-8 font-light"
        >
          Pasión, gloria y diversion. Seguí cada momento de nuestro club.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4"
        >
          <a href="#proximos" className="px-8 py-3 bg-primary text-primary-foreground font-display text-sm tracking-wider font-semibold hover:shadow-[var(--shadow-glow)] transition-shadow">
            PRÓXIMO PARTIDO
          </a>
          <a href="#noticias" className="px-8 py-3 border border-border text-foreground font-display text-sm tracking-wider font-semibold hover:border-primary hover:text-primary transition-colors">
            NOTICIAS
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
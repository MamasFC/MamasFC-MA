import { motion } from "framer-motion";
import { Shirt, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timelineEvents = [
  { 
    year: "2015", 
    title: "Fundación", 
    description: "Nace Mamas como un grupo de amigos que jugaban Counter-Strike. Fue el inicio del nombre y la identidad del club, aunque con el tiempo el proyecto quedó totalmente inactivo." 
  },
  { 
    year: "2024", 
    title: "El Regreso", 
    description: "Mamas FC vuelve a la vida como un nuevo equipo de amigos, esta vez en HaxBall. No llegaron muchas victorias, pero el verdadero objetivo era divertirnos y disfrutar nuestra primera competencia oficial." 
  },
  { 
    year: "2025", 
    title: "Equipo Competitivo", 
    description: "El plantel se vuelve mucho más fuerte con la llegada de jugadores como Ruud Gullit, Gerginsho y Caucho. Con ilusión y esfuerzo, Mamas FC alcanza una final, pero cae ante Laira FC en un partido muy disputado." 
  },
  { 
    year: "2026", 
    title: "Nuevo Proyecto", 
    description: "Comienza una nueva etapa con fichajes importantes y también despedidas de algunos amigos que dejaron el club. El equipo mantiene una mentalidad renovada y un hambre de ganar bestial." 
  },
];


const camisetas = [
  { id: 1, year: "2024", description: "Primera camiseta oficial", colors: ["hsl(145, 65%, 30%)", "hsl(0, 0%, 100%)"] },
  { id: 2, year: "2025", description: "Camiseta alternativa", colors: ["hsl(0, 85%, 3%)", "hsl(189, 77%, 12%)"] },
  { id: 3, year: "2026", description: "Edición especial", colors: ["hsl(34, 78%, 46%)", "hsl(0, 0%, 100%)"] },
];

const escudos = [
  { id: 1, year: "2015", description: "Escudo fundacional — Diseño clásico con las iniciales MA" },
  { id: 2, year: "2025", description: "Rediseño moderno — Líneas más limpias, iconografía actualizada" },
  { id: 3, year: "2026", description: "Escudo actual — Versión definitiva con identidad consolidada" },
];

const HistoriaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-12 bg-primary" />
            <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">NUESTRO CAMINO</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-4">HISTORIA</h1>
          <p className="font-body text-muted-foreground mb-16 max-w-xl">La trayectoria de Mamas FC desde su fundación.</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-24">
          <div className="timeline-line" />
          <div className="space-y-16">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"} justify-start`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 md:left-1/2 top-2 w-4 h-4 bg-primary border-2 border-background rounded-full -translate-x-1/2 z-10 hidden md:block" />
                <div className="absolute left-6 top-2 w-4 h-4 bg-primary border-2 border-background rounded-full -translate-x-1/2 z-10 md:hidden" />

                <div className={`bg-card border border-border p-6 sm:p-8 w-full md:w-5/12 ml-10 md:ml-0 ${i % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}>
                  <span className="font-display text-3xl font-bold text-primary mb-2 block">{event.year}</span>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Camisetas */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Shirt className="text-primary" size={20} />
            <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">CAMISETAS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {camisetas.map((cam, i) => (
              <motion.div
                key={cam.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-border p-6 text-center group hover:border-primary/30 transition-all"
              >
                {/* Shirt visual representation */}
                <div className="w-24 h-28 mx-auto mb-4 relative">
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      background: `linear-gradient(135deg, ${cam.colors[0]} 50%, ${cam.colors[1]} 50%)`,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-xs font-bold text-foreground opacity-60">MA</span>
                  </div>
                </div>
                <span className="font-display text-2xl font-bold text-primary block mb-1">{cam.year}</span>
                <p className="font-body text-xs text-muted-foreground">{cam.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Escudos */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="text-primary" size={20} />
            <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">ESCUDOS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {escudos.map((esc, i) => (
              <motion.div
                key={esc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-border p-6 group hover:border-primary/30 transition-all"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-muted border border-border rounded-sm flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <span className="font-display text-lg font-bold text-primary">MA</span>
                </div>
                <span className="font-display text-xl font-bold text-primary block text-center mb-2">{esc.year}</span>
                <p className="font-body text-xs text-muted-foreground text-center">{esc.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Motivational quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glow-border bg-card p-12 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <span className="font-display text-8xl sm:text-9xl text-primary/10 absolute top-4 left-1/2 -translate-x-1/2 select-none"></span>
          <blockquote className="font-display text-2xl sm:text-4xl font-bold text-foreground leading-tight mb-6 relative z-10">
            NO JUGAMOS PARA GANAR,<br />
            <span className="text-primary glow-text">GANAMOS PORQUE JUGAMOS JUNTOS.</span>
          </blockquote>
          <p className="font-display text-sm tracking-[0.3em] text-muted-foreground">— MAMAS FC</p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoriaPage;
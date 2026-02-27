import { useState } from "react";
import { motion } from "framer-motion";
import { User, Star, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PlayerCategory = "activos" | "leyendas" | "especiales";

interface Player {
  id: number;
  name: string;
  position: string;
  number?: number;
  category: PlayerCategory;
  role?: string;
  image?: string; // 👈 agregamos esto
}


const players: Player[] = [
  // Activos
  { id: 1, name: "Duraznito", position: "Defensor", number: 1, category: "activos", role: "DT", image: "/Escudos/Plantel/MAMAS FC (1).jpg"},
  { id: 2, name: "Ruud Gullit", position: "Defensor", number: 2, category: "activos", role: "Capitán", image: "/Escudos/Plantel/MAMAS FC (2).jpg"},
  { id: 3, name: "Gersinho", position: "Defensor", number: 3, category: "activos", image: "/Escudos/Plantel/MAMAS FC (5).jpg"},
  { id: 4, name: "Hellfire", position: "Defensor", number: 4, category: "activos", image: "/Escudos/Plantel/MAMAS FC (12).jpg"},
  { id: 5, name: "Chisito MVP", position: "Arquero", number: 5, category: "activos" },
  { id: 6, name: "Campera", position: "Mediocampista", number: 6, category: "activos" },
  { id: 7, name: "Aleman", position: "Mediocampista", number: 7, category: "activos" },
  { id: 8, name: "Robinho", position: "Mediocampista", number: 8, category: "activos" },
  { id: 9, name: "DPL", position: "Delantero", number: 9, category: "activos" },
  { id: 10, name: "FCB", position: "Delantero", number: 10, category: "activos" },
  { id: 11, name: "German Lux", position: "Arquero", number: 11, category: "activos" },
  { id: 12, name: "Borja", position: "Arquero", number: 12, category: "activos" },
  { id: 13, name: "Bnnx", position: "Delantero", number: 13, category: "activos", image: "/Escudos/Plantel/MAMAS FC (10).jpg"}, 

  // Leyendas
  { id: 14, name: "Franki", position: "Mediocampista", number: 14, category: "leyendas" },
  { id: 15, name: "Gio", position: "Delantero", number: 15, category: "leyendas" },
  { id: 16, name: "Caucho", position: "Delantero", number: 16, category: "leyendas", image: "/Escudos/Plantel/MAMAS FC (4).jpg" },
  { id: 17, name: "Prime", position: "Delantero", number: 17, category: "leyendas" },
  { id: 18, name: "Sharaawy", position: "Mediocampista", number: 18, category: "leyendas", image: "/Escudos/Plantel/MAMAS FC (3).jpg"},
  { id: 19, name: "Dylan", position: "Delantero", number: 19, category: "leyendas" },
  { id: 20, name: "Di Maria", position: "Delantero", number: 20, category: "leyendas", image: "/Escudos/Plantel/MAMAS FC (11).jpg" },


  // Especiales
 // { id: 1, name: "Duraznito", position: "Defensor", number: 1, category: "especiales", role: "DT" },
  //{ id: 2, name: "Ruud Gullit", position: "Defensor", number: 2, category: "especiales", role: "Capitán" },
  //{ id: 3, name: "Gersinho", position: "Defensor", number: 3, category: "especiales", role: "Subcapitán" },
];

const categoryConfig = {
  activos: { label: "ACTIVOS", description: "Jugadores actuales del plantel", icon: User, color: "text-primary" },
  leyendas: { label: "LEYENDAS", description: "Los que hicieron historia y dejaron el club", icon: Star, color: "text-secondary" },
 // especiales: { label: "ESPECIALES", description: "Cuerpo técnico y capitanes", icon: Crown, color: "text-primary" },
};

const PlantelPage = () => {
  const [activeTab, setActiveTab] = useState<PlayerCategory>("activos");

  const currentPlayers = players.filter((p) => p.category === activeTab);
  const config = categoryConfig[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-12 bg-primary" />
            <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">EQUIPO</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-4">PLANTEL</h1>
          <p className="font-body text-muted-foreground mb-8">Conocé a cada integrante de Mamas FC.</p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-10">
          {(Object.keys(categoryConfig) as PlayerCategory[]).map((cat) => {
            const cfg = categoryConfig[cat];
            const Icon = cfg.icon;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex items-center gap-2 px-5 py-3 font-display text-xs tracking-wider transition-all border ${
                  activeTab === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/30"
                }`}
              >
                <Icon size={14} />
                {cfg.label}
              </button>
            );
          })}
        </div>

        {/* Category description */}
        <p className="font-body text-sm text-muted-foreground mb-6">{config.description}</p>

        {/* Players grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentPlayers.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-card border border-border hover:border-primary/30 transition-all group relative overflow-hidden"
            >
              {/* Number background */}
              {player.number && (
                <div className="absolute -top-4 -right-2 font-display text-8xl font-bold text-muted/30 select-none">
                  {player.number}
                </div>
              )}

              <div className="p-6 relative z-10">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-sm bg-muted flex items-center justify-center mb-4 border border-border group-hover:border-primary/30 transition-colors overflow-hidden">
                  {player.image ? (
                     <img
                        src={player.image}
                        alt={player.name}
                         className="w-full h-full object-cover"
    />
  ) : (
    <span className="font-display text-xl font-bold text-muted-foreground">
      {player.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
    </span>
  )}
</div>


                <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                  {player.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-2">{player.position}</p>

                {player.role && (
                  <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary font-display text-[10px] tracking-wider font-semibold">
                    {player.role.toUpperCase()}
                  </span>
                )}

                {player.number && activeTab !== "especiales" && (
                  <div className="mt-3 font-display text-[10px] tracking-[0.2em] text-muted-foreground">
                    DORSAL #{player.number}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlantelPage;
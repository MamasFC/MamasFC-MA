import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Competition = "Todos" | "JRS" | "Pegeche" | "Amistoso" | "Copa JRS" | "Copa Pegeche";

interface Match {
  id: number;
  rival: string;
  scoreHome: number;
  scoreAway: number;
  date: string;
  competition: Competition;
  result: "W" | "D" | "L";
  location: string;
}

const matches: Match[] = [
  { id: 1, rival: "White Panthers King", scoreHome: 1, scoreAway: 0, date: "12/02/2026", competition: "Pegeche", result: "W", location: "Local" },
  { id: 2, rival: "White Panthers King", scoreHome: 0, scoreAway: 1, date: "11/02/2026", competition: "Amistoso", result: "L", location: "Visitante" },
  { id: 3, rival: "White Panthers King", scoreHome: 1, scoreAway: 0, date: "11/02/2026", competition: "Amistoso", result: "W", location: "Local" },
  { id: 4, rival: "Diablos Rojos", scoreHome: 1, scoreAway: 2, date: "10/02/2026", competition: "Amistoso", result: "L", location: "Local" },
  { id: 5, rival: "White Panthers King", scoreHome: 1, scoreAway: 1, date: "10/02/2026", competition: "Amistoso", result: "D", location: "Visitante" },
  { id: 6, rival: "Hawks FC", scoreHome: 4, scoreAway: 0, date: "07/02/2026", competition: "Amistoso", result: "W", location: "Local" },
  { id: 7, rival: "Furros Snowrers", scoreHome: 3, scoreAway: 2, date: "07/02/2026", competition: "Amistoso", result: "W", location: "Local" },
  { id: 8, rival: "Atletico de Madird", scoreHome: 6, scoreAway: 1, date: "04/02/2026", competition: "Amistoso", result: "W", location: "Visitante" },
  { id: 9, rival: "Furros Snowers", scoreHome: 4, scoreAway: 1, date: "03/12/2025", competition: "Amistoso", result: "W", location: "Local" },
  { id: 10, rival: "Hawks FC", scoreHome: 4, scoreAway: 0, date: "02/12/2025", competition: "Amistoso", result: "W", location: "Visitante" },
];

const filters: Competition[] = ["Todos", "JRS", "Pegeche", "Copa JRS", "Copa Pegeche", "Amistoso"];

const competitionStyle: Record<string, string> = {
  JRS: "bg-destructive/20 text-destructive border-destructive/30",
  Pegeche: "bg-secondary/20 text-secondary border-secondary/30",
  "Copa JRS": "bg-destructive/10 text-destructive border-destructive/20",
  "Copa Pegeche": "bg-secondary/10 text-secondary border-secondary/20",
  Amistoso: "bg-muted text-muted-foreground border-border",
};

const resultBg: Record<string, string> = {
  W: "bg-primary text-primary-foreground",
  D: "bg-secondary text-secondary-foreground",
  L: "bg-destructive text-destructive-foreground",
};

const PartidosPage = () => {
  const [filter, setFilter] = useState<Competition>("Todos");

  const filtered = filter === "Todos" ? matches : matches.filter((m) => m.competition === filter);

  const baseW = 32;
  const baseD = 18;
  const baseL = 53;

  const totalW = baseW + matches.filter((m) => m.result === "W").length;
  const totalD = baseD + matches.filter((m) => m.result === "D").length;
  const totalL = baseL + matches.filter((m) => m.result === "L").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-10 px-4 xs:px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="h-px w-10 bg-primary" />
            <span className="font-display text-xs tracking-[0.25em] text-primary font-medium">HISTORIAL</span>
          </div>
          <h1 className="font-display text-4xl xs:text-4.5xl sm:text-5xl md:text-6xl font-bold text-foreground mb-3 sm:mb-4">
            PARTIDOS
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-6 sm:mb-8 max-w-lg">
            Todos los encuentros de Mamas FC en cada competición.
          </p>
        </motion.div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-8 sm:mb-10">
          {[
            { label: "VICTORIAS", value: totalW, color: "text-primary" },
            { label: "EMPATES", value: totalD, color: "text-secondary" },
            { label: "DERROTAS", value: totalL, color: "text-destructive" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border p-3 sm:p-5 md:p-6 text-center rounded-lg flex flex-col items-center justify-center min-h-[90px] sm:min-h-[110px]"
            >
              <span className={`font-display text-2xl xs:text-3xl sm:text-4xl font-extrabold ${s.color}`}>
                {s.value}
              </span>
              <div className="font-display text-[9px] xs:text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.25em] text-muted-foreground mt-1.5 sm:mt-2 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filtros con scroll horizontal en móvil */}
        <div className="flex flex-nowrap overflow-x-auto gap-2 pb-3 mb-6 sm:mb-8 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 font-display text-xs sm:text-sm tracking-wider transition-all border rounded-md whitespace-nowrap ${
                filter === f
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 active:border-primary/60"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Lista de partidos */}
        <div className="space-y-3 sm:space-y-4">
          {filtered.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              className="bg-card border border-border hover:border-primary/30 transition-colors p-4 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                {/* Izquierda: resultado + equipos + marcador */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`min-w-8 h-8 flex items-center justify-center font-display text-sm font-bold rounded ${resultBg[match.result]}`}
                  >
                    {match.result === "W" ? "V" : match.result === "D" ? "E" : "D"}
                  </span>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="font-display text-sm font-semibold text-foreground">MAMAS FC</span>
                    <span className="font-display text-lg sm:text-xl font-bold text-primary">
                      {match.scoreHome} – {match.scoreAway}
                    </span>
                    <span className="font-display text-sm font-semibold text-muted-foreground">
                      {match.rival.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Derecha: competición + lugar + fecha */}
                <div className="flex items-center gap-3 flex-wrap sm:text-right">
                  <span
                    className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold border rounded-full ${competitionStyle[match.competition]}`}
                  >
                    {match.competition.toUpperCase()}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">{match.location}</span>
                  <span className="font-body text-xs text-muted-foreground">{match.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PartidosPage;
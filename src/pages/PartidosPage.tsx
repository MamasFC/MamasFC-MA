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
      <div className="pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-12 bg-primary" />
            <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">HISTORIAL</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-4">PARTIDOS</h1>
          <p className="font-body text-muted-foreground mb-8 max-w-xl">Todos los encuentros de Mamas FC en cada competición.</p>
        </motion.div>

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "VICTORIAS", value: totalW, color: "text-primary" },
            { label: "EMPATES", value: totalD, color: "text-secondary" },
            { label: "DERROTAS", value: totalL, color: "text-destructive" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border p-6 text-center">
              <span className={`font-display text-4xl font-bold ${s.color}`}>{s.value}</span>
              <div className="font-display text-[10px] tracking-[0.3em] text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-display text-xs tracking-wider transition-all border ${
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/30"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Match list */}
        <div className="space-y-2">
          {filtered.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="bg-card border border-border hover:border-primary/20 transition-colors p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className={`w-8 h-8 flex items-center justify-center font-display text-xs font-bold ${resultBg[match.result]}`}>
                    {match.result === "W" ? "V" : match.result === "D" ? "E" : "D"}
                  </span>
                  <span className="font-display text-sm tracking-wider text-foreground font-semibold">MAMAS FC</span>
                  <span className="font-display text-xl font-bold text-primary">{match.scoreHome} - {match.scoreAway}</span>
                  <span className="font-display text-sm tracking-wider text-muted-foreground font-semibold">{match.rival.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-2 py-0.5 font-display text-[10px] tracking-wider font-semibold border ${competitionStyle[match.competition]}`}>
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
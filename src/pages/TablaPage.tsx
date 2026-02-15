import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type TablaType = "jrs" | "pegeche" | "copa-jrs" | "copa-pegeche";

interface TeamStanding {
  pos: number;
  team: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  pts: number;
  isMamas?: boolean;
}

interface CupMatch {
  team1: string;
  score1?: number;
  team2: string;
  score2?: number;
  isMamas1?: boolean;
  isMamas2?: boolean;
}

const jrsTable: TeamStanding[] = [
  { pos: 1, team: "Hawks FC", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 2, team: "Mamas FC", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0, isMamas: true },
  { pos: 3, team: "Furros Snowers", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 4, team: "Los Diablos Rojos", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 5, team: "Monogamia", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 6, team: "Barceloan", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 7, team: "White Panther Kings", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 8, team: "Valunir FC", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 9, team: "Goen Fedi FC", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 10, team: "Laira FC", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 11, team: "Cornudos FC", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  { pos: 12, team: "Wanderers", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
];

const pegecheTable: TeamStanding[] = [
  { pos: 1, team: "Monogamia FC", pj: 1, pg: 1, pe: 0, pp: 0, gf: 3, gc: 0, pts: 3 },
  { pos: 2, team: "Los Diablos Rojos", pj: 1, pg: 1, pe: 0, pp: 0, gf: 3, gc: 2, pts: 3 },
  { pos: 3, team: "Mamas FC", pj: 1, pg: 1, pe: 0, pp: 0, gf: 1, gc: 0, pts: 3, isMamas: true },
  { pos: 4, team: "Hawks FC", pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 3, pts: 0 },
  { pos: 5, team: "White Panther Kings", pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 1, pts: 0 },
  { pos: 6, team: "Backyarigans FC", pj: 1, pg: 0, pe: 0, pp: 0, gf: 0, gc: 3, pts: 0 },
];

const copaJRS: CupMatch[] = [
  { team1: "FC Tormenta", score1: 2, team2: "Racing CP", score2: 0 },
  { team1: "Mamas FC", team2: "Real Amigos", isMamas1: true },
  { team1: "Los Pibes FC", team2: "Club Barrio Sur" },
  { team1: "Atlético Luna", team2: "Halcones FC" },
];

const copaPegeche: CupMatch[] = [
  { team1: "Deportivo Norte", team2: "Atlético Luna" },
  { team1: "Racing CP", team2: "Estrella FC" },
  { team1: "Mamas FC", team2: "Halcones FC", isMamas1: true },
  { team1: "San Martín", team2: "FC Tormenta" },
];

const tabs = [
  { id: "jrs" as TablaType, label: "TABLA JRS", color: "bg-destructive" },
  { id: "pegeche" as TablaType, label: "TABLA PEGECHE", color: "bg-secondary" },
  { id: "copa-jrs" as TablaType, label: "COPA JRS", color: "bg-destructive" },
  { id: "copa-pegeche" as TablaType, label: "COPA PEGECHE", color: "bg-secondary" },
];

const TablaPage = () => {
  const [activeTab, setActiveTab] = useState<TablaType>("jrs");

  const isLeague = activeTab === "jrs" || activeTab === "pegeche";
  const table = activeTab === "jrs" ? jrsTable : pegecheTable;
  const cup = activeTab === "copa-jrs" ? copaJRS : copaPegeche;
  const accentColor = activeTab.includes("jrs") ? "destructive" : "secondary";
  // CONTROL DE COPAS
const cupStarted = false; // 🔥 cambiar a true cuando comiencen las copas


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-12 bg-primary" />
            <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">POSICIONES</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-4">TABLA</h1>
          <p className="font-body text-muted-foreground mb-8">Seguí la posición de Mamas FC en cada competición.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-display text-xs tracking-wider transition-all border ${
                activeTab === tab.id
                  ? `${tab.color} text-foreground border-transparent`
                  : "bg-card text-muted-foreground border-border hover:border-primary/30"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${tab.color}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {isLeague ? (
          /* League table */
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["#", "EQUIPO", "PJ", "PG", "PE", "PP", "GF", "GC", "PTS"].map((h) => (
                      <th key={h} className={`py-4 px-3 font-display text-xs tracking-wider text-muted-foreground text-left ${h === "PTS" ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.map((team, i) => (
                    <motion.tr
                      key={team.team}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className={`border-b border-border/50 transition-colors ${
                        team.isMamas
                          ? `bg-primary/10 border-l-2 border-l-primary`
                          : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="py-3 px-3 font-display text-sm text-muted-foreground">{team.pos}</td>
                      <td className={`py-3 px-3 font-display text-sm tracking-wider font-semibold ${team.isMamas ? "text-primary" : "text-foreground"}`}>
                        {team.team.toUpperCase()}
                      </td>
                      <td className="py-3 px-3 font-body text-sm text-muted-foreground">{team.pj}</td>
                      <td className="py-3 px-3 font-body text-sm text-muted-foreground">{team.pg}</td>
                      <td className="py-3 px-3 font-body text-sm text-muted-foreground">{team.pe}</td>
                      <td className="py-3 px-3 font-body text-sm text-muted-foreground">{team.pp}</td>
                      <td className="py-3 px-3 font-body text-sm text-muted-foreground">{team.gf}</td>
                      <td className="py-3 px-3 font-body text-sm text-muted-foreground">{team.gc}</td>
                      <td className={`py-3 px-3 font-display text-sm font-bold text-right ${team.isMamas ? "text-primary" : "text-foreground"}`}>
                        {team.pts}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
  <motion.div
    key={activeTab}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {!cupStarted ? (
      /* 🔒 COPA NO INICIADA */
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground mb-4">
          COMPETICIÓN NO INICIADA
        </h2>

        <p className="font-body text-muted-foreground max-w-md">
          {activeTab === "copa-jrs"
            ? "La Copa JRS aún no ha comenzado. El fixture está a definir."
            : "La Copa Pegeche aún no ha comenzado. El fixture está a definir."}
        </p>
      </div>
    ) : (
      <>
        {/* ========================================= */}
        {/* 🔥 BRACKET ORIGINAL (NO BORRADO) */}
        {/* ========================================= */}

        <div className="mb-6">
          <span
            className={`font-display text-sm tracking-[0.3em] font-medium text-${accentColor}`}
          >
            OCTAVOS DE FINAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cup.map((match, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`bg-card border border-border p-6 ${
                match.isMamas1 || match.isMamas2
                  ? "border-l-2 border-l-primary"
                  : ""
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-display text-sm tracking-wider font-semibold ${
                      match.isMamas1
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {match.team1.toUpperCase()}
                  </span>
                  {match.score1 !== undefined && (
                    <span className="font-display text-lg font-bold text-foreground">
                      {match.score1}
                    </span>
                  )}
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between">
                  <span
                    className={`font-display text-sm tracking-wider font-semibold ${
                      match.isMamas2
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {match.team2.toUpperCase()}
                  </span>
                  {match.score2 !== undefined && (
                    <span className="font-display text-lg font-bold text-foreground">
                      {match.score2}
                    </span>
                  )}
                </div>
              </div>

              {match.score1 === undefined && (
                <div className="mt-3 text-center">
                  <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                    POR JUGAR
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </>
    )}
  </motion.div>
)
}
      </div>
      <Footer />
    </div>
  );
};

export default TablaPage;
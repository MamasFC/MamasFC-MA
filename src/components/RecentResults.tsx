import { motion } from "framer-motion";

const results = [
  { rival: "White Panthers King", score: "1-0", result: "W", date: "12/02", competition: "Pegeche" },
  { rival: "White Panthers King", score: "0-1", result: "L", date: "11/02", competition: "Amistoso" },
  { rival: "White Panthers King", score: "1-0", result: "W", date: "11/02", competition: "Amistoso" },
  { rival: "Diablos Rojos", score: "1-2", result: "L", date: "10/02", competition: "Amistoso" },
  { rival: "White Panthers King", score: "1-1", result: "D", date: "10/02", competition: "Amistoso" },
];


const resultColors: Record<string, string> = {
  W: "bg-primary text-primary-foreground",
  D: "bg-secondary text-secondary-foreground",
  L: "bg-destructive text-destructive-foreground",
};

const resultLabels: Record<string, string> = { W: "V", D: "E", L: "D" };

const competitionColors: Record<string, string> = {
  JRS: "bg-destructive/10 text-destructive border-destructive/30",
  Pegeche: "bg-secondary/10 text-secondary border-secondary/30",
  Amistoso: "bg-muted text-muted-foreground border-border",
  // Agregá más si tenés Copa JRS, etc.
};

const RecentResults = () => {
  return (
    <section className="py-16 sm:py-20 px-4 xs:px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
          <div className="h-px w-10 bg-primary" />
          <span className="font-display text-xs sm:text-sm tracking-[0.25em] text-primary font-medium">
            ÚLTIMOS RESULTADOS
          </span>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {results.map((match, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.35 }}
              className="bg-card border border-border hover:border-primary/30 transition-all rounded-lg shadow-sm p-4 sm:p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                {/* Lado izquierdo: resultado + MAMAS FC + score + rival */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`min-w-8 h-8 flex items-center justify-center font-display text-sm font-bold rounded ${resultColors[match.result]}`}
                  >
                    {resultLabels[match.result]}
                  </span>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="font-display text-sm font-semibold text-foreground">MAMAS FC</span>
                    <span className="font-display text-base sm:text-lg font-bold text-primary">
                      {match.score}
                    </span>
                    <span className="font-display text-sm font-semibold text-muted-foreground">
                      {match.rival.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Lado derecho: competición + fecha */}
                <div className="flex items-center gap-3 flex-wrap sm:justify-end">
                  <span
                    className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold border rounded-full ${competitionColors[match.competition] || "bg-muted text-muted-foreground border-border"}`}
                  >
                    {match.competition.toUpperCase()}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">{match.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RecentResults;
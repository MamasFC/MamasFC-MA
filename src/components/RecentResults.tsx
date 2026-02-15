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
  JRS: "text-destructive",
  Pegeche: "text-secondary",
  Amistoso: "text-muted-foreground",
};

const RecentResults = () => {
  return (
    <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-primary" />
          <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">ÚLTIMOS RESULTADOS</span>
        </div>

        <div className="space-y-2">
          {results.map((match, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="flex items-center justify-between bg-card border border-border hover:border-primary/20 transition-colors px-6 py-4 group"
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 flex items-center justify-center font-display text-xs font-bold ${resultColors[match.result]}`}>
                  {resultLabels[match.result]}
                </span>
                <span className="font-display text-sm tracking-wider text-foreground font-semibold">MAMAS FC</span>
                <span className="font-display text-lg font-bold text-primary">{match.score}</span>
                <span className="font-display text-sm tracking-wider text-muted-foreground font-semibold">{match.rival.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-display text-[10px] tracking-wider font-semibold ${competitionColors[match.competition]}`}>
                  {match.competition.toUpperCase()}
                </span>
                <span className="font-body text-xs text-muted-foreground">{match.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RecentResults;
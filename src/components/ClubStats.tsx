import { motion } from "framer-motion";

const stats = [
  { value: "2015", label: "AÑO DE FUNDACIÓN" },
  { value: "2", label: "COMPETICIONES ACTIVAS" },
  { value: "JRS", label: "LIGA PRINCIPAL" },
  { value: "PGH", label: "TORNEO PEGECHE" },
];

const ClubStats = () => {
  return (
    <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="text-center py-10 px-4 bg-card border border-border hover:border-primary/30 transition-all group"
          >
            <span className="font-display text-4xl sm:text-5xl font-bold text-primary group-hover:glow-text transition-all">
              {stat.value}
            </span>
            <div className="mt-3 font-display text-[10px] tracking-[0.3em] text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ClubStats;
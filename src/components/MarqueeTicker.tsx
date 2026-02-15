const headlines = [
  "⚽ MAMAS FC — PASIÓN VERDE",
  "🏆 COMPETIMOS EN JRS Y PEGECHE",
  "📋 PLANTEL RENOVADO PARA ESTA TEMPORADA",
  "🔥 SEGUÍ TODOS NUESTROS PARTIDOS",
  "📅 MIRÁ LA TABLA DE POSICIONES",
  "💪 MAMAS FC NUNCA SE RINDE",
];

const MarqueeTicker = () => {
  return (
    <div className="w-full bg-primary overflow-hidden py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...headlines, ...headlines].map((headline, i) => (
          <span key={i} className="mx-12 font-display text-sm tracking-wider font-semibold text-primary-foreground">
            {headline}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
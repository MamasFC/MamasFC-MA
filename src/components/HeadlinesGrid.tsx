import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// These would come from the same data source as Noticias — title + excerpt only, no media
const headlines = [
  {
    id: 1,
    category: "PARTIDO",
    title: "Debut oficial con victoria en Liga Pegeche",
    excerpt:
      "Mamas FC ganó 1-0 con un golazo de Campera y sumó sus primeros tres puntos oficiales.",
    featured: true,
  },
  {
    id: 2,
    category: "PLANTEL",
    title: "Borja refuerza el arco del equipo",
    excerpt:
      "El arquero llega para cubrir la baja temporal de Germán Lux.",
    featured: false,
  },
  {
    id: 3,
    category: "CLUB",
    title: "FCB fue presentado como nuevo refuerzo",
    excerpt:
      "El mediocampista aportará clase y nivel al plantel.",
    featured: false,
  },
  {
    id: 4,
    category: "PLANTEL",
    title: "Monkey quedó libre en Liga JRS",
    excerpt:
      "La directiva tomó la decisión por reiteradas ausencias.",
    featured: false,
  },
  {
    id: 5,
    category: "INSTITUCIONAL",
    title: "Cuenta regresiva para la Liga Pegeche",
    excerpt:
      "El equipo está motivado y enfocado en pelear por el título.",
    featured: false,
  },
  {
    id: 6,
    category: "DESARROLLO",
    title: "Preparativos técnicos para Liga JRS",
    excerpt:
      "Se continúan probando scripts y evaluando una VPS.",
    featured: false,
  },
];

const HeadlinesGrid = () => {
  const featured = headlines[0];
  const rest = headlines.slice(1);

  return (
    <section id="noticias" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-secondary" />
            <span className="font-display text-sm tracking-[0.3em] text-secondary font-medium">TITULARES</span>
          </div>
          <Link to="/noticias" className="font-display text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors">
            VER TODAS →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Featured — only title + excerpt, NO media */}
          <Link to="/noticias" className="lg:col-span-2 lg:row-span-2 block">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="h-full group relative bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="p-8 sm:p-12 h-full flex flex-col justify-between min-h-[280px]">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-display text-xs tracking-wider font-semibold mb-4">
                    {featured.category}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featured.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-base leading-relaxed max-w-lg">{featured.excerpt}</p>
                </div>
                <div className="mt-8">
                  <span className="font-display text-xs tracking-wider text-primary font-semibold group-hover:tracking-[0.3em] transition-all">
                    IR A NOTICIAS →
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Others — title + excerpt only */}
          {rest.map((item, index) => (
            <Link key={item.id} to="/noticias" className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="h-full group bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer p-6 relative"
              >
                <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground font-display text-[10px] tracking-wider font-semibold mb-3">
                  {item.category}
                </span>
                <h4 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.excerpt}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeadlinesGrid;
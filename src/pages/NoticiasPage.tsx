import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Image, FileText, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type NewsType = "video" | "imagen" | "texto";

interface NewsItem {
  id: number;
  type: NewsType;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  videoUrl?: string;
  imageUrl?: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    type: "video",
    title: "Debut oficial con victoria en Liga Pegeche",
    excerpt: "Mamas FC ganó 1-0 con un golazo de Campera en el primer partido oficial.",
    content:
      "Mamas FC consiguió su primera victoria oficial en la Liga Pegeche tras imponerse 1-0 el 12/02/2026. El único tanto del encuentro lo convirtió 'Campera' con un verdadero golazo que desató la alegría del equipo. Un inicio histórico que llena de confianza al plantel.",
    date: "12/02/2026",
    category: "PARTIDO",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // URL de ejemplo
  },
  {
    id: 2,
    type: "texto",
    title: "Borja se suma como nuevo arquero",
    excerpt: "Refuerzo clave tras la baja temporal de Germán Lux.",
    content:
      "El club confirmó la llegada de 'Borja' como nuevo arquero del plantel. Su incorporación se da tras la baja temporal de Germán Lux. Con buena técnica y experiencia, llega para aportar seguridad y competencia bajo los tres palos.",
    date: "12/02/2026",
    category: "PLANTEL",
  },
  {
    id: 3,
    type: "imagen",
    title: "FCB fue presentado como nuevo refuerzo",
    excerpt: "El mediocampista llega con clase y nivel competitivo.",
    content:
      "El mediocampista 'FCB' fue presentado oficialmente como nuevo jugador de Mamas FC el 08/02/2026. Destacado por su visión de juego y calidad técnica, llega para reforzar el mediocampo y aportar jerarquía al equipo.",
    date: "08/02/2026",
    category: "CLUB",
    imageUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800",
  },
  {
    id: 4,
    type: "texto",
    title: "Monkey quedó libre en Liga JRS",
    excerpt: "La directiva tomó la decisión por falta de compromiso.",
    content:
      "La dirigencia decidió dejar libre a 'Monkey' de la Liga JRS debido a reiteradas ausencias en amistosos y falta de compromiso con el equipo. El club agradece el tiempo compartido y le desea lo mejor en sus próximos proyectos.",
    date: "07/02/2026",
    category: "PLANTEL",
  },
  {
    id: 5,
    type: "texto",
    title: "Comienza la ilusión en Liga Pegeche",
    excerpt: "El equipo está motivado para pelear por el título.",
    content:
      "La Liga Pegeche está a punto de comenzar y el plantel vive un clima de entusiasmo y compromiso. Mamas FC afronta esta nueva etapa con el objetivo claro de competir al máximo nivel y luchar por el campeonato.",
    date: "05/02/2026",
    category: "INSTITUCIONAL",
  },
  {
    id: 6,
    type: "texto",
    title: "Preparativos técnicos para Liga JRS",
    excerpt: "Pruebas del script y evaluación de una VPS.",
    content:
      "Mientras se espera el inicio de la Liga JRS, el equipo continúa probando el script oficial y analizando opciones para contratar una VPS que garantice estabilidad. El objetivo es llegar al torneo con todo funcionando correctamente.",
    date: "02/02/2026",
    category: "DESARROLLO",
  },
];

const typeIcons: Record<NewsType, typeof Play> = { video: Play, imagen: Image, texto: FileText };
const typeLabels: Record<NewsType, string> = { video: "VIDEO", imagen: "IMAGEN", texto: "TEXTO" };

const NoticiasPage = () => {
  const [filterType, setFilterType] = useState<NewsType | "todos">("todos");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filtered = filterType === "todos" ? newsData : newsData.filter((n) => n.type === filterType);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-12 bg-primary" />
            <span className="font-display text-sm tracking-[0.3em] text-primary font-medium">NOVEDADES</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-4">NOTICIAS</h1>
          <p className="font-body text-muted-foreground mb-8">Todas las novedades de Mamas FC al instante.</p>
        </motion.div>

        {/* Type filter */}
        <div className="flex gap-2 mb-10">
          {(["todos", "video", "imagen", "texto"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-2 font-display text-xs tracking-wider transition-all border ${
                filterType === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/30"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((news, i) => {
            const Icon = typeIcons[news.type];
            return (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => setSelectedNews(news)}
                className="bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Type indicator stripe */}
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground font-display text-[10px] tracking-wider font-semibold">
                      {news.category}
                    </span>
                    <div className="flex items-center gap-1 text-primary">
                      <Icon size={14} />
                      <span className="font-display text-[10px] tracking-wider">{typeLabels[news.type]}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                    {news.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-muted-foreground">{news.date}</span>
                    <span className="font-display text-xs tracking-wider text-primary font-semibold group-hover:tracking-[0.2em] transition-all">
                      LEER MÁS →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* News detail modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary font-display text-[10px] tracking-wider font-semibold">
                      {selectedNews.category}
                    </span>
                    <span className="font-body text-xs text-muted-foreground">{selectedNews.date}</span>
                  </div>
                  <button onClick={() => setSelectedNews(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <h2 className="font-display text-3xl font-bold text-foreground mb-6 leading-tight">
                  {selectedNews.title}
                </h2>

                {/* Media content - only visible in full view */}
                {selectedNews.type === "video" && selectedNews.videoUrl && (
                  <div className="mb-6 aspect-video bg-muted">
                    <iframe
                      src={selectedNews.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                      title={selectedNews.title}
                    />
                  </div>
                )}

                {selectedNews.type === "imagen" && selectedNews.imageUrl && (
                  <div className="mb-6">
                    <img
                      src={selectedNews.imageUrl}
                      alt={selectedNews.title}
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                )}

                <p className="font-body text-foreground leading-relaxed text-base">
                  {selectedNews.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default NoticiasPage;
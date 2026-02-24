import { useState } from "react";
import { LEAGUES, type LeagueConfig } from "@/data/leagues";
import { FormationCreator } from "@/components/leagues/FormationCreator";
import { ArrowLeft } from "lucide-react";

const LigasJugadas = () => {
  const [selectedLeague, setSelectedLeague] = useState<LeagueConfig>(LEAGUES[0]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-primary/20 sticky top-0 z-30" style={{ backgroundColor: "hsl(var(--primary) / 0.08)" }}>
        <div className="container mx-auto px-4 flex items-center gap-4 h-14">
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-lg tracking-wide text-foreground">
              CREAR FORMACIÓN
            </span>
            <span className="text-[10px] font-display font-semibold tracking-[0.3em] text-primary uppercase">
              MAMAS FC
            </span>
          </div>

          {/* League selector tabs */}
          <div className="ml-auto flex items-center gap-1 bg-primary/50 rounded-lg p-1">
            {LEAGUES.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLeague(l)}
                className={`px-4 py-1.5 rounded-md font-display font-bold text-xs tracking-wider transition-all duration-200 ${
                  selectedLeague.id === l.id
                    ? "text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={
                  selectedLeague.id === l.id
                    ? { backgroundColor: `hsl(var(${l.colorVar}))`, color: l.id === "pegeche" ? "hsl(0 0% 10%)" : undefined }
                    : undefined
                }
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <FormationCreator key={selectedLeague.id} league={selectedLeague} />
      </div>
    </div>
  );
};

export default LigasJugadas;

import type { LeagueConfig } from "@/data/leagues";
import { Users } from "lucide-react";

interface LeagueCardProps {
  league: LeagueConfig;
  onSelect: () => void;
}

export function LeagueCard({ league, onSelect }: LeagueCardProps) {
  return (
    <div
      className={`glass-card ${league.glowClass} overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:border-primary/30`}
      onClick={onSelect}
    >
      {/* Color bar */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: `hsl(var(${league.colorVar}))` }}
      />

      <div className="p-6 flex flex-col items-center gap-4">
        {/* League icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `hsl(var(${league.colorVar}) / 0.15)`,
            border: `2px solid hsl(var(${league.colorVar}) / 0.4)`,
          }}
        >
          <span
            className="font-display font-bold text-xl"
            style={{ color: `hsl(var(${league.colorVar}))` }}
          >
            {league.name.charAt(0)}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl tracking-wider text-foreground">
          {league.name}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Users size={14} />
          <span>Máx {league.maxOnField} en cancha</span>
        </div>

        <button
          className="mt-2 w-full py-2.5 rounded-lg font-display font-semibold text-sm tracking-wider transition-all duration-200 hover:brightness-110"
          style={{
            backgroundColor: `hsl(var(${league.colorVar}))`,
            color: league.id === "pegeche" ? "hsl(0 0% 10%)" : "white",
          }}
        >
          VER FORMACIÓN
        </button>
      </div>
    </div>
  );
}

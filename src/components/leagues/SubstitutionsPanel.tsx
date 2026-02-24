import { useState } from "react";
import type { LeagueConfig, FieldPlayer, Player, Substitution } from "@/data/leagues";
import { ArrowRightLeft, Plus, X } from "lucide-react";

interface SubstitutionsPanelProps {
  league: LeagueConfig;
  fieldPlayers: FieldPlayer[];
  benchPlayers: Player[];
  allPlayers: Player[];
  substitutions: Substitution[];
  onAdd: (playerOutId: string, playerInId: string) => void;
  onRemove: (subId: string) => void;
}

export function SubstitutionsPanel({
  league,
  fieldPlayers,
  benchPlayers,
  allPlayers,
  substitutions,
  onAdd,
  onRemove,
}: SubstitutionsPanelProps) {
  const [playerOut, setPlayerOut] = useState("");
  const [playerIn, setPlayerIn] = useState("");

  const getName = (id: string) => allPlayers.find((p) => p.id === id)?.name ?? id;

  const handleAdd = () => {
    if (!playerOut || !playerIn || playerOut === playerIn) return;
    onAdd(playerOut, playerIn);
    setPlayerOut("");
    setPlayerIn("");
  };

  const selectStyle =
    "bg-primary border border-primary/30 rounded-lg px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 w-full";

  return (
    <div className="glass-card p-5">
      <h3 className="font-display font-bold text-base tracking-wider text-foreground mb-4 flex items-center gap-2">
        <ArrowRightLeft size={16} style={{ color: `hsl(var(${league.colorVar}))` }} />
        CAMBIOS — 2DO TIEMPO
      </h3>

      {/* Add substitution form */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1">
          <label className="text-[10px] text-muted-foreground font-body mb-1 block">Sale</label>
          <select value={playerOut} onChange={(e) => setPlayerOut(e.target.value)} className={selectStyle}>
            <option value="">Seleccionar...</option>
            {fieldPlayers.map((fp) => (
              <option key={fp.playerId} value={fp.playerId}>
                {getName(fp.playerId)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="text-[10px] text-muted-foreground font-body mb-1 block">Entra</label>
          <select value={playerIn} onChange={(e) => setPlayerIn(e.target.value)} className={selectStyle}>
            <option value="">Seleccionar...</option>
            {benchPlayers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleAdd}
            disabled={!playerOut || !playerIn}
            className="px-4 py-2 rounded-lg font-display font-semibold text-sm tracking-wider transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 flex items-center gap-1.5"
            style={{
              backgroundColor: `hsl(var(${league.colorVar}))`,
              color: league.id === "pegeche" ? "hsl(0 0% 10%)" : "white",
            }}
          >
            <Plus size={14} />
            Agregar
          </button>
        </div>
      </div>

      {/* Timeline */}
      {substitutions.length === 0 ? (
        <p className="text-xs text-muted-foreground font-body text-center py-3">
          Sin cambios registrados
        </p>
      ) : (
        <div className="space-y-3">
          {substitutions.map((sub, i) => (
            <div
              key={sub.id}
              className="flex items-center gap-3 p-3 rounded-lg  border border-border/30 animate-fade-in-scale group"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* 2do Tiempo badge */}
              <div
                className="px-3 py-2 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `hsl(var(${league.colorVar}) / 0.15)` }}
              >
                <span
                  className="font-display font-bold text-[11px] tracking-wider"
                  style={{ color: `hsl(var(${league.colorVar}))` }}
                >
                  2T
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm font-body">
                  <span className="text-destructive font-medium">↓ {getName(sub.playerOut)}</span>
                  <ArrowRightLeft size={12} className="text-muted-foreground shrink-0" />
                  <span className="text-primary font-medium">↑ {getName(sub.playerIn)}</span>
                </div>
              </div>

              <button
                onClick={() => onRemove(sub.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

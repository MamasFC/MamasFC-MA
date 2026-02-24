import { useState } from "react";
import type { LeagueConfig, Player, PlayerPosition } from "@/data/leagues";
import { User, GripVertical, Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DragEvent } from "react";

const positionColors: Record<string, string> = {
  GK: "text-yellow-400 bg-yellow-400/10",
  DF: "text-blue-400 bg-blue-400/10",
  MC: "text-green-400 bg-green-400/10",
  DC: "text-red-400 bg-red-400/10",
};

const POSITIONS: PlayerPosition[] = ["GK", "DF", "MC", "DC"];

interface PlayerListPanelProps {
  league: LeagueConfig;
  benchPlayers: Player[];
  fieldPlayerIds: string[];
  isMaxReached: boolean;
  onAddPlayer: (name: string, position: PlayerPosition) => void;
}

export function PlayerListPanel({
  league,
  benchPlayers,
  fieldPlayerIds,
  isMaxReached,
  onAddPlayer,
}: PlayerListPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPosition, setNewPosition] = useState<PlayerPosition>("MC");

  const handleDragStart = (e: DragEvent, playerId: string) => {
    e.dataTransfer.setData("playerId", playerId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleAdd = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    onAddPlayer(trimmed, newPosition);
    setNewName("");
    setNewPosition("MC");
    setShowForm(false);
  };

  return (
    <div className="glass-card p-4 h-full flex flex-col">
      <h3 className="font-display font-bold text-sm tracking-wider text-foreground mb-3 flex items-center gap-2">
        <User size={14} className="text-muted-foreground" />
        JUGADORES DISPONIBLES
      </h3>

      <ScrollArea className="flex-1 max-h-[420px]">
        <div className="space-y-2 pr-2">
          {benchPlayers.length === 0 ? (
            <p className="text-xs text-muted-foreground font-body py-2">
              Todos en cancha
            </p>
          ) : (
            benchPlayers.map((player, i) => (
              <div
                key={player.id}
                draggable={!isMaxReached}
                onDragStart={(e) => handleDragStart(e, player.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all duration-200 animate-fade-in ${
                  isMaxReached
                    ? "border-border/30 opacity-50 cursor-not-allowed"
                    : "border-border/50 cursor-grab active:cursor-grabbing hover:border-primary/30 hover:border-primary/30"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <GripVertical size={14} className="text-muted-foreground shrink-0" />
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-display font-bold shrink-0"
                  style={{
                    backgroundColor: `hsl(var(${league.colorVar}) / 0.15)`,
                    color: `hsl(var(${league.colorVar}))`,
                  }}
                >
                  {player.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-body text-sm text-foreground truncate flex-1">
                  {player.name}
                </span>
                <span className={`text-[10px] font-display font-bold px-1.5 py-0.5 rounded ${positionColors[player.position] ?? "text-muted-foreground bg-muted"}`}>
                  {player.position}
                </span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {isMaxReached && benchPlayers.length > 0 && (
        <div className="mt-3 p-2 rounded-lg bg-secondary/50 border border-border/30">
          <p className="text-[11px] text-muted-foreground font-body text-center">
            ⚠️ Suplentes ({benchPlayers.length})
          </p>
        </div>
      )}

      {/* Add player */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mt-3 w-full py-2.5 rounded-lg border border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors font-display text-xs tracking-wider flex items-center justify-center gap-1.5"
        >
          <Plus size={14} />
          AGREGAR JUGADOR
        </button>
      ) : (
        <div className="mt-3 p-3 rounded-lg border border-primary/30 bg-secondary/50 space-y-2 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-display font-bold text-muted-foreground tracking-wider">NUEVO JUGADOR</span>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X size={12} />
            </button>
          </div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre..."
            className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <div className="flex gap-1.5">
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                onClick={() => setNewPosition(pos)}
                className={`flex-1 py-1.5 rounded-md text-[10px] font-display font-bold transition-colors ${
                  newPosition === pos
                    ? `${positionColors[pos]} border border-current/20`
                    : "text-muted-foreground bg-secondary border border-border/30"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
          <button
            onClick={handleAdd}
            disabled={!newName.trim()}
            className="w-full py-2 rounded-md font-display font-semibold text-xs tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              backgroundColor: `hsl(var(${league.colorVar}))`,
              color: league.id === "pegeche" ? "hsl(0 0% 10%)" : "white",
            }}
          >
            AGREGAR
          </button>
        </div>
      )}
    </div>
  );
}

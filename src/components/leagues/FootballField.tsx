import { useRef, useState, type DragEvent } from "react";
import type { LeagueConfig, FieldPlayer, Player, JerseyStyle } from "@/data/leagues";
import { X } from "lucide-react";

interface FootballFieldProps {
  league: LeagueConfig;
  fieldPlayers: FieldPlayer[];
  allPlayers: Player[];
  onDrop: (playerId: string, x: number, y: number) => void;
  onRemove: (playerId: string) => void;
  isMaxReached: boolean;
  jerseyStyle: JerseyStyle;
  orientation: "vertical" | "horizontal";
}

function JerseyIcon({ style, size = 44 }: { style: JerseyStyle; size?: number }) {
  const stripes = style.colors.length;
  const stripeSize = size / stripes;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-full overflow-hidden">
      <clipPath id={`circle-${style.id}`}>
        <circle cx={size / 2} cy={size / 2} r={size / 2} />
      </clipPath>
      <g clipPath={`url(#circle-${style.id})`}>
        {style.colors.map((color, i) =>
          style.direction === "vertical" ? (
            <rect key={i} x={i * stripeSize} y={0} width={stripeSize + 0.5} height={size} fill={color} />
          ) : (
            <rect key={i} x={0} y={i * stripeSize} width={size} height={stripeSize + 0.5} fill={color} />
          )
        )}
      </g>
    </svg>
  );
}

export function FootballField({
  league,
  fieldPlayers,
  allPlayers,
  onDrop,
  onRemove,
  isMaxReached,
  jerseyStyle,
  orientation,
}: FootballFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [showMaxMsg, setShowMaxMsg] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const playerId = e.dataTransfer.getData("playerId");
    if (!playerId || !fieldRef.current) return;

    const alreadyOnField = fieldPlayers.some((fp) => fp.playerId === playerId);
    if (!alreadyOnField && isMaxReached) {
      setShowMaxMsg(true);
      setTimeout(() => setShowMaxMsg(false), 2000);
      return;
    }

    const rect = fieldRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onDrop(playerId, Math.max(5, Math.min(95, x)), Math.max(5, Math.min(95, y)));
  };

  const getPlayerName = (id: string) =>
    allPlayers.find((p) => p.id === id)?.name ?? id;

  const getTextColor = () => {
    const hasLight = jerseyStyle.colors.some((c) =>
      ["#ffffff", "#f1c40f", "#f39c12", "#e67e22"].includes(c)
    );
    return hasLight ? "#1a1a1a" : "#ffffff";
  };

  const textColor = getTextColor();

  return (
    <div className="relative">
      {showMaxMsg && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg font-display font-semibold text-sm animate-fade-in-scale backdrop-blur-sm">
          Máximo de jugadores alcanzado
        </div>
      )}

      <div
        ref={fieldRef}
        className="relative w-full rounded-xl overflow-hidden border-2 border-field-grass-light/50"
        style={{
          aspectRatio: orientation === "vertical" ? "3/4" : "4/3",
          maxHeight: orientation === "vertical" ? "600px" : "450px",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Grass background */}
        <div className="absolute inset-0 bg-field-grass">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={
                orientation === "vertical"
                  ? {
                      top: `${(i / 8) * 100}%`,
                      height: "12.5%",
                      width: "100%",
                      backgroundColor: i % 2 === 0 ? "hsl(var(--field-grass))" : "hsl(var(--field-grass-light))",
                    }
                  : {
                      left: `${(i / 8) * 100}%`,
                      width: "12.5%",
                      height: "100%",
                      backgroundColor: i % 2 === 0 ? "hsl(var(--field-grass))" : "hsl(var(--field-grass-light))",
                    }
              }
            />
          ))}
        </div>

        {/* Field lines */}
        {orientation === "vertical" ? (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 300 400"
            fill="none"
            stroke="hsl(var(--field-line))"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          >
            <rect x="10" y="10" width="280" height="380" rx="2" />
            <line x1="10" y1="200" x2="290" y2="200" />
            <circle cx="150" cy="200" r="40" />
            <circle cx="150" cy="200" r="2" fill="hsl(var(--field-line))" fillOpacity="0.5" />
            <rect x="60" y="10" width="180" height="70" />
            <rect x="100" y="10" width="100" height="35" />
            <rect x="60" y="320" width="180" height="70" />
            <rect x="100" y="355" width="100" height="35" />
          </svg>
        ) : (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 300"
            fill="none"
            stroke="hsl(var(--field-line))"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          >
            <rect x="10" y="10" width="380" height="280" rx="2" />
            <line x1="200" y1="10" x2="200" y2="290" />
            <circle cx="200" cy="150" r="40" />
            <circle cx="200" cy="150" r="2" fill="hsl(var(--field-line))" fillOpacity="0.5" />
            <rect x="10" y="60" width="70" height="180" />
            <rect x="10" y="100" width="35" height="100" />
            <rect x="320" y="60" width="70" height="180" />
            <rect x="355" y="100" width="35" height="100" />
          </svg>
        )}

        {/* Players on field */}
        {fieldPlayers.map((fp) => (
          <div
            key={fp.playerId}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group"
            style={{ left: `${fp.x}%`, top: `${fp.y}%` }}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("playerId", fp.playerId);
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative shadow-lg transition-transform duration-150 hover:scale-110">
                <JerseyIcon style={jerseyStyle} size={36} />
                <span
                  className="absolute inset-0 flex items-center justify-center text-[10px] font-display font-bold"
                  style={{ color: textColor, textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                >
                  {getPlayerName(fp.playerId).slice(0, 3).toUpperCase()}
                </span>
              </div>
              <span className="mt-1 text-sm font-body font-bold text-field-line whitespace-nowrap drop-shadow-md">
                {getPlayerName(fp.playerId)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(fp.playerId);
                }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} />
              </button>
            </div>
          </div>
        ))}

        {fieldPlayers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="text-field-line/60 font-display text-sm tracking-wider">
              Arrastrá jugadores aquí
            </p>
          </div>
        )}
      </div>

      <div className="mt-2 flex justify-between items-center px-1">
        <span className="text-xs text-muted-foreground font-body">
          {fieldPlayers.length}/{league.maxOnField} en cancha
        </span>
        <span
          className="text-xs font-display font-semibold tracking-wider"
          style={{ color: `hsl(var(${league.colorVar}))` }}
        >
          {league.name}
        </span>
      </div>
    </div>
  );
}

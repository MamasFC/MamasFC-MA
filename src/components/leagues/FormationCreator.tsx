import { useState, useRef, useCallback } from "react";
import type { LeagueConfig, FieldPlayer, Substitution, Player } from "@/data/leagues";
import { JERSEY_STYLES } from "@/data/leagues";
import { getPlayersForLeague } from "@/data/leagues";
import { FootballField } from "./FootballField";
import { PlayerListPanel } from "./PlayerListPanel";
import { SubstitutionsPanel } from "./SubstitutionsPanel";
import { ExportButton } from "./ExportButton";
import { FormationHistory, type SavedFormation } from "./FormationHistory";
import { RectangleHorizontal, RectangleVertical } from "lucide-react";

export function FormationCreator({ league }: { league: LeagueConfig }) {
  const [fieldPlayers, setFieldPlayers] = useState<FieldPlayer[]>([]);
  const [substitutions, setSubstitutions] = useState<Substitution[]>([]);
  const [jerseyStyleId, setJerseyStyleId] = useState(JERSEY_STYLES[0].id);
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const [customPlayers, setCustomPlayers] = useState<Player[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  const allPlayers = [...getPlayersForLeague(league.id), ...customPlayers];
  const fieldPlayerIds = fieldPlayers.map((fp) => fp.playerId);
  const benchPlayers = allPlayers.filter((p) => !fieldPlayerIds.includes(p.id));
  const isMaxReached = fieldPlayers.length >= league.maxOnField;
  const currentJersey = JERSEY_STYLES.find((j) => j.id === jerseyStyleId) ?? JERSEY_STYLES[0];

  const handleDropOnField = useCallback(
    (playerId: string, x: number, y: number) => {
      setFieldPlayers((prev) => {
        const existing = prev.find((fp) => fp.playerId === playerId);
        if (existing) {
          return prev.map((fp) =>
            fp.playerId === playerId ? { ...fp, x, y } : fp
          );
        }
        if (prev.length >= league.maxOnField) return prev;
        return [...prev, { playerId, x, y }];
      });
    },
    [league.maxOnField]
  );

  const handleRemoveFromField = useCallback((playerId: string) => {
    setFieldPlayers((prev) => prev.filter((fp) => fp.playerId !== playerId));
  }, []);

  const handleAddSubstitution = useCallback(
    (playerOutId: string, playerInId: string) => {
      const sub: Substitution = {
        id: `sub-${Date.now()}`,
        playerOut: playerOutId,
        playerIn: playerInId,
      };
      setSubstitutions((prev) => [...prev, sub]);
    },
    []
  );

  const handleRemoveSubstitution = useCallback((subId: string) => {
    setSubstitutions((prev) => prev.filter((s) => s.id !== subId));
  }, []);

  const handleAddPlayer = useCallback((name: string, position: Player["position"]) => {
    const id = `custom-${Date.now()}`;
    setCustomPlayers((prev) => [...prev, { id, name, leagueIds: [league.id], position }]);
  }, [league.id]);

  const handleLoadFormation = useCallback((formation: SavedFormation) => {
    setFieldPlayers(formation.fieldPlayers);
    setSubstitutions(formation.substitutions);
    setJerseyStyleId(formation.jerseyStyleId);
    setOrientation(formation.orientation);
  }, []);

  // Build jersey preview for selector
  const renderJerseyPreview = (jersey: typeof JERSEY_STYLES[0], isActive: boolean) => {
    const stripes = jersey.colors.length;
    const size = 40;
    const stripeSize = size / stripes;

    return (
      <button
        key={jersey.id}
        onClick={() => setJerseyStyleId(jersey.id)}
        className={`rounded-lg border-2 transition-all duration-200 hover:scale-110 overflow-hidden ${isActive ? "border-primary ring-2 ring-primary/30 scale-110" : "border-border/50"}`}
        title={jersey.name}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {jersey.colors.map((color, i) =>
            jersey.direction === "vertical" ? (
              <rect key={i} x={i * stripeSize} y={0} width={stripeSize + 0.5} height={size} fill={color} />
            ) : (
              <rect key={i} x={0} y={i * stripeSize} width={size} height={stripeSize + 0.5} fill={color} />
            )
          )}
        </svg>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Jersey selector + orientation toggle */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-sm tracking-wider text-foreground">CAMISETA</h3>
          <div className="flex items-center gap-1 border border-border/50 rounded-lg p-0.5">
            <button
              onClick={() => setOrientation("vertical")}
              className={`p-1.5 rounded-md transition-colors ${orientation === "vertical" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              title="Cancha vertical"
            >
              <RectangleVertical size={16} />
            </button>
            <button
              onClick={() => setOrientation("horizontal")}
              className={`p-1.5 rounded-md transition-colors ${orientation === "horizontal" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              title="Cancha horizontal"
            >
              <RectangleHorizontal size={16} />
            </button>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {JERSEY_STYLES.map((jersey) => renderJerseyPreview(jersey, jersey.id === jerseyStyleId))}
        </div>
      </div>

      {/* 🔧 ARREGLADO: Export ref solo envuelve la cancha, NO el panel de jugadores */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <div ref={exportRef} className="relative bg-background p-4 rounded-xl">
            <FootballField
              league={league}
              fieldPlayers={fieldPlayers}
              allPlayers={allPlayers}
              onDrop={handleDropOnField}
              onRemove={handleRemoveFromField}
              isMaxReached={isMaxReached}
              jerseyStyle={currentJersey}
              orientation={orientation}
            />

            {/* ✅ ARREGLADO: Overlay de cambios solo visible al exportar, dentro del ref de export */}
            {isExporting && substitutions.length > 0 && (
              <div className="absolute top-6 right-6 z-20 bg-background/90 border border-border/50 rounded-lg p-3 max-w-[200px]">
                <h4 className="font-display font-bold text-[10px] tracking-wider text-muted-foreground mb-2">CAMBIOS 2T</h4>
                <div className="space-y-1.5">
                  {substitutions.map((sub) => (
                    <div key={sub.id} className="text-[11px] font-body">
                      <span className="text-destructive">↓ {allPlayers.find(p => p.id === sub.playerOut)?.name}</span>
                      {" → "}
                      <span className="text-primary">↑ {allPlayers.find(p => p.id === sub.playerIn)?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-64 shrink-0">
          <PlayerListPanel
            league={league}
            benchPlayers={benchPlayers}
            fieldPlayerIds={fieldPlayerIds}
            isMaxReached={isMaxReached}
            onAddPlayer={handleAddPlayer}
          />
        </div>
      </div>

      <SubstitutionsPanel
        league={league}
        fieldPlayers={fieldPlayers}
        benchPlayers={benchPlayers}
        allPlayers={allPlayers}
        substitutions={substitutions}
        onAdd={handleAddSubstitution}
        onRemove={handleRemoveSubstitution}
      />

      <FormationHistory
        leagueId={league.id}
        currentFieldPlayers={fieldPlayers}
        currentSubstitutions={substitutions}
        currentJerseyStyleId={jerseyStyleId}
        currentOrientation={orientation}
        onLoad={handleLoadFormation}
      />

      <div className="flex justify-center">
        <ExportButton exportRef={exportRef} leagueName={league.name} onExportStart={() => setIsExporting(true)} onExportEnd={() => setIsExporting(false)} />
      </div>
    </div>
  );
}
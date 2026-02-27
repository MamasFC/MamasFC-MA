import { useState } from "react";
import { Save, Trash2, FolderOpen, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FieldPlayer, Substitution } from "@/data/leagues";

export interface SavedFormation {
  id: string;
  name: string;
  leagueId: string;
  fieldPlayers: FieldPlayer[];
  substitutions: Substitution[];
  jerseyStyleId: string;
  orientation: "vertical" | "horizontal";
  savedAt: number;
}

const STORAGE_KEY = "mamasfc-formations";

function getAll(): SavedFormation[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAll(formations: SavedFormation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formations));
}

interface FormationHistoryProps {
  leagueId: string;
  currentFieldPlayers: FieldPlayer[];
  currentSubstitutions: Substitution[];
  currentJerseyStyleId: string;
  currentOrientation: "vertical" | "horizontal";
  onLoad: (formation: SavedFormation) => void;
}

export function FormationHistory({
  leagueId,
  currentFieldPlayers,
  currentSubstitutions,
  currentJerseyStyleId,
  currentOrientation,
  onLoad,
}: FormationHistoryProps) {
  const [formations, setFormations] = useState<SavedFormation[]>(getAll);
  const [saveName, setSaveName] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);

  const leagueFormations = formations.filter((f) => f.leagueId === leagueId);

  const handleSave = () => {
    if (!saveName.trim() || currentFieldPlayers.length === 0) return;
    const newFormation: SavedFormation = {
      id: `form-${Date.now()}`,
      name: saveName.trim(),
      leagueId,
      fieldPlayers: currentFieldPlayers,
      substitutions: currentSubstitutions,
      jerseyStyleId: currentJerseyStyleId,
      orientation: currentOrientation,
      savedAt: Date.now(),
    };
    const updated = [newFormation, ...formations];
    saveAll(updated);
    setFormations(updated);
    setSaveName("");
    setShowSaveInput(false);
  };

  const handleDelete = (id: string) => {
    const updated = formations.filter((f) => f.id !== id);
    saveAll(updated);
    setFormations(updated);
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-base tracking-wider text-foreground flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          HISTORIAL
        </h3>
        {!showSaveInput ? (
          <button
            onClick={() => setShowSaveInput(true)}
            disabled={currentFieldPlayers.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wider transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Save size={12} />
            GUARDAR
          </button>
        ) : null}
      </div>

      {showSaveInput && (
        <div className="flex gap-2 mb-4 animate-fade-in-scale">
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="Nombre de la formación..."
            className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <button
            onClick={handleSave}
            disabled={!saveName.trim()}
            className="px-3 py-2 rounded-lg bg-primary text-primary-foreground font-display font-bold text-xs tracking-wider disabled:opacity-30"
          >
            OK
          </button>
          <button
            onClick={() => { setShowSaveInput(false); setSaveName(""); }}
            className="px-3 py-2 rounded-lg bg-secondary text-muted-foreground font-display font-bold text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {leagueFormations.length === 0 ? (
        <p className="text-xs text-muted-foreground font-body text-center py-3">
          Sin formaciones guardadas
        </p>
      ) : (
        <ScrollArea className="max-h-[200px]">
          <div className="space-y-2">
            {leagueFormations.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/30 group hover:border-primary/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-body font-medium text-foreground block truncate">
                    {f.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-body">
                    {f.fieldPlayers.length} jugadores · {formatDate(f.savedAt)}
                  </span>
                </div>
                <button
                  onClick={() => onLoad(f)}
                  className="p-1.5 rounded-md text-primary hover:bg-primary/10 transition-colors"
                  title="Cargar formación"
                >
                  <FolderOpen size={14} />
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
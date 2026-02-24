import { useCallback } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

interface ExportButtonProps {
  exportRef: React.RefObject<HTMLDivElement>;
  leagueName: string;
  onExportStart?: () => void;
  onExportEnd?: () => void;
}

export function ExportButton({ exportRef, leagueName, onExportStart, onExportEnd }: ExportButtonProps) {
  const handleExport = useCallback(async () => {
    if (!exportRef.current) return;
    try {
      onExportStart?.();
      // Wait for DOM to update with overlay visible
      await new Promise((r) => setTimeout(r, 100));
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: "#0f1a12",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `formacion-${leagueName.toLowerCase()}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      onExportEnd?.();
    }
  }, [exportRef, leagueName, onExportStart, onExportEnd]);

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold tracking-wider text-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
    >
      <Download size={16} />
      EXPORTAR FORMACIÓN
    </button>
  );
}
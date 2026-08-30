import { cn } from "@/lib/utils";

/**
 * Assinatura "espectro 4D": quatro filetes nos comprimentos de onda da
 * plataforma (755/808/940/1064 nm), em tons de dourado do manual.
 * Uso pontual — o dourado pontua, fileta e assina (máx. 10% da peça).
 */
/**
 * `color` pinta o filete (decorativo, sem exigência de contraste).
 * `labelColor` é usado no rótulo, que é texto: os dois tons mais escuros do
 * espectro caem para 3.4:1 e 2.1:1 sobre o grafite e precisam ser clareados.
 */
const beams = [
  { nm: 755, color: "#d8b488", labelColor: "#d8b488" },
  { nm: 808, color: "#c8a070", labelColor: "#c8a070" },
  { nm: 940, color: "#a98356", labelColor: "#cfa87a" },
  { nm: 1064, color: "#806040", labelColor: "#d9b892" },
];

interface SpectrumDividerProps {
  className?: string;
  /** mostra os rótulos de nm (usar apenas na seção Tecnologia) */
  labeled?: boolean;
}

export function SpectrumDivider({ className, labeled = false }: SpectrumDividerProps) {
  return (
    <div aria-hidden="true" className={cn("flex flex-col gap-[5px]", className)}>
      {beams.map((b) => (
        <div key={b.nm} className="flex items-center gap-3">
          <span
            className="h-px flex-1"
            style={{ background: `linear-gradient(90deg, transparent, ${b.color} 30%, ${b.color} 70%, transparent)` }}
          />
          {labeled && (
            <span
              className="type-label w-16 shrink-0 text-right text-[10px]"
              style={{ color: b.labelColor }}
            >
              {b.nm} nm
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

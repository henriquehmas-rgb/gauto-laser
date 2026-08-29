import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  /** id da seção para âncora do heading */
  id?: string;
}

/** Rótulo/overline institucional: Montserrat 600 caixa-alta, tracking +28%. */
export function SectionEyebrow({ children, className, id }: SectionEyebrowProps) {
  return (
    <p id={id} className={cn("type-label text-xs text-gauto-gold-deep", className)}>
      {children}
    </p>
  );
}

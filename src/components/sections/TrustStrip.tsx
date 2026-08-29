import { Award, Star, ShieldCheck, Snowflake, Users } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function TrustStrip() {
  const { proof } = siteConfig;
  const items = [
    { icon: Award, label: proof.award.name },
    ...(proof.google.rating > 0
      ? [{ icon: Star, label: `${proof.google.rating} no Google (${proof.google.reviewCount} avaliações)` }]
      : []),
    { icon: ShieldCheck, label: "Equipamento com registro ANVISA" },
    { icon: Snowflake, label: "Ponteira criogênica -10 °C" },
    { icon: Users, label: "Fototipos I–VI, inclusive pele bronzeada" },
  ];

  return (
    <section aria-label="Selos de confiança" className="border-b border-gauto-hairline bg-gauto-ivory">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 md:px-6">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-xs text-gauto-graphite/80 md:text-sm">
            <item.icon className="size-4 shrink-0 text-gauto-gold-deep" aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

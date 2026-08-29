import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const { location, contact, proof, legal, brand } = siteConfig;
  return (
    <footer className="dark bg-gauto-graphite text-gauto-champagne">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/brand/gauto-logo-negative.png"
              alt="Gauto Laser"
              width={920}
              height={566}
              className="h-20 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-gauto-champagne/70">
              Estética a laser premium em Cáceres-MT. Tecnologia 4D para todos os tons de pele.
            </p>
          </div>

          <div className="text-sm">
            <p className="type-label mb-4 text-xs text-gauto-gold">Onde estamos</p>
            <p>
              {location.venue} · {location.unit}
            </p>
            <p>{location.address}</p>
            <p>
              {location.city} — {location.state}, {location.zip}
            </p>
            <p className="mt-3">Seg–Sáb 10:00–22:00 · Dom 14:00–20:00</p>
            <a
              href={`https://instagram.com/${contact.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-gauto-gold transition-colors hover:text-gauto-champagne"
            >
              <InstagramIcon className="size-4" />
              {contact.instagram}
            </a>
          </div>

          <div className="text-sm">
            <p className="type-label mb-4 text-xs text-gauto-gold">Institucional</p>
            <ul className="space-y-2">
              <li>
                <Link href="/sessao-cortesia" className="transition-colors hover:text-gauto-gold">
                  Avaliação gratuita
                </Link>
              </li>
              <li>
                <Link href="/indique-e-ganhe" className="transition-colors hover:text-gauto-gold">
                  Indique e ganhe
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="transition-colors hover:text-gauto-gold">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link href="/regulamento" className="transition-colors hover:text-gauto-gold">
                  Regulamento
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gauto-gold/25 pt-6 text-xs text-gauto-champagne/60">
          <p>
            Responsável técnico: {proof.responsibleProfessional} · Equipamento com registro ANVISA
          </p>
          <p className="mt-1">
            {brand.name} · CNPJ {legal.cnpj}
            {legal.showGroup ? " · Uma empresa do Grupo SEEG" : ""}
          </p>
          <p className="mt-3 max-w-3xl">
            Resultados variam por pessoa. Todos os tratamentos estão sujeitos a avaliação
            profissional — consulte contraindicações.
          </p>
        </div>
      </div>
    </footer>
  );
}

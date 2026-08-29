"use client";

import { useSyncExternalStore } from "react";
import { MapPin, Clock, Car, Wind, Phone, Navigation } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { siteConfig, todayHours } from "@/config/site.config";
import { track } from "@/lib/analytics";

function subscribeNoop() {
  return () => {};
}

function computeStatus(): string {
  const h = todayHours();
  if (!h) return "Fechado hoje";
  const now = new Date();
  const [oh, om] = h.open.split(":").map(Number);
  const [ch, cm] = h.close.split(":").map(Number);
  const open = new Date(now);
  open.setHours(oh, om, 0, 0);
  const close = new Date(now);
  close.setHours(ch, cm, 0, 0);
  if (now >= open && now < close) return `Aberto agora · fecha às ${h.close}`;
  if (now < open) return `Fechado · abre às ${h.open}`;
  return "Fechado · abre amanhã";
}

/** Status do dia calculado só no cliente (evita mismatch de hidratação). */
function useOpenStatus(): string | null {
  return useSyncExternalStore(subscribeNoop, computeStatus, () => null);
}

export function Location() {
  const { location, contact } = siteConfig;
  const status = useOpenStatus();

  return (
    <section id="localizacao" className="scroll-mt-24 border-y border-gauto-hairline bg-gauto-ivory">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <SectionEyebrow>Onde estamos</SectionEyebrow>
        <h2 className="type-display mt-3 text-2xl text-gauto-graphite md:text-4xl">
          Juba Center, Cáceres-MT
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-gauto-graphite/80 md:text-base">
          Dentro do shopping: horário estendido, estacionamento amplo, ambiente climatizado e
          segurança. Atendemos Cáceres e região — {location.nearbyCities.join(", ")}.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="border border-gauto-hairline bg-gauto-champagne p-7">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gauto-gold-deep" aria-hidden="true" />
              <div className="text-sm text-gauto-graphite">
                <p className="font-semibold">
                  {location.venue} · {location.unit}
                </p>
                <p className="mt-1 text-gauto-graphite/80">{location.address}</p>
                <p className="text-gauto-graphite/80">
                  {location.city} — {location.state}, {location.zip}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-gauto-gold-deep" aria-hidden="true" />
              <div className="text-sm text-gauto-graphite">
                {status && <p className="font-semibold text-gauto-gold-deep">{status}</p>}
                <p className="mt-1 text-gauto-graphite/80">Seg–Sáb · 10:00–22:00</p>
                <p className="text-gauto-graphite/80">Dom · 14:00–20:00</p>
              </div>
            </div>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gauto-graphite/75">
              {location.parking && (
                <li className="flex items-center gap-1.5">
                  <Car className="size-4 text-gauto-gold-deep" aria-hidden="true" /> Estacionamento amplo
                </li>
              )}
              {location.airConditioned && (
                <li className="flex items-center gap-1.5">
                  <Wind className="size-4 text-gauto-gold-deep" aria-hidden="true" /> Ambiente climatizado
                </li>
              )}
            </ul>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("maps_click")}
                className="btn-gold inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
              >
                <Navigation className="size-4" aria-hidden="true" /> Como chegar
              </a>
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  onClick={() => track("phone_click")}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-gauto-graphite/25 px-6 py-3 text-sm font-semibold text-gauto-graphite transition-colors hover:border-gauto-gold"
                >
                  <Phone className="size-4" aria-hidden="true" /> Ligar
                </a>
              )}
            </div>
          </div>

          {/* Placeholder de mapa leve — sem iframe pesado; ver docs/ASSETS_NEEDED.md */}
          <div
            aria-hidden="true"
            className="relative hidden min-h-72 items-center justify-center overflow-hidden border border-gauto-hairline bg-gauto-graphite md:flex"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, #c8a070 0%, transparent 55%)",
              }}
            />
            <div className="relative text-center">
              <MapPin className="mx-auto size-8 text-gauto-gold" />
              <p className="type-label mt-3 text-[10px] text-gauto-champagne/70">
                Foto da fachada no Juba Center
              </p>
              <p className="mt-1 text-xs text-gauto-champagne/50">(asset pendente)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

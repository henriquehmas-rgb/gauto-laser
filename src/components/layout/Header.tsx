"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { useState } from "react";

const navLinks = [
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#tecnologia", label: "Tecnologia 4D" },
  { href: "#como-funciona", label: "Benefícios" },
  { href: "#localizacao", label: "Localização" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gauto-hairline bg-gauto-champagne/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label="Gauto Laser — início" className="flex items-center">
          <Image
            src="/brand/gauto-logo.png"
            alt="Gauto Laser"
            width={120}
            height={120}
            className="h-14 w-auto"
            priority
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gauto-graphite transition-colors hover:text-gauto-gold-deep"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppButton context="header" className="hidden animate-cta-pulse text-xs md:inline-flex md:px-5 md:py-2.5">
            Agendar avaliação
          </WhatsAppButton>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-11 items-center justify-center text-gauto-graphite lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-6" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-gauto-champagne">
              <SheetTitle className="type-section px-4 pt-6 text-base text-gauto-graphite">
                Gauto Laser
              </SheetTitle>
              <nav aria-label="Menu" className="flex flex-col gap-1 px-4 pt-4">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-gauto-hairline py-3 text-sm font-medium text-gauto-graphite"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="pt-5">
                  <WhatsAppButton context="header" className="w-full">
                    Agendar avaliação
                  </WhatsAppButton>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

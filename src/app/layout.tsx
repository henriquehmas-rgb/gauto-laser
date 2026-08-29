import type { Metadata } from "next";
import { Cinzel, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site.config";
import { faq } from "@/content/faq";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteConfig.brand.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Depilação a Laser em Cáceres-MT | Gauto Laser — Juba Center",
    template: "%s | Gauto Laser",
  },
  description:
    "Epilação 4D praticamente indolor para todos os tons de pele, remoção de tatuagem e clareamento a laser. No Juba Center, em Cáceres-MT.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.brand.name,
    url: siteUrl,
  },
};

function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: siteConfig.brand.name,
    image: `${siteUrl}/brand/gauto-logo.png`,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.location.venue}`,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.location.geo.lat,
      longitude: siteConfig.location.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "22:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "14:00", closes: "20:00" },
    ],
    sameAs: [`https://instagram.com/${siteConfig.contact.instagram.replace("@", "")}`],
    priceRange: "$$",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${montserrat.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

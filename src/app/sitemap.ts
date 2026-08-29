import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteConfig.brand.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/sessao-cortesia`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/indique-e-ganhe`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/regulamento`, changeFrequency: "yearly", priority: 0.2 },
  ];
}

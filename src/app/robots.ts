import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { isDraft } from "@/config/readiness";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteConfig.brand.domain}`;

export default function robots(): MetadataRoute.Robots {
  // Rascunho (dados de negócio pendentes): fora do índice até estar completo.
  if (isDraft()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteConfig.brand.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}

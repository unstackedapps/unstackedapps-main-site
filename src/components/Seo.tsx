import { useEffect } from "react";
import { SITE_CONFIG } from "@/config/constants";

interface SeoProps {
  description?: string;
  noIndex?: boolean;
  path?: string;
  title?: string;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(
    `meta[${attr}="${key}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function Seo({
  title,
  description = SITE_CONFIG.siteDescription,
  path = "/",
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_CONFIG.siteName}`
      : `${SITE_CONFIG.siteName} - Chrome Extensions, SPAs & AI Applications`;
    const url = `${SITE_CONFIG.siteUrl}${path === "/" ? "/" : path}`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta(
      "name",
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "twitter:title", fullTitle);
    setMeta("property", "twitter:description", description);
    setMeta("property", "twitter:url", url);

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path, noIndex]);

  return null;
}

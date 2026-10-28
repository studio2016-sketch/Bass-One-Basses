import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/collection"].map(path=>({url:"https://www.bassonebasses.com"+path,changeFrequency:"monthly" as const,priority:path?0.8:1}));
}

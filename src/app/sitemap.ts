import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kyorixsport.in";
  const routes = [
    "",
    "/products",
    "/products/score",
    "/products/bracket",
    "/products/tems",
    "/technology",
    "/about",
    "/resources",
    "/contact",
    "/security",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/products") ? 0.9 : 0.7,
  }));
}

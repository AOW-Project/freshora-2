



import { NextResponse } from "next/server";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://freshoralaundry.com/</loc>
    <lastmod>2025-08-29T10:28:09+00:00</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://freshoralaundry.com/about</loc>
    <lastmod>2025-08-29T10:28:09+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <!-- keep adding all other <url> from your sitemap (3).xml -->
</urlset>
`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

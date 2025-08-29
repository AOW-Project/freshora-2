



import { NextResponse } from "next/server";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->


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
<url>
  <loc>https://freshoralaundry.com/services</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/services/laundry-services</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/services/dry-cleaning-services</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/services/express-laundry-services</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/services/shoe-bag-spa</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/services/luxury-shoe-cleaning</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/services/commercial-laundry-service</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/services/carpet-cleaning-service</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/services/curtain-cleaning-service</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/services/soft-toy-cleaning-service</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/prices</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/FAQs</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/contact</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://freshoralaundry.com/tracking</loc>
  <lastmod>2025-08-29T10:28:09+00:00</lastmod>
  <priority>0.80</priority>
</url>

</urlset>
`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

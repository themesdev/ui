// /robots.txt with the sitemap's address (from @astrojs/sitemap) and the paths to keep out of search.
import type { APIContext } from 'astro';

const disallow = ['/thanks/', '/404'];

export function GET(context: APIContext) {
  const lines = ['User-agent: *', ...disallow.map((p) => `Disallow: ${p}`), '', `Sitemap: ${new URL('/sitemap-index.xml', context.site).href}`, ''];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

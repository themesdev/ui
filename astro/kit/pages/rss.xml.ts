// The RSS feed at /rss.xml, from a content collection (here "posts" with title, summary and date, as the post model
// has them). Needs @astrojs/rss and `site` in astro.config.mjs. Link it from your <head>:
// <link rel="alternate" type="application/rss+xml" title="Blog" href="/rss.xml" />
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts')).sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));
  return rss({
    title: 'Blog',
    description: 'New posts, newest first.',
    site: context.site!,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.summary, pubDate: new Date(p.data.date), link: `/blog/${p.id}/` })),
  });
}

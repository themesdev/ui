// /llms.txt: a plain-text map of the site for AI tools (the llmstxt.org format): the site's name, one line about
// it, then sections of links with a short note each. Build it from your collections so it never goes stale.
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const site = context.site!;
  const posts = (await getCollection('posts')).sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));
  const link = (title: string, path: string, note?: string) => `- [${title}](${new URL(path, site).href})${note ? `: ${note}` : ''}`;
  const body = [
    '# Your site',
    '',
    '> One sentence about what the site is and who it is for.',
    '',
    '## Pages',
    link('Home', '/'),
    link('About', '/about/', 'who we are'),
    '',
    '## Posts',
    ...posts.map((p) => link(p.data.title, `/blog/${p.id}/`, p.data.summary)),
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

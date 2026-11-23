// Headings for a table of contents. Markdown and MDX give them to you (render() returns `headings`); for Portable
// Text, headingsFromPortableText() reads the h2 and h3 blocks and gives them the same slugs <PortableText> uses.
export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

/** A URL-safe id from heading text: lower case, accents dropped, words joined by hyphens. */
export function slugify(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type Block = { _type: string; style?: string; children?: { text?: string }[] };

/** Plain text of a Portable Text block. */
export const blockText = (b: Block) => (b.children ?? []).map((c) => c.text ?? '').join('');

/** Unique slugs: a second "Pricing" becomes "pricing-2". Call with one Map per page. */
export function uniqueSlug(text: string, seen: Map<string, number>) {
  const base = slugify(text) || 'section';
  const n = (seen.get(base) ?? 0) + 1;
  seen.set(base, n);
  return n === 1 ? base : `${base}-${n}`;
}

export function headingsFromPortableText(blocks: Block[] = []): Heading[] {
  const seen = new Map<string, number>();
  return blocks
    .filter((b) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map((b) => {
      const text = blockText(b);
      return { depth: b.style === 'h2' ? 2 : 3, slug: uniqueSlug(text, seen), text };
    });
}

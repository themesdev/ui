// schema.org objects for <JsonLd>: small functions that return plain objects, so you can add any field schema.org
// has. URLs may be root-relative when you pass `site` (Astro.site).
type Obj = Record<string, unknown>;
const ctx = 'https://schema.org';
const abs = (href: string, site?: URL | string) => (site ? new URL(href, site).href : href);

export function organization(o: { name: string; url: string; logo?: string; sameAs?: string[] }): Obj {
  return { '@context': ctx, '@type': 'Organization', name: o.name, url: o.url, ...(o.logo && { logo: o.logo }), ...(o.sameAs?.length && { sameAs: o.sameAs }) };
}

export function website(o: { name: string; url: string; search?: string }): Obj {
  return {
    '@context': ctx,
    '@type': 'WebSite',
    name: o.name,
    url: o.url,
    ...(o.search && { potentialAction: { '@type': 'SearchAction', target: `${o.search}{search_term_string}`, 'query-input': 'required name=search_term_string' } }),
  };
}

export function article(o: { title: string; description?: string; url: string; image?: string; published: Date; modified?: Date; author?: { name: string; url?: string }; publisher?: Obj }): Obj {
  return {
    '@context': ctx,
    '@type': 'Article',
    headline: o.title,
    ...(o.description && { description: o.description }),
    url: o.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': o.url },
    ...(o.image && { image: o.image }),
    datePublished: o.published.toISOString(),
    dateModified: (o.modified ?? o.published).toISOString(),
    ...(o.author && { author: { '@type': 'Person', ...o.author } }),
    ...(o.publisher && { publisher: o.publisher }),
  };
}

export function breadcrumbList(items: { name: string; href: string }[], site?: URL | string): Obj {
  return { '@context': ctx, '@type': 'BreadcrumbList', itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href, site) })) };
}

export function faqPage(items: { question: string; answer: string }[]): Obj {
  return { '@context': ctx, '@type': 'FAQPage', mainEntity: items.map((q) => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })) };
}

export function product(o: { name: string; description?: string; image?: string; url: string; price: number; currency: string; availability?: 'InStock' | 'OutOfStock' | 'PreOrder' }): Obj {
  return {
    '@context': ctx,
    '@type': 'Product',
    name: o.name,
    ...(o.description && { description: o.description }),
    ...(o.image && { image: o.image }),
    url: o.url,
    offers: { '@type': 'Offer', price: o.price.toFixed(2), priceCurrency: o.currency, availability: `https://schema.org/${o.availability ?? 'InStock'}`, url: o.url },
  };
}

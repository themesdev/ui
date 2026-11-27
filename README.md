# themes.dev UI

Free blocks, page templates and components on [shadcn/ui](https://ui.shadcn.com), plus a small kit of native Astro
components. MIT licensed. You can see every item live at [themes.dev/ui](https://www.themes.dev/ui/), and the whole
free set at [themes.dev/free](https://www.themes.dev/free/).

This repo holds the source. You don't need to clone it to use anything: every item installs with the shadcn CLI,
straight from our site, with no account and no sign-up.

```bash
npx shadcn@latest add https://www.themes.dev/ui/r/<name>.json
```

For example, the hero:

```bash
npx shadcn@latest add https://www.themes.dev/ui/r/hero.json
```

The CLI also pulls in the shadcn/ui components and npm packages an item needs. Run `npx shadcn@latest init` first if
your project doesn't use shadcn/ui yet.

## What's in it

### 23 blocks

Page sections most sites need. Each block is one finished design, filled in for a made-up business so you can see it
working. All the content (words, links, list items, photos) comes in as props with defaults, so you replace the
content and keep the layout. They are built on real shadcn/ui parts, so they take on your theme, and they work in
light and dark mode. Blocks without state render on the server.

| Block | Name |
| --- | --- |
| Hero | `hero` |
| Pricing | `pricing` |
| FAQ | `faq` |
| Site header | `site-header` |
| Header bar | `header-bar` |
| Site footer | `site-footer` |
| Newsletter signup | `newsletter` |
| Contact form | `contact-form` |
| Login form | `login-form` |
| Logo strip | `logo-strip` |
| Breadcrumb trail | `breadcrumb-trail` |
| Card carousel | `card-carousel` |
| Comparison table | `comparison-table` |
| Lift cards | `lift-card` |
| Link cards | `link-card` |
| Plain tiles | `plain-tiles` |
| Split card | `split-card` |
| Feature grid | `feature-grid` |
| Call to action | `call-to-action` |
| Stats row | `stats-row` |
| Testimonial | `testimonial` |
| Post grid | `post-grid` |
| Changelog list | `changelog-list` |

### 5 page templates

Whole pages put together from the free blocks, so you can see how the parts fit:

- `free-home`: a home page from nine blocks, filled in for a small ferry company.
- `free-sign-in`: a sign-in page built around the login form, filled in for a sailing school.
- `free-pricing`: a pricing page with three plans, a comparison and questions, filled in for salon booking software.
- `free-contact`: a contact page with the form, opening hours and the map on request, filled in for a vets' practice.
- `free-blog`: a blog index with topics, a featured story, the latest posts and pages, filled in for a bakery's journal.

They install the same way, with the blocks they use:

```bash
npx shadcn@latest add https://www.themes.dev/ui/r/free-home.json
```

### 57 components

shadcn/ui is the base. 34 of these are shadcn's own components; their install line simply gives you shadcn's
component, and we show them with real examples on the site. The other 23 are ours, for patterns shadcn doesn't ship:

`announcement`, `bar-chart`, `code-block`, `copy-button`, `date-field`, `filter-bar`, `filter-sheet`,
`language-switcher`, `link`, `link-list`, `map-embed`, `quantity`, `read-aloud`, `result-list`, `search-field`,
`section-header`, `sidebar-nav`, `steps`, `story-card`, `tag`, `toc`, `toolbar`, `video-player`.

### Astro kit (15 items)

Plain `.astro` components for content sites, no React needed: `seo`, `json-ld`, `breadcrumbs`, `pagination`, `toc`,
`skip-link`, `figure`, `prose`, `code-block`, `portable-text`, `time`, `theme-toggle`, `rss-feed`, `llms-txt`,
`robots-txt`. They install from their own path:

```bash
npx shadcn@latest add https://www.themes.dev/astro/r/<name>.json
```

## Layout

```
registry/blocks/<name>/       the block (<name>.tsx), its metadata, and for some a demo with page context
registry/ui/<name>/           our components
registry/templates/<name>/    the page templates
registry/catalog.json         every block and component: name, kind, category, title, description
examples/<name>.tsx           an example for each component
astro/kit/, astro/kit.json    the Astro kit and its index
r/                            the built registry items, the same JSON the install commands fetch
```

Photos in the source point at `/ui/photos/...` on our site. The built items in `r/` use full URLs, so the
images load wherever you install a block. Swap them for your own.

## More

If you want more than the free set, [UI Pro](https://www.themes.dev/pricing/) is our paid library, with many more
blocks and our full themes.

Questions or problems: open an issue here, or mail info@themes.dev.

## License

MIT. See [LICENSE](LICENSE).

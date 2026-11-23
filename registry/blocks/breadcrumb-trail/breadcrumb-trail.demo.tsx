import { ChevronDown, Heart, Leaf, Search, ShoppingBag, SlidersHorizontal, Star, User } from "lucide-react"

import { BreadcrumbTrail } from "./breadcrumb-trail"

const kinds = ["With vitamin K2", "Drops", "Oral sprays", "Gummies", "Vegan D3"]
const filters = ["Brand", "Strength", "Form", "Diet"]
const products = [
  { name: "Vitamin D3 25 µg", size: "180 softgels", price: "€9,49", rating: "4.8", reviews: 1204, photo: "softgels", alt: "An amber supplement jar with golden softgels beside it." },
  { name: "Vitamin D3 drops 50 µg", size: "25 ml", price: "€12,95", rating: "4.7", reviews: 386, photo: "drops", alt: "An amber dropper bottle with a glass pipette." },
  { name: "D3 + K2 tablets", size: "90 tablets", price: "€14,99", rating: "4.9", reviews: 642, photo: "tablets", alt: "A white supplement tub with small white tablets in front." },
  { name: "Vitamin D3 spray 75 µg", size: "15 ml", price: "€11,50", rating: "4.6", reviews: 211, photo: "spray", alt: "A slim white oral spray bottle." },
  { name: "Orange D3 gummies", size: "60 gummies", price: "€8,99", rating: "4.5", reviews: 958, photo: "gummies", alt: "A glass jar of orange gummies with a wooden lid." },
]

export default function Demo() {
  return (
    <div className="bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-8 px-6 lg:h-[72px] lg:px-10">
          <a href="#" className="flex shrink-0 items-center gap-2">
            <Leaf className="size-6" aria-hidden />
            <span className="text-[21px] leading-none font-bold tracking-[-0.02em]">Elmbrook</span>
          </a>
          <nav aria-label="Main" className="hidden gap-6 text-[15px] font-medium lg:flex">
            <a href="#shop">Shop</a>
            <a href="#offers">Offers</a>
            <a href="#advice">Advice</a>
          </nav>
          <div className="ml-auto hidden h-11 w-[340px] items-center gap-2 rounded-full border border-border px-4 text-[15px] text-muted-foreground md:flex">
            <Search className="size-[18px]" aria-hidden />
            Search 4,000 products
          </div>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            {[User, Heart, ShoppingBag].map((I, i) => (
              <span key={i} className="grid size-11 place-items-center"><I className="size-[22px]" aria-hidden /></span>
            ))}
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-[1280px] px-6 pt-6 pb-20 lg:px-10 lg:pt-8">
        <BreadcrumbTrail />
        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="text-[30px] leading-[1.08] font-semibold tracking-[-0.018em] lg:text-[36px]">Vitamin D3 for adults</h1>
          <p className="text-[16px] text-muted-foreground">64 products</p>
        </div>
        <ul className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {kinds.map((k) => (
            <li key={k} className="shrink-0"><a href="#" className="flex h-10 items-center rounded-full bg-muted px-4 text-[14px] font-medium">{k}</a></li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
          {filters.map((f) => (
            <span key={f} className="hidden h-11 w-[150px] items-center justify-between rounded-lg border border-border px-3.5 text-[14px] lg:flex">{f}<ChevronDown className="size-4 text-muted-foreground" aria-hidden /></span>
          ))}
          <span className="ml-auto hidden h-11 items-center rounded-lg border border-border px-3.5 text-[14px] sm:flex">Sort: Most popular</span>
          <span className="flex h-11 items-center gap-2 rounded-lg border-2 border-foreground px-4 text-[14px] font-semibold">All filters<SlidersHorizontal className="size-4" aria-hidden /></span>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
          {products.map((p) => (
            <li key={p.name}>
              <a href="#" className="block">
                <img src={`/ui/photos/breadcrumb-trail/${p.photo}.webp`} alt={p.alt} width={1024} height={1024} className="aspect-square w-full rounded-xl bg-muted object-cover" />
                <p className="mt-3 text-[15px] leading-[1.25] font-semibold">{p.name}</p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{p.size}</p>
                <p className="mt-2 flex items-center gap-1 text-[13px] text-muted-foreground"><Star className="size-3.5 fill-foreground text-foreground" aria-hidden />{p.rating} ({p.reviews})</p>
                <p className="mt-2 text-[18px] font-semibold tabular-nums">{p.price}</p>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

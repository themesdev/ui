import { ChevronRight, House } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export type Crumb = { label: string; href?: string }

export type BreadcrumbTrailProps = {
  /** Home first, the current page last. On a phone the levels between home and the parent fold into an ellipsis. */
  items: Crumb[]
}

export const breadcrumbTrailDefaults: BreadcrumbTrailProps = {
  items: [
    { label: "Home", href: "#" },
    { label: "Vitamins and supplements", href: "#supplements" },
    { label: "Vitamins", href: "#vitamins" },
    { label: "Vitamin D", href: "#vitamin-d" },
    { label: "Vitamin D3 for adults" },
  ],
}

const link =
  "inline-flex h-7 items-center rounded-sm text-muted-foreground outline-none hover:text-foreground hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50"

/** A home icon and the levels on one line with chevrons; a long current page truncates instead of wrapping. */
export function BreadcrumbTrail(props: Partial<BreadcrumbTrailProps>) {
  const c = { ...breadcrumbTrailDefaults, ...props }
  const last = c.items.length - 1
  const folds = last > 2
  return (
    <Breadcrumb aria-label="Breadcrumb" className="min-w-0">
      <BreadcrumbList className="flex-nowrap gap-1.5 text-[14px] leading-[1.25] sm:gap-2">
        {c.items.map((item, i) => {
          const hideOnPhone = folds && i > 0 && i < last - 1
          return [
            i === 1 && folds ? (
              <BreadcrumbItem key="fold" className="sm:hidden">
                <BreadcrumbEllipsis className="size-7 text-muted-foreground" />
              </BreadcrumbItem>
            ) : null,
            i === 1 && folds ? <BreadcrumbSeparator key="fold-sep" className="text-muted-foreground/70 sm:hidden">
                <ChevronRight className="size-4" />
              </BreadcrumbSeparator> : null,
            <BreadcrumbItem key={`i${i}`} className={cn(hideOnPhone && "hidden sm:inline-flex", i === last ? "min-w-0" : "shrink-0")}>
              {i === last ? (
                <BreadcrumbPage className="truncate font-medium">{item.label}</BreadcrumbPage>
              ) : i === 0 ? (
                <BreadcrumbLink href={item.href ?? "#"} className={cn(link, "size-7 justify-center")}>
                  <House className="size-[18px]" aria-hidden />
                  <span className="sr-only">{item.label}</span>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink href={item.href ?? "#"} className={cn(link, "whitespace-nowrap")}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>,
            i < last ? (
              <BreadcrumbSeparator key={`s${i}`} className={cn("text-muted-foreground/70", hideOnPhone && "hidden sm:inline-flex")}>
                <ChevronRight className="size-4" />
              </BreadcrumbSeparator>
            ) : null,
          ]
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

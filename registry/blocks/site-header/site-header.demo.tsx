import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SiteHeader } from "./site-header"

export default function Demo() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="relative">
        <img
          src="/ui/photos/site-header/trail-run.webp"
          alt="Two runners on a gravel path through dunes and pine trees in early morning light."
          width={2048}
          height={1152}
          className="h-[560px] w-full object-cover lg:h-[640px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1280px] px-6 pb-12 text-white lg:px-10 lg:pb-16">
            <p className="text-[13px] font-semibold tracking-[0.08em] uppercase">Trail week</p>
            <h1 className="mt-3 max-w-[14ch] text-[40px] leading-[1.04] font-bold tracking-[-0.024em] lg:text-[64px] lg:leading-none lg:tracking-[-0.03em]">
              Soft ground, steady feet
            </h1>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#trail" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full bg-white px-6 text-[16px] text-black hover:bg-white/90")}>
                Shop trail shoes
              </a>
              <a href="#gait" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full border-white bg-transparent px-6 text-[16px] text-white hover:bg-white/10 hover:text-white dark:border-white dark:bg-transparent")}>
                Book a gait analysis
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

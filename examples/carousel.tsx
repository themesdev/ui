import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const stops = [
  ["harbour", "The harbour at dawn", "Wooden boats and pastel houses, best before seven."],
  ["market", "The covered market", "Open Tuesday to Saturday; the vegetable stalls go first."],
  ["trail", "The ridge trail", "A six-hour walk with two water stops along the way."],
  ["bakery", "The corner bakery", "Bread from four in the morning, pastries until they run out."],
]

export default function Example() {
  return (
    <div className="w-full px-12">
      <Carousel opts={{ align: "start" }} aria-label="Places to visit">
        <CarouselContent>
          {stops.map(([photo, title, line]) => (
            <CarouselItem key={photo} className="sm:basis-1/2">
              <figure className="overflow-hidden rounded-xl border">
                <img src={`/ui/photos/carousel/${photo}.webp`} alt="" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" />
                <figcaption className="grid gap-1 p-4">
                  <span className="text-base font-medium">{title}</span>
                  <span className="text-sm text-muted-foreground">{line}</span>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

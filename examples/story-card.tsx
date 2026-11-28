import { StoryCard } from "@/components/ui/story-card"

const ferry = { src: "/ui/photos/story-card/ferry.webp", alt: "A passenger ferry crossing a misty estuary at dawn" }
const bakery = { src: "/ui/photos/story-card/bakery.webp", alt: "A baker lifting sourdough loaves out of a wood-fired oven" }
const garden = { src: "/ui/photos/story-card/allotment.webp", alt: "Raised beds of kale and dahlias on an allotment" }

export default function Example() {
  return (
    <div className="grid w-full gap-5">
      <StoryCard variant="wide" kicker="Travel" title="The 06:40 ferry is the best commute in the country" href="/stories/ferry" description="Eleven minutes across the estuary, a coffee from the galley and nobody on their phone." meta="By Noor Haddad · 6 min read" image={ferry} />
      <div className="grid gap-5 sm:grid-cols-2">
        <StoryCard kicker="Food" title="Why the neighbourhood bakery bakes at four" href="/stories/bakery" description="A wood oven does not wait for anyone." meta="3 Nov · 4 min read" image={bakery} />
        <div className="grid content-start gap-3">
          <StoryCard variant="compact" kicker="Garden" title="What to sow on the allotment in November" href="/stories/allotment" meta="2 Nov · 3 min read" image={garden} />
          <StoryCard variant="compact" kicker="Money" title="Three small energy bills we stopped paying" href="/stories/energy" meta="30 Oct · 5 min read" />
        </div>
      </div>
    </div>
  )
}

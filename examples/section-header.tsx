import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

export default function Example() {
  return (
    <div className="flex w-full flex-col gap-14">
      <SectionHeader kicker="Latest" title="Notes from the workshop" description="Short write-ups on how we build, ship and look after the things we make.">
        <Button variant="outline" size="lg">All notes</Button>
      </SectionHeader>
      <SectionHeader align="center" kicker="Pricing" title="One plan, no seat counting" description="Everything is included from the first project. Pay monthly or yearly and change your mind any time." />
    </div>
  )
}

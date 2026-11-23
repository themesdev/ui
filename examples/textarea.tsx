import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Example() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <div className="grid gap-2">
        <Label htmlFor="msg">Message</Label>
        <Textarea id="msg" rows={4} className="text-base md:text-sm" placeholder="Tell us what went wrong with your order." defaultValue="The parcel arrived on Monday but the lid of the jar was cracked." aria-describedby="msg-help" />
        <p id="msg-help" className="text-sm text-muted-foreground">We reply within one working day.</p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" rows={3} placeholder="A line or two about you" aria-invalid="true" aria-describedby="bio-error" className="text-base md:text-sm" />
        <p id="bio-error" className="text-sm text-destructive">Write at least one sentence about yourself.</p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes" className="opacity-50">Internal notes</Label>
        <Textarea id="notes" rows={2} disabled className="text-base md:text-sm" defaultValue="Locked while the order is being shipped." />
      </div>
    </div>
  )
}

import { Checkbox } from "@/components/ui/checkbox"

export default function Example() {
  return (
    <fieldset className="grid w-full max-w-md gap-4 rounded-xl border p-6">
      <legend className="px-1 text-sm font-medium">Email notifications</legend>
      <div className="flex items-start gap-3">
        <Checkbox id="n-comments" defaultChecked className="mt-0.5" />
        <label htmlFor="n-comments" className="grid gap-1 text-sm font-medium">
          Comments and mentions
          <span className="font-normal text-muted-foreground">When someone replies to you or mentions you.</span>
        </label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="n-digest" className="mt-0.5" />
        <label htmlFor="n-digest" className="grid gap-1 text-sm font-medium">
          Weekly digest
          <span className="font-normal text-muted-foreground">Every Monday at 08:00.</span>
        </label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="n-security" checked disabled className="mt-0.5" />
        <label htmlFor="n-security" className="grid gap-1 text-sm font-medium opacity-50">
          Security alerts
          <span className="font-normal">Always on, so we can reach you about sign-ins.</span>
        </label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="n-terms" aria-invalid className="mt-0.5" />
        <label htmlFor="n-terms" className="grid gap-1 text-sm font-medium">
          I agree to the terms
          <span className="font-normal text-destructive">Accept the terms to create the account.</span>
        </label>
      </div>
    </fieldset>
  )
}

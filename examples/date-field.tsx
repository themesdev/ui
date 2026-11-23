import { DateField } from "@/components/ui/date-field"

export default function Example() {
  return (
    <form className="grid w-full max-w-xl gap-6 rounded-xl border p-6">
      <div>
        <h2 className="text-lg leading-[1.25] font-semibold">Book your stay</h2>
        <p className="mt-1 text-sm text-muted-foreground">The check-out date can never be before check-in.</p>
      </div>
      <DateField
        id="stay"
        name="stay"
        label="Dates"
        defaultValue="2026-12-18"
        min="2026-12-01"
        max="2027-03-31"
        hint="Winter season, 1 December to 31 March."
        range={{ fromLabel: "Check-in", toLabel: "Check-out", toValue: "2026-12-23" }}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <DateField id="birth" label="Date of birth" defaultValue="2031-04-02" error="Enter a date in the past." />
        <DateField id="invoice" label="Invoice date" defaultValue="2026-11-20" disabled hint="Set by the system." />
      </div>
    </form>
  )
}

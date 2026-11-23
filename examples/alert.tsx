import { AlertCircleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Example() {
  return (
    <div className="grid w-full max-w-xl gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>Invoice 2026-118 for €490.00 was paid on 20 November. A receipt is in your inbox.</AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon />
        <AlertTitle>Scheduled maintenance</AlertTitle>
        <AlertDescription>The dashboard is read-only on Sunday 29 November, between 02:00 and 03:00 UTC.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Your card was declined</AlertTitle>
        <AlertDescription>Update the card ending 4242 before 1 December to keep your team's seats active.</AlertDescription>
      </Alert>
    </div>
  )
}

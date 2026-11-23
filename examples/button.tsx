import { ArrowRightIcon, DownloadIcon, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Example() {
  return (
    <div className="grid w-full gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg">Start free trial</Button>
        <Button size="lg" variant="secondary">Book a demo</Button>
        <Button size="lg" variant="outline">View pricing</Button>
        <Button size="lg" variant="ghost">Sign in</Button>
        <Button size="lg" variant="link">Read the docs</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg"><PlusIcon data-icon="inline-start" />New project</Button>
        <Button size="lg" variant="outline">Continue<ArrowRightIcon data-icon="inline-end" /></Button>
        <Button size="lg" variant="outline" aria-label="Download report"><DownloadIcon /></Button>
        <Button size="lg" variant="destructive"><Trash2Icon data-icon="inline-start" />Delete project</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" disabled>Unavailable</Button>
        <Button size="lg" disabled><Loader2Icon className="animate-spin" data-icon="inline-start" />Saving</Button>
        <a href="#invoices" className={buttonVariants({ size: "lg", variant: "outline" })}>A link styled as a button</a>
      </div>
    </div>
  )
}

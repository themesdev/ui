import { Link } from "@/components/ui/link"

export default function Example() {
  return (
    <article className="flex w-full max-w-[34rem] flex-col gap-6">
      <h2 className="text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.018em]">Moving your domain</h2>
      <p className="text-base leading-[1.5] text-muted-foreground">
        Before you start, <Link href="#unlock">unlock the domain</Link> at your current registrar and ask for the transfer code. Most registrars send it within an hour. The <Link href="#icann" variant="external" newTab>ICANN transfer policy</Link> allows up to five days, and nothing goes offline while you wait.
      </p>
      <div className="flex flex-col gap-3 border-t pt-6">
        <Link href="#checklist" variant="standalone">Read the full transfer checklist</Link>
        <Link href="#status" variant="external" newTab>Check the status of a transfer</Link>
        <Link href="#focus" className="font-normal">A link with a keyboard focus ring (press Tab)</Link>
      </div>
    </article>
  )
}

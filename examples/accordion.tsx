import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  ["Can I change my plan later?", "Yes. Upgrades apply at once and are prorated; downgrades start at your next renewal date."],
  ["Do you offer refunds?", "Within 30 days of purchase, no questions asked. Write to billing and we return the full amount."],
  ["Where is my data stored?", "In the EU, in Frankfurt and Amsterdam. Backups are encrypted and kept for 35 days."],
  ["Is there a discount for non-profits?", "Registered non-profits and schools get 40% off every paid plan. Send us your registration number."],
]

export default function Example() {
  return (
    <div className="w-full max-w-xl">
      <h2 className="mb-2 text-xl leading-[1.25] font-semibold">Billing questions</h2>
      <Accordion defaultValue={["0"]}>
        {faqs.map(([q, a], i) => (
          <AccordionItem key={q} value={String(i)}>
            <AccordionTrigger className="py-4 text-base">{q}</AccordionTrigger>
            <AccordionContent className="text-base leading-[1.5] text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

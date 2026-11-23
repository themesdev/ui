import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet, FieldContent, FieldTitle } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const plans = [
  { id: "solo", name: "Solo", line: "One project, for yourself. € 9 a month." },
  { id: "team", name: "Team", line: "Unlimited projects and five seats. € 29 a month." },
  { id: "scale", name: "Scale", line: "Single sign-on and audit logs, billed yearly." },
]

export default function Example() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Choose a plan</FieldLegend>
      <FieldDescription>You can change this at any time.</FieldDescription>
      <RadioGroup defaultValue="team">
        {plans.map((p) => (
          <FieldLabel key={p.id} htmlFor={`plan-${p.id}`}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{p.name}</FieldTitle>
                <FieldDescription>{p.line}</FieldDescription>
              </FieldContent>
              <RadioGroupItem value={p.id} id={`plan-${p.id}`} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}

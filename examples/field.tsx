import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
      <FieldSet>
        <FieldLegend>Billing contact</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="f-name">Full name</FieldLabel>
            <Input id="f-name" className="h-9" defaultValue="Noor van Dijk" />
          </Field>
          <Field data-invalid="true">
            <FieldLabel htmlFor="f-email">Email</FieldLabel>
            <Input id="f-email" type="email" className="h-9" defaultValue="noor@kade" aria-invalid="true" aria-describedby="f-email-err" />
            <FieldError id="f-email-err">Enter a full address, like noor@example.com.</FieldError>
          </Field>
          <Field data-disabled="true">
            <FieldLabel htmlFor="f-vat">VAT number</FieldLabel>
            <Input id="f-vat" className="h-9" defaultValue="NL864512309B01" disabled />
            <FieldDescription>Locked after your first invoice. Contact support to change it.</FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="f-copy" defaultChecked />
            <FieldLabel htmlFor="f-copy" className="font-normal">Send me a copy of every invoice</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}

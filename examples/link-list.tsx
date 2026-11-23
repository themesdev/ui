import { LinkList } from "@/components/ui/link-list"

export default function Example() {
  return (
    <section className="w-full max-w-xl">
      <h2 id="help" className="mb-4 text-xl font-semibold leading-[1.15] tracking-[-0.01em]">Help with your account</h2>
      <LinkList
        label="Help topics"
        items={[
          { title: "Change your billing details", description: "Update a card, an address or a VAT number.", href: "#billing" },
          { title: "Invite a teammate", description: "Add people and choose what each of them can do.", href: "#invite" },
          { title: "Export your data", description: "A zip of your projects and invoices, ready in minutes.", href: "#export" },
          { title: "Close your account", href: "#close" },
        ]}
      />
    </section>
  )
}

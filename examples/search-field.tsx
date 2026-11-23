import { SearchField } from "@/components/ui/search-field"

export default function Example() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Press <kbd className="rounded-sm bg-muted px-1 text-xs">/</kbd> anywhere on the page to jump here.</p>
        <SearchField id="search-docs" label="Search the docs" placeholder="Search the docs" action="#search" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">With a query typed, the clear button replaces the hint.</p>
        <SearchField id="search-filled" label="Search the docs" action="#search" defaultValue="webhooks" />
      </div>
    </div>
  )
}

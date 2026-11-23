import { CreditCardIcon, FileTextIcon, SettingsIcon, UserIcon } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"

export default function Example() {
  return (
    <Command className="h-auto w-full max-w-md border shadow-md">
      <CommandInput placeholder="Search pages and actions" />
      <CommandList>
        <CommandEmpty>No results for that search.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem><FileTextIcon />Invoices</CommandItem>
          <CommandItem><UserIcon />Team members</CommandItem>
          <CommandItem><CreditCardIcon />Billing<CommandShortcut>⌘B</CommandShortcut></CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem><SettingsIcon />Open settings<CommandShortcut>⌘,</CommandShortcut></CommandItem>
          <CommandItem><UserIcon />Invite a colleague<CommandShortcut>⌘I</CommandShortcut></CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

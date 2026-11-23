import { Kbd, KbdGroup } from "@/components/ui/kbd"

const rows: [string, string[]][] = [
  ["Open the command menu", ["⌘", "K"]],
  ["Search the docs", ["/"]],
  ["Save the page", ["⌘", "S"]],
  ["Go to the dashboard", ["G", "D"]],
]

export default function Example() {
  return (
    <ul className="w-full max-w-sm divide-y divide-border rounded-xl border">
      {rows.map(([label, keys]) => (
        <li key={label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
          <span>{label}</span>
          <KbdGroup>{keys.map((k) => <Kbd key={k}>{k}</Kbd>)}</KbdGroup>
        </li>
      ))}
    </ul>
  )
}

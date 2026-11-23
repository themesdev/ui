import { FilterSheet } from "@/components/ui/filter-sheet"

export default function Example() {
  return (
    <div className="w-full max-w-sm rounded-xl border p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">128 apartments in Utrecht</p>
        <FilterSheet
          id="homes"
          description="Narrow down the 128 apartments."
          apply="Show 24 results"
          groups={[
            {
              name: "rooms",
              legend: "Rooms",
              options: [
                { value: "1", label: "1 room", count: 18 },
                { value: "2", label: "2 rooms", count: 54, checked: true },
                { value: "3", label: "3 rooms", count: 41, checked: true },
                { value: "4", label: "4+ rooms", count: 15 },
              ],
            },
            {
              name: "features",
              legend: "Features",
              options: [
                { value: "balcony", label: "Balcony", count: 63 },
                { value: "parking", label: "Parking", count: 29, checked: true },
                { value: "pets", label: "Pets allowed", count: 0, disabled: true },
              ],
            },
          ]}
        />
      </div>
      <ul className="grid gap-2 text-sm">
        <li className="rounded-lg border p-3">Plantsoenstraat 12, 3 rooms, 94 m²</li>
        <li className="rounded-lg border p-3">Lange Nieuwstraat 40, 2 rooms, 68 m²</li>
      </ul>
    </div>
  )
}

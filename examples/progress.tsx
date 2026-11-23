import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

const rows = [
  { label: "Uploading kade-site.zip", value: 64 },
  { label: "Storage used", value: 92 },
  { label: "Profile completed", value: 100 },
]

export default function Example() {
  return (
    <div className="grid w-full max-w-md gap-6">
      {rows.map((r) => (
        <Progress key={r.label} value={r.value}>
          <ProgressLabel>{r.label}</ProgressLabel>
          <ProgressValue>{(_, v) => `${Math.round(v ?? 0)}%`}</ProgressValue>
        </Progress>
      ))}
    </div>
  )
}

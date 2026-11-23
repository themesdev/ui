import { BarChart } from "@/components/ui/bar-chart"

const deploys = [
  { label: "Jan", value: 18 },
  { label: "Feb", value: 24 },
  { label: "Mar", value: 31 },
  { label: "Apr", value: 27 },
  { label: "May", value: 42 },
  { label: "Jun", value: 38 },
  { label: "Jul", value: 35 },
  { label: "Aug", value: 21 },
  { label: "Sep", value: 44 },
  { label: "Oct", value: 49 },
  { label: "Nov", value: 46 },
  { label: "Dec", value: 33 },
]

export default function Example() {
  return <BarChart title="Production deploys, 2026" data={deploys} unit=" deploys" summary="Total 408" highlight="Oct" />
}

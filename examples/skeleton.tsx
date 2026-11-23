import { Skeleton } from "@/components/ui/skeleton"

export default function Example() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading your orders" className="grid w-full max-w-md gap-6">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-14 shrink-0 rounded-lg" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
      <span className="sr-only">Loading your orders</span>
    </div>
  )
}

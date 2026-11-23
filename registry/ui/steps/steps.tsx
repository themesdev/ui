import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export type Step = { title: string; description?: string }

export type StepsProps = {
  steps: Step[]
  /** The step you are on, counted from 0. Steps before it are done. */
  current: number
  label?: string
  className?: string
}

/** Progress through a flow: done, current (aria-current="step") and still to come. Horizontal when the container is wide. */
export function Steps({ steps, current, label = "Progress", className }: StepsProps) {
  return (
    <nav aria-label={label} className={cn("@container", className)}>
      <ol className="flex flex-col @xl:flex-row">
        {steps.map((s, k) => {
          const state = k < current ? "done" : k === current ? "current" : "todo"
          const last = k === steps.length - 1
          return (
            <li key={k} data-state={state} aria-current={state === "current" ? "step" : undefined} className="group/step flex gap-3 @xl:flex-1 @xl:flex-col">
              <span className="flex flex-col items-center @xl:flex-row">
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border text-sm font-medium tabular-nums",
                    state === "done" && "border-primary bg-primary text-primary-foreground",
                    state === "current" && "border-foreground bg-background text-foreground ring-3 ring-ring/30",
                    state === "todo" && "border-border bg-background text-muted-foreground"
                  )}
                >
                  {state === "done" ? <Check aria-hidden="true" className="size-4" /> : k + 1}
                </span>
                {!last && (
                  <span aria-hidden="true" className={cn("my-1 min-h-6 w-px flex-1 @xl:mx-2 @xl:my-0 @xl:h-px @xl:min-h-0 @xl:w-auto", state === "done" ? "bg-primary" : "bg-border")} />
                )}
              </span>
              <span className={cn("grid content-start gap-0.5 pb-6 @xl:pr-4 @xl:pb-0", last && "pb-0")}>
                <span className={cn("text-sm font-medium", state === "todo" && "text-muted-foreground")}>
                  {s.title}
                  <span className="sr-only">{state === "done" ? " (done)" : state === "current" ? " (current)" : ""}</span>
                </span>
                {s.description && <span className="text-sm text-muted-foreground">{s.description}</span>}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

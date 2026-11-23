"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

export default function Example() {
  // One toast on arrival so you see what they look like; the buttons make more. <Toaster /> goes once in your layout.
  useEffect(() => {
    toast("Invoice sent", { description: "INV-2041 went to accounts@marlowfinch.example.", duration: 60000, classNames: { description: "!text-muted-foreground" } })
  }, [])
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Toaster position="bottom-center" />
      <Button variant="outline" className="h-10 px-4" onClick={() => toast("Invoice sent", { description: "INV-2041 went to accounts@marlowfinch.example." })}>Send invoice</Button>
      <Button variant="outline" className="h-10 px-4" onClick={() => toast.success("Profile saved")}>Save profile</Button>
      <Button variant="outline" className="h-10 px-4" onClick={() => toast.error("Payment failed", { description: "Your card was declined. Try another card." })}>Pay now</Button>
      <Button variant="outline" className="h-10 px-4" onClick={() => toast("Message deleted", { action: { label: "Undo", onClick: () => toast.success("Message restored") } })}>Delete message</Button>
    </div>
  )
}

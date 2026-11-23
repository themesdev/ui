import { Steps } from "@/components/ui/steps"

const steps = [
  { title: "Cart", description: "Review your items" },
  { title: "Delivery", description: "Address and time slot" },
  { title: "Payment", description: "Card or iDEAL" },
  { title: "Confirmation", description: "Order summary by email" },
]

export default function Example() {
  return (
    <div className="grid w-full gap-10">
      <div className="max-w-xs">
        <Steps label="Checkout progress" steps={steps} current={1} />
      </div>
      <Steps label="Checkout progress, wide" steps={steps} current={2} />
    </div>
  )
}

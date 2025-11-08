import { Tent } from "lucide-react"

export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <Tent className="w-8 h-8 text-emerald-500" strokeWidth={2} />
      <span className="font-outfit text-xl font-semibold text-emerald-100">campeek</span>
    </div>
  )
}

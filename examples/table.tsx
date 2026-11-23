import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const rows = [
  { no: "INV-2041", client: "Marlow & Finch", status: "Paid", amount: "€1,240.00" },
  { no: "INV-2042", client: "Kestrel Dental", status: "Due 28 Nov", amount: "€860.00" },
  { no: "INV-2043", client: "Hollis Bikes", status: "Overdue", amount: "€2,115.50" },
  { no: "INV-2044", client: "Tidewater Books", status: "Paid", amount: "€390.00" },
]

export default function Example() {
  return (
    <div className="w-full">
      <Table>
        <TableCaption>Invoices for November 2026</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead className="max-sm:hidden">Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.no}>
              <TableCell className="font-medium">{r.no}</TableCell>
              <TableCell className="max-sm:hidden">{r.client}</TableCell>
              <TableCell><Badge variant={r.status === "Paid" ? "secondary" : "outline"} className={r.status === "Overdue" ? "border-destructive/50 text-destructive" : undefined}>{r.status}</Badge></TableCell>
              <TableCell className="text-right tabular-nums">{r.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="max-sm:hidden">Total</TableCell>
            <TableCell colSpan={2} className="sm:hidden">Total</TableCell>
            <TableCell className="text-right tabular-nums">€4,605.50</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

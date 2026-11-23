import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function Example() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-center text-sm text-muted-foreground">Showing 41–50 of 128 articles</p>
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#p4" size="lg" /></PaginationItem>
          <PaginationItem><PaginationLink href="#p1" size="icon-lg">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationLink href="#p4" size="icon-lg">4</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#p5" size="icon-lg" isActive>5</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#p6" size="icon-lg">6</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationLink href="#p13" size="icon-lg">13</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext href="#p6" size="lg" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

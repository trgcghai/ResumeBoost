import { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface TablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <Pagination className="flex justify-end gap-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!table.getCanPreviousPage()}
              className={
                !table.getCanPreviousPage()
                  ? "opacity-50 pointer-events-none"
                  : "cursor-pointer"
              }
              onClick={() => table.previousPage()}
            />
          </PaginationItem>

          {renderPaginationItems()}

          <PaginationItem>
            <PaginationNext
              aria-disabled={!table.getCanNextPage()}
              className={
                !table.getCanNextPage()
                  ? "opacity-50 pointer-events-none"
                  : "cursor-pointer"
              }
              onClick={() => table.nextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );

  function renderPaginationItems() {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageCount = table.getPageCount();

    // Không hiển thị phân trang nếu chỉ có 1 trang
    if (pageCount <= 1) {
      return (
        <PaginationItem>
          <PaginationLink isActive>1</PaginationLink>
        </PaginationItem>
      );
    }

    const items = [];

    // Luôn hiển thị trang đầu tiên
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => table.setPageIndex(0)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Hiển thị dấu "..." nếu trang hiện tại > 2
    if (currentPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Trang hiện tại (nếu không phải trang đầu tiên hoặc cuối cùng)
    if (currentPage !== 1 && currentPage !== pageCount) {
      items.push(
        <PaginationItem key={currentPage}>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
      );
    }

    // Hiển thị dấu "..." nếu trang hiện tại < tổng số trang - 1
    if (currentPage < pageCount - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Luôn hiển thị trang cuối cùng (nếu có nhiều hơn 1 trang)
    if (pageCount > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={currentPage === pageCount}
            onClick={() => table.setPageIndex(pageCount - 1)}
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  }
}

export default TablePagination;

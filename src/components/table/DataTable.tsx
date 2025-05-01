import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableProps<TData, TValue = any> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  tableCellClassName?: string;
  tableRowClassName?: string;
  tableHeadClassName?: string;
  tableClassName?: string;
  enableSorting?: boolean;
  enableMultiSort?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<TData, TValue = any>({
  data,
  columns,
  tableCellClassName = "text-base py-3",
  tableRowClassName,
  tableHeadClassName = "font-medium",
  tableClassName,
  enableSorting = true,
  enableMultiSort = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting,
    enableMultiSort,
  });

  return (
    <div className="">
      <Table className={tableClassName}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={tableHeadClassName}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    // Thêm cursor pointer để thể hiện có thể click
                    cursor: enableSorting ? "pointer" : "default",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {enableSorting && (
                    <span className="ml-2">
                      {{}[header.column.getIsSorted() as string] ?? null}
                    </span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={tableRowClassName}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={tableCellClassName}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Không tìm thấy kết quả.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;

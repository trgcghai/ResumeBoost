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
} from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableProps<TData, TValue = any> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  tableCellClassName?: string;
  tableRowClassName?: string;
  tableHeadClassName?: string;
  tableClassName?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<TData, TValue = any>({
  data,
  columns,
  tableCellClassName = "text-base py-3",
  tableRowClassName,
  tableHeadClassName = "font-medium",
  tableClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <Table className={tableClassName}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={tableHeadClassName}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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

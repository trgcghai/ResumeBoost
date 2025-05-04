import { useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";

export const useSortingAndFiltering = <T>(
  data: T[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[]
) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortField, setSortField] = useState("fileName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setSorting([{ id: field, desc: sortOrder === "asc" }]);
  };

  const handleReset = () => {
    setGlobalFilter("");
    setColumnFilters([]);
    setSorting([]);
    setSortField("fileName");
    setSortOrder("asc");
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return {
    table,
    sorting,
    columnFilters,
    globalFilter,
    setGlobalFilter,
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    handleSort,
    handleReset,
  };
};

export default useSortingAndFiltering;

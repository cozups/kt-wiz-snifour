import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { cn } from "@/lib/utils";
import { TableSkeleton } from "./TableSkeleton";

interface TypeHasTeamName {
  teamName?: string;
  team?: string;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  domain?: "kt" | "all";
}

function DataTable<TData>({ data, columns, isLoading, domain }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (data?.length <= 0) {
    return (
      <div className="w-full min-h-96 flex items-center justify-center font-bold text-2xl">
        데이터가 존재하지 않습니다.
      </div>
    );
  }

  return (
    <Table className="mt-4">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="text-base font-semibold bg-wiz-white bg-opacity-30 border-none">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="text-center whitespace-nowrap">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="text-center">
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className={cn(
              "border-b-wiz-white border-opacity-10 whitespace-nowrap bg-wiz-white bg-opacity-0 hover:bg-opacity-15",
              domain === "all" &&
                ((row.original as TData & TypeHasTeamName).teamName === "KT" ||
                  (row.original as TData & TypeHasTeamName).team === "KT") &&
                "bg-wiz-red bg-opacity-70 border-b-wiz-red hover:bg-opacity-90"
            )}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { DataTable };

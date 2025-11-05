import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { OverallBatterRank, OverallPitcherRank } from "@/features/common";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

type PlayerRank = OverallPitcherRank | OverallBatterRank;

interface PlayerRankingTableProps<T extends PlayerRank> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  domain: "kt" | "all";
}

function SortableTable<T extends PlayerRank>({ data, columns, loading = false, domain }: PlayerRankingTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (loading) {
    return (
      <div>
        <Skeleton baseColor="#d1d5db" className="w-full h-8 md:h-10 lg:h-12" count={10} />
      </div>
    );
  }

  return (
    <Table className="mt-4">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="font-semibold bg-wiz-white bg-opacity-30 border-none">
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={cn("text-center break-keep py-2 px-6", "md:text-sm md:px-6 md:py-2", "lg:text-sm lg:p-2")}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="text-center">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={cn(
                "text-center border-b-wiz-white border-opacity-10 bg-wiz-white bg-opacity-0 hover:bg-opacity-15",
                domain === "kt" && index < 3 && "bg-wiz-red bg-opacity-70 font-bold hover:bg-opacity-90",
                domain === "all" &&
                  row.original.teamName.toLowerCase() === "kt" &&
                  "bg-wiz-red bg-opacity-80 font-bold text-white hover:bg-opacity-90"
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={cn("px-2", "md:text-sm md:py-2", "lg:py-3 lg:text-sm")}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>결과가 없습니다.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { SortableTable };

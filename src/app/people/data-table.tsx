"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  GlobalFilterTableState,
  Column,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import FilterMenu from "@/components/FilterMenu";
import AddMemberDialog from "@/components/AddMemberDialog";
import React, { useEffect, useState } from "react";
import { User } from "./columns";
import PeopleInfo from "@/components/PeopleInfo";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { roleFilterFunction, teamsFilterFunction } from "./filterFunctions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedUser } from "@/lib/features/users/usersSlice";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const selectedUser = useAppSelector((state) => state.users.selectedUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  // const [selectedUser, setSelectedUser] = React.useState<TData | null>(null);
  const [keyword, setKeyword] = useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    enableMultiRowSelection: false,
    enableRowSelection: true,
    filterFns: {
      roleFilterFunction,
      teamsFilterFunction,
    },
  });

  const handleRowClick = (user: TData) => {
    dispatch(setSelectedUser(user));
  };

  useEffect(() => {
    if (!!query) {
      setGlobalFilter(query);
      setKeyword(query);
    } else setGlobalFilter("");
  }, [query]);

  return (
    <Card className="relative">
      <div className="p-4 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Team members</h2>
          <Badge variant="outline" className="">
            {table.getPreFilteredRowModel().rows.length} users
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 relative">
            <Input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (keyword === "") {
                    return router.push("/people");
                  }
                  router.push(`/people?query=${keyword}`);
                }
              }}
            />

            <Button
              type="submit"
              size={"icon"}
              variant={"ghost"}
              className="absolute right-0 top-0 bottom-0 z-10"
              onClick={() => {
                if (keyword.length > 0) router.push(`/people?query=${keyword}`);
                else router.push("/people");
              }}
            >
              <Search className="size-5" />
            </Button>
          </div>
          <FilterMenu
            rolesColumn={
              table.getColumn("role") as Column<User, unknown> | undefined
            }
            teamsColumn={
              table.getColumn("teams") as Column<User, unknown> | undefined
            }
          />
          <AddMemberDialog />
        </div>
      </div>
      <Separator />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  handleRowClick(row.original);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Separator />
      <div className="flex items-center justify-between p-4 py-4 w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="size-5" />
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array(table.getPageCount())
            .fill("")
            .map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                onClick={() => table.setPageIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="size-5" />
        </Button>
      </div>
      {selectedUser && <PeopleInfo user={selectedUser as User} />}
    </Card>
  );
}

"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import AddMemberDialog from "./AddMemberDialog";
import { CiFilter } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {
  ArrowDown,
  ArrowUpDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import EditProfileDialog from "./EditProfileDialog";
import DeleteProfileDialog from "./DeleteProfileDialog";
import { Checkbox } from "./ui/checkbox";
import FilterMenu from "./FilterMenu";
import PeopleInfo from "./PeopleInfo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {};

export type User = {
  id: number;
  name: string;
  status: "active" | "inactive";
  role: string;
  email: string;
  teams: string[];
  avatarUrl: string;
  gender?: string;
  dateOfBirth?: string;
  nationality?: string;
  contactNo?: string;
  workEmailId?: string;
  userId?: string;
};

const columnHelper = createColumnHelper<User>();

const DirectoryTable = (props: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const data: User[] = [
    {
      id: 1,
      name: "Grace Carter",
      status: "active",
      role: "Frontend Developer",
      email: "Frank@hotmail.com",
      teams: ["Sales", "Product"],
      avatarUrl: "https://i.pravatar.cc/150?u=grace",
      gender: "Female",
      dateOfBirth: "1990-01-15",
      nationality: "American",
      contactNo: "+1-555-1234",
      workEmailId: "grace.carter@company.com",
      userId: "@grace_carter",
    },
    {
      id: 2,
      name: "Alice Johnson",
      status: "active",
      role: "QA Engineer",
      email: "Grace@gmail.com",
      teams: ["Marketing"],
      avatarUrl: "https://i.pravatar.cc/150?u=alice",
      gender: "Female",
      dateOfBirth: "1985-06-23",
      nationality: "American",
      contactNo: "+1-555-2345",
      workEmailId: "alice.johnson@company.com",
      userId: "@alice_johnson",
    },
    {
      id: 3,
      name: "Henry Williams",
      status: "active",
      role: "Backend Developer",
      email: "Grace@yahoo.com",
      teams: ["DevOps"],
      avatarUrl: "https://i.pravatar.cc/150?u=henry",
      gender: "Male",
      dateOfBirth: "1992-11-12",
      nationality: "British",
      contactNo: "+44-555-3456",
      workEmailId: "henry.williams@company.com",
      userId: "@henry_williams",
    },
    {
      id: 4,
      name: "David Brown",
      status: "active",
      role: "Engineering Manager",
      email: "Isla@gmail.com",
      teams: ["Engineering", "Product"],
      avatarUrl: "https://i.pravatar.cc/150?u=david",
      gender: "Male",
      dateOfBirth: "1980-04-30",
      nationality: "Canadian",
      contactNo: "+1-555-4567",
      workEmailId: "david.brown@company.com",
      userId: "@david_brown",
    },
    {
      id: 5,
      name: "Bob Miller",
      status: "active",
      role: "Technical Lead",
      email: "Grace@yahoo.com",
      teams: ["Sales", "Engineering", "DevOps"],
      avatarUrl: "https://i.pravatar.cc/150?u=bob",
      gender: "Male",
      dateOfBirth: "1983-09-10",
      nationality: "Australian",
      contactNo: "+61-555-5678",
      workEmailId: "bob.miller@company.com",
      userId: "@bob_miller",
    },
    {
      id: 6,
      name: "Frank Davis",
      status: "active",
      role: "QA Engineer",
      email: "Grace@hotmail.com",
      teams: ["Marketing", "Product", "DevOps"],
      avatarUrl: "https://i.pravatar.cc/150?u=frank",
      gender: "Male",
      dateOfBirth: "1995-02-14",
      nationality: "American",
      contactNo: "+1-555-6789",
      workEmailId: "frank.davis@company.com",
      userId: "@frank_davis",
    },
    {
      id: 7,
      name: "Jack Wilson",
      status: "active",
      role: "System Administrator",
      email: "Alice@yahoo.com",
      teams: ["DevOps"],
      avatarUrl: "https://i.pravatar.cc/150?u=jack",
      gender: "Male",
      dateOfBirth: "1987-08-21",
      nationality: "British",
      contactNo: "+44-555-7890",
      workEmailId: "jack.wilson@company.com",
      userId: "@jack_wilson",
    },
    {
      id: 8,
      name: "Jack Thompson",
      status: "active",
      role: "QA Engineer",
      email: "Charlie@gmail.com",
      teams: ["Marketing", "Product", "DevOps"],
      avatarUrl: "https://i.pravatar.cc/150?u=thompson",
      gender: "Male",
      dateOfBirth: "1991-03-07",
      nationality: "Canadian",
      contactNo: "+1-555-8901",
      workEmailId: "jack.thompson@company.com",
      userId: "@jack_thompson",
    },
    {
      id: 9,
      name: "Eve Anderson",
      status: "active",
      role: "QA Engineer",
      email: "Bob@hotmail.com",
      teams: ["Product", "Sales", "Engineering"],
      avatarUrl: "https://i.pravatar.cc/150?u=eve",
      gender: "Female",
      dateOfBirth: "1989-07-16",
      nationality: "Australian",
      contactNo: "+61-555-0123",
      workEmailId: "eve.anderson@company.com",
      userId: "@eve_anderson",
    },
    {
      id: 10,
      name: "Grace Taylor",
      status: "active",
      role: "Frontend Developer",
      email: "Isla@yahoo.com",
      teams: ["DevOps"],
      avatarUrl: "https://i.pravatar.cc/150?u=tay",
      gender: "Female",
      dateOfBirth: "1986-05-19",
      nationality: "British",
      contactNo: "+44-555-2345",
      workEmailId: "grace.taylor@company.com",
      userId: "@grace_taylor",
    },
    {
      id: 11,
      name: "John Doe",
      status: "active",
      role: "Software Engineer",
      email: "johndoe@example.com",
      teams: ["Engineering"],
      avatarUrl: "https://i.pravatar.cc/150?u=john",
      gender: "Male",
      dateOfBirth: "1988-12-25",
      nationality: "American",
      contactNo: "+1-555-6789",
      workEmailId: "john.doe@company.com",
      userId: "@john_doe",
    },
    {
      id: 12,
      name: "Jane Smith",
      status: "inactive",
      role: "UI/UX Designer",
      email: "janesmith@example.com",
      teams: ["Design"],
      avatarUrl: "https://i.pravatar.cc/150?u=jane",
      gender: "Female",
      dateOfBirth: "1993-11-11",
      nationality: "Canadian",
      contactNo: "+1-555-8901",
      workEmailId: "jane.smith@company.com",
      userId: "@jane_smith",
    },
    {
      id: 13,
      name: "Michael Johnson",
      status: "active",
      role: "Engineering Manager",
      email: "michaeljohnson@example.com",
      teams: ["Management"],
      avatarUrl: "https://i.pravatar.cc/150?u=mic",
      gender: "Male",
      dateOfBirth: "1978-04-17",
      nationality: "American",
      contactNo: "+1-555-9012",
      workEmailId: "michael.johnson@company.com",
      userId: "@michael_johnson",
    },
    {
      id: 14,
      name: "Emily Brown",
      status: "inactive",
      role: "Data Analyst",
      email: "emilybrown@example.com",
      teams: ["Analytics"],
      avatarUrl: "https://i.pravatar.cc/150?u=emily",
      gender: "Female",
      dateOfBirth: "1994-02-28",
      nationality: "Canadian",
      contactNo: "+1-555-0123",
      workEmailId: "emily.brown@company.com",
      userId: "@emily_brown",
    },
    {
      id: 15,
      name: "David Wilson",
      status: "active",
      role: "Full Stack Developer",
      email: "davidwilson@example.com",
      teams: ["Development"],
      avatarUrl: "https://i.pravatar.cc/150?u=davidwil",
      gender: "Male",
      dateOfBirth: "1990-10-10",
      nationality: "British",
      contactNo: "+44-555-3456",
      workEmailId: "david.wilson@company.com",
      userId: "@david_wilson",
    },
    {
      id: 16,
      name: "Olivia Taylor",
      status: "inactive",
      role: "Marketing Specialist",
      email: "oliviataylor@example.com",
      teams: ["Marketing"],
      avatarUrl: "https://i.pravatar.cc/150?u=oli",
      gender: "Female",
      dateOfBirth: "1987-09-22",
      nationality: "Australian",
      contactNo: "+61-555-4567",
      workEmailId: "olivia.taylor@company.com",
      userId: "@olivia_taylor",
    },
    {
      id: 17,
      name: "William Anderson",
      status: "active",
      role: "Sales Engineer",
      email: "williamanderson@example.com",
      teams: ["Sales"],
      avatarUrl: "https://i.pravatar.cc/150?u=willi",
      gender: "Male",
      dateOfBirth: "1989-03-19",
      nationality: "British",
      contactNo: "+44-555-5678",
      workEmailId: "william.anderson@company.com",
      userId: "@william_anderson",
    },
    {
      id: 18,
      name: "Sophia Thompson",
      status: "inactive",
      role: "HR Specialist",
      email: "sophiathompson@example.com",
      teams: ["HR"],
      avatarUrl: "https://i.pravatar.cc/150?u=sophy",
      gender: "Female",
      dateOfBirth: "1982-06-18",
      nationality: "American",
      contactNo: "+1-555-6789",
      workEmailId: "sophia.thompson@company.com",
      userId: "@sophia_thompson",
    },
    {
      id: 19,
      name: "James Harris",
      status: "active",
      role: "Finance Analyst",
      email: "jamesharris@example.com",
      teams: ["Finance"],
      avatarUrl: "https://i.pravatar.cc/150?u=james",
      gender: "Male",
      dateOfBirth: "1975-05-01",
      nationality: "Canadian",
      contactNo: "+1-555-7890",
      workEmailId: "james.harris@company.com",
      userId: "@james_harris",
    },
    {
      id: 20,
      name: "Ava Miller",
      status: "inactive",
      role: "Support Engineer",
      email: "avamiller@example.com",
      teams: ["Support"],
      avatarUrl: "https://i.pravatar.cc/150?u=ava",
      gender: "Female",
      dateOfBirth: "1981-11-05",
      nationality: "Australian",
      contactNo: "+61-555-8901",
      workEmailId: "ava.miller@company.com",
      userId: "@ava_miller",
    },
  ];

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            // checked={table.getIsAllRowsSelected()}
            // indeterminate={table.getIsSomeRowsSelected()}
            // onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            // checked={row.getIsSelected()}
            // disabled={!row.getCanSelect()}
            // onCheckedChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={row.original.avatarUrl} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base">{row.getValue("name")}</p>
              <p className="text-xs">{row.original.userId}</p>
            </div>
          </div>
        ),
        header: ({ column }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none flex items-center">
                Name
                <ArrowUpDown className="ml-2 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => column.clearSorting()}>
                  Initial
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Ascending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "desc")
                  }
                >
                  Descending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        footer: (props) => props.column.id,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor((row) => row.status, {
        id: "status",
        cell: ({ row }) => (
          <Badge
            variant={"outline"}
            className="capitalize shadow-sm  inline-flex items-center gap-2"
          >
            <p
              className={cn("size-2 rounded-full", {
                "bg-green-500": row.getValue("status") === "active",
                "bg-red-500": row.getValue("status") === "inactive",
              })}
            ></p>
            {row.getValue("status")}
          </Badge>
        ),
        header: ({ column }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none flex items-center">
                Status
                <ArrowUpDown className="ml-2 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => column.clearSorting()}>
                  Initial
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Ascending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "desc")
                  }
                >
                  Descending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        footer: (props) => props.column.id,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor((row) => row.role, {
        id: "role",
        cell: ({ row }) => (
          <p className={"capitalize"}>{row.getValue("role")}</p>
        ),
        header: () => <span>Role</span>,
        footer: (props) => props.column.id,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor((row) => row.email, {
        id: "email",
        cell: (info) => info.getValue(),
        header: ({ column }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none flex items-center">
                Email Address
                <ArrowUpDown className="ml-2 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => column.clearSorting()}>
                  Initial
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Ascending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "desc")
                  }
                >
                  Descending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        footer: (props) => props.column.id,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor((row) => row.teams, {
        id: "teams",
        cell: ({ row }) => {
          const values: string[] = row.getValue("teams");
          return (
            <div className="flex items-center gap-2">
              {values?.map((team, i) => (
                <Badge key={i} variant={"secondary"}>
                  {team}
                </Badge>
              ))}
            </div>
          );
        },
        header: () => <span>Teams</span>,
        footer: (props) => props.column.id,
        enableSorting: true,
        enableColumnFilter: true,
      }),

      columnHelper.accessor((row) => row.name, {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-2">
              {/* <DeleteProfileDialog /> */}
              <EditProfileDialog user={user} />
            </div>
          );
        },
        header: () => <span></span>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    enableMultiRowSelection: false,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      columnVisibility: {},
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleRowClick = (user: User) => {
    console.log(user);
    setSelectedUser(user);
  };

  return (
    <Card className="">
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
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
            />

            <Button
              type="submit"
              size={"icon"}
              variant={"ghost"}
              className="absolute right-0 top-0 bottom-0 z-10"
            >
              <SearchIcon className="size-5" />
            </Button>
          </div>
          <FilterMenu />
          <AddMemberDialog />
        </div>
      </div>
      <Separator />
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
                className="cursor-pointer"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell: any) => (
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
          <ChevronLeftIcon className="size-5" />
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
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>

      {/* {selectedUser && <PeopleInfo user={selectedUser} />} */}
    </Card>
  );
};

export default DirectoryTable;

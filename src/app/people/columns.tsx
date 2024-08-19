"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import DeleteProfileDialog from "@/components/DeleteProfileDialog";
import EditProfileDialog from "@/components/EditProfileDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { data } from "@/lib/data";
import { roleFilterFunction, teamsFilterFunction } from "./filterFunctions";

export type Publication = {
  title: string;
  summary: string;
  publicationSource: string;
};

export type User = {
  id: number | string;
  name: string;
  status: "active" | "inactive";
  role: string;
  email: string;
  teams: string[];
  avatarUrl: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  contactNo: string;
  workEmailId: string;
  userId: string;
  researchPublications: Publication[];
};

export const columns: ColumnDef<User>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorFn: (row) => row.name,
    id: "name",
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
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              Descending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={row.original.avatarUrl} />
          <AvatarFallback>{row.original.name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">{row.getValue("name")}</p>
          <p className="text-xs">
            @{row.original.userId ?? row.original.name.split(" ")[0]}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorFn: (row) => row.status,
    id: "status",
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
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              Descending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className="capitalize shadow-sm inline-flex items-center gap-2 rounded-sm"
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
  },
  {
    accessorFn: (row) => row.role,
    id: "role",
    header: "Role",
    cell: ({ row }) => <p className={"capitalize"}>{row.getValue("role")}</p>,
    filterFn: roleFilterFunction,
  },
  {
    accessorFn: (row) => row.email,
    id: "email",
    header: ({ column }) => (
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
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            Ascending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            Descending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.teams,
    id: "teams",
    header: "Teams",
    cell: ({ row, column }) => {
      const values: string[] = row.getValue("teams");
      const columnSize = column.getSize();
      const maxBadgesPerRow = Math.floor(columnSize / 60);
      const extraItems = values.length - maxBadgesPerRow;
      return (
        <div className="flex items-center gap-1">
          {/* {values?.map((team, i) =>
            i < 3 ? (
              <Badge
                key={i}
                variant={"outline"}
                className={cn(
                  "shadow-sm text-primary bg-purple-50 text-nowrap",
                  {
                    "bg-sky-50 text-sky-500": i === 1,
                    "bg-blue-50 text-blue-500": i === 2,
                  }
                )}
              >
                {team}
              </Badge>
            ) : i === 3 ? (
              <Badge key={i} variant={"outline"} className="shadow-sm ">
                +{values.length - i}
              </Badge>
            ) : (
              i > 3 && null
            )
          )} */}

          {values.slice(0, maxBadgesPerRow).map((team, i) => (
            <Badge
              key={i}
              variant="outline"
              className={cn("shadow-sm text-primary bg-purple-50 text-nowrap", {
                "bg-sky-50 text-sky-500": i === 1,
                "bg-blue-50 text-blue-500": i === 2,
              })}
            >
              {team}
            </Badge>
          ))}
          {extraItems > 0 && (
            <Badge
              variant="outline"
              className="shadow-sm text-primary bg-purple-50 text-nowrap"
            >
              +{extraItems}
            </Badge>
          )}
        </div>
      );
    },
    filterFn: teamsFilterFunction,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <DeleteProfileDialog user={row.original} />
          <EditProfileDialog user={user} />
        </div>
      );
    },
  },
];

"use client";
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";
import { ArrowDownIcon } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { User } from "@/app/people/columns";

type Props = {
  rolesColumn: Column<User, unknown> | undefined;
  teamsColumn: Column<User, unknown> | undefined;
};
const FilterMenu = ({ rolesColumn, teamsColumn }: Props) => {
  const filterRoles = [
    "Product Designer",
    "Product Manager",
    "Frontend Developer",
    "Backend Developer",
  ];
  const filterTeams = ["Design", "Product", "Marketing", "Technology"];
  const [showRoles, setShowRoles] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  return (
    <Popover>
      <PopoverTrigger className="outline-none">
        <CiFilter className="size-8" />
      </PopoverTrigger>
      <PopoverContent className="min-w-[16rem] flex flex-col gap-2">
        <p className="text-base font-medium ">Filters</p>
        <Separator />
        <Collapsible
          className="w-full"
          open={showRoles}
          onOpenChange={() => {
            setShowRoles((state) => !state);
            showTeams && setShowTeams(false);
            !!selectedTeams && setSelectedTeams([]);
          }}
        >
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <Checkbox className="rounded-none size-4" checked={showRoles} />
            Roles
            <ArrowDownIcon className="size-4 text-muted-foreground ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-2 mt-2 w-full">
            {filterRoles.map((role, i) => (
              <div
                className="flex items-center space-x-2 ml-8 cursor-pointer"
                key={i}
                onClick={() => {
                  setSelectedRoles((prev) => {
                    if (prev.includes(role)) {
                      return prev.filter((item) => item !== role);
                    }

                    return [...prev, role];
                  });
                }}
              >
                <Checkbox
                  id={role}
                  className="rounded-none size-4"
                  checked={!!selectedRoles.includes(role)}
                />
                <label
                  htmlFor={`#${role}`}
                  className="text-sm font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {role}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          className="w-full"
          open={showTeams}
          onOpenChange={() => {
            setShowTeams((state) => !state);
            showRoles && setShowRoles(false);
            !!selectedRoles && setSelectedRoles([]);
          }}
        >
          <CollapsibleTrigger className="flex items-center gap-2 w-full">
            <Checkbox className="rounded-none size-4" checked={showTeams} />
            Teams
            <ArrowDownIcon className="size-4 text-muted-foreground ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-2 mt-2 w-full">
            {filterTeams.map((team, i) => (
              <div
                className="flex items-center space-x-2 ml-8"
                key={i}
                onClick={() => {
                  setSelectedTeams((prev) => {
                    if (prev.includes(team)) {
                      return prev.filter((item) => item !== team);
                    }

                    return [...prev, team];
                  });
                }}
              >
                <Checkbox
                  id={team}
                  className="rounded-none size-4"
                  checked={!!selectedTeams.includes(team)}
                />
                <label
                  htmlFor={`#${team}`}
                  className="text-sm font-regular leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {team}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Button
          className="w-full uppercase mt-2"
          variant={"default"}
          size={"sm"}
          onClick={() => {
            rolesColumn?.setFilterValue(selectedRoles);
            teamsColumn?.setFilterValue(selectedTeams);
          }}
        >
          Select
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default FilterMenu;

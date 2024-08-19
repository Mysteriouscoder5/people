"use client";
import React from "react";
import { Button } from "./ui/button";
import { IoGrid } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className=" flex flex-col gap-2 items-start justify-start ">
      <Link href={"/dashboard"}>
        <Button
          variant={"link"}
          size={"default"}
          className={cn("flex items-center gap-2 outline-none no-underline", {
            "text-accent-foreground": pathname !== "/dashboard",
          })}
        >
          <IoGrid className="size-5" />
          <p className="text-lg font-semibold capitalize">Overview</p>
        </Button>
      </Link>
      <Link href={"/people"}>
        <Button
          variant={"link"}
          size={"default"}
          className={cn("flex items-center gap-2 outline-none no-underline", {
            "text-accent-foreground": pathname !== "/people",
          })}
        >
          <IoGrid className="size-5" />
          <p className="text-lg font-semibold capitalize">People Directory</p>
        </Button>
      </Link>
    </div>
  );
};

export default Sidebar;

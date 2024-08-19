"use client";
import Link from "next/link";
import React from "react";
import { GoBell } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="w-full p-6 flex flex-row items-center justify-between shadow-sm">
      <Link href={"/"}>
        <h1 className="uppercase text-4xl font-bold text-primary">people.co</h1>
      </Link>
      <div className="flex items-center gap-4">
        <GoBell className="size-6" />
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <p className="capitalize text-lg ">jane doe</p>
      </div>
    </div>
  );
};

export default Header;

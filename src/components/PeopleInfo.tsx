"use client";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { User } from "@/app/people/columns";
import { Button } from "./ui/button";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedUser } from "@/lib/features/users/usersSlice";
type Props = {
  user: User;
};

const PeopleInfo = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const details = [
    {
      title: "date of birth",
      value: format(user?.dateOfBirth as string, "dd-MM-yyyy"),
    },
    {
      title: "gender",
      value: user.gender,
    },
    {
      title: "nationality",
      value: user.nationality,
    },
    {
      title: "contact number",
      value: user.contactNo,
    },
    {
      title: "email address",
      value: user.email,
    },
    {
      title: "work email address",
      value: user.workEmailId,
    },
  ];
  return (
    <Card className="absolute z-10 right-0 top-0 bottom-0 w-2/3 overflow-hidden text-white">
      <div className="flex flex-row items-center gap-6 p-5 w-full bg-sky-700 relative">
        <Image
          src={user?.avatarUrl}
          alt={user?.name}
          width={100}
          height={100}
          className="object-cover rounded-full "
        />
        <div className="">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <div className="mt-4 flex items-center gap-2">
            <div>
              <p className="text-base">@{user?.userId}</p>
              <p className="mt-1 text-base capitalize">user id</p>
            </div>
            <Separator orientation="vertical" className="bg-white" />
            <div>
              <p className="capitalize text-base">{user?.role}</p>
              <p className="mt-1 text-base capitalize">role</p>
            </div>
          </div>
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => dispatch(setSelectedUser(null))}
          className=" absolute top-5 right-5 z-20"
        >
          <IoClose className="size-5" />
        </Button>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-card-foreground p-2 rounded-md bg-sky-50">
            Personal Information
          </h3>
          {details.map((detail, i) => (
            <div key={i}>
              <div className="flex items-center gap-6 p-2 w-full">
                <p className="capitalize text-sm text-card-foreground font-medium w-1/3">
                  {detail.title}
                </p>
                <p className="text-base text-muted-foreground capitalize">
                  {detail.value}
                </p>
              </div>
              <Separator />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-card-foreground p-2 rounded-md bg-sky-50">
            Research & Publication
          </h3>
          <div className="">
            {user?.researchPublications?.map((publication, i) => (
              <div key={i} className="flex flex-col gap-2 p-2">
                <p className="capitalize text-base text-card-foreground font-semibold line-clamp-3">
                  {publication.title}
                </p>
                <p className="capitalize text-sm text-muted-foreground font-medium line-clamp-3">
                  published in {publication.publicationSource}
                </p>
                <p className="text-sm text-muted-foreground">
                  {publication.summary}
                </p>
                <Button
                  variant={"ghost"}
                  className="text-orange-500 uppercase flex items-center gap-2 font-semibold self-start"
                >
                  <SquareArrowOutUpRightIcon className="size-5" />
                  see publication
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PeopleInfo;

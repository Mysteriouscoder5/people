"use client";
import React, { Fragment, Suspense, useEffect } from "react";
import { DataTable } from "./data-table";
import { data } from "@/lib/data";
import { columns, User } from "./columns";
import { fakerData } from "@/lib/fakerData";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setData } from "@/lib/features/users/usersSlice";

type Props = {};

const Page = (props: Props) => {
  const storeData = useAppSelector((state) => state.users.data);

  return (
    <Suspense>
      <DataTable data={storeData} columns={columns} />
    </Suspense>
  );
};

export default Page;

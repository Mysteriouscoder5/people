"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { User } from "@/app/people/columns";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deleteUser, setData } from "@/lib/features/users/usersSlice";

type Props = {
  user: User;
};

const DeleteProfileDialog = ({ user }: Props) => {
  const data = useAppSelector((state) => state.users.data);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Trash2Icon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Member Details</DialogTitle>
          <DialogDescription className="">
            Are you sure your want to delete this member details? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"default"}
            size={"lg"}
            className="uppercase"
            onClick={() => {
              dispatch(deleteUser(user));
              setIsOpen(false);
            }}
          >
            delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProfileDialog;

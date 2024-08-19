import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { IoMdAdd } from "react-icons/io";
import {
  Check,
  ChevronDown,
  PencilIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { User } from "@/app/people/columns";

type Props = {
  user: User;
};

const teams = [
  { label: "Design", value: "Design" },
  { label: "Product", value: "Product" },
  { label: "Marketing", value: "Marketing" },
  { label: "Sales", value: "Sales" },
  { label: "Engineering", value: "Engineering" },
  { label: "Finance", value: "Finance" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Customer Support", value: "Customer Support" },
  { label: "Operations", value: "Operations" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, { message: "This field can't be empty" }).max(50),
  email: z
    .string()
    .min(1, { message: "This field can't be empty" })
    .email("Please enter a valid email"),
  role: z.string().min(2),
  status: z.string(),
  teams: z
    .array(z.string())
    .min(1, { message: "You must select at least one team" }),
});

const EditProfileDialog = ({ user }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      status: "",
      teams: [],
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const formTeams = form.watch("teams", []);

  const roles: string[] = [
    "Frontend Developer",
    "QA Engineer",
    "Backend Developer",
    "Engineering Manager",
    "Technical Lead",
    "System Administrator",
    "Software Engineer",
    "UI/UX Designer",
    "Data Analyst",
    "Full Stack Developer",
    "Marketing Specialist",
    "Sales Engineer",
    "HR Specialist",
    "Finance Analyst",
    "Support Engineer",
  ];

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
      form.setValue("role", user.role);
      form.setValue("status", user.status);
      form.setValue("teams", user.teams);
    }
  }, [user, form]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="" asChild>
        <Button size={"icon"} variant={"ghost"}>
          <PencilIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle className="capitalize text-xl">Edit Profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 justify-center items-center ">
          <Image
            src={user?.avatarUrl as string}
            alt="avatar"
            width={150}
            height={150}
            className="object-cover rounded-full"
          />
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              size={"default"}
              className="flex items-center uppercase gap-2"
            >
              <RotateCcwIcon className="size-5" />
              <p>upload photo</p>
            </Button>
            <Button
              variant={"outline"}
              size={"default"}
              className="flex items-center uppercase gap-2"
            >
              <Trash2Icon className="size-5" />
              <p>remove photo</p>
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter an email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent className="capitalize">
                          {roles?.map((role, i) => (
                            <SelectItem key={i} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent className="capitalize">
                          <SelectItem value="active">active</SelectItem>
                          <SelectItem value="inactive">inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <FormField
                control={form.control}
                name="teams"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teams</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full h-auto justify-between p-2",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              {field.value.length > 0
                                ? field.value.map((val, index) => (
                                    <Badge
                                      className="p-1 rounded-sm flex items-center gap-2 capitalize font-light text-md text-primary"
                                      variant={"outline"}
                                      key={index}
                                    >
                                      {val}
                                      <IoClose
                                        className="size-4 text-muted-foreground"
                                        onClick={() => {
                                          form.setValue(
                                            "teams",
                                            formTeams.filter(
                                              (team) => team !== val
                                            )
                                          );
                                        }}
                                      />
                                    </Badge>
                                  ))
                                : "Select team"}
                            </div>

                            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search team..." />
                          <CommandList>
                            <CommandEmpty>No team found.</CommandEmpty>
                            <CommandGroup>
                              {teams.map((team) => (
                                <CommandItem
                                  value={team.label}
                                  key={team.value}
                                  onSelect={() => {
                                    if (formTeams.includes(team.value)) {
                                      return form.setValue(
                                        "teams",
                                        formTeams.filter(
                                          (val) => val !== team.value
                                        )
                                      );
                                    }
                                    form.setValue("teams", [
                                      ...formTeams,
                                      team.value,
                                    ]);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value?.some(
                                        (val) => val === team.value
                                      )
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {team.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6 flex items-center justify-end gap-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  size={"lg"}
                  variant={"outline"}
                  className="uppercase"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size={"lg"}
                variant={"default"}
                className="uppercase"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;

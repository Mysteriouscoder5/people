import { Card } from "@/components/ui/card";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <Card className="w-full h-full p-6">
      <h1 className="font-semibold text-4xl">Welcome, Jane Doe!</h1>
    </Card>
  );
};

export default page;

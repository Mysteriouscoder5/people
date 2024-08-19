import React from "react";
import Sidebar from "./Sidebar";

type Props = React.PropsWithChildren<{}>;

const SidebarWrapper = ({ children }: Props) => {
  return (
    <div className="flex items-start gap-6 p-6 w-full h-full">
      <Sidebar />
      <div className="w-full h-full ">{children}</div>
    </div>
  );
};

export default SidebarWrapper;

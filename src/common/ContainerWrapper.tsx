import React from "react";

type prop = {
  children: React.ReactNode;
};
const ContainerWrapper = ({ children }: prop) => {
  return (
    <div
      className="  min-h-[calc(100vh-80px)]  border-red pt-4 ps-4"
      style={{ backgroundColor: "#ccc" }}
    >
      {children}
    </div>
  );
};

export default ContainerWrapper;

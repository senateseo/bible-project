import React from "react";

export const CardContainer = (props) => {
  return (
    <div className="flex flex-col w-full max-w-3xl space-y-4">
      {props.children}
    </div>
  );
};

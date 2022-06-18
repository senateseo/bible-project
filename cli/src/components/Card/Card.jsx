import React from "react";
import { copyToClipboard } from "../../utils/util";

const Card = ({ data }) => {
  const onHandleClick = () => {
    // TODO : set msg to copy
    const msgToCopy = "";
    // Copy to Clipboard
    copyToClipboard(msgToCopy);
    // TODO: Pop modal up
    alert("copied to clipboard");
  };
  return (
    <div
      className="p-2 rounded-md border border-indigo-300 cursor-pointer hover:border-indigo-500"
      onClick={() => onHandleClick()}
    >
      <div>
        {data.book} {data.chapter}:{data.verse}{" "}
      </div>
      <div>{data.sentence}</div>
    </div>
  );
};

export default Card;

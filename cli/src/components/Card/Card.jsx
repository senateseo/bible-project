import React from "react";
import { copyToClipboard } from "../../utils/util";
import { books } from "../../data/books";

const Card = ({ data, onClick }) => {
  const onHandleClick = () => {
    // TODO : set msg to copy
    const msgToCopy = "";
    // Copy to Clipboard
    console.log(msgToCopy);
    copyToClipboard(msgToCopy);
    // TODO: Pop modal up
    onClick("copied to clipboard!");
  };
  return (
    <div
      className="p-4 rounded-md border cursor-pointer hover:border-gray-500"
      onClick={() => onHandleClick()}
    >
      <div className="mb-1">
        {books[data.book - 1][1]} {data.chapter}:{data.verse}{" "}
      </div>
      <div className="font-light">{data.sentence}</div>
    </div>
  );
};

export default Card;

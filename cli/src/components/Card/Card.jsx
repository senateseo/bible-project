import React from "react";
import { copyToClipboard } from "../../utils/util";
import { books } from "../../data/books";
import { useTranslation } from "react-i18next";

const Card = ({ data, onClick }) => {
  const { t } = useTranslation("translation", { keyPrefix: "modal" });
  const onHandleClick = () => {
    // TODO : set msg to copy
    const msgToCopy = "";
    // Copy to Clipboard
    console.log(msgToCopy);
    copyToClipboard(msgToCopy);
    // TODO: Pop modal up
    onClick(t("msg_copy"));
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

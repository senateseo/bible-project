import React from "react";
import {
  copyToClipboard,
  findTextToBold,
  getSystemLang,
  makeBold,
} from "../../utils/util";
import { books } from "../../data/books";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { Transition } from "@headlessui/react";

const Card = ({ data, onClick, query, mode }) => {
  const { t } = useTranslation("translation", { keyPrefix: "modal" });

  const lang = getSystemLang(i18n.language) === "en" ? 1 : 0;
  const bookName = books[data.book - 1][lang];

  const onHandleClick = () => {
    // TODO : set msg to copy
    const msgToCopy = `
     ${bookName} ${data.chapter}:${data.verse} \n
     ${data.sentence}
    `;
    copyToClipboard(msgToCopy);
    onClick(t("msg_copy"));
  };
  return (
    <Transition
      show={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="p-4 rounded-md border cursor-pointer hover:border-gray-500"
        onClick={() => onHandleClick()}
      >
        <div className="mb-1">
          {books[data.book - 1][getSystemLang(i18n.language) === "en" ? 1 : 0]}{" "}
          {data.chapter}:{data.verse}{" "}
        </div>
        {mode === "include" ? (
          <div
            dangerouslySetInnerHTML={{ __html: makeBold(data.sentence, query) }}
            className="font-light"
          />
        ) : (
          <div className="font-light">{data.sentence}</div>
        )}
      </div>
    </Transition>
  );
};

export default Card;

import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "../utils/util";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ComboBox = ({ selectedOption, setOption, options }) => {
  const { i18n } = useTranslation("translation");

  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button className="inline-flex justify-between w-30 sm:w-40 rounded-md border shadow-sm px-4 py-2 sm:py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-gray-100 ">
          {selectedOption.label}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute z-10 left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, id) => (
              <Menu.Item key={id} onClick={() => setOption(option)}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm cursor-pointer"
                    )}
                  >
                    {option.label}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ComboBox;

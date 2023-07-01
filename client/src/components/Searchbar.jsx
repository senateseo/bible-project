import React from "react";
import { XIcon } from "@heroicons/react/solid";

const Searchbar = React.forwardRef(
  ({ placeholder, value, onChange, onKeydownEnter, onClose }, ref) => {
    return (
      <div className="max-w-3xl w-full ">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <input
            id="search"
            name="search"
            className="block w-full pl-6 pr-3 py-4 sm:py-4 border rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none  focus:ring-white focus:text-gray-900 sm:text-sm"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeydownEnter}
          />

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center ">
            <XIcon
              className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600"
              aria-hidden="true"
              onClick={() => onClose()}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default Searchbar;

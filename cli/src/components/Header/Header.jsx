import React, { useState } from "react";
import { classNames } from "../../utils/util";
import { Link, useLocation } from "react-router-dom";
import ComboBox from "../Combobox";
import i18n from "../../i18n";

const languageOptions = [
  {
    label: "한국어(ko)",
    value: "ko",
  },
  {
    label: "English(en)",
    value: "en",
  },
  // {
  //   label: "日本語(JP)",
  //   value: "ja",
  // },
];
const Header = ({ navigation }) => {
  const [language, setLanguage] = useState(languageOptions[0]);

  const onSelectOption = (option) => {
    setLanguage(option);
    i18n.changeLanguage(option.value);
  };

  const location = useLocation();

  return (
    <>
      <div className="fixed top-0 z-10 bg-white w-full max-w-screen mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex-shrink-0 flex justify-between">
              <Link to="/">
                <img
                  className="block lg:hidden h-8 w-auto cursor-pointer"
                  src="/logo.png"
                  alt="Logo"
                />
              </Link>
              <Link to="/">
                <img
                  className="hidden lg:block h-8 w-auto cursor-pointer"
                  src="/logo.png"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    className={classNames(
                      location.pathname === item.href
                        ? "text-white bg-gradient-to-b from-royalf to-royalt"
                        : "text-gray-300 hover:bg-gray-100 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <Link to={item.href}>{item.name}</Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <ComboBox
                selectedOption={language}
                setOption={onSelectOption}
                options={languageOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

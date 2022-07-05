import React from "react";
import { classNames } from "../../utils/util";
import { Link, useLocation } from "react-router-dom";

const Header = ({ navigation }) => {
  const location = useLocation();

  return (
    <>
      <div className="fixed top-0 z-10 bg-white w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="/logo.png"
                alt="Logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="/logo.png"
                alt="Logo"
              />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const navigation = [
  {
    name: "Bible",
    href: "/",
    current: true,
  },
  {
    name: "About",
    href: "/about",
    current: false,
  },
];
const Layout = () => {
  return (
    <>
      <Header navigation={navigation} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

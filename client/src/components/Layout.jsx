import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = () => {
  const { t, i18n } = useTranslation("translation", { keyPrefix: "header" });

  const navigation = [
    {
      name: t("bible"),
      href: "/",
      current: true,
    },
    {
      name: t("about"),
      href: "/about",
      current: false,
    },
  ];

  return (
    <>
      <Header navigation={navigation} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

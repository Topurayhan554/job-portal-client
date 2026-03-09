import React from "react";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/common/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Helmet } from "react-helmet";
import Favicon from "react-favicon";
import httpStatus from "http-status";
import { useAppStore } from "../../stores";
import { Footer, Topbar } from "./components";

// import LogoImg from "assets/images/logo.png";

const Main = (props) => {
  const { children } = props;
  const history = useHistory();

  const [appStore, updateAppStore] = useAppStore();

  return (
    <div>
      {/* <Favicon url={LogoImg} /> */}
      <Helmet>{/* <title>{configsStore.activeTitle || ''}</title> */}</Helmet>
      <Topbar />
      <main className="container mx-auto px-4 sm:px-6 xl:px-0 xl:max-w-6xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;

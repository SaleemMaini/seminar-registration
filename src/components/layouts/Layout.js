import React from "react";
import Header from "./Header";
import classes from "./layout.module.css";
const Layout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;

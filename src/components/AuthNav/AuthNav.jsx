import React from "react";
import { Link } from "react-router-dom";

const AuthNav = () => {
  return (
    <>
      <nav>
        <Link to="/register">Registration</Link>
        <Link to="/signin">Sign in</Link>
      </nav>
    </>
  );
};

export default AuthNav;

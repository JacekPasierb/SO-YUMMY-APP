import React from "react";
import Logo from "../Logo/logo";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={css.container}>
              <Logo />
              <UserLogo />
              <HamburgerMenu/>
      </div>
    </header>
  );
};

export default Header;

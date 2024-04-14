import React from "react";

import css from "./Header.module.css";
import UserLogo from "./UserLogo/UserLogo";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import Media from "react-media";
import Navigation from "./Navigation/Navigation";
import ThemeToggler from "./ThemeToggler/ThemeToggler";
import Logo from "./Logo/Logo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  return (
    <header>
      <Media
        queries={{
          small: "(max-width: 767px)",
          medium: "(min-width: 768px) and (max-width: 1199px)",
          large: "(min-width: 1200px)",
        }}
      >
        {(matches) => (
          <>
            {matches.small && (
              <div className={css.header}>
                <div className={`${css.container} ${css.headerBox}`}>
                  <Logo />
                  <div className={css.mobileBox}>
                    <UserLogo />
                    <HamburgerMenu />
                  </div>
                </div>
              </div>
            )}
            {matches.medium && (
              <div className={css.header}>
                <div className={`${css.container} ${css.headerBox}`}>
                  <Logo />
                  <div className={css.mobileBox}>
                    <UserLogo />
                    <HamburgerMenu />
                  </div>
                </div>
              </div>
            )}
            {matches.large && (
              <div className={css.header}>
                <div className={`${css.container} ${css.headerBox}`}>
                  <Logo />
                  <Navigation />
                  <UserLogo />
                  <ThemeToggler />
                </div>
              </div>
            )}
          </>
        )}
      </Media>
    </header>
  );
};

export default Header;

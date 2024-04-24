import css from "./Header.module.css";
import "react-toastify/dist/ReactToastify.css";
import UserLogo from "./UserLogo/UserLogo";
import Logo from "./Logo/Logo";

import React, { lazy } from "react";
import Media from "react-media";

import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import Navigation from "./Navigation/Navigation";
const ThemeToggler = lazy(() => import("./ThemeToggler/ThemeToggler"));

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

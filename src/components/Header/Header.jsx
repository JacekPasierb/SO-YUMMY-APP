import React from "react";
import Logo from "./Logo/logo";
import css from "./Header.module.css";
import UserLogo from "./UserLogo/UserLogo";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import Media from "react-media";
import Navigation from "./Navigation/Navigation";
import ThemeToggler from "./ThemeToggler/ThemeToggler";

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
              <div className={`${css.container} ${css.headerBox}`}>
                <Logo />
                <div className={css.mobileBox}>
                  <UserLogo />
                  <HamburgerMenu />
                </div>
              </div>
            )}
            {matches.medium && (
              <div className={`${css.container} ${css.headerBox}`}>
                <Logo />
                <div className={css.mobileBox}>
                  <UserLogo />
                  <HamburgerMenu />
                </div>
              </div>
            )}
            {matches.large && (
              <div className={`${css.container} ${css.headerBox}`}>
                <Logo />
                <Navigation />
                <UserLogo />
                <ThemeToggler/>
              </div>
            )}
          </>
        )}
      </Media>
    </header>
  );
};

export default Header;

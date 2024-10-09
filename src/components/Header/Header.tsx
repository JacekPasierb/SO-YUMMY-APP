import React, { lazy } from "react";
import Media from "react-media";

import styles from "./Header.module.css";
import "react-toastify/dist/ReactToastify.css";
import UserLogo from "./UserLogo/UserLogo";
import Logo from "./Logo/Logo";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import Navigation from "./Navigation/Navigation";

const ThemeToggler = lazy(() => import("./ThemeToggler/ThemeToggler"));

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Media
        queries={{
          small: "(max-width: 768px)",
          medium: "(min-width: 769px) and (max-width: 1200px)",
          large: "(min-width: 1200px)",
        }}
      >
        {({ small, medium, large }) => (
          <div className={`${styles.header__container} ${styles.headerBox}`}>
            <Logo />
            {small || medium ? (
              <div className={styles.header__mobile}>
                <UserLogo />
                <HamburgerMenu />
              </div>
            ) : (
              <div className={styles.header__desktop}>
                <Navigation />
                <UserLogo />
                <ThemeToggler />
              </div>
            )}
          </div>
        )}
      </Media>
    </header>
  );
};

export default Header;

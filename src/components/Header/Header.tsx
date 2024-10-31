import React, { Suspense, lazy } from "react";
import Media from "react-media";
import styles from "./Header.module.css";
import "react-toastify/dist/ReactToastify.css";
import UserLogo from "./UserLogo/UserLogo";
import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";

const HamburgerMenu = lazy(() => import("./HamburgerMenu/HamburgerMenu"));
const ThemeToggler = lazy(() => import("./ThemeToggler/ThemeToggler"));

interface MediaQueries {
  small: boolean;
  medium: boolean;
}

const Header: React.FC = () => {
  const mediaQueries = {
    small: "(max-width: 768px)",
    medium: "(min-width: 769px) and (max-width: 1200px)",
  };

  const renderContent = ({ small, medium }: MediaQueries) => (
    <div className={`${styles.header__container} ${styles.headerBox}`}>
      <Logo />
      {small || medium ? (
        <div className={styles.header__mobile}>
          <UserLogo />
          <HamburgerMenu />
        </div>
      ) : (
        <>
          <Navigation />
          <UserLogo />
          <ThemeToggler />
        </>
      )}
    </div>
  );

  return (
    <header className={styles.header}>
      <Media queries={mediaQueries}>{renderContent}</Media>
    </header>
  );
};

export default Header;

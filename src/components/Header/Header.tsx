import React, {Suspense, lazy, useEffect, useState} from "react";
import Media from "react-media";

import styles from "./Header.module.css";
import "react-toastify/dist/ReactToastify.css";
import UserLogo from "./UserLogo/UserLogo";
import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";
import {useAuth} from "../../hooks/useAuth";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {logOut} from "../../redux/auth/operations";
import {AppDispatch} from "../../redux/store";

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

  const {token} = useAuth();
  const [countdown, setCountdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  interface TokenPayload {
    exp: number;
  }
  const getTokenExpiration = (token: string | null) => {
    if (!token)
      return {
        expirationTime: null,
        formattedTime: null,
        timeRemaining: null,
        isExpired: true,
      };

    try {
      const decoded: TokenPayload = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // Konwersja na milisekundy
      const expirationDate = new Date(expirationTime);
      const currentTime = Date.now();
      const timeRemaining = Math.max(expirationTime - currentTime, 0); // Pozostały czas w ms

      // Formatowanie godziny w lokalnym czasie użytkownika
      const formattedTime = expirationDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return {
        expirationTime,
        formattedTime,
        timeRemaining,
        isExpired: timeRemaining <= 0,
      };
    } catch (error) {
      console.error("Invalid token:", error);
      return {
        expirationTime: null,
        formattedTime: null,
        timeRemaining: null,
        isExpired: true,
      };
    }
  };

  useEffect(() => {
    console.log("");
    
    if (!token) {
      setCountdown(null);
      return;
    }

    const tokenData = getTokenExpiration(token);

    if (!tokenData || tokenData.timeRemaining === null) {
      setCountdown("Błąd sesji");
      return;
    }

    if (tokenData.isExpired) {
      setCountdown("Token expired");
      dispatch(logOut());
      navigate("/signin"); // 🚀 Przekierowanie na stronę logowania
      return;
    }

    const updateCountdown = () => {
      const remainingMs = tokenData.timeRemaining;
      if (remainingMs === null || remainingMs <= 0) {
        setCountdown("Token expired");
        dispatch(logOut());
        navigate("/signin"); // 🚀 Przekierowanie na stronę logowania
        return;
      }

      const remainingSeconds = Math.floor(remainingMs / 1000);
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      setCountdown(`${minutes} min ${seconds} sec`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [token, navigate, dispatch,countdown]);

  const renderContent = ({small, medium}: MediaQueries) => (
    <div className={`${styles.header__container} ${styles.headerBox}`}>
      <Logo />
      {small || medium ? (
        <div className={styles.header__mobile}>
          <UserLogo />
          {countdown && <p>🔔 Sesja wygasa za: {countdown}</p>}
          <Suspense fallback={null}>
            <HamburgerMenu />
          </Suspense>
        </div>
      ) : (
        <>
          <Navigation />
          <UserLogo />
          {countdown && <p>🔔 Sesja wygasa za: {countdown}</p>}
          <Suspense fallback={null}>
            <ThemeToggler />
          </Suspense>
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

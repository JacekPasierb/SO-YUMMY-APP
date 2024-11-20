import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import styles from "./HamburgerMenu.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import { selectIsMenuModalOpen } from "../../../redux/global/globalSelectors";
import { setIsMenuModalOpen } from "../../../redux/global/globalSlice";

const MenuModal = lazy(() => import("../MenuModal/MenuModal"));

const HamburgerMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isMenuModalOpen = useSelector(selectIsMenuModalOpen);
  const { pathname } = useLocation();
  const isRecipePage = pathname.startsWith("/recipe/");

  const handleToggleMenu = () => {
    dispatch(setIsMenuModalOpen(!isMenuModalOpen));
  };

  return (
    <>
      <button
        type="button"
        onClick={handleToggleMenu}
        className={`${styles.menu__button} ${
          isRecipePage ? styles.menu__button_recipe : ""
        }`}
        aria-label="Toggle menu"
        aria-expanded={isMenuModalOpen}
        aria-controls="menu-modal"
      >
        <svg
          className={`${styles.menu__icon} ${
            isRecipePage ? styles.menu__buttonInner : ""
          }`}
          width="40"
          height="40"
          aria-hidden="true"
        >
          <use href={`${sprite}#icon-Menu`} />
        </svg>
      </button>
      {isMenuModalOpen && (
        <Suspense fallback={null}>
          <MenuModal onClose={handleToggleMenu} />
        </Suspense>
      )}
    </>
  );
};

export default HamburgerMenu;

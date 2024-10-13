import React, { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HamburgerMenu.module.css";
import menuIcon from "../../../images/menuIkona.png";
import sprite from "../../../assets/icons/sprite.svg";

import { selectIsMenuModalOpen } from "../../../redux/global/globalSelectors";
import { setIsMenuModalOpen } from "../../../redux/global/globalSlice";
import { useLocation } from "react-router";

// Lazy loading for the MenuModal component
const MenuModal = lazy(() => import("../MenuModal/MenuModal"));

const HamburgerMenu = () => {
  const dispatch = useDispatch();
  const isMenuModalOpen = useSelector(selectIsMenuModalOpen);
  const location = useLocation();
  const { pathname} = location;
  const isRecipePage = pathname.startsWith("/recipe/");

  // Toggle function for opening/closing the menu modal
  const toggleMenuModal = (): void => {
    dispatch(setIsMenuModalOpen(!isMenuModalOpen));
  };

  return (
    <>
     <svg
        onClick={toggleMenuModal}
        className={styles.menu__icon}
        width="40"
        height="40"
        style={{stroke:"red !important" }}
      >
        <use href={`${sprite}#icon-Menu`} />
      </svg>
      {isMenuModalOpen && <MenuModal onClose={toggleMenuModal} />}
    </>
  );
};

export default HamburgerMenu;

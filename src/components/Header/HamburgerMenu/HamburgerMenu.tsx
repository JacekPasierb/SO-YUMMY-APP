import React, { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HamburgerMenu.module.css";
import menuIcon from "../../../images/menuIkona.png";
import sprite from "../../../assets/icons/sprite.svg";

import { selectIsMenuModalOpen } from "../../../redux/global/globalSelectors";
import { setIsMenuModalOpen } from "../../../redux/global/globalSlice";

// Lazy loading for the MenuModal component
const MenuModal = lazy(() => import("../MenuModal/MenuModal"));

const HamburgerMenu = () => {
  const dispatch = useDispatch();
  const isMenuModalOpen = useSelector(selectIsMenuModalOpen);

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
      >
        <use href={`${sprite}#icon-menu`} />
      </svg>
      {isMenuModalOpen && <MenuModal onClose={toggleMenuModal} />}
    </>
  );
};

export default HamburgerMenu;

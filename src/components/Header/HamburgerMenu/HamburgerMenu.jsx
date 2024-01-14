import React, { useState } from "react";
import menu from "../../../images/menuIkona.png";
import css from "./HamburgerMenu.module.css";
import MenuModal from "../MenuModal/MenuModal";
import { useDispatch, useSelector } from "react-redux";
import { selectIsMenuModalOpen } from "../../../redux/global/globalSelectors";
import { setIsMenuModalOpen } from "../../../redux/global/globalSlice";

const HamburgerMenu = () => {
  const isMenuModalOpen = useSelector(selectIsMenuModalOpen);
  const dispatch = useDispatch();
  const handleMenuModalClick = () => {
    isMenuModalOpen
      ? dispatch(setIsMenuModalOpen(false))
      : dispatch(setIsMenuModalOpen(true));
  };

  return (
    <>
      <img
        src={menu}
        alt="menu Ikona"
        width="40"
        height="40"
        onClick={handleMenuModalClick}
        className={css.menuIcon}
      />
      {isMenuModalOpen && <MenuModal onClose={handleMenuModalClick} />}
    </>
  );
};

export default HamburgerMenu;

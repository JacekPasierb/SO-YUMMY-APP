import React, { useState } from "react";
import menu from "../../../images/menuIkona.png";
import css from "./HamburgerMenu.module.css";
import MenuModal from "../MenuModal/MenuModal";

const HamburgerMenu = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const handleMenuModalClick = () => {
    setIsMenuModalOpen((prevIsMenuModalOpen) => !prevIsMenuModalOpen);
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
            {isMenuModalOpen && (<MenuModal onClose={ handleMenuModalClick} />)}
      </>
    );
};

export default HamburgerMenu;

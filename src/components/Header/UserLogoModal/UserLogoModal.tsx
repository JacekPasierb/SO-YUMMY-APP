import React from "react";
import styles from "./UserLogoModal.module.css";

import BtnLogout from "../BtnLogout/BtnLogout";
import BtnEditProfile from "../BtnEditProfile/BtnEditProfile";

const UserLogoModal = () => {
  const handleModalClick = (event: React.MouseEvent) => {
    // Zapobiegaj propagacji kliknięć z wnętrza modala na zewnątrz
    event.stopPropagation();
  };

  return (
    <div onClick={handleModalClick} className={styles.userLogoModal}>
      <BtnEditProfile /> <BtnLogout />
    </div>
  );
};
export default UserLogoModal;

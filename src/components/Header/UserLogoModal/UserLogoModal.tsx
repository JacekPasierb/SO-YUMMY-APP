import React, { FC } from "react";
import styles from "./UserLogoModal.module.css";
import BtnLogout from "../BtnLogout/BtnLogout";
import BtnEditProfile from "../BtnEditProfile/BtnEditProfile";

const UserLogoModal: FC = () => {
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={styles.userLogoModal}
      onClick={handleModalClick}
      role="dialog"
      aria-label="User profile actions"
    >
      <BtnEditProfile />
      <BtnLogout />
    </div>
  );
};

export default UserLogoModal;

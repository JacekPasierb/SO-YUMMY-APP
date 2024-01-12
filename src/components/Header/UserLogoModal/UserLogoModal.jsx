import React from "react";
import css from "./UserLogoModal.module.css";

import LogoutBtn from "../LogoutBtn/LogoutBtn";
import UserInfoModal from "../EditProfile/EditProfile";

const UserLogoModal = () => {
  const handleModalClick = (event) => {
    // Zapobiegaj propagacji kliknięć z wnętrza modala na zewnątrz
    event.stopPropagation();
  };

  return (
    <div onClick={handleModalClick} className={css.userModal}>
      <UserInfoModal /> <LogoutBtn />
    </div>
  );
};
export default UserLogoModal;

import React, { useEffect } from "react";
import css from "./UserLogoModal.module.css";
import EditProfile from "../EditProfile/EditProfile";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

const UserLogoModal = () => {
  return <div className={css.userModal}><EditProfile/> <LogoutBtn/></div>;
};
export default UserLogoModal;

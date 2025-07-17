import React, {FC} from "react";
import styles from "./UserLogoModal.module.css";
import BtnLogout from "../BtnLogout/BtnLogout";
import BtnEditProfile from "../BtnEditProfile/BtnEditProfile";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const UserLogoModal: FC = () => {
  const {t} = useTranslation();
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
      <div className={styles.langBox}>
      {t("setLanguage")} <LanguageSwitcher />
      </div>

      <BtnLogout />
    </div>
  );
};

export default UserLogoModal;

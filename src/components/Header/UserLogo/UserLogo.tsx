import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { selectIsUserLogoModalOpen } from "../../../redux/global/globalSelectors";
import {
  setIsLogoutModalOpen,
  setIsUserLogoModalOpen,
} from "../../../redux/global/globalSlice";
import styles from "./UserLogo.module.css";

const UserLogoModal = lazy(() => import("../UserLogoModal/UserLogoModal"));

export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/db5awxaxs/image/upload/v1680863981/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_sycrzf.jpg";

interface UserLogoProps {
  className?: string;
}

const UserLogo: React.FC<UserLogoProps> = ({ className }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const isRecipePage = pathname.startsWith("/recipe/");
  const isUserLogoModalOpen = useSelector(selectIsUserLogoModalOpen);

  const handleLogoClick = () => {
    dispatch(setIsUserLogoModalOpen(!isUserLogoModalOpen));
    if (isUserLogoModalOpen) {
      dispatch(setIsLogoutModalOpen(false));
    }
  };

  return (
    <div
      className={`${styles.boxAvatar} ${className || ""}`}
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
      aria-expanded={isUserLogoModalOpen}
      aria-haspopup="true"
    >
      <img
        src={user.avatar || DEFAULT_AVATAR}
        alt={`${user.name}'s avatar`}
        width="34"
        height="34"
        className={styles.boxAvatar__avatar}
      />
      <span
        className={`
          ${styles.boxAvatar__username} 
          ${isRecipePage ? styles["boxAvatar__username--inner"] : ""}
        `}
      >
        {user.name}
      </span>

      {isUserLogoModalOpen && (
        <Suspense fallback={null}>
          <UserLogoModal />
        </Suspense>
      )}
    </div>
  );
};

export default UserLogo;

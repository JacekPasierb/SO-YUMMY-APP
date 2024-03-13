import React from "react";
import css from "./RegisterPage.module.css";
import { useMediaQuery } from "@react-hook/media-query";
import logo1x from "../../images/logoMobile1x.png";
import logo2x from "../../images/logoMobile2x.png";
import logoTablet1x from "../../images/logoTablet1x.png";
import logoTablet2x from "../../images/logoTablet2x.png";
import logoDesktop1x from "../../images/logoDesctop1x.png";
import logoDesktop2x from "../../images/logoDesctop2x.png";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";

const RegisterPage = () => {
//   const isTablet = useMediaQuery("(min-width: 768px)");
//   const isDesctop = useMediaQuery("(min-width: 1200px)");
//   const isRetina = window.devicePixelRatio > 1;
//   let logoSrc;

//   if (isDesctop) {
//     logoSrc = isRetina ? logoDesktop2x : logoDesktop1x;
//   } else if (isTablet) {
//     logoSrc = isRetina ? logoTablet2x : logoTablet1x;
//   } else {
//     // Default image for smaller screens
//     logoSrc = isRetina ? logo2x : logo1x;
//   }
  return (
    <main className={css.background}>
      <div className={css.flex}>
        {/* <img src={logoSrc} /> */}

        <AuthForm />
      </div>
    </main>
  );
};

export default RegisterPage;

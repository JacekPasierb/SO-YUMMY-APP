import React from "react";
import css from "./Footer.module.css";
import logoFooter from "../../images/logoFooter.png";
import Nav from "./Nav/Nav";
import SubscribeForm from "./SubscribeForm/SubscribeForm";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.logoBox}>
        <img
          src={logoFooter}
          alt="logo"
          width="30"
          height="30"
          className={css.logo}
        />
        <p className={css.titleBox}>So Yummy</p>
      </div>
      <nav className={css.footerNav}>
        <Nav />
        <SubscribeForm />
              {/* <FollowUs/> */}
      </nav>
    </footer>
  );
};

export default Footer;

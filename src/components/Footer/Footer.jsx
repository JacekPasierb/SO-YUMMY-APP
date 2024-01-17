import React from "react";
import css from "./Footer.module.css";
import logoFooter from "../../images/logoFooter.png";
import Nav from "./Nav/Nav";
import SubscribeForm from "./SubscribeForm/SubscribeForm";
import FollowUs from "./FollowUs/FollowUs";
import Media from "react-media";

const Footer = () => {
  return (
    <Media
      queries={{
        small: "(max-width: 767px)",
        medium: "(min-width: 768px) and (max-width: 1199px)",
        large: "(min-width: 1200px)",
      }}
    >
      {(matches) => (
        <>
          {matches.small && (
            <footer className={`${css.footer} ${css.container}`}>
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
                <FollowUs />
              </nav>
            </footer>
          )}
          {matches.medium && (
            <footer className={`${css.footer} ${css.container}`}>
              <div className={css.footerBox}>
                <div className={css.footerBoxAssaid}>
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
                  <ul className={css.list}>
                    <li className={css.listItem}>
                      Database of recipes that can be replenished{" "}
                    </li>
                    <li className={css.listItem}>
                      Flexible search for desired and unwanted ingredients
                    </li>
                    <li className={css.listItem}>
                      Ability to add your own recipes with photos
                    </li>

                    <li className={css.listItem}>Convenient and easy to use</li>
                  </ul>
                </div>
                <nav className={css.footerNav}>
                  <Nav />
                </nav>
              </div>
              <SubscribeForm />
              <FollowUs />
            </footer>
          )}
          {matches.large && (
            <footer className={`${css.footer} ${css.container}`}>
              <div className={css.footerBox}>
                <div className={css.footerBoxAssaid}>
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
                  <ul className={css.list}>
                    <li className={css.listItem}>
                      Database of recipes that can be replenished{" "}
                    </li>
                    <li className={css.listItem}>
                      Flexible search for desired and unwanted ingredients
                    </li>
                    <li className={css.listItem}>
                      Ability to add your own recipes with photos
                    </li>

                    <li className={css.listItem}>Convenient and easy to use</li>
                  </ul>
                </div>
                <nav className={css.footerNav}>
                  <Nav />
                </nav>
              </div>
              <SubscribeForm />
              <FollowUs />
            </footer>
          )}
        </>
      )}
    </Media>
  );
};

export default Footer;

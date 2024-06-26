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
        small: "(max-width: 768px)",
        medium: "(min-width: 769px) and (max-width: 1200px)",
        large: "(min-width: 1200px)",
      }}
    >
      {(matches) => (
        <>
          {matches.small && (
            <footer className={css.footer}>
              <div className={css.container}>
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
              </div>
            </footer>
          )}
          {matches.medium && (
            <footer className={css.footer}>
              <div className={css.container}>
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

                      <li className={css.listItem}>
                        Convenient and easy to use
                      </li>
                    </ul>
                  </div>
                  <nav className={css.footerNav}>
                    <Nav />
                  </nav>
                </div>
                <SubscribeForm />
                <FollowUs />
              </div>
            </footer>
          )}
          {matches.large && (
            <footer className={css.footer}>
              <div className={css.container}>
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

                      <li className={css.listItem}>
                        Convenient and easy to use
                      </li>
                    </ul>
                  </div>
                  <nav className={css.footerNav}>
                    <Nav />
                  </nav>
                  <div className={css.subscribeBox}>
                  <div className={css.box}>
                    <p className={css.subscribeTitle}>
                      Subscribe to our Newsletter
                    </p>
                    <p className={css.subscribeDesc}>
                      Subscribe up to our newsletter. Be in touch with latest
                      news and special offers, etc.
                    </p>
                    </div>
                    <SubscribeForm />
                  </div>
                </div>

                <FollowUs />
              </div>
            </footer>
          )}
        </>
      )}
    </Media>
  );
};

export default Footer;

import React from "react";
import styles from "./Footer.module.css";
import logoFooter from "../../images/logoFooter.png";
import Nav from "./Nav/Nav";
import SubscribeForm from "./SubscribeForm/SubscribeForm";
import FollowUs from "./FollowUs/FollowUs";
import Media from "react-media";

const Footer = () => {
  const logoSection = (
    <div className={styles.logoBox}>
      <img
        src={logoFooter}
        alt="So Yummy Logo"
        width="30"
        height="30"
        className={styles.logo}
        aria-label="So Yummy"
      />
      <p className={styles.titleBox}>So Yummy</p>
    </div>
  );

  const featuresList = (
    <ul className={styles.list}>
      <li className={styles.listItem}>
        Database of recipes that can be replenished
      </li>
      <li className={styles.listItem}>
        Flexible search for desired and unwanted ingredients
      </li>
      <li className={styles.listItem}>
        Ability to add your own recipes with photos
      </li>
      <li className={styles.listItem}>Convenient and easy to use</li>
    </ul>
  );

  const subscribeSection = (
    <div className={styles.subscribeBox}>
      <div className={styles.box}>
        <p className={styles.subscribeTitle}>Subscribe to our Newsletter</p>
        <p className={styles.subscribeDesc}>
          Subscribe to our newsletter. Stay updated with the latest news and
          special offers.
        </p>
      </div>
      <SubscribeForm />
    </div>
  );

  return (
    <Media
      queries={{
        small: "(max-width: 768px)",
        medium: "(min-width: 769px) and (max-width: 1200px)",
        large: "(min-width: 1200px)",
      }}
    >
      {(matches) => (
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={matches.small ? "" : styles.footerBox}>
              <div className={styles.footerBoxAssaid}>
                {logoSection}
                {matches.small ? null : featuresList}
              </div>
              <nav className={styles.footerNav}>
                <Nav />
              </nav>
              {matches.small && <SubscribeForm />}
            </div>
            {matches.large ? subscribeSection : null}
            <FollowUs />
          </div>
        </footer>
      )}
    </Media>
  );
};

export default Footer;

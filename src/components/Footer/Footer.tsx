import React from "react";
import styles from "./Footer.module.css";
import logoFooter from "../../images/logoFooter.png";
import Nav from "./Nav/Nav";
import SubscribeForm from "./SubscribeForm/SubscribeForm";
import FollowUs from "./FollowUs/FollowUs";
import Media from "react-media";

const Footer = () => {
  const logoSection = (
    <div className={styles.footer__logoBox}>
      <img
        src={logoFooter}
        alt="So Yummy Logo"
        width="30"
        height="30"
        className={styles.footer__logoImage}
        aria-label="So Yummy"
      />
      <p className={styles.footer__logoTitle}>So Yummy</p>
    </div>
  );

  const featuresList = (
    <ul className={styles.footer__featuresList}>
      <li className={styles.footer__featureItem}>
        Database of recipes that can be replenished
      </li>
      <li className={styles.footer__featureItem}>
        Flexible search for desired and unwanted ingredients
      </li>
      <li className={styles.footer__featureItem}>
        Ability to add your own recipes with photos
      </li>
      <li className={styles.footer__featureItem}>Convenient and easy to use</li>
    </ul>
  );

  const subscribeSection = (
    <div className={styles.footer__subscribeSection}>
      <div className={styles.footer__subscribeTextBox}>
        <p className={styles.footer__subscribeTitle}>
          Subscribe to our Newsletter
        </p>
        <p className={styles.footer__subscribeDescription}>
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
        medium: "(min-width: 769px) and (max-width: 1199px)",
        large: "(min-width: 1200px)",
      }}
    >
      {(matches) => (
        <footer className={styles.footer}>
          <div className={styles.footer__container}>
            <div className={styles.footer__primaryContent}>
              <div
                className={
                  matches.small
                    ? styles.footer__contentSmall
                    : styles.footer__content
                }
              >
                <div className={styles.footer__logoAndFeatures}>
                  {logoSection}
                  {matches.small ? null : featuresList}
                </div>
                <Nav />
                {matches.large && subscribeSection}
              </div>
              {!matches.large && <SubscribeForm />}

              <FollowUs />
            </div>
          </div>
        </footer>
      )}
    </Media>
  );
};

export default Footer;

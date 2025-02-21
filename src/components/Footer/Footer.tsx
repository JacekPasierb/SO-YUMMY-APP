import React from "react";
import {useMediaQuery} from "@react-hook/media-query";
import styles from "./Footer.module.css";
import logoFooter from "../../images/logoFooter.png";
import Nav from "./Nav/Nav";
import SubscribeForm from "./SubscribeForm/SubscribeForm";
import FollowUs from "./FollowUs/FollowUs";
import sprite from "../../assets/icons/sprite.svg";
const FEATURES_LIST = [
  "Database of recipes that can be replenished",
  "Flexible search for desired and unwanted ingredients",
  "Ability to add your own recipes with photos",
  "Convenient and easy to use",
] as const;

const Footer: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const LogoSection = () => (
    <div className={styles.footer__logoBox}>
      <svg className={styles.footer__logoImage}>
        <use href={`${sprite}#icon-logoFoot`}></use>
      </svg>
     
      <p className={styles.footer__logoTitle}>So Yummy</p>
    </div>
  );

  const FeaturesList = () => (
    <ul className={styles.footer__featuresList}>
      {FEATURES_LIST.map((feature, index) => (
        <li key={index} className={styles.footer__featureItem}>
          {feature}
        </li>
      ))}
    </ul>
  );

  const SubscribeSection = () => (
    <div className={styles.footer__subscribeSection}>
      <div className={styles.footer__subscribeTextBox}>
        <h2 className={styles.footer__subscribeTitle}>
          Subscribe to our Newsletter
        </h2>
        <p className={styles.footer__subscribeDescription}>
          Subscribe to our newsletter. Stay updated with the latest news and
          special offers.
        </p>
      </div>
      <SubscribeForm />
    </div>
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__primaryContent}>
          <div
            className={
              isMobile ? styles.footer__contentSmall : styles.footer__content
            }
          >
            <div className={styles.footer__logoAndFeatures}>
              <LogoSection />
              {!isMobile && <FeaturesList />}
            </div>
            <Nav />
            {isDesktop && <SubscribeSection />}
          </div>
          {!isDesktop && <SubscribeForm />}
          <FollowUs />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

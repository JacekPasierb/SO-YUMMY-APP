import React from "react";
import {useMediaQuery} from "@react-hook/media-query";
import styles from "./Footer.module.css";
import logoFooter from "../../images/logoFooter.png";
import Nav from "./Nav/Nav";
import SubscribeForm from "./SubscribeForm/SubscribeForm";
import FollowUs from "./FollowUs/FollowUs";
import sprite from "../../assets/icons/sprite.svg";
import {useTranslation} from "react-i18next";

const Footer: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const {t} = useTranslation();
  const LogoSection = () => (
    <div className={styles.footer__logoBox}>
      <svg className={styles.footer__logoImage}>
        <use href={`${sprite}#icon-logoFoot`}></use>
      </svg>

      <p className={styles.footer__logoTitle}>So Yummy</p>
    </div>
  );
  const FEATURES_LIST = [
    t("description1"),
    t("description2"),
    t("description3"),
    t("description4"),
  ] as const;

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
        {t("newsletterTitle")},
        </h2>
        <p className={styles.footer__subscribeDescription}>
        {t("newsletterText")},
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

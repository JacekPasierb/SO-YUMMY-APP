import React from "react";
import styles from "./FollowUs.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: "fb",
    url: "/",
    ariaLabel: "Visit our Facebook page",
  },
  {
    name: "YouTube",
    icon: "yb",
    url: "/",
    ariaLabel: "Visit our YouTube channel",
  },
  {
    name: "Twitter",
    icon: "twitter",
    url: "/",
    ariaLabel: "Visit our Twitter profile",
  },
  {
    name: "Instagram",
    icon: "insta",
    url: "/",
    ariaLabel: "Visit our Instagram profile",
  },
] as const;

const FollowUs: React.FC = () => {
  return (
    <div className={styles.followUs}>
      <ul className={styles.followUs__list}>
        {SOCIAL_LINKS.map(({ name, icon, url, ariaLabel }) => (
          <li key={name} className={styles.followUs__item}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              className={styles.followUs__link}
            >
              <svg className={styles.followUs__icon} aria-hidden="true">
                <use href={`${sprite}#icon-${icon}`} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUs;

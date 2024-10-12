import React from "react";
import styles from "./FollowUs.module.css";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";

const FollowUs = () => {
  return (
    <>
      <ul className={styles.followUs__list}>
        <li className={styles.followUs__item}>
          <Link to="#">
            <svg className={styles.followUs__icon}>
              <use href={`${sprite}#icon-fb`}></use>
            </svg>
          </Link>
        </li>
        <li>
          <Link to="#">
            <svg className={styles.followUs__icon}>
              <use href={`${sprite}#icon-yb`}></use>
            </svg>
          </Link>
        </li>

        <li>
          <Link to="#">
            <svg className={styles.followUs__icon}>
              <use href={`${sprite}#icon-twitter`}></use>
            </svg>
          </Link>
        </li>
        <li>
          <Link to="#">
            <svg className={styles.followUs__icon}>
              <use href={`${sprite}#icon-insta`}></use>
            </svg>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default FollowUs;

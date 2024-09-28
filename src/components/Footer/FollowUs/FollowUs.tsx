import React from "react";
import css from "./FollowUs.module.css";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import SubTitle from "../../SubTitle/SubTitle";

const FollowUs = () => {
  return (
    <>
      <SubTitle title={"Follow Us"} />
      <ul className={css.listSocial}>
        <li>
          <Link to="#">
            <svg className={css.iconSocial}>
              <use href={sprite + `#icon-fb`}></use>
            </svg>
          </Link>
        </li>
        <li>
          <Link to="#">
            <svg className={css.iconSocial}>
              <use href={sprite + `#icon-yb`}></use>
            </svg>
          </Link>
        </li>

        <li>
          <Link to="#">
            <svg className={css.iconSocial}>
              <use href={sprite + `#icon-twitter`}></use>
            </svg>
          </Link>
        </li>
        <li>
          <Link to="#">
            <svg className={css.iconSocial}>
              <use href={sprite + `#icon-insta`}></use>
            </svg>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default FollowUs;

import React, { FC } from "react";
import styles from "./SubTitle.module.css";

interface SubTitleProps {
  title: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ title }) => {
  return <h2 className={styles.subTitle}>{title}</h2>;
};

export default SubTitle;

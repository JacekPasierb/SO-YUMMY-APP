import React, { FC } from "react";
import css from "./SubTitle.module.css";

interface SubTitleProps {
  title: string;
}

const SubTitle: FC<SubTitleProps> = ({ title }) => {
  return <h2 className={css.title}>{title}</h2>;
};

export default SubTitle;

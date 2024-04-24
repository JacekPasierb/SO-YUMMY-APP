import css from "./MainTitle.module.css";

import React, { FC } from "react";

interface MainTitleProps {
  title: string;
}

const MainTitle: FC<MainTitleProps> = ({ title }) => {
  return (
    <div className={css.bgTitle}>
      <h2 className={css.mainTitle}>{title}</h2>
    </div>
  );
};

export default MainTitle;

import React from "react";
import styles from "./AppTitle.module.css";

interface AppTitleProps {
  className?: string;
}

const AppTitle: React.FC<AppTitleProps> = React.memo(({ className }) => {
  return (
    <h1 className={`${styles.title} ${className || ''}`}>
      <span className={styles.title__highlight}>So</span>Yummy
    </h1>
  );
});

AppTitle.displayName = 'AppTitle';

export default AppTitle;

import React from "react";
import styles from "./AppDescription.module.css"; 

const AppDescription = React.memo(() => {
  return (
    <p className={styles.description}>
      What to cook? is not only a recipe app, it is, in fact, your cookbook.
      You can add your own recipes to save them for the future.
    </p>
  );
});

export default AppDescription;

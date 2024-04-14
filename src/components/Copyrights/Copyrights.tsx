import React from "react";
import css from "./Copyrights.module.css";

const Copyrights = () => {
  return (
    <div className={css.copyrightsBox}>
      <div className={css.container}>
        <div className={css.textBox}>
                  <span className={`${css.text} ${css.textMedium}`}>© 2023 All Rights Reserved.</span>
          <span className={css.text}>Terms of Service</span>
        </div>
      </div>
    </div>
  );
};

export default Copyrights;

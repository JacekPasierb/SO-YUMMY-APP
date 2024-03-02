import React from "react";
import css from "./Button.module.css";

const Button = ({text}) => {
  return (
    <button type="button" className={css.btn}>
      {text}
    </button>
  );
};

export default Button;

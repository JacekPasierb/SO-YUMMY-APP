import React from "react";
import css from "./CardIngredient.module.css";
import { Checkbox } from "@mui/material";

const CardIngredient = ({ ingredient }) => {
  return (
    <div className={css.ingredientCard}>
      <div className={css.flexHelp}>
        <img
          src={ingredient.thb}
          width="65px"
          height="65px"
          className={css.imgIngredient}
        />
        <p className={css.nameIngredient}>{ingredient.ttl}</p>
      </div>
      <div className={css.flexHelp}>
        <div className={css.measureIngredientBox}>
          <p className={css.measureIngredientText}>{ingredient.measure}</p>
        </div>
        <Checkbox
          sx={{
            color: "#7E7E7E",
            
            '&.Mui-checked': {
              color:"transparent",
              stroke:"#7E7E7E",
              
            },
            ".MuiSvgIcon-fontSizeMedium": {
              width: "18px",
              height: "18px",
            },

            "@media (min-width: 768px)": {
              ".MuiSvgIcon-fontSizeMedium": {
                width: "35px",
                height: "35px",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CardIngredient;

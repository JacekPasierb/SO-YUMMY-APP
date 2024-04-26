import css from "./CardOwnRecipe.module.css";
import React from "react";

interface OwnRecipe {
  title: string;
  preview: string;
  description:string;
  time:string;
}

interface Props {
  ownRecipe: OwnRecipe;
}

const CardOwnRecipe = ({ ownRecipe }: Props) => {
  console.log("pp", ownRecipe);

  return (
    <div className={css.cardBox}>
      <img
        src={ownRecipe.preview}
        width="124"
        height="124"
        alt="recipe photo"
      />
      <div>
        <h2>{ownRecipe.title}</h2>
        <p>{ownRecipe.description}</p>
        <div className={css.row}><p>{ownRecipe.time} min</p> <button>See recipes</button></div>
      </div>
    </div>
  );
};

export default CardOwnRecipe;

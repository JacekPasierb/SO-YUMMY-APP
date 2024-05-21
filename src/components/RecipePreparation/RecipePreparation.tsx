import SubTitle from "../SubTitle/SubTitle";
import css from "./RecipePreparation.module.css";

import React, { FC, useEffect, useState } from "react";

interface RecipePreparationProps {
  img: string;
  instructions: string;
}

const RecipePreparation: FC<RecipePreparationProps> = ({
  img,
  instructions,
}) => {
  const [step, setStep] = useState<string[]>([]);

  useEffect(() => {
    if (instructions) {
      const steps = instructions.split(". ");
      setStep(steps);
    }
  }, [instructions]);

  return (
    <div className={`${css.container} ${css.flex}`}>
      <div>
        <SubTitle title={"Recipe Preparation"}/>
        <ul className={css.instructionsList}>
          {step &&
            step.map((step, index) => (
              <li key={index} className={`${css.instructionsListItem} `}>
                <div className={css.numbStepBox}>
                  <p className={css.numbStepText}>{`${index + 1}`}</p>
                </div>
                <p className={css.descStep}>{`${step}`}</p>
              </li>
            ))}
        </ul>
      </div>
      <img src={img} width="100%" height="100%" className={css.recipeImg} />
    </div>
  );
};

export default RecipePreparation;

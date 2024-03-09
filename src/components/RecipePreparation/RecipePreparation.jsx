import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "./RecipePreparation.module.css";

const RecipePreparation = ({ img, instructions }) => {
  const [step, setStep] = useState();

  useEffect(() => {
    if (instructions) {
      console.log("o", instructions);
      const steps = instructions.split(". ");
      console.log("ss", steps);
      setStep(steps);
    }
  }, [instructions]);

  return (
    <div className={css.container}>
      <h2 className={css.titleInstruction}>Recipe Preparation</h2>
      <ul className={css.instructionsList}>
        {step &&
          step.map((step, index) => (
            <li key={index} className={`${css.instructionsListItem} `}>
              <p className={css.numbStep}>{`${index + 1}`}</p>
              <p className={css.descStep}>{`${step}`}</p>
            </li>
          ))}
       
      </ul> <img src={img} width="100%" height="100%" className={css.recipeImg}/>
    </div>
  );
};

RecipePreparation.propTypes = {
  img: PropTypes.string,
  instructions: PropTypes.string,
};

export default RecipePreparation;

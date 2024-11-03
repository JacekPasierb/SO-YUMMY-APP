import React, { memo } from "react";
import styles from "./RecipePreparationFields.module.css";
import SubTitle from "../SubTitle/SubTitle";

interface RecipePreparationFieldsProps {
  instructionsRecipe: string;
  setInstructionsRecipe: React.Dispatch<React.SetStateAction<string>>;
}

const RecipePreparationFields: React.FC<RecipePreparationFieldsProps> = ({
  instructionsRecipe,
  setInstructionsRecipe,
}) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.currentTarget.value;
    setInstructionsRecipe(text);
  };

  return (
    <div className={styles.recipePreparationFields__container}>
      <SubTitle title="Recipe Preparation" />

      <div className={styles.recipePreparationFields__inputWrapper}>
        <textarea
          placeholder="Enter recipe instructions..."
          rows={10}
          cols={50}
          className={styles.recipePreparationFields__textarea}
          onChange={handleTextChange}
          value={instructionsRecipe}
          aria-label="Recipe preparation instructions"
          required
        />
        
        <button 
          type="submit" 
          className={styles.recipePreparationFields__button}
          aria-label="Add recipe instructions"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default memo(RecipePreparationFields);

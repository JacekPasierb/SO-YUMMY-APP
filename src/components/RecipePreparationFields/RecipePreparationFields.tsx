import React from "react";
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
  const handleArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.currentTarget.value;

    setInstructionsRecipe(text.replace(/ +/, " ").trim());
  };
  return (
    <div className={styles.recipePreparationFields__container}>
      <SubTitle title={"Recipe Preparation"} />

      <textarea
        placeholder="Enter recipe..."
        rows={10}
        cols={50}
        className={styles.recipePreparationFields__textarea}
        style={{
          resize: "none",
          width: "100%",
          color: "var(--color-text-select)",
          border: "1px solid var(--color-border-line)",
          outline: "none",
          borderRadius: "6px",
          backgroundColor: "transparent",
          padding: "9px 16px",
        }}
        onChange={handleArea}
        value={instructionsRecipe}
      />
      <button type="submit" className={styles.recipePreparationFields__button}>
        Add
      </button>
    </div>
  );
};

export default RecipePreparationFields;

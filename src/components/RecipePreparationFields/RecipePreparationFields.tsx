import React, { FC } from "react";
import css from "./RecipePreparationFields.module.css";

interface RecipePreparationFieldsProps {
  instructionsRecipe: string;
  setInstructionsRecipe: React.Dispatch<React.SetStateAction<string>>;
}

const RecipePreparationFields: FC<RecipePreparationFieldsProps> = ({
  instructionsRecipe,
  setInstructionsRecipe,
}) => {
  const handleArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.currentTarget.value;

    setInstructionsRecipe(text.replace(/ +/, " ").trim());
  };
  return (
    <>
      <h2 className={css.title}>Recipe Preparation</h2>
      <textarea
        placeholder="Enter recipe..."
        rows={10}
        cols={50}
        style={{
          resize: "none",
          width: "100%",
          border: "none",
          outline: "none",
          borderRadius: "6px",
          backgroundColor: "#d9d9d94f",
          padding: "9px 16px",
        }}
        onChange={handleArea}
      />
      <button type="submit" className={css.btn}>
        Add
      </button>
    </>
  );
};

export default RecipePreparationFields;

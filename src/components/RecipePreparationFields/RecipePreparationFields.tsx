import React, { FC } from "react";
import css from "./RecipePreparationFields.module.css";
import SubTitle from "../SubTitle/SubTitle";

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
    <div className={css.recipePreparationBox}>
    <SubTitle title={"Recipe Preparation"}/>
      
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
    </div>
  );
};

export default RecipePreparationFields;

import React from "react";
import css from "./RecipePreparationFields.module.css";

const RecipePreparationFields = ({
  instructionsRecipe,
  setInstructionsRecipe,
}) => {
  const handleArea = ({ currentTarget }) => {
    const text = currentTarget.value;

    setInstructionsRecipe(text);
  };
  return (
    <>
      <h2>Recipe Preparation</h2>
      <textarea
        placeholder="Enter recipe..."
        rows="10"
        cols="50"
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
    </>
  );
};

export default RecipePreparationFields;

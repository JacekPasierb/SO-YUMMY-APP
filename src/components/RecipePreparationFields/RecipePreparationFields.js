import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./RecipePreparationFields.module.css";
const RecipePreparationFields = ({ instructionsRecipe, setInstructionsRecipe, }) => {
    const handleArea = (event) => {
        const text = event.currentTarget.value;
        setInstructionsRecipe(text.replace(/ +/, " ").trim());
    };
    return (_jsxs(_Fragment, { children: [_jsx("h2", { className: css.title, children: "Recipe Preparation" }), _jsx("textarea", { placeholder: "Enter recipe...", rows: 10, cols: 50, style: {
                    resize: "none",
                    width: "100%",
                    border: "none",
                    outline: "none",
                    borderRadius: "6px",
                    backgroundColor: "#d9d9d94f",
                    padding: "9px 16px",
                }, onChange: handleArea }), _jsx("button", { type: "submit", className: css.btn, children: "Add" })] }));
};
export default RecipePreparationFields;

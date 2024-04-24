import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./RecipePreparation.module.css";
import { useEffect, useState } from "react";
const RecipePreparation = ({ img, instructions, }) => {
    const [step, setStep] = useState([]);
    useEffect(() => {
        if (instructions) {
            const steps = instructions.split(". ");
            setStep(steps);
        }
    }, [instructions]);
    return (_jsxs("div", { className: `${css.container} ${css.flex}`, children: [_jsxs("div", { children: [_jsx("h2", { className: css.titleInstruction, children: "Recipe Preparation" }), _jsx("ul", { className: css.instructionsList, children: step &&
                            step.map((step, index) => (_jsxs("li", { className: `${css.instructionsListItem} `, children: [_jsx("div", { className: css.numbStepBox, children: _jsx("p", { className: css.numbStepText, children: `${index + 1}` }) }), _jsx("p", { className: css.descStep, children: `${step}` })] }, index))) })] }), _jsx("img", { src: img, width: "100%", height: "100%", className: css.recipeImg })] }));
};
export default RecipePreparation;

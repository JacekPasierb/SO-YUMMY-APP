import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./CardIngredient.module.css";
import { Checkbox } from "@mui/material";
const CardIngredient = ({ ingredient }) => {
    return (_jsxs("div", { className: css.ingredientCard, children: [_jsxs("div", { className: css.flexHelp, children: [_jsx("img", { src: ingredient.thb, width: "65px", height: "65px", className: css.imgIngredient }), _jsx("p", { className: css.nameIngredient, children: ingredient.ttl })] }), _jsxs("div", { className: css.flexHelp, children: [_jsx("div", { className: css.measureIngredientBox, children: _jsx("p", { className: css.measureIngredientText, children: ingredient.measure }) }), _jsx(Checkbox, { sx: {
                            color: "#7E7E7E",
                            "&.Mui-checked": {
                                color: "transparent",
                                stroke: "#7E7E7E",
                            },
                            ".MuiSvgIcon-fontSizeMedium": {
                                width: "18px",
                                height: "18px",
                            },
                            "@media (min-width: 768px)": {
                                ".MuiSvgIcon-fontSizeMedium": {
                                    width: "35px",
                                    height: "35px",
                                },
                            },
                        } })] })] }));
};
export default CardIngredient;

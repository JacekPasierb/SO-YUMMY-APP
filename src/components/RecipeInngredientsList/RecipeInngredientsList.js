import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import css from "./RecipeInngredientsList.module.css";
import { fetchIngredientsById, } from "../../API/ingredientsAPI";
import CardIngredient from "../CardIngredient/CardIngredient";
const RecipeInngredientsList = ({ ingredients, }) => {
    const [ingredientsList, setIngredientsList] = useState([]);
    useEffect(() => {
        const fetchIngredientsData = async () => {
            if (ingredients !== undefined) {
                const fetchedData = [];
                for (const ing of ingredients) {
                    const { data } = await fetchIngredientsById(ing.id);
                    if (data) {
                        const ingredient = data.ingredient;
                        const ingredientWithMeasure = {
                            ...ingredient,
                            measure: ing.measure,
                        };
                        fetchedData.push(ingredientWithMeasure);
                    }
                }
                setIngredientsList(fetchedData);
            }
        };
        fetchIngredientsData();
    }, [ingredients]);
    return (_jsxs(_Fragment, { children: [!ingredientsList && (_jsx("div", { className: `${css.container} ${css.ingredientsBox}`, children: _jsx("p", { children: "Loading ingredients.." }) })), ingredientsList && (_jsxs("div", { className: `${css.container} ${css.ingredientsBox}`, children: [_jsxs("div", { className: css.headerListIngredients, children: [_jsx("p", { className: css.titleList, children: "Ingredients" }), _jsxs("div", { className: css.flexHelp, children: [_jsx("p", { className: css.titleList, children: "Number" }), _jsx("p", { className: css.titleList, children: "Add to list" })] })] }), _jsx("ul", { className: css.ingredientsList, children: ingredientsList.map((ingredient) => (_jsx("li", { children: _jsx(CardIngredient, { ingredient: ingredient }) }, ingredient._id))) })] }))] }));
};
export default RecipeInngredientsList;

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import css from "./RecipeIngredientsFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { nanoid } from "@reduxjs/toolkit";
import Select from "react-select";
import { selectIngredient } from "./selectStyles";
import UnitInput from "../UnitInput/UnitInput";
const RecipeIngredientsFields = ({ ingredients, setIngredients, }) => {
    const [dataIngredients, setDataIngredients] = useState([]);
    const handleDecreament = () => {
        setIngredients((prev) => [...prev.slice(0, prev.length - 1)]);
    };
    const handleIncreament = () => {
        setIngredients((prev) => [...prev, { id: nanoid() }]);
    };
    useEffect(() => {
        const getIngredients = async () => {
            try {
                const { data } = await fetchAllIngredients();
                setDataIngredients(data.ingredients);
            }
            catch (error) {
                console.log(error);
            }
        };
        getIngredients();
    }, []);
    const options = () => {
        const options = [];
        dataIngredients.map((ingredient) => options.push({ label: ingredient.ttl, value: ingredient.ttl }));
        return options;
    };
    const remove = async (fieldId) => {
        const newField = await ingredients.filter((ingredient) => ingredient.id !== fieldId);
        setIngredients(newField);
    };
    const handleIngr = (index, selectedOption) => {
        const updateFields = [...ingredients];
        updateFields[index].selectedValue = selectedOption.value;
        setIngredients(updateFields);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: css.row, children: [_jsx("h2", { children: "Ingredients" }), _jsxs("div", { className: css.counterBox, children: [_jsx("button", { type: "button", className: css.btn, onClick: handleDecreament, children: _jsx("svg", { className: css.iconMinus, children: _jsx("use", { href: sprite + `#icon-Minus` }) }) }), _jsx("span", { className: css.counterFont, children: ingredients.length }), _jsx("button", { type: "button", className: css.btn, onClick: handleIncreament, children: _jsx("svg", { className: css.icon, children: _jsx("use", { href: sprite + `#icon-Plus` }) }) })] })] }), _jsx("ul", { className: css.ingredientsList, children: dataIngredients
                    ? ingredients.map((ingredient, index) => (_jsxs("li", { className: css.rowItem, children: [_jsx(Select, { options: options(), onChange: (selectedOption) => handleIngr(index, selectedOption), styles: selectIngredient }), _jsx(UnitInput, { ingredients: ingredients, setIngredients: setIngredients, index: index }), _jsx("button", { className: css.btnX, onClick: () => remove(ingredient.id), children: _jsx("svg", { className: css.iconX, children: _jsx("use", { href: sprite + `#icon-X` }) }) })] }, ingredient.id)))
                    : "" })] }));
};
export default RecipeIngredientsFields;

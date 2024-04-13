import React from "react";
import Header from "../../components/Header/Header.jsx";
import css from "./AddRecipePage.module.css";
import MainTitle from "../../components/MainTitle/MainTitle.jsx";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm.jsx";
import PopularRecipe from "../../components/PopularRecipe/PopularRecipe.jsx";
const AddRecipePage = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("main", { className: css.background },
            React.createElement(Header, null),
            React.createElement("div", { className: `${css.container} ${css.flex}` },
                React.createElement(MainTitle, { title: "Add recipe" }),
                React.createElement(AddRecipeForm, null),
                React.createElement(PopularRecipe, null)))));
};
export default AddRecipePage;

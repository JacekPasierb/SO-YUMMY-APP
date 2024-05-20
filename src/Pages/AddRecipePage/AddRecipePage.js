import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./AddRecipePage.module.css";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import PopularRecipe from "../../components/PopularRecipe/PopularRecipe";
import { useMediaQuery } from "@react-hook/media-query";
import FollowUs from "../../components/FollowUs/FollowUs";
const AddRecipePage = () => {
    const isDesctop = useMediaQuery("(min-width:1200px)");
    return (_jsx(_Fragment, { children: _jsxs("main", { className: css.background, children: [_jsx(Header, {}), _jsxs("div", { className: `${css.container} ${css.flex}`, children: [_jsx(MainTitle, { title: "Add recipe" }), _jsx("div", { className: css.flexPage, children: isDesctop ? (_jsxs(_Fragment, { children: [_jsx(AddRecipeForm, {}), _jsxs("div", { className: css.margin, children: [_jsx(FollowUs, {}), " ", _jsx(PopularRecipe, {})] })] })) : (_jsxs(_Fragment, { children: [_jsx(AddRecipeForm, {}), " ", _jsx(PopularRecipe, {})] })) })] })] }) }));
};
export default AddRecipePage;

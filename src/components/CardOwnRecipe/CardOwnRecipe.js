import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./CardOwnRecipe.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { deleteRecipe } from "../../redux/ownRecipes/operations";
import { toast } from "react-toastify";
import { removeFromFavorite } from "../../redux/favoriteRecipes/operations";
const CardOwnRecipe = ({ ownRecipe }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const handleDelete = (id) => {
        dispatch(deleteRecipe(id));
    };
    const handleRemove = (id) => {
        dispatch(removeFromFavorite(id));
        toast.success("Recipe removed from favorites");
    };
    const { _id, preview, title, description, time } = ownRecipe;
    return (_jsxs("div", { className: css.cardBox, children: [_jsx("img", { src: preview, width: "124", height: "124", className: css.recipeImg, alt: "recipe photo" }), _jsxs("div", { className: css.recipeInfo, children: [_jsxs("div", { className: css.rowFirst, children: [_jsx("h2", { className: css.titleRecipe, children: title }), _jsx("button", { type: "button", onClick: () => pathname === "/favorite" ? handleRemove(_id) : handleDelete(_id), className: css.delBtn, children: _jsx("svg", { className: pathname === "/favorite" ? css.iconBgRemove : css.iconBgDelete, children: _jsx("use", { href: sprite + `#icon-trash-01`, className: css.iconDel }) }) })] }), _jsx("p", { className: css.recipeDescription, children: description }), _jsxs("div", { className: css.row, children: [_jsxs("p", { className: css.recipeTime, children: [time, " min"] }), _jsx(NavLink, { to: `/recipe/${_id}`, className: pathname === "/favorite"
                                    ? `${css.recipeFavSeeBtn} ${css.txtFavBtn}`
                                    : `${css.recipeSeeBtn} ${css.txtBtn}`, children: "See recipes" })] })] })] }));
};
export default CardOwnRecipe;

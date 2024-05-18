import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./ReceipePageHero.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useEffect, useState } from "react";
import MainPageTitle from "../MainPageTitle/MainPageTitle";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { addToFavorite, removeFromFavorite } from "../../API/favoritesAPI";
import { toast } from "react-toastify";
const ReceipePageHero = ({ recipe }) => {
    const { title, description, time, favorites, _id } = recipe;
    const user = useSelector(selectUser);
    const userId = user.userId;
    const [isFav, setIsFav] = useState(false);
    useEffect(() => {
        if (favorites !== undefined) {
            setIsFav(favorites.includes(userId));
        }
    }, [recipe]);
    useEffect(() => {
        console.log("fav", isFav);
    }, [isFav, setIsFav]);
    const handleFavorite = async (id) => {
        try {
            if (isFav) {
                await removeFromFavorite(id);
                toast.success("Recipe removed from favorites");
            }
            else {
                await addToFavorite(id);
                toast.success("Recipe add to favorites");
            }
            setIsFav(!isFav);
        }
        catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong..");
        }
    };
    return (_jsxs("div", { className: css.receipeHeroBox, children: [_jsx(MainPageTitle, { title: title }), _jsx("p", { className: css.recipeDescription, children: description }), _jsx("button", { type: "button", className: `${css.btn} ${css.textBtn}`, onClick: () => handleFavorite(_id), children: !isFav ? "Add to favorite recipes" : "Remove from favorites" }), time && (_jsxs("div", { className: css.timeBox, children: [_jsx("svg", { className: css.iconClock, children: _jsx("use", { href: sprite + `#icon-clock` }) }), _jsxs("p", { className: css.timeText, children: [time, " min"] })] }))] }));
};
export default ReceipePageHero;

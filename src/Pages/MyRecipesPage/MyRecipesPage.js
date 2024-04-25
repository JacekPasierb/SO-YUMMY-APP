import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import css from "./MainRecipesPage.module.css";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
import { useDispatch, useSelector } from "react-redux";
import { getOwnRecipes } from "../../redux/recipes/operations";
import { selectOwnRecipes } from "../../redux/recipes/selectors";
import { useAuth } from "../../hooks/useAuth";
const MyRecipesPage = () => {
    const dispatch = useDispatch();
    const ownRecipes = useSelector(selectOwnRecipes);
    const { user } = useAuth();
    const userId = user?.id;
    console.log("uu", userId);
    useEffect(() => {
        console.log("stt");
        if (userId) {
            dispatch(getOwnRecipes(userId));
        }
        console.log("ooowww", ownRecipes);
    }, [dispatch, userId]);
    console.log("ooo", ownRecipes);
    return (_jsxs("main", { className: css.background, children: [_jsx(Header, {}), _jsx("div", { className: `${css.container} ${css.flex}`, children: _jsx(MainTitle, { title: "My recipes" }) })] }));
};
export default MyRecipesPage;

import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./FavoritesPage.module.css";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
const FavoritesPage = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: css.background, children: _jsx("div", { className: `${css.container} ${css.flex}`, children: _jsx(MainTitle, { title: "Favorites" }) }) })] }));
};
export default FavoritesPage;

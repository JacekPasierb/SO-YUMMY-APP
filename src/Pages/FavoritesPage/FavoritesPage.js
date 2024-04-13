import React from "react";
import css from "./FavoritesPage.module.css";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
const FavoritesPage = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, null),
        React.createElement("main", { className: css.background },
            React.createElement("div", { className: `${css.container} ${css.flex}` },
                React.createElement(MainTitle, { title: "Favorites" })))));
};
export default FavoritesPage;

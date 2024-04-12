import React from "react";
import AuthNav from "../../components/AuthNav/AuthNav";
import css from "./WelcomePage.module.css";
import logo from "../../images/logo.png";
const WelcomePage = () => {
    const screenWidth = window.innerWidth;
    return (React.createElement("div", { className: css.background },
        React.createElement("div", { className: css.boxContainer },
            React.createElement("img", { src: logo, alt: "logo", className: css.iconLogo }),
            React.createElement("div", { className: css.boxSection },
                React.createElement("div", { className: css.boxText },
                    React.createElement("h1", { className: css.title }, "Welcome to the app!"),
                    React.createElement("p", { className: css.description }, "This app offers more than just a collection of recipes - it is designed to be your very own digital cookbook. You can easily save and retrieve your own recipes at any time.")),
                React.createElement(AuthNav, null)))));
};
export default WelcomePage;

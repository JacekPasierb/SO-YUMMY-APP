import React from "react";
import css from "./MainPage.module.css";
import Search from "../../components/Search/Search";
import ChooseYourBreakfast from "../../components/ChooseYourBreakfast/ChooseYourBreakfast";
import Media from "react-media";
import PreviewsCategories from "../../components/PreviewCategories/PreviewsCategories";
import Header from "../../components/Header/Header";
import ButtonOtherCategories from "../../components/ButtonOtherCategories/ButtonOtherCategories";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppDescription from "../../components/AppDescription/AppDescription";
const MainPage = () => {
    return (React.createElement(Media, { queries: {
            small: "(max-width: 767px)",
            medium: "(min-width: 768px) and (max-width: 1199px)",
            large: "(min-width: 1200px)",
        } }, (matches) => (React.createElement(React.Fragment, null,
        matches.small && (React.createElement(React.Fragment, null,
            React.createElement(Header, null),
            React.createElement("main", { className: css.background },
                React.createElement("div", { className: `${css.container} ${css.mainPageBox}` },
                    React.createElement(AppTitle, null),
                    React.createElement(AppDescription, null),
                    React.createElement(ChooseYourBreakfast, null),
                    React.createElement(Search, null))),
            React.createElement("div", { className: `${css.container} ${css.sectionBox}` },
                React.createElement(PreviewsCategories, null),
                React.createElement(ButtonOtherCategories, { text: "Other categories" })))),
        matches.medium && (React.createElement(React.Fragment, null,
            React.createElement("main", { className: css.background },
                React.createElement(Header, null),
                React.createElement("div", { className: `${css.container} ${css.mainPageBox}` },
                    React.createElement("div", { className: css.flexMed },
                        React.createElement("div", null,
                            React.createElement(AppTitle, null),
                            React.createElement(AppDescription, null),
                            React.createElement(Search, null)),
                        React.createElement(ChooseYourBreakfast, null)))),
            React.createElement("div", { className: `${css.container} ${css.sectionBox}` },
                React.createElement(PreviewsCategories, null),
                React.createElement(ButtonOtherCategories, { text: "Other categories" })))),
        matches.large && (React.createElement(React.Fragment, null,
            React.createElement("main", { className: css.background },
                React.createElement(Header, null),
                React.createElement("div", { className: `${css.container} ${css.mainPageBox}` },
                    React.createElement("div", { className: css.flexMed },
                        React.createElement("div", null,
                            React.createElement(AppTitle, null),
                            React.createElement(AppDescription, null),
                            React.createElement(Search, null)),
                        React.createElement(ChooseYourBreakfast, null)))),
            React.createElement("div", { className: `${css.container} ${css.mainPageBox}` },
                React.createElement(PreviewsCategories, null),
                React.createElement(ButtonOtherCategories, { text: "Other categories" }))))))));
};
export default MainPage;

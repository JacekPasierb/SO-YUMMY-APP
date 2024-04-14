import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsx(Media, { queries: {
            small: "(max-width: 767px)",
            medium: "(min-width: 768px) and (max-width: 1199px)",
            large: "(min-width: 1200px)",
        }, children: (matches) => (_jsxs(_Fragment, { children: [matches.small && (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: css.background, children: _jsxs("div", { className: `${css.container} ${css.mainPageBox}`, children: [_jsx(AppTitle, {}), _jsx(AppDescription, {}), _jsx(ChooseYourBreakfast, {}), _jsx(Search, {})] }) }), _jsxs("div", { className: `${css.container} ${css.sectionBox}`, children: [_jsx(PreviewsCategories, {}), _jsx(ButtonOtherCategories, { text: "Other categories" })] })] })), matches.medium && (_jsxs(_Fragment, { children: [_jsxs("main", { className: css.background, children: [_jsx(Header, {}), _jsx("div", { className: `${css.container} ${css.mainPageBox}`, children: _jsxs("div", { className: css.flexMed, children: [_jsxs("div", { children: [_jsx(AppTitle, {}), _jsx(AppDescription, {}), _jsx(Search, {})] }), _jsx(ChooseYourBreakfast, {})] }) })] }), _jsxs("div", { className: `${css.container} ${css.sectionBox}`, children: [_jsx(PreviewsCategories, {}), _jsx(ButtonOtherCategories, { text: "Other categories" })] })] })), matches.large && (_jsxs(_Fragment, { children: [_jsxs("main", { className: css.background, children: [_jsx(Header, {}), _jsx("div", { className: `${css.container} ${css.mainPageBox}`, children: _jsxs("div", { className: css.flexMed, children: [_jsxs("div", { children: [_jsx(AppTitle, {}), _jsx(AppDescription, {}), _jsx(Search, {})] }), _jsx(ChooseYourBreakfast, {})] }) })] }), _jsxs("div", { className: `${css.container} ${css.mainPageBox}`, children: [_jsx(PreviewsCategories, {}), _jsx(ButtonOtherCategories, { text: "Other categories" })] })] }))] })) }));
};
export default MainPage;

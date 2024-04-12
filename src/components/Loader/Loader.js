import { ColorRing } from "react-loader-spinner";
import css from "./Loader.module.css";
import icon from "../../assets/icons/sprite.svg";
export const Loader = () => {
    return (React.createElement("div", { className: css["loader"] },
        React.createElement("svg", { className: css["loader-icon"], width: "18", height: "18" },
            React.createElement("use", { href: icon + `#icon-logoTablet` })),
        React.createElement(ColorRing, { visible: true, height: "160", width: "160", ariaLabel: "blocks-loading", wrapperStyle: {}, wrapperClass: "blocks-wrapper", colors: ["#24CCA7", "#4a56e2", "#24CCA7", "#4a56e2", "#24CCA7"] })));
};

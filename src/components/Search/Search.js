import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./Search.module.css";
const Search = () => {
    return (_jsxs("div", { className: css.inputSearch, children: [_jsx("input", { type: "text", placeholder: "Beef", className: css.input }), _jsx("button", { type: "button", className: css.btn, children: "Search" })] }));
};
export default Search;

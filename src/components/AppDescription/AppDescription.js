import { jsx as _jsx } from "react/jsx-runtime";
import css from "./AppDescription.module.css";
const AppDescription = () => {
    return (_jsx("p", { className: css.appDescription, children: "\"What to cook?\" is not only a recipe app, it is, in fact, your cookbook. You can add your own recipes to save them for the future." }));
};
export default AppDescription;

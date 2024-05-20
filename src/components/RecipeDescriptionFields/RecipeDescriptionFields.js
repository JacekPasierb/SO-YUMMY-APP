import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./RecipeDescriptionFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesList } from "../../redux/recipes/selectors";
import { getCategoriesList } from "../../redux/recipes/operations";
const RecipeDescriptionFields = ({ data }) => {
    const [path, setPath] = useState("");
    const dispatch = useDispatch();
    const categoriesList = useSelector(selectCategoriesList);
    const timeOptionsList = () => {
        const time = [];
        for (let i = 5; i <= 120; i += 5) {
            time.push({ label: `${i} min`, value: i });
        }
        return time;
    };
    const handleFile = (event) => {
        const { files } = event.currentTarget;
        if (!files) {
            return;
        }
        const [file] = files;
        let allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!file || !allowedImageTypes.includes(file.type)) {
            toast.error("Wrong file type. Please, choose different image type", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            data.setFile("");
            return;
        }
        if (file && file.size > 4000000) {
            toast.error("Picture is too large, choose other picture");
            data.setFile("");
            return;
        }
        data.setFile(file);
        setPath(URL.createObjectURL(file));
    };
    const handleTitle = (event) => {
        const title = event.currentTarget.value;
        data.setTitleRecipe(title);
    };
    const handleChange = (event) => {
        const about = event.currentTarget.value;
        data.setDescriptionRecipe(about);
    };
    const handleCategory = (event) => {
        const category = event.currentTarget.value;
        data.setCategoryRecipe(category);
    };
    const handleTime = (event) => {
        const cookingTime = event.currentTarget.value;
        data.setCookingTime(cookingTime);
    };
    useEffect(() => {
        dispatch(getCategoriesList());
    }, []);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: css.recipeDescriptionFieldsBox, children: [_jsx("div", { className: css.img, children: _jsxs("label", { htmlFor: "file", children: [!data.file ? (_jsx("div", { className: css.iconBox, children: _jsx("svg", { className: css.iconAdd, children: _jsx("use", { href: sprite + `#icon-add` }) }) })) : (_jsx("div", { className: css.pictureBox, children: _jsx("img", { src: path, alt: "preview", className: css.imgRecipe }) })), _jsx("input", { type: "file", name: "file", id: "file", onChange: handleFile, className: css.inputPicture })] }) }), _jsxs("div", { className: css.inputs, children: [_jsxs("div", { className: css.inputBox, children: [_jsx("label", { htmlFor: "title" }), _jsx("input", { type: "text", name: "title", id: "title", onChange: handleTitle, value: data.titleRecipe, placeholder: "Enter Item Title", className: css.input })] }), _jsxs("div", { className: css.inputBox, children: [_jsx("label", { htmlFor: "about" }), _jsx("input", { type: "text", name: "about", id: "about", onChange: handleChange, value: data.descriptionRecipe, placeholder: "Enter about recipe", className: css.input })] }), _jsxs("div", { className: `${css.inputBox} ${css.inputBox__select}`, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "category" }), _jsx("input", { type: "text", name: "category", placeholder: "Category", id: "category", readOnly: true, className: css.input })] }), _jsxs("select", { id: "cat", name: "cat", onChange: handleCategory, value: data.categoryRecipe, className: css.select, children: [_jsx("option", { value: "", disabled: true, children: "Please choose category" }), categoriesList.map((category) => (_jsx("option", { value: category, children: category }, category)))] })] }), _jsxs("div", { className: `${css.inputBox} ${css.inputBox__select}`, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "cookingTime" }), _jsx("input", { type: "text", name: "cookingTime", id: "cookingTime", placeholder: "Cooking time", readOnly: true, className: css.input })] }), _jsxs("select", { id: "time", name: "time", value: data.cookingTime, onChange: handleTime, className: css.select, children: [_jsx("option", { value: "", disabled: true, children: "Please choose time" }), timeOptionsList().map((t) => (_jsx("option", { value: t.value, children: t.label }, t.label)))] })] })] })] }) }));
};
export default RecipeDescriptionFields;

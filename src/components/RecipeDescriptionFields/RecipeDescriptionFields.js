import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import css from "./RecipeDescriptionFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { fetchAllCategories } from "../../API/categoriesAPI";
import { toast } from "react-toastify";
const RecipeDescriptionFields = ({ data }) => {
    const [path, setPath] = useState("");
    const [categoriesList, setCategoriesList] = useState([]);
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
        data.setFile(file.name);
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
        const getCategories = async () => {
            try {
                const { data } = await fetchAllCategories();
                setCategoriesList(data.catArr);
            }
            catch (error) {
                console.log(error);
            }
        };
        getCategories();
    }, []);
    return (_jsxs("div", { className: css.recipeDescriptionFieldsBox, children: [_jsx("div", { children: _jsxs("label", { htmlFor: "file", children: [!data.file ? (_jsx("div", { className: css.iconBox, children: _jsx("svg", { className: css.iconAdd, children: _jsx("use", { href: sprite + `#icon-add` }) }) })) : (_jsx("div", { className: css.pictureBox, children: _jsx("img", { src: path, alt: "preview", className: css.imgRecipe }) })), _jsx("input", { type: "file", name: "file", id: "file", onChange: handleFile, className: css.inputPicture })] }) }), _jsxs("div", { className: css.inputBox, children: [_jsx("label", { htmlFor: "title" }), _jsx("input", { type: "text", name: "title", id: "title", onChange: handleTitle, value: data.titleRecipe, placeholder: "Enter Item Title", className: css.input })] }), _jsxs("div", { className: css.inputBox, children: [_jsx("label", { htmlFor: "about" }), _jsx("input", { type: "text", name: "about", id: "about", onChange: handleChange, value: data.descriptionRecipe, placeholder: "Enter about recipe", className: css.input })] }), _jsxs("div", { className: `${css.inputBox} ${css.inputBox__select}`, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "category" }), _jsx("input", { type: "text", name: "category", placeholder: "Category", id: "category", readOnly: true, className: css.input })] }), _jsxs("select", { id: "cat", name: "cat", onChange: handleCategory, value: data.categoryRecipe, className: css.select, children: [_jsx("option", { value: "", disabled: true, children: "Please choose category" }), categoriesList.map((category) => (_jsx("option", { value: category, children: category }, category)))] })] }), _jsxs("div", { className: `${css.inputBox} ${css.inputBox__select}`, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "cookingTime" }), _jsx("input", { type: "text", name: "cookingTime", id: "cookingTime", placeholder: "Cooking time", readOnly: true, className: css.input })] }), _jsxs("select", { id: "time", name: "time", value: data.cookingTime, onChange: handleTime, className: css.select, children: [_jsx("option", { value: "", disabled: true, children: "Please choose time" }), timeOptionsList().map((t) => (_jsx("option", { value: t.value, children: t.label }, t.label)))] })] })] }));
};
export default RecipeDescriptionFields;

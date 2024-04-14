import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import css from "./AddRecipeForm.module.css";
import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";
import RecipePreparationFields from "../RecipePreparationFields/RecipePreparationFields";
import axios from "axios";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { toast } from "react-toastify";
import { ClimbingBoxLoader } from "react-spinners";
const AddRecipeForm = () => {
    const [file, setFile] = useState("");
    const [titleRecipe, setTitleRecipe] = useState("");
    const [descriptionRecipe, setDescriptionRecipe] = useState("");
    const [categoryRecipe, setCategoryRecipe] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructionsRecipe, setInstructionsRecipe] = useState("");
    const [ingredientsAll, setIngredientsAll] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getIngredientsAll = async () => {
            const { data } = await fetchAllIngredients();
            setIngredientsAll(data.ingredients);
        };
        getIngredientsAll();
    }, []);
    const resetForm = () => {
        setFile("");
        setTitleRecipe("");
        setDescriptionRecipe("");
        setCategoryRecipe("");
        setCookingTime("");
        setIngredients([]);
        setInstructionsRecipe("");
    };
    const dataForm = {
        file,
        setFile,
        titleRecipe,
        setTitleRecipe,
        descriptionRecipe,
        setDescriptionRecipe,
        categoryRecipe,
        setCategoryRecipe,
        cookingTime,
        setCookingTime,
        ingredients,
        setIngredients,
        instructionsRecipe,
        setInstructionsRecipe,
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let ingredientConvert = [];
        ingredients.map((ingredient) => {
            const ingre = ingredientsAll
                .filter((ing) => ing.ttl === ingredient.selectedValue)
                .map((ing) => ing._id);
            const measure = ingredient.selectedUnit;
            ingredientConvert.push({ id: ingre[0], measure: measure });
        });
        const inputs = {
            file,
            title: titleRecipe,
            description: descriptionRecipe,
            category: categoryRecipe,
            time: cookingTime,
            ingredients: ingredientConvert,
            instructions: instructionsRecipe,
        };
        for (const [key, value] of Object.entries(inputs)) {
            if (value.length === 0) {
                toast.error(`Please fill out the following field: ${key}`);
                return;
            }
            if (key === "ingredients") {
                for (const v of value) {
                    if (typeof v !== "string" &&
                        (!v.id || !v.measure || v.measure.trim().includes("undefined"))) {
                        toast.error(`Please fill out the following field for ingredient`);
                        return;
                    }
                }
            }
            else if (key === "instructions") {
                if (typeof value === "string" &&
                    value.replace(/ +/, " ").trim().length < 50) {
                    toast.error(`Instructions is too short..`);
                    return;
                }
            }
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "alex_preset");
        try {
            const response = await axios.post("/api/ownRecipes/picture", formData);
            const imageUrl = response.data.secure_url;
            const body = {
                ...inputs,
                imageUrl,
                thumb: imageUrl,
                preview: imageUrl,
            };
            console.log("body", body);
            const addRecipe = await axios.post("./api/ownRecipes/add", body);
            if (addRecipe) {
                resetForm();
                toast.success("Recipe added successfully");
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx(_Fragment, { children: isLoading ? (_jsx("div", { className: css.boxLoader, children: _jsx(ClimbingBoxLoader, { color: "#8BAA36" }) })) : (_jsxs("form", { onSubmit: handleSubmit, encType: "multipart/form-data", children: [_jsx(RecipeDescriptionFields, { data: dataForm }), _jsx(RecipeIngredientsFields, { ingredients: ingredients, setIngredients: setIngredients }), _jsx(RecipePreparationFields, { instructionsRecipe: instructionsRecipe, setInstructionsRecipe: setInstructionsRecipe })] })) }));
};
export default AddRecipeForm;

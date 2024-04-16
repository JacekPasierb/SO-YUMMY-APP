import axios from "axios";
export const fetchRecipesByFourCategories = async (count:number = 1) => {
    const { data } = await axios.get(`./api/recipes?count=${count}`);
    return data;
};
export const fetchRecipesByCategoryName = async (category: string, page:number) => {
    const { data } = await axios.get(`./api/recipes/categories/${category}?page=${page}&limit=8`);
    return data;
};
export const fetchRecipeById = async (id:string) => {
    const { data } = await axios.get(`./api/recipes/${id}`);
    return data;
};

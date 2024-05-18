import axios from "axios";
export const addToFavorite = async (recipeId) => {
    const data = await axios.patch(`/api/favorite/add/${recipeId}`);
    return data;
};
export const removeFromFavorite = async (recipeId) => {
    const data = await axios.delete(`/api/favorite/remove/${recipeId}`);
    return data;
};
export const getFavoriteRecipes = async () => {
    const { data } = await axios.get(`api/favorite`);
    return data;
};

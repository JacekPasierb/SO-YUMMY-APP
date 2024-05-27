import { Ingredient } from "./ingredientsTypes";

export interface IRecipe {
  file: string;
  _id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  preview: string;
  time: string;
  popularity: 0;
  favorites: string[];
  likes: [];
  youtube: string;
  tags: [];
  createdAt: string;
  updatedAt: string;
  owner?: string;
  ingredients: Ingredient[];
  imageUrl: any;
}

export interface IRecipesResponse {
  recipes: IRecipe[];
  totalRecipes: number;
}

export interface IRecipesState {
  recipes: IRecipe[];
  totalRecipes: number;
  isLoading: boolean;
  error: null | string;
}

export interface INewRecipe {
  title: string;
  description: string;
  category: string;
  time: string;
  ingredients: Ingredient[];
  instructions: string;
  imageUrl: string;
  thumb: string;
  preview: string;
}

import { Ingredient } from "./ingredientsTypes";

export interface IAuthState {
  user: {
    userId: null | string;
    name: null | any;
    email: null | string;
    avatar: null | string;
    isDarkTheme: boolean;
  };
  token: null | any;
  isLoggedIn: boolean;
  error: string | null;
  isAuth: boolean;
  isRefreshing: boolean;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  userId: string;
  isDarkTheme: boolean;
}

export interface IAuthResponse {
  status: string;
  code: number;
  data: {
    token: string;
    user: Omit<IUser, "password">;
  };
}

export type UpdateUserResponse = Pick<IAuthResponse, "status" | "code"> & {
  data: {
    user: Pick<IUser, "name" | "avatar">;
  };
};

export interface RecipeInputs {
  file: File | null;
  title: string;
  description: string;
  category: string;
  time: string;
  ingredients: Ingredient[];
  instructions: string;
}
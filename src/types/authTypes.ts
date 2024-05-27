export interface IAuthState {
  user: {
    userId: null | string;
    name: null | any;
    email: null | string;
    avatar: null | string;
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
}

export interface IAuthResponse {
  status: string;
  code: number;
  data: {
    token: string;
    user: Omit<IUser, "password">;
  };
}

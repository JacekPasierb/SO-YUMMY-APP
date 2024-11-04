import React, { FC, ReactElement } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface RestrictedRouteProps {
  component: ReactElement;
  redirectTo?: string;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({
  component,
  redirectTo = "/",
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;

import React, { FC } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";

interface RestrictedRouteProps {
  component: any;
  redirectTo?: string;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({
  component: Component,
  redirectTo = "/signin",
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;

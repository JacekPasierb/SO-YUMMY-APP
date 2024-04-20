import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import React, { FC, useEffect } from "react";

interface RestrictedRouteProps {
  component: any;
  redirectTo?: string;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;

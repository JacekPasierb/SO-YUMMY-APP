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
  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return  component;
};

export default RestrictedRoute;

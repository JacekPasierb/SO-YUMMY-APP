import React, { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  redirectTo = "/welcome",
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;

import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

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
  const location = useLocation();

  return shouldRedirect ? (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  ) : (
    <>{Component}</>
  );
};

export default PrivateRoute;

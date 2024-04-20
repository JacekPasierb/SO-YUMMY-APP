import React, { FC, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component:Component,
  redirectTo = "/welcome",
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const navigate = useNavigate();

  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;

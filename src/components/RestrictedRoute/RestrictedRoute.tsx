import { Navigate, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import React, { FC, useEffect } from "react";

interface RestrictedRouteProps {
  component:  React.ReactNode;
  redirectTo?: string;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({
  component,
  redirectTo = "/",
}) => {
  const { isLoggedIn } = useAuth();
  console.log("res zalogowany", isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(redirectTo);
    }
  }, [isLoggedIn, navigate, redirectTo]);

  return !isLoggedIn ? <Route element={component} /> : null;
};

export default RestrictedRoute;

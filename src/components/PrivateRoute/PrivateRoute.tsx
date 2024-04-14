import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import React, { FC } from "react";

interface PrivateRouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component,
  redirectTo = "/welcome",
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const navigate = useNavigate();

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  // const shouldRedirect = !isLoggedIn && !isRefreshing;
  const shouldRedirect = !isLoggedIn;
  if (shouldRedirect) {
    navigate(redirectTo);
    return null; // Możesz zwrócić pusty komponent lub null, ponieważ przekierowanie już się dokonało
  } else {
    return component;
  }
};

export default PrivateRoute;

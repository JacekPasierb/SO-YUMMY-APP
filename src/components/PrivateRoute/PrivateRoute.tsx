import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { FC, ReactNode } from "react";

interface PrivateRouteProps {
  component: FC<any>;
  redirectTo?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  redirectTo = "/welcome",
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? (
    <Navigate to={redirectTo} />
  ) : (
    (Component as unknown as ReactNode)
  );
};

export default PrivateRoute;

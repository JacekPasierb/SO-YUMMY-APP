
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute =  ({ component, redirectTo = "/signin" }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  console.log("private zalogowany", shouldRedirect);
  console.log("component2", component);
  console.log("redirecty", redirectTo);
  return shouldRedirect ?  <Navigate to={redirectTo} /> : component ;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;

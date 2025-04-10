import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { PAGES } from "../config/Constant";

const PrivateRoute = () => {
  const { authTokens } = useContext(AuthContext);
  return authTokens ? <Outlet /> : <Navigate to={PAGES.LOGIN_PAGE} replace />;
};

export default PrivateRoute;

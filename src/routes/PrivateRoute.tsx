import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  const { authTokens } = useContext(AuthContext);
  return authTokens ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

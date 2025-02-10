import { useContext, ReactNode } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    throw new Error("PrivateRoute must be used within a SessionContextProvider");
  }

  const { isAuthenticated, isLoading, token } = sessionContext;

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

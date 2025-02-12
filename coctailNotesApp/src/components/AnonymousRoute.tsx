import { useContext, ReactNode } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";

interface AnonymousRouteProps {
  children: ReactNode;
}

const AnonymousRoute = ({ children }: AnonymousRouteProps) => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    throw new Error("AnonymousRoute must be used within a SessionContextProvider");
  }

  const { isAuthenticated, isLoading } = sessionContext;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isAuthenticated) {
    return <Navigate to="/cocktails" />;
  }

  return children;
};

export default AnonymousRoute;

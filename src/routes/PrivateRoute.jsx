import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (user) {
    return children;
  }

  if (loading) {
    return (
        <div className="flex justify-center items-center lg:pt-40 pt-24">
            <progress className="progress w-56"></progress>
        </div>
    );
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;

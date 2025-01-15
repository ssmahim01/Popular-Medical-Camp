import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (user) return children;

  if (loading) return <Loading />

  return <Navigate state={{from: location}} replace to="/login" />;
};

export default PrivateRoute;

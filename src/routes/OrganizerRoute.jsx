import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useOrganizer from "../hooks/useOrganizer";
import Loading from "../components/Loading/Loading";

const OrganizerRoute = ({ children }) => {
  const { user, loading, logoutUser } = useAuth();
  const [organizer, isPending] = useOrganizer();

  const location = useLocation();

  if (loading || isPending) return <Loading />;

  if (user && organizer) return children;
  if (user && !organizer) return logoutUser();

  return <Navigate state={{ from: location }} to="/login" replace />;
};

export default OrganizerRoute;

import { Outlet } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";

const InitialLayout = () => {
  const { loading } = useAuth();
  if (loading) return <Loading />;

  return (
    <div>
      <Navbar />
      <div className="bg-slate-100 pt-16 min-h-[calc(100vh-256px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default InitialLayout;

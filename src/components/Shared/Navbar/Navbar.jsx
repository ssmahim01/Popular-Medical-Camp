import PopularMedicalLogo from "../../../assets/images/popular-medical-camp-logo.png";
import userImg from "../../../assets/images/non-logged-in-user.png";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="fixed z-10 border-b border-gray-300 lg:px-16 md:px-8 px-6 navbar bg-base-100">
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <img
            className="w-10 h-10 rounded-lg"
            src={PopularMedicalLogo}
            alt="Logo of Popular Medical"
          />
          <h3 className="text-2xl font-bold">Popular Medical</h3>
        </div>
      </div>
      <div className="flex-none">
        <div className="md:flex hidden gap-4 items-center text-gray-800 *:font-bold mr-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/available-camps">Available Camps</NavLink>
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full">
                <img
                  alt={user ? user?.displayName : "Guest user"}
                  src={user ? user?.photoURL : userImg}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 bg-opacity-80 rounded-lg z-[5] mt-3 w-60 py-3 shadow-md"
            >
                <div className="md:hidden *:font-bold flex flex-col gap-2 px-2">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/available-camps">Available Camps</NavLink>
                </div>

              <div className="px-2 *:font-bold flex flex-col gap-2">
                <h4 className="text-gray-700 font-semibold">{user?.displayName}</h4>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <button className="mt-2 text-white text-lg btn bg-rose-500 border-none flex gap-2 items-center rounded-md"><TbLogout2 className="text-lg font-bold" /> Logout</button>
              </div>
            </ul>
          </div>
        ) : (
          <button className="btn bg-teal-500 border-none rounded-md text-white text-base font-bold">
            Join Us
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

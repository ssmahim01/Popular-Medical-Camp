import PopularMedicalLogo from "../../../assets/images/popular-medical-camp-logo.png";
import userImg from "../../../assets/images/non-logged-in-user.png";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import "./Navbar.css";
import Swal from "sweetalert2";
import useOrganizer from "../../../hooks/useOrganizer";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [organizer] = useOrganizer();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout successful",
      showConfirmButton: false,
      timer: 3000,
    });

    navigate("/");
  };

  return (
    <div className="fixed z-10 border-b border-gray-300 lg:px-32 md:px-8 px-5 navbar bg-purple-200">
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <img
            className="w-10 h-10 rounded-lg"
            src={PopularMedicalLogo}
            alt="Logo of Popular Medical"
          />
          <h3 className="md:block hidden text-2xl font-extrabold">
            Popular Medical
          </h3>
        </div>
      </div>
      <div className="flex-none">
        <div className="flex md:text-base text-sm gap-4 items-center text-gray-800 *:font-bold mr-4">
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
              <div className="w-12 h-12 border-4 border-cyan-600 rounded-full hover:border-gray-300">
                <img
                  alt={user ? user?.displayName : "Guest user"}
                  src={user ? user?.photoURL : userImg}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 bg-opacity-80 rounded-lg z-[5] mt-3 w-60 py-3 shadow-md"
            >
              <div className="px-2 *:font-bold flex flex-col gap-2">
                <h4 className="text-gray-600 font-bold">{user?.displayName}</h4>
                <NavLink to="/generate-image">Generate Image</NavLink>

                <NavLink
                  to={`${
                    organizer
                      ? "/dashboard/organizer-profile"
                      : "/dashboard/analytics"
                  }`}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="mt-2 text-white text-lg btn bg-rose-500 border-none flex gap-2 items-center rounded-md"
                >
                  <TbLogout2 className="text-xl font-bold" /> Logout
                </button>
              </div>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn bg-teal-500 border-none rounded-md text-white md:text-base font-bold">
              Join Us
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

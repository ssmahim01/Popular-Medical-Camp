import PopularMedicalLogo from "../../../assets/images/popular-medical-camp-logo.png";
import userImg from "../../../assets/images/non-logged-in-user.png";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import "./Navbar.css";
import Swal from "sweetalert2";
import useOrganizer from "../../../hooks/useOrganizer";
import { useEffect, useRef, useState } from "react";
import { MdMailOutline } from "react-icons/md";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [organizer] = useOrganizer();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
    <div className="fixed z-10 border-b border-neutral-200 lg:px-32 md:px-8 px-5 navbar bg-gradient-to-r from-purple-50 to-neutral-200">
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <img
            className="w-10 h-10 rounded-lg animate-pulse"
            src={PopularMedicalLogo}
            alt="Logo of Popular Medical"
            referrerPolicy="no-referrer"
          />
          <Link to="/" className="md:block hidden text-2xl font-extrabold">
            Popular Medical
          </Link>
        </div>
      </div>
      <div className="flex-none">
        <div className="hidden lg:flex md:text-base gap-4 items-center text-gray-800 *:font-bold mr-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/available-camps">Available Camps</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/feedbacks">Feedbacks</NavLink>
        </div>
        {user ? (
          <div className="dropdown dropdown-end avatar online">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 h-12 border-4 border-cyan-600 rounded-full hover:border-cyan-700">
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
                      ? "/dashboard/organizer-home"
                      : "/dashboard/participant-home"
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
            <button className="btn bg-cyan-600 border-none rounded-md text-white md:text-base font-bold">
              Join Us
            </button>
          </Link>
        )}
      </div>

      <div className="dropdown" ref={dropdownRef}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => setModalOpen(!modalOpen)}
          className="ml-3 btn btn-ghost text-neutral-800 border border-neutral-100 lg:hidden shadow-md"
        >
          {modalOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          )}
        </div>

        {modalOpen && (
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gradient-to-r from-purple-50 to-neutral-200 rounded-t-none rounded-b-lg z-[50] mt-2 md:w-96 w-80 p-4 right-2 border-none *:text-gray-700 *:font-bold"
          >
            <div
              className="tooltip tooltip-bottom"
              data-tip={`${user?.displayName}`}
            >
              {user && (
                <div className="mb-4 border-b border-neutral-300 py-3">
                  <img
                    className="block lg:hidden mb-2 md:w-20 md:h-20 w-14 h-14 rounded-full border-4 border-cyan-600 hover:border-cyan-700 shadow-lg"
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                    alt={user?.displayName}
                  />

                  <div className="flex gap-1 items-center">
                    <MdMailOutline className="text-2xl" />
                    <p className="mr-4 md:text-lg text-gray-600 font-semibold">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="w-1/2 flex flex-col gap-3">
              <NavLink to="/" onClick={() => setModalOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/available-camps"
                onClick={() => setModalOpen(false)}
              >
                Available Camps
              </NavLink>
              <NavLink to="/services" onClick={() => setModalOpen(false)}>
                Services
              </NavLink>
              <NavLink to="/feedbacks" onClick={() => setModalOpen(false)}>
                Feedbacks
              </NavLink>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;

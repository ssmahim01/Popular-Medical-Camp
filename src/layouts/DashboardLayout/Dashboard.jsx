import { FaEdit, FaHistory, FaHome, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/popular-medical-camp-logo.png";
import { IoIosAddCircle } from "react-icons/io";
import { MdAssignmentAdd, MdManageSearch, MdMenuBook } from "react-icons/md";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { IoAnalyticsSharp } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import "../../components/Shared/Navbar/Navbar.css";
import useOrganizer from "../../hooks/useOrganizer";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { TbLogout2 } from "react-icons/tb";
import { useState } from "react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [organizer] = useOrganizer();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex lg:flex-row flex-col">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 z-40 min-h-screen w-64 bg-purple-100 transition-transform shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-72 lg:min-h-screen`}
      >
        <div className="p-4 flex items-center border-b border-gray-300 shadow-sm pb-3">
          <img
            className="w-9 h-9 object-cover"
            src={logo}
            alt="Popular Medical Logo"
          />
          <Link to="/">
            <button className="btn btn-ghost px-1 rounded-md text-xl text-gray-800 font-extrabold">
              Popular Medical
            </button>
          </Link>
        </div>

        <ul className="menu *:font-bold flex flex-col space-y-7 mt-3 p-4">
          {organizer ? (
            <>
              <NavLink to="/dashboard/organizer-profile">
                <h3 className="flex gap-2 items-center">
                  <FaUserCircle className="text-lg" /> Organizer Profile
                </h3>
              </NavLink>
              <NavLink to="/dashboard/add-camp">
                <h3 className="flex gap-2 items-center">
                  <IoIosAddCircle className="text-lg" /> Add A Camp
                </h3>
              </NavLink>
              <NavLink to="/dashboard/manage-camps">
                <h3 className="flex gap-2 items-center">
                  <FaEdit className="text-lg" /> Manage Camps
                </h3>
              </NavLink>
              <NavLink to="/dashboard/manage-registered-camps">
                <h3 className="flex gap-2 items-center">
                  <MdManageSearch className="text-lg" /> Manage Registered Camps
                </h3>
              </NavLink>

              <div className="divider"></div>
            </>
          ) : (
            <>
              <NavLink to="/dashboard/participant-profile">
                <h3 className="flex gap-2 items-center">
                  <BsFillPersonFill className="text-lg" /> Participant Profile
                </h3>
              </NavLink>
              <NavLink to="/dashboard/analytics">
                <h3 className="flex gap-2 items-center">
                  <IoAnalyticsSharp className="text-lg" /> Analytics
                </h3>
              </NavLink>
              <NavLink to="/dashboard/registered-camps">
                <h3 className="flex gap-2 items-center">
                  <MdAssignmentAdd className="text-lg" /> Registered Camps
                </h3>
              </NavLink>
              <NavLink to="/dashboard/payment-history">
                <h3 className="flex gap-2 items-center">
                  <FaHistory className="text-lg" /> Payment History
                </h3>
              </NavLink>

              <div className="divider"></div>
            </>
          )}
          <NavLink to="/">
            <h3 className="flex gap-2 items-center">
              <FaHome className="text-lg" /> Home Page
            </h3>
          </NavLink>
          <NavLink to="/available-camps">
            <h3 className="flex gap-2 items-center">
              <MdMenuBook className="text-lg" /> Available Camps
            </h3>
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-white w-full btn bg-rose-500 border-none flex gap-2 items-center rounded-md"
          >
            <TbLogout2 className="text-xl font-bold" /> Logout
          </button>
        </ul>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 right-4 z-50 bg-violet-300 p-2 rounded-md shadow-lg"
      >
        <MdMenuBook className="text-2xl" />
      </button>

      {/* Content */}
      <div
        className={`${location.pathname !== "/dashboard/organizer-profile" && location.pathname !== "/dashboard/participant-profile" ? "md:p-6 p-4" : ""} min-h-screen flex-1 bg-gray-100`}
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

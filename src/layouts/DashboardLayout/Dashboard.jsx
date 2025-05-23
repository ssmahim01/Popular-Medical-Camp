import { FaEdit, FaHistory, FaHome, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/popular-medical-camp-logo.png";
import { IoIosAddCircle } from "react-icons/io";
import {
  MdAssignmentAdd,
  MdFeedback,
  MdManageSearch,
  MdMedicalServices,
  MdMenuBook,
} from "react-icons/md";
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
import { FaHouseMedical } from "react-icons/fa6";
import { RiAiGenerate } from "react-icons/ri";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [organizer] = useOrganizer();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

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
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-neutral-50">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 z-40 w-[310px] bg-gradient-to-r from-purple-100 to-neutral-100 shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 h-screen overflow-y-auto`}
      >
        <Link to="/">
          <div className="p-4 flex items-center border-b border-neutral-200 bg-purple-100 shadow-sm sticky top-0 z-40">
            <img
              className="w-9 h-9 object-cover"
              src={logo}
              alt="Popular Medical Logo"
            />
            <span className="ml-2 text-xl font-extrabold text-gray-800">
              Popular Medical
            </span>
          </div>
        </Link>

        <ul className="menu flex flex-col font-semibold space-y-4 mt-4 px-4">
          {organizer ? (
            <>
              <NavLink
                to="/dashboard/organizer-home"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <FaHouseMedical className="text-lg" /> Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/organizer-profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <FaUserCircle className="text-lg" /> Organizer Profile
              </NavLink>
              <NavLink
                to="/dashboard/add-camp"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <IoIosAddCircle className="text-lg" /> Add A Camp
              </NavLink>
              <NavLink
                to="/dashboard/manage-camps"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <FaEdit className="text-lg" /> Manage Camps
              </NavLink>
              <NavLink
                to="/dashboard/manage-registered-camps"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <MdManageSearch className="text-lg" /> Manage Registered Camps
              </NavLink>
              <div className="divider my-2"></div>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard/participant-home"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <FaHouseMedical className="text-lg" /> Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/participant-profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <BsFillPersonFill className="text-lg" /> Participant Profile
              </NavLink>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <IoAnalyticsSharp className="text-lg" /> Analytics
              </NavLink>
              <NavLink
                to="/dashboard/registered-camps"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <MdAssignmentAdd className="text-lg" /> Registered Camps
              </NavLink>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg ${
                    isActive ? "text-purple-600" : "text-gray-700"
                  } hover:text-purple-600`
                }
              >
                <FaHistory className="text-lg" /> Payment History
              </NavLink>
              <div className="divider my-2"></div>
            </>
          )}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg ${
                isActive ? "text-purple-600" : "text-gray-700"
              } hover:text-purple-600`
            }
          >
            <FaHome className="text-lg" /> Home Page
          </NavLink>
          <NavLink
            to="/available-camps"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg ${
                isActive ? "text-purple-600" : "text-gray-700"
              } hover:text-purple-600`
            }
          >
            <MdMenuBook className="text-lg" /> Available Camps
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg ${
                isActive ? "text-purple-600" : "text-gray-700"
              } hover:text-purple-600`
            }
          >
            <MdMedicalServices className="text-lg" /> Services
          </NavLink>
          <NavLink
            to="/feedbacks"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg ${
                isActive ? "text-purple-600" : "text-gray-700"
              } hover:text-purple-600`
            }
          >
            <MdFeedback className="text-lg" /> Feedbacks
          </NavLink>
          <NavLink
            to="/generate-image"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg ${
                isActive ? "text-purple-600" : "text-gray-700"
              } hover:text-purple-600`
            }
          >
            <RiAiGenerate className="text-lg" /> Generate Image
          </NavLink>
        </ul>
          <div className="flex flex-col sticky border-t p-4 border-neutral-200 bg-purple-100 mt-4 bottom-0 z-40">
          <div className="flex gap-2 items-center">
            <div className="w-12 h-12">
              <img
                alt={user ? user?.displayName : "Guest user"}
                src={user?.photoURL}
                className="w-full h-full border-4 border-cyan-600 rounded-full hover:border-cyan-700 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col">
              <h4 className="text-gray-800 font-semibold text-base">
                {user?.displayName}
              </h4>
              <p className="text-gray-600 font-medium text-xs">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 w-full btn bg-rose-500 text-white border-none flex items-center gap-2 text-lg rounded-md hover:bg-rose-600 transition-colors"
          >
            <TbLogout2 className="text-xl" /> Logout
          </button>
          </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-2 right-4 z-50 bg-neutral-200 p-2 rounded-md shadow-lg hover:bg-neutral-300 transition-colors"
      >
        <MdMenuBook className="text-2xl" />
      </button>

      {/* Content */}
      <div
        className={`${
          location.pathname !== "/dashboard/organizer-profile" &&
          location.pathname !== "/dashboard/participant-profile" &&
          location.pathname !== "/dashboard/organizer-home" &&
          location.pathname !== "/dashboard/participant-home"
            ? "md:px-5 md:py-7 px-4 py-6"
            : ""
        } flex-1 h-screen w-full overflow-y-auto bg-gradient-to-l from-purple-50 to-neutral-100`}
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

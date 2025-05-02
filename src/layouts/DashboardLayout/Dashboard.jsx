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
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`lg:sticky top-0 z-40 w-64 lg:w-72 bg-purple-50 shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 h-screen overflow-y-auto`}
      >
        <Link to="/">
          <div className="p-4 flex items-center border-b border-gray-200 shadow-sm">
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

        <ul className="menu flex flex-col font-semibold space-y-4 mt-4 p-4">
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
          <button
            onClick={handleLogout}
            className="mt-4 w-full btn bg-rose-500 text-white border-none flex items-center gap-2 text-lg rounded-md hover:bg-rose-600 transition-colors"
          >
            <TbLogout2 className="text-xl" /> Logout
          </button>
        </ul>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 right-4 z-50 bg-violet-300 p-2 rounded-md shadow-lg hover:bg-violet-400 transition-colors"
      >
        <MdMenuBook className="text-2xl" />
      </button>

      {/* Content */}
      <div
        className={`${location.pathname !== "/dashboard/organizer-profile" && location.pathname !== "/dashboard/participant-profile" && location.pathname !== "/dashboard/organizer-home" && location.pathname !== "/dashboard/participant-home" ? "md:p-5 p-4" : ""} flex-1 h-screen w-full py-3 overflow-y-auto bg-gray-50`}
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

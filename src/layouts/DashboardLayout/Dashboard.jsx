import { FaEdit, FaHistory, FaHome, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/popular-medical-camp-logo.png";
import { IoIosAddCircle } from "react-icons/io";
import { MdAssignmentAdd, MdManageSearch, MdMenuBook } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { IoAnalyticsSharp } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import "../../components/Shared/Navbar/Navbar.css";

const Dashboard = () => {
  const organizer = true;
  return (
    <div className="flex md:flex-row flex-col">
      {/* Dashboard Side bar */}
      <div className="p-4 lg:w-72 md:w-64 md:min-h-screen bg-violet-300">
        <div className="lg:ml-5 flex lg:flex-row md:flex-col flex-row gap-2 items-center md:mb-6 mb-3">
          <img
            className="w-9 h-9 object-cover"
            src={logo}
            alt="Logo of Popular Medical"
          />
          <h2 className="text-xl text-gray-800 font-extrabold">
            Popular Medical
          </h2>
        </div>

        <ul className="menu *:font-bold md:flex-col flex-row gap-4 flex-wrap md:space-y-5">
          {organizer ? (
            <>
                <NavLink to="/dashboard/organizer-profile">
                  <h3 className="flex gap-2 items-center"><FaUserCircle className="text-lg" /> Organizer Profile</h3>
                </NavLink>

                <NavLink to="/dashboard/add-camp">
                  <h3 className="flex gap-2 items-center"><IoIosAddCircle className="text-lg" /> Add A Camp</h3>
                </NavLink>

                <NavLink to="/dashboard/manage-camps">
                  <h3 className="flex gap-2 items-center"><FaEdit className="text-lg" /> Manage Camps</h3>
                </NavLink>

                <NavLink to="/dashboard/manage-registered-camps">
                  <h3 className="flex gap-2 items-center"><MdManageSearch className="text-lg" /> Manage Registered Camps</h3>
                </NavLink>

              <div className="md:divider hidden"></div>
            </>
          ) : (
            <>
                <NavLink to="/dashboard/analytics">
                  <h3 className="flex gap-2 items-center"><IoAnalyticsSharp className="text-lg" /> Analytics</h3>
                </NavLink>

                <NavLink to="/dashboard/participant-profile">
                  <h3 className="flex gap-2 items-center"><BsFillPersonFill className="text-lg" /> Participant Profile</h3>
                </NavLink>

                <NavLink to="/dashboard/registered-camps">
                  <h3 className="flex gap-2 items-center"><MdAssignmentAdd className="text-lg" /> Registered Camps</h3>
                </NavLink>

                <NavLink to="/dashboard/payment-history">
                  <h3 className="flex gap-2 items-center"><FaHistory className="text-lg" /> Payment History</h3>
                </NavLink>
              <div className="md:divider hidden"></div>
            </>
          )}

            <NavLink to="/">
              <h3 className="flex gap-2 items-center"><FaHome className="text-lg" />
              Home Page</h3>
            </NavLink>

            <NavLink to="/available-camps">
              <h3 className="flex gap-2 items-center"><MdMenuBook className="text-lg" />
              Available Camps</h3>
            </NavLink>
        </ul>
      </div>

      {/* Dashboard Pages */}
      <div className="p-8 flex-1 bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

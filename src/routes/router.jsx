import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import InitialLayout from "../layouts/InitialLayout/InitialLayout";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import Login from "../pages/AuthenticationForms/Login";
import Register from "../pages/AuthenticationForms/Register";
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import OrganizerProfile from "../pages/DashboardPages/OrganizerProfile";
import AddCamp from "../pages/DashboardPages/AddCamp";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <InitialLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/available-camps",
                element: <AvailableCamps />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "/dashboard/organizer-profile",
                element: <OrganizerProfile />
            },
            {
                path: "/dashboard/add-camp",
                element: <AddCamp />
            }
        ]
    }
]);

export default router;
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
import Error from "../ErrorPage/Error";
import CampDetails from "../pages/CampDetails/CampDetails";
import ManageCamps from "../pages/DashboardPages/ManageCamps";
import UpdateCamp from "../pages/DashboardPages/UpdateCamp";
import Analytics from "../pages/DashboardPages/Participant/Analytics";
import ParticipantProfile from "../pages/DashboardPages/Participant/ParticipantProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <InitialLayout />,
        errorElement: <Error />,
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
                path: "/camp-details/:campId",
                element: <CampDetails />
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
        errorElement: <Error />,
        children: [
            {
                path: "/dashboard/organizer-profile",
                element: <OrganizerProfile />
            },
            {
                path: "/dashboard/add-camp",
                element: <AddCamp />
            },
            {
                path: "/dashboard/manage-camps",
                element: <ManageCamps />
            },
            {
                path: "/dashboard/update-camp/:campId",
                element: <UpdateCamp />
            },

            // Participant routes
            {
                path: "/dashboard/analytics",
                element: <Analytics />
            },
            {
                path: "/dashboard/participant-profile",
                element: <ParticipantProfile />
            }
        ]
    }
]);

export default router;
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
import OrganizerRoute from "./OrganizerRoute";
import RegisteredCamps from "../pages/DashboardPages/Participant/RegisteredCamps";
import Payment from "../pages/DashboardPages/Participant/Payment";
import PaymentHistory from "../pages/DashboardPages/Participant/PaymentHistory";

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
                element: <OrganizerRoute><OrganizerProfile /></OrganizerRoute>
            },
            {
                path: "/dashboard/add-camp",
                element: <OrganizerRoute><AddCamp /></OrganizerRoute>
            },
            {
                path: "/dashboard/manage-camps",
                element: <OrganizerRoute><ManageCamps /></OrganizerRoute>
            },
            {
                path: "/dashboard/update-camp/:campId",
                element: <OrganizerRoute><UpdateCamp /></OrganizerRoute>
            },

            // Participant routes
            {
                path: "/dashboard/analytics",
                element: <Analytics />
            },
            {
                path: "/dashboard/participant-profile",
                element: <ParticipantProfile />
            },
            {
                path: "/dashboard/registered-camps",
                element: <RegisteredCamps />
            },
            {
                path: "/dashboard/payment-page/:campId",
                element: <Payment />
            },
            {
                path: "/dashboard/payment-history",
                element: <PaymentHistory />
            }
        ]
    }
]);

export default router;
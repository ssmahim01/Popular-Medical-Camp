import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import InitialLayout from "../layouts/InitialLayout/InitialLayout";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import Login from "../pages/AuthenticationForms/Login";
import Register from "../pages/AuthenticationForms/Register";
import Dashboard from "../layouts/DashboardLayout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Error from "../ErrorPage/Error";
import CampDetails from "../pages/CampDetails/CampDetails";
import Analytics from "../pages/DashboardPages/Participant/Analytics";
import ParticipantProfile from "../pages/DashboardPages/Participant/ParticipantProfile";
import OrganizerRoute from "./OrganizerRoute";
import RegisteredCamps from "../pages/DashboardPages/Participant/RegisteredCamps";
import Payment from "../pages/DashboardPages/Participant/Payment";
import PaymentHistory from "../pages/DashboardPages/Participant/PaymentHistory";
import UpdateCamp from "../pages/DashboardPages/Organizer/UpdateCamp";
import ManageCamps from "../pages/DashboardPages/Organizer/ManageCamps";
import OrganizerProfile from "../pages/DashboardPages/Organizer/OrganizerProfile";
import AddCamp from "../pages/DashboardPages/Organizer/AddCamp";
import ManageRegisteredCamps from "../pages/DashboardPages/Organizer/ManageRegisteredCamps";
import GenerateImage from "../pages/GenerateImage/GenerateImage";
import OrganizerHome from "../pages/DashboardPages/Organizer/OrganizerHome";
import ParticipantHome from "../pages/DashboardPages/Participant/ParticipantHome";

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
                path: "/generate-image",
                element: <GenerateImage />
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
                path: "/dashboard/organizer-home",
                element: <OrganizerRoute><OrganizerHome /></OrganizerRoute>
            },
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
            {
                path: "/dashboard/manage-registered-camps",
                element: <OrganizerRoute><ManageRegisteredCamps /></OrganizerRoute>
            },

            // Participant routes
            {
                path: "/dashboard/participant-home",
                element: <ParticipantHome />
            },
            {
                path: "/dashboard/participant-profile",
                element: <ParticipantProfile />
            },
            {
                path: "/dashboard/analytics",
                element: <Analytics />
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
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import InitialLayout from "../layouts/InitialLayout/InitialLayout";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import Login from "../pages/AuthenticationForms/Login";
import Register from "../pages/AuthenticationForms/Register";

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
    }
]);

export default router;
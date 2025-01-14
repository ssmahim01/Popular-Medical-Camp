import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
    const authData = useContext(AuthContext);
    return authData;
};

export default useAuth;
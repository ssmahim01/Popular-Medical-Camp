import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxiosPublic } from "../../../hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { logInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const userData = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          createdAt: new Date().toISOString(),
          role: "Participant",
        };

        // Store User Data in Database
        await axiosPublic.post("/users", userData);

          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user?.displayName} is successfully logged in by Google`,
            showConfirmButton: false,
            timer: 3000,
          });

        navigate(from, {replace: true});
      })
      .catch((error) => {
        const errorMessage = error.message;

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to Google Login!",
          text: `${errorMessage}`,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="w-[89%] mx-auto flex gap-2 items-center btn btn-outline border border-violet-300 rounded text-violet-600 hover:bg-violet-500 hover:border-none hover:text-white/90 font-bold"
      >
        <FcGoogle className="text-2xl" />{" "}
        <span className="text-lg">Login With Google</span>
      </button>
    </>
  );
};

export default GoogleLogin;

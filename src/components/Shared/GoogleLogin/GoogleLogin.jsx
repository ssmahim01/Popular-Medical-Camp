import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { logInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user?.displayName} is successfully logged in by Google`,
          showConfirmButton: false,
          timer: 3000,
        });

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;

        Swal.fire({
          position: "center",
          icon: "error",
          title: `${errorMessage}`,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <>
      <button onClick={handleGoogleLogin} className="w-[89%] mx-auto flex gap-2 items-center btn btn-outline border border-violet-300 rounded text-violet-600 hover:bg-violet-500 hover:border-none hover:text-white/90 font-bold">
        <FcGoogle className="text-2xl" />{" "}
        <span className="text-lg">Login With Google</span>
      </button>
    </>
  );
};

export default GoogleLogin;

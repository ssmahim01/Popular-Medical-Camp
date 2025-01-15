import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Shared/GoogleLogin/GoogleLogin";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const { logInWithEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Login User by Firebase
      await logInWithEmail(data.email, data.password).then((userData) => {
        const user = userData.user;
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user?.displayName || "User"} is successfully logged in`,
          showConfirmButton: false,
          timer: 3000,
        });

        navigate(from, { replace: true });
      });
    } catch (error) {
      const errorMessage = error.message;
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed!",
        text: errorMessage,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="md:w-4/5 w-11/12 mx-auto pt-5 pb-14">
      <h2 className="md:text-5xl text-4xl text-center font-extrabold mb-6">
        Login Form
      </h2>

      <div className="card bg-base-100 bg-opacity-70 lg:w-1/2 w-full mx-auto rounded-box shadow-md hover:shadow-lg">
        <div className="mt-7 mb-2">
          <GoogleLogin />
        </div>
        <div className="divider w-[89%] mx-auto text-gray-600 font-medium">
          Or Login With Email
        </div>

        <form className="card-body py-0" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="email"
              placeholder="Provide your email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />

            {errors.email && (
              <p className="text-rose-500 font-semibold mt-3">
                Email is required
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type your password"
              className="input input-bordered w-full"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 10,
              })}
            />
            {errors.password && (
              <p className="text-rose-500 font-semibold mt-3">
                Password is required
              </p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-rose-500 font-semibold mt-3">
                Password length must be at least 6 character
              </p>
            )}

            {errors.password?.type === "maxLength" && (
              <p className="text-rose-500 font-semibold mt-3">
                Limit of length is 10
              </p>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-teal-600 border-none text-white/90 text-lg rounded-md font-bold">
              Login
            </button>
          </div>
        </form>

        <p className="text-center my-5 text-gray-700 font-bold px-4">
          New User? Please{" "}
          <Link to="/register" className="text-emerald-500 font-extrabold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

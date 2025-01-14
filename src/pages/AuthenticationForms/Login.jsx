import { Link } from "react-router-dom";
import GoogleLogin from "../../components/Shared/GoogleLogin/GoogleLogin";

const Login = () => {
  return (
    <div className="md:w-4/5 w-11/12 mx-auto pt-5 pb-14">
        <h2 className="md:text-5xl text-4xl text-center font-extrabold mb-6">Join Us</h2>

      <div className="card bg-base-100 bg-opacity-70 lg:w-1/2 w-full mx-auto rounded-box shadow-md hover:shadow-lg">
        <div className="mt-7 mb-2">
        <GoogleLogin />
        </div>
        <div className="divider w-[89%] mx-auto text-gray-600 font-medium">Or Login With Email</div>

        <form className="card-body py-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="email"
              
              placeholder="Provide your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type your password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-teal-600 border-none text-white/90 text-lg rounded-md font-bold">Login</button>
          </div>
        </form>

        <p className="text-center my-5 text-gray-700 font-bold px-4">New User? Please <Link to="/register" className="text-emerald-500 font-extrabold">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;

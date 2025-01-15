import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Shared/GoogleLogin/GoogleLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserInfo } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const imageHostingKey = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_API_KEY
  }`;

  const onSubmit = async (data) => {
    try {
      // Upload Image to imgBB
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const imgResponse = await axiosPublic.post(imageHostingKey, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (imgResponse.data.success) {
        const imageURL = imgResponse.data.data.display_url;

        // Create User in Firebase
        await createUser(data.email, data.password);

        // Update User Info in Firebase
        await updateUserInfo(data.name, imageURL);

        // Prepare User Data for Database
        const userData = {
          name: data.name,
          email: data.email,
          image: imageURL,
          createdAt: new Date().toISOString(),
          role: "Participant"
        };

        // Store User Data in Database
        const dbResponse = await axiosPublic.post("/users", userData);

        if (dbResponse.data.insertedId) {
          reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${data.name} is successfully registered`,
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/");
        }
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message || "Something went wrong",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="md:w-4/5 w-11/12 mx-auto pt-5 pb-14">
      <h2 className="md:text-5xl text-4xl text-center font-extrabold mb-6">
        Register Form
      </h2>

      <div className="card bg-base-100 bg-opacity-70 lg:w-1/2 w-full mx-auto rounded-box shadow-md hover:shadow-lg">
        <form className="card-body pt-5 pb-0" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Write your name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />

            {errors.name && (
              <p className="text-rose-500 font-semibold mt-3">
                Name is required
              </p>
            )}
          </div>

          <div className="form-control w-full mt-3 mb-1">
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered file-input-accent text-gray-700 font-semibold h-10 md:w-1/2 w-full"
            />

            {errors.image && (
              <p className="text-rose-500 font-semibold mt-2">
                Please provide an image
              </p>
            )}
          </div>

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
                pattern: /(?=.*[A-Z])(?=.*[!@#$*])(?=.*[0-9])(?=.*[a-z])/,
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
            {errors.password?.type === "pattern" && (
              <p className="text-rose-500 font-semibold mt-3">
                Password must have one uppercase, one lowercase, one number and
                one special character
              </p>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-emerald-500 border-none text-white/90 text-lg rounded-md font-bold">
              Register
            </button>
          </div>
        </form>

        <p className="text-center mt-5 text-gray-700 font-bold px-4">
          Already Have An Account? Go To{" "}
          <Link to="/login" className="text-teal-600 font-extrabold">
            Login
          </Link>
        </p>

        <div className="divider py-3 w-[89%] mx-auto text-gray-600 font-medium">
          Or Login With Google
        </div>
        <div className="mt-2 mb-7">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;

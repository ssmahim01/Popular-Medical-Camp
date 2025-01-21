import { useForm } from "react-hook-form";
import Heading from "../../../components/Heading/Heading";
import Swal from "sweetalert2";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAxiosPublic } from "../../../hooks/useAxiosPublic";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const AddCamp = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const imageHostingAPI = import.meta.env.VITE_IMGBB_API_KEY;
  const imageHostingKey = `https://api.imgbb.com/1/upload?key=${imageHostingAPI}`;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      // Upload Image to imgBB
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const imgResponse = await axiosPublic.post(imageHostingKey, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (imgResponse.data.success) {
        const imageURL = imgResponse.data.data.display_url;

        // Prepare Camp Data For The Database
        const campData = {
          ...data,
          dateTime: new Date(data.dateTime).toISOString(),
          image: imageURL,
          participantCount: 0,
        };
        // console.log(campData);

        // Store Camp Data In The Database
        const dbResponse = await axiosSecure.post("/camps", campData);

        if (dbResponse.data.insertedId) {
          reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${data.campName} is added successfully`,
            showConfirmButton: false,
            timer: 3000,
          });
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
    <>
      <div className="lg:w-11/12 w-full mx-auto lg:my-8 my-6">
        <Heading title={"Add A Camp"} />

        {/* Form start */}
        <div className="bg-base-100 bg-opacity-50 p-8 rounded-box shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Camp Name */}
            <div className="form-control">
              <label className="label-text font-bold">Camp Name</label>
              <input
                type="text"
                {...register("campName", { required: "Camp Name is required" })}
                className="input input-bordered w-full"
              />
              {errors.campName && (
                <p className="text-rose-500 font-semibold mt-2">
                  {errors.campName.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="form-control w-full pb-1">
              <label className="label-text font-bold">Select Image</label>
              <input
                type="file"
                {...register("image", { required: "Please provide an image" })}
                className="file-input file-input-bordered file-input-accent text-gray-700 font-semibold h-10 lg:w-1/3 md:w-3/4 w-full"
              />

              {errors.image && (
                <p className="text-rose-500 font-semibold mt-2">
                  {errors.image.message}
                </p>
              )}
            </div>

            <div className="lg:flex gap-4 lg:items-center space-y-4 lg:space-y-0 *:w-full">
              {/* Camp Fees */}
              <div className="form-control">
                <label className="label-text font-bold">Camp Fees</label>
                <input
                  type="number"
                  {...register("fees", {
                    required: "Camp Fees are required",
                    min: { value: 0, message: "Fees cannot be negative" },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.fees && (
                  <p className="text-rose-500 font-semibold mt-2">
                    {errors.fees.message}
                  </p>
                )}
              </div>

              {/* Date & Time */}
              <div className="form-control">
                <label className="label-text font-bold">Date & Time</label>
                <input
                  type="datetime-local"
                  {...register("dateTime", {
                    required: "Date & Time are required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.dateTime && (
                  <p className="text-rose-500 font-semibold mt-2">
                    {errors.dateTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:flex gap-4 space-y-4 lg:space-y-0 lg:items-center *:w-full">
              {/* Location */}
              <div className="form-control">
                <label className="label-text font-bold">Location</label>
                <input
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.location && (
                  <p className="text-rose-500 font-semibold mt-2">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Healthcare Professional Name */}
              <div className="form-control">
                <label className="label-text font-bold">
                  Healthcare Professional Name
                </label>
                <input
                  type="text"
                  {...register("professionalName", {
                    required: "Healthcare Professional Name is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.professionalName && (
                  <p className="text-rose-500 font-semibold mt-2">
                    {errors.professionalName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Participant Count */}
            <div className="form-control">
              <label className="label-text font-bold">Participant Count</label>

              <input
                type="number"
                className="input input-bordered lg:w-1/3 md:w-1/2 w-full"
                defaultValue={0}
                readOnly
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label-text font-bold">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="textarea textarea-bordered w-full"
                rows="4"
              ></textarea>
              {errors.description && (
                <p className="text-rose-500 font-semibold mt-2">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 lg:w-1/4 md:w-1/2 w-3/4 md:mx-0 mx-auto form-control text-center">
              <button
                type="submit"
                className="flex gap-2 items-center btn bg-teal-600 text-white font-bold border-none rounded"
              >
                <IoIosAddCircleOutline className="text-2xl" />{" "}
                <span className="text-lg">Add Camp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCamp;

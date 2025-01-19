import { useNavigate, useParams } from "react-router-dom";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";
import Heading from "../../components/Heading/Heading";
import { FaEdit } from "react-icons/fa";

const UpdateCamp = () => {
  const { campId } = useParams();
  // console.log(campId);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: camp = {}, isLoading, refetch } = useQuery({
      queryKey: ["camp", campId],
      queryFn: async () => {
          const response = await axiosPublic.get(`/camp/${campId}`);
      return response.data;
    },
  });
  
  const imageHostingAPI = import.meta.env.VITE_IMGBB_API_KEY;
  const imageHostingKey = `https://api.imgbb.com/1/upload?key=${imageHostingAPI}`;
  
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

        // Prepare Camp updated Data For The Database
        const updateData = {
            ...data,
            image: imageURL,
        };

        // Put Camp Data In The Database
        const dbResponse = await axiosSecure.put(
          `/update-camp/${campId}`,
          updateData
        );

        if (dbResponse.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${data.campName} is updated successfully`,
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/dashboard/manage-camps");
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

  if (isLoading) return <Loading />;
return (
    <>
      <div>
        <Heading title={"Update Camp"} />

        {/* Form start */}
        <div className="lg:w-11/12 w-full mx-auto lg:my-8 my-6 bg-base-100 bg-opacity-60 p-8 rounded-box shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Camp Name */}
            <div className="form-control">
              <label className="label-text font-bold">Camp Name</label>
              <input
                type="text"
                defaultValue={camp?.campName}
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
              <div className="space-y-2">
              {camp?.image && (
                <div className="mt-3">
                  <img
                    src={camp?.image}
                    alt="Camp Image"
                    className="w-28 h-28 object-cover rounded-md border border-gray-200"
                  />
                </div>
              )}
              
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
              </div>

            <div className="lg:flex gap-4 lg:items-center space-y-4 lg:space-y-0 *:w-full">
              {/* Camp Fees */}
              <div className="form-control">
                <label className="label-text font-bold">Camp Fees</label>
                <input
                  type="number"
                  defaultValue={camp?.fees}
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
                  defaultValue={
                    camp?.dateTime
                      ? new Date(camp?.dateTime)
                      : ""
                  }
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
                  defaultValue={camp?.location}
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
                  defaultValue={camp?.professionalName}
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
                defaultValue={camp?.description}
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

            {/* Update Button */}
            <div className="pt-4 lg:w-1/4 md:w-1/2 w-3/4 md:mx-0 mx-auto form-control text-center">
              <button
                type="submit"
                className="flex gap-2 items-center btn btn-neutral text-white font-bold border-none rounded"
              >
                <FaEdit className="text-2xl" />{" "}
                <span className="text-lg">Update Camp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCamp;

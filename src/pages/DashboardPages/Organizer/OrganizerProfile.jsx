import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import { useAxiosPublic } from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { MdCancel, MdUpdate } from "react-icons/md";
import { HiSaveAs } from "react-icons/hi";

const OrganizerProfile = () => {
  const { user, updateUserInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [update, setUpdate] = useState(false);
  const imageHostingKey = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_API_KEY
  }`;

  const {
    data: organizer = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["organizer", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/organizer/${user?.email}`);
      return res.data;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const contact = form.contact.value;
    const image = form.image.files[0];
    // console.log(name, image, contact);

    try {
      // Upload Image to imgBB
      const formData = new FormData();
      formData.append("image", image);
      const imgResponse = await axiosPublic.post(imageHostingKey, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (imgResponse.data.success) {
        const imageURL = imgResponse.data.data.display_url;

        // Update User Info in Firebase
        await updateUserInfo(name, imageURL);

        // Prepare User Data for Database Update
        const userData = {
          name,
          image: imageURL,
          contact,
        };

        // Update User Data in Database
        const res = await axiosSecure.patch(
          `/organizer/update-profile/${organizer._id}`,
          userData
        );

        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Updated profile of ${name}`,
            showConfirmButton: false,
            timer: 3000,
          });

          setUpdate(false);
        }
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error.message}` || "Something went wrong",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  if (isLoading) return <Loading />;
  //   console.log(organizer);

  return (
    <>
      <div className="bg-purple-600 lg:h-40 md:h-32 h-24 flex justify-center items-center">
        <h2 className="text-center lg:text-5xl text-white text-opacity-90 md:text-4xl text-2xl font-extrabold">
          {update ? "Update Information" : "Organizer Profile"}
        </h2>
      </div>

      <div className="lg:w-4/5 md:w-11/12 w-full md:my-10 my-8 mx-auto">
        {!update ? (
          <>
            <div className="md:rounded-xl border border-gray-200 bg-base-100 shadow-md">
              <div className="flex flex-col p-6 gap-4">
                <figure className="mx-auto">
                  <img
                    className="w-52 h-52 border-8 border-gray-300 rounded-full object-cover"
                    src={organizer?.image}
                    alt={organizer?.name}
                    referrerPolicy="no-referrer"
                  />
                </figure>

                <div className="mt-6 flex md:flex-row flex-col md:justify-between md:items-center">
                  <h4 className="text-gray-700 lg:text-lg font-bold">
                    <span className="text-gray-900 font-bold">Name: </span>
                    {organizer?.name}
                  </h4>

                  <p className="text-gray-700 lg:text-lg font-bold">
                    <span className="text-gray-800 font-bold">Email: </span>{" "}
                    {organizer?.email}
                  </p>
                </div>

                <div className="mt-2 md:flex justify-between md:items-center">
                  <h4 className="text-gray-700 lg:text-lg font-bold">
                    <span className="text-gray-800 font-bold">Contact: </span>{" "}
                    {organizer?.contact || "+8801818788816"}
                  </h4>

                  <h4 className="text-gray-700 lg:text-lg font-bold">
                    <span className="text-gray-800 font-bold">Role: </span>{" "}
                    {organizer?.role}
                  </h4>
                </div>

                <div className="flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-2">
                  <h4 className="text-gray-700 lg:text-lg font-bold">
                    <span className="text-gray-800 font-bold">
                      Creation Date:{" "}
                    </span>{" "}
                    {new Date(organizer?.createdAt).toLocaleDateString("en-UK")}
                  </h4>

                  <button
                    onClick={() => setUpdate(true)}
                    className="btn bg-cyan-600 border-none text-lg text-white font-bold rounded-md px-8 flex gap-2 items-center"
                  >
                    <MdUpdate className="text-2xl" />
                    <span>Update Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="md:card bg-base-100 bg-opacity-70 w-full md:rounded-xl shadow-md hover:shadow-lg border border-gray-200">
              <form className="card-body pt-5 pb-0" onSubmit={handleUpdate}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={organizer?.name}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Contact: </span>
                  </label>
                  <input
                    type="number"
                    name="contact"
                    defaultValue={organizer?.contact || "+8801818788816"}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control w-full mt-3 mb-1">
                  <input
                    type="file"
                    name="image"
                    className="file-input file-input-bordered file-input-info text-gray-700 font-semibold h-10 lg:w-1/2 w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={organizer?.email}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="my-6 flex gap-3 items-center">
                  <div className="form-control">
                    <button className="btn bg-purple-600 border-none text-white/90 text-lg rounded-md font-bold flex gap-1 items-center md:px-4">
                      <span>Save Changes</span>{" "}
                      <HiSaveAs className="md:text-xl text-lg" />
                    </button>
                  </div>

                  <div>
                    <button
                      className="btn bg-rose-500 text-lg text-white font-bold md:px-6 flex gap-1 items-center"
                      onClick={() => setUpdate(false)}
                    >
                      <MdCancel className="md:text-2xl text-xl" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrganizerProfile;

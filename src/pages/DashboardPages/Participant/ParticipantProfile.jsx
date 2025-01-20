import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import { useAxiosPublic } from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { MdBrowserUpdated } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const ParticipantProfile = () => {
  const { user, updateUserInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [update, setUpdate] = useState(false);
  const imageHostingKey = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_API_KEY
  }`;

  const {
    data: participant = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["participant", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/participant/${user?.email}`);
      return response.data;
    },
  });

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const contact = form.contact.value;
    const image = form.image.files[0];

    try {
      // Upload Image to imgBB
      const formData = new FormData();
      formData.append("image", image);
      const imgResponse = await axiosPublic.post(imageHostingKey, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

        const imageURL = imgResponse.data.data.display_url;

        // Update Participant Info in Firebase
        await updateUserInfo(name, imageURL);

        // Prepare Participant Data for Database Update
        const participantData = {
          name,
          image: imageURL,
          contact,
        };

        // Update Participant Data in Database
        const res = await axiosSecure.patch(
          `/participant/update-profile/${participant._id}`,
          participantData
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
    <div className="lg:w-3/5 md:w-11/12 w-full md:my-12 my-10 mx-auto">
      {!update ? (
        <>
          <h2 className="text-center md:text-4xl text-2xl font-extrabold mb-6">
            Participant Profile
          </h2>
          <div className="rounded-box border border-gray-200 bg-base-100 shadow-md">
            <div className="flex flex-col p-6 gap-4">
              <figure className="mx-auto">
                <img
                  className="w-48 h-48 border-4 border-neutral-300 rounded-full object-cover"
                  src={participant?.image}
                  alt={participant?.name}
                  referrerPolicy="no-referrer"
                />
              </figure>

              <div className="mt-6 flex lg:flex-row flex-col lg:justify-between lg:items-center">
                <h4 className="text-gray-700 lg:text-lg font-bold">
                  <span className="text-gray-900 font-bold">Name: </span>
                  {participant?.name}
                </h4>

                <p className="text-gray-700 lg:text-lg font-bold">
                  <span className="text-gray-800 font-bold">Email: </span>{" "}
                  {participant?.email}
                </p>
              </div>

              <div className="mt-2 lg:flex justify-between lg:items-center">
                <h4 className="text-gray-700 lg:text-lg font-bold">
                  <span className="text-gray-800 font-bold">
                    Creation Date:{" "}
                  </span>{" "}
                  {new Date(participant?.createdAt).toLocaleDateString()}
                </h4>

                <h4 className="text-gray-700 lg:text-lg font-bold">
                  <span className="text-gray-800 font-bold">Contact: </span>{" "}
                  {participant?.contact || "01572888187"}
                </h4>
              </div>

              <div className="mt-3 lg:mx-auto md:mx-0 mx-auto">
                <button
                  onClick={() => setUpdate(true)}
                  className="btn bg-indigo-600 border-none text-white font-bold rounded-full md:px-12 px-8 flex gap-2 items-center"
                >
                  <span className="text-lg">Update Profile</span> <MdBrowserUpdated className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center md:text-4xl text-2xl font-extrabold mb-6">
            Update Profile
          </h2>
          <div className="card bg-base-100 bg-opacity-70 lg:w-11/12 w-full mx-auto rounded-box shadow-md hover:shadow-lg border border-gray-200">
            <form className="card-body pt-5 pb-0" onSubmit={handleUpdateInfo}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={participant?.name}
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
                  defaultValue={participant?.contact || "01572888187"}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full mt-3 mb-1">
                <input
                  type="file"
                  name="image"
                  className="file-input file-input-bordered file-input-primary text-gray-700 font-semibold h-10 lg:w-1/2 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={participant?.email}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div className="my-6 flex gap-3 justify-center items-center">
                <div className="form-control">
                  <button className="btn bg-teal-600 border-none text-white/90 rounded-md font-bold px-5">
                    <span className="text-lg">Save Changes</span>
                  </button>
                </div>

                <div>
                  <button
                    className="btn bg-rose-500 text-white font-bold px-6"
                    onClick={() => setUpdate(false)}
                  >
                    <span className="text-lg">Cancel</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ParticipantProfile;

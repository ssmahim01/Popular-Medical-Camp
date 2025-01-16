import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

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
        title: error.message || "Something went wrong",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  if (isLoading) return <Loading />;
  //   console.log(organizer);

  return (
    <div className="lg:w-3/5 md:w-11/12 w-full md:my-12 my-10 mx-auto">
      {!update ? (
        <>
          <h2 className="text-center md:text-4xl text-2xl font-extrabold mb-6">
            Organizer Profile
          </h2>
          <div className="rounded-box border border-gray-200 bg-base-100 shadow-md">
            <div className="flex flex-col p-6 gap-4">
              <figure className="mx-auto">
                <img
                  className="w-48 h-48 border-4 border-neutral-300 rounded-full object-cover"
                  src={organizer?.image}
                  alt={organizer?.name}
                  referrerPolicy="no-referrer"
                />
              </figure>

              <div className="mt-6 flex lg:flex-row flex-col lg:justify-between lg:items-center">
                <h4 className="text-gray-700 lg:text-lg font-bold">
                  <span className="text-gray-900 font-bold">Name: </span>
                  {organizer?.name}
                </h4>

                <p className="text-gray-700 lg:text-lg font-bold">
                  <span className="text-gray-800 font-bold">Email: </span>{" "}
                  {organizer?.email}
                </p>
              </div>

              <div className="mt-2 lg:flex justify-between lg:items-center">
                <h4 className="text-gray-700 lg:text-lg font-bold">
                  <span className="text-gray-800 font-bold">
                    Creation Date:{" "}
                  </span>{" "}
                  {new Date(organizer?.createdAt).toLocaleDateString()}
                </h4>

                <h4 className="text-gray-700 lg:text-lg font-bold">
                  <span className="text-gray-800 font-bold">Contact: </span>{" "}
                  {organizer?.contact || "01818788816"}
                </h4>
              </div>

              <div className="mt-3 lg:mx-auto md:mx-0 mx-auto">
                <button
                  onClick={() => setUpdate(true)}
                  className="btn bg-emerald-500 border-none text-lg text-white font-bold rounded-full px-8"
                >
                  Update Profile
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
                  defaultValue={organizer?.contact || "01818788816"}
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
                  defaultValue={organizer?.email}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div className="my-6 flex gap-3 justify-center items-center">
                <div className="form-control">
                  <button className="btn bg-emerald-500 border-none text-white/90 text-lg rounded-md font-bold px-5">
                    Save Changes
                  </button>
                </div>

                <div>
                  <button
                    className="btn bg-rose-500 text-lg text-white font-bold px-6"
                    onClick={() => setUpdate(false)}
                  >
                    Cancel
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

export default OrganizerProfile;

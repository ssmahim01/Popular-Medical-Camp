import Heading from "../../components/Heading/Heading";
import Loading from "../../components/Loading/Loading";
import useCamps from "../../hooks/useCamps";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageCamps = () => {
  const [camps, refetch, isPending] = useCamps();
  const axiosSecure = useAxiosSecure();
  
  const handleDeleteCamp = (campId) => {
      Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/delete-camp/${campId}`);
        if (response.data.deletedCount > 0) {
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Camp has been deleted",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  if (isPending) return <Loading />;

  return (
    <div className="py-6">
      <Heading title={"Manage Camps"} />

      <div className="overflow-x-auto bg-base-100 bg-opacity-80 shadow-md md:rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-teal-600 *:text-white *:font-bold">
              <th>Serial.</th>
              <th>Name</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Healthcare Professional</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp?._id}>
                <th>{index + 1}</th>
                <td>
                  <span className="text-gray-700 font-semibold">
                    {camp?.campName}
                  </span>
                </td>

                <td>
                  <span className="text-gray-700 font-semibold">
                    {new Date(camp?.dateTime).toLocaleDateString("en-UK")}
                  </span>{" "}
                  -{" "}
                  <span className="text-gray-700 font-semibold">
                    {new Date(camp?.dateTime).toLocaleTimeString("en-UK")}
                  </span>
                </td>

                <td>
                  <span className="text-gray-700 font-semibold">
                    {camp?.location}
                  </span>
                </td>

                <td>
                  <span className="text-gray-700 font-semibold">
                    {camp?.professionalName}
                  </span>
                </td>

                <td className="flex gap-2 items-center">
                  <Link to={`/dashboard/update-camp/${camp?._id}`}>
                    <button className="py-2 px-6 bg-neutral border-none text-white font-bold flex gap-2 items-center rounded">
                      <span className="text-base">Update</span>{" "}
                      <MdEditSquare className="text-base" />
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDeleteCamp(camp?._id)}
                    className="flex gap-2 items-center py-2 px-6 bg-rose-500 border-none text-white font-bold rounded"
                  >
                    <span className="text-base">Delete</span>{" "}
                    <FaTrash className="text-base" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamps;

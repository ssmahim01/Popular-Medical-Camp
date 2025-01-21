import Heading from "../../../components/Heading/Heading";
import Loading from "../../../components/Loading/Loading";
import useCamps from "../../../hooks/useCamps";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../../components/Pagination/Pagination";

const ManageCamps = () => {
  const [camps, refetch, isPending, search, setSearch, currentPage, setCurrentPage, itemsPerPage] = useCamps();
  const axiosSecure = useAxiosSecure();
  const { data: count, isFetched } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const response = await axiosSecure.get("/camps-count");
      return response.data.count;
    },
    enabled: true,
  });

  const totalPages = count && count > 0 ? Math.ceil(count / itemsPerPage) : 1;
  const pages = isFetched ? [...Array(totalPages).keys()] : [];

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  
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

  if (isPending && !search && !isFetched) return <Loading />;

  return (
    <div className="py-6">
      <Heading title={"Manage Camps"} />
      <SearchBar placeholderText={"Search by Camp Name, date or Healthcare..."} onSearch={setSearch} />

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

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pages={pages}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
};

export default ManageCamps;

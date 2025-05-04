import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/Heading/Heading";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { TbCoinTakaFilled } from "react-icons/tb";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Pagination from "../../../components/Pagination/Pagination";

const ManageRegisteredCamps = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const axiosSecure = useAxiosSecure();
  const { data: count, isFetched } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const response = await axiosSecure.get("/participants-count");
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

  const {
    data: participantsData = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["participantsData", search, currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/participants?search=${search}&page=${currentPage}&size=${itemsPerPage}`
      );
      return response.data;
    },
    enabled: isFetched && totalPages > 0,
  });

  const handleConfirmStatus = async (participant) => {
    // console.log(participant);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Confirm this participant?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Not now",
        confirmButtonText: "Yes, confirm",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const participantId = participant?._id;
          const response = await axiosSecure.patch(
            `/confirmation-status/${participantId}`
          );

          if (response.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "Updated confirmation status",
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            });
          }
        }
      });
    } catch (error) {
      // console.log(error.message);
      Swal.fire({
        title: "Error!",
        text: "Failed to Update the status",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Okay",
      });
    }
  };

  const handleCancel = async (
    participantId,
    paymentStatus,
    confirmationStatus
  ) => {
    if (paymentStatus === "Paid" && confirmationStatus === "Confirmed") return;

    Swal.fire({
      title: "Are you sure?",
      text: "You will cancel the registration for this participant!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Not now",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.delete(
          `/cancel-registration/${participantId}`
        );
        if (response.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Cancelled!",
            text: "Participant registration has been cancelled",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleSearchOrPageChange = () => {
    refetch();
  };

  useEffect(() => {
    handleSearchOrPageChange();
  }, [search, currentPage]);

  if (isPending && !search && !isFetched) return <Loading />;

  return (
    <div className="py-6">
      <Heading title={"Manage Registered Camps"} />
      <SearchBar
        placeholderText={
          "Search by Participant Name, Camp Name, Fees or Statuses..."
        }
        onSearch={setSearch}
      />

      <div className="overflow-x-auto bg-base-100 bg-opacity-80 shadow-md md:rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-neutral *:text-sm *:text-white *:font-bold">
              <th>No.</th>
              <th>Participant Name</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {participantsData.map((participant, index) => (
              <tr key={participant?._id}>
                <th>{index + 1}</th>
                <td>
                  <span className="text-gray-700 font-semibold">
                    {participant?.participantName}
                  </span>
                </td>

                <td>
                  <span className="text-gray-700 font-semibold">
                    {participant?.campName}
                  </span>
                </td>

                <td className="text-gray-700 font-semibold">
                  <p className="flex gap-1 items-center">
                    <TbCoinTakaFilled className="text-lg" />
                    {participant?.campFees}
                  </p>
                </td>

                <td>
                  <p
                    className={`badge text-white font-semibold ${
                      participant?.paymentStatus === "Paid"
                        ? "badge-success"
                        : "bg-purple-600"
                    }`}
                  >
                    {participant?.paymentStatus === "Paid" ? "Paid" : "Unpaid"}
                  </p>
                </td>

                <td>
                  {participant?.confirmationStatus === "Confirmed" ? (
                    <p className="badge badge-success text-white font-bold">
                      Confirmed
                    </p>
                  ) : (
                    <button
                      onClick={() => handleConfirmStatus(participant)}
                      className="btn bg-amber-400 btn-sm text-white font-bold border-none rounded"
                    >
                      Pending
                    </button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleCancel(
                        participant?._id,
                        participant?.paymentStatus,
                        participant?.confirmationStatus
                      )
                    }
                    className={`btn btn-sm font-bold flex gap-x-2 items-center ${
                      participant?.paymentStatus === "Paid" &&
                      participant?.confirmationStatus === "Confirmed"
                        ? "btn-disabled text-gray-800"
                        : "bg-rose-500 border-none text-white"
                    }`}
                  >
                    <FaTrash className="lg:block hidden text-sm" />
                    <span className="text-sm">Cancel</span>
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
        count={participantsData.length}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
};

export default ManageRegisteredCamps;

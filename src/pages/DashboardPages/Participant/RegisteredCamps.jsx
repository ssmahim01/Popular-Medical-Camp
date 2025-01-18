import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/Heading/Heading";
import useAuth from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { TbCoinTakaFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import handleFeedbackModal from "../../../components/FeedbackModal/handleFeedbackModal";

const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: joinedCamps = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["joinedCamps", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/registered-camps/${user?.email}`
      );
      return response.data;
    },
  });

  const handleCancel = (camp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will cancel your registration for this camp!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.delete(
          `/cancel-registration/${camp?._id}`
        );
        if (response.data.deletedCount > 0) {
          refetch();

          Swal.fire({
            title: "Cancelled!",
            text: "Your registration has been cancelled",
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
      <Heading title={"Registered Camps"} />

      <div className="overflow-x-auto bg-base-100 bg-opacity-80 shadow-md md:rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-neutral *:text-white *:font-bold">
              <th>No.</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Participant Name</th>
              <th>Payment Status</th>
              <th>Confirmation</th>
              <th>Feedback</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {joinedCamps.map((camp, index) => (
              <tr key={camp?._id}>
                <th>{index + 1}</th>
                <td>
                  <span className="text-gray-700 font-semibold">
                    {camp?.campName}
                  </span>
                </td>

                <td className="text-gray-700 font-semibold">
                  <p className="flex gap-1 items-center">
                    <TbCoinTakaFilled className="text-lg" />
                    {camp?.campFees}
                  </p>
                </td>

                <td>
                  <span className="text-gray-700 font-semibold">
                    {camp?.participantName}
                  </span>
                </td>

                <td>
                  {camp?.paymentStatus === "Paid" ? (
                    <p className="badge badge-success text-white font-bold">
                      Paid
                    </p>
                  ) : (
                    <button
                      //   onClick={() => handlePayment(camp)}
                      className="btn btn-sm text-white bg-emerald-500 font-bold border-none rounded"
                    >
                      Pay
                    </button>
                  )}
                </td>

                <td>
                  {camp?.confirmationStatus === "Confirmed" ? (
                    <p className="badge badge-success text-white font-bold">
                      Confirmed
                    </p>
                  ) : (
                    <p className="badge badge-warning text-white font-bold">
                      Pending
                    </p>
                  )}
                </td>

                <td>
                  {camp?.paymentStatus === "Pending" &&
                  camp?.confirmationStatus === "Pending" ? (
                    <button
                      onClick={() => handleFeedbackModal(camp, axiosSecure)}
                      className="btn btn-sm bg-purple-600 border-none text-white font-bold"
                    >
                      Feedback
                    </button>
                  ) : (
                    <span className="text-gray-600 font-semibold">N/A</span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleCancel(camp)}
                    className={`btn btn-sm font-bold ${
                      camp?.paymentStatus === "Paid"
                        ? "btn-disabled text-gray-800"
                        : "bg-rose-500 border-none text-white"
                    }`}
                  >
                    Cancel
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

export default RegisteredCamps;

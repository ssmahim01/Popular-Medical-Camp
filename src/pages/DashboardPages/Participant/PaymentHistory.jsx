import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/Heading/Heading";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { TbCoinTakaFilled } from "react-icons/tb";
import { useState } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Pagination from "../../../components/Pagination/Pagination";

const PaymentHistory = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: count, isFetched } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const response = await axiosSecure.get("/history-count");
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

  const { user } = useAuth();
  const { data: paymentHistory = [], isPending } = useQuery({
    queryKey: ["paymentHistory", search, currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payment-history/${user?.email}?search=${search}&page=${currentPage}&size=${itemsPerPage}`);
      return response.data;
    },
  });

  if (isPending && !search && !isFetched) return <Loading />;

  return (
    <div className="py-6">
      <Heading title={"Payment History"} />
      <SearchBar placeholderText={"Search by Camp Name, Fees or Statuses..."} onSearch={setSearch} />

      <div className="overflow-x-auto bg-base-100 bg-opacity-80 shadow-md md:rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-cyan-600 *:text-sm *:text-white *:font-bold">
              <th>Serial.</th>
              <th>Transaction ID</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr key={payment?._id}>
                <th>{index + 1}</th>
                <td>
                  <span className="text-gray-700 font-semibold">
                    {payment?.transactionId}
                  </span>
                </td>

                <td>
                  <span className="text-gray-700 font-semibold">
                    {payment?.campName}
                  </span>
                </td>

                <td className="text-gray-700 font-semibold">
                  <p className="flex gap-1 items-center">
                    <TbCoinTakaFilled className="text-lg" />
                    {payment?.campFees}
                  </p>
                </td>

                <td>
                    <p className={`badge text-white font-semibold ${payment?.paymentStatus === "Paid" ? "badge-primary" : "badge-neutral"}`}>
                      {payment?.paymentStatus}
                    </p>
                </td>

                <td>
                    <p className={`badge text-white font-semibold ${payment?.confirmationStatus === "Confirmed" ? "badge-success" : "badge-warning"}`}>
                      {payment?.confirmationStatus}
                    </p>
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
        count={count}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
};

export default PaymentHistory;

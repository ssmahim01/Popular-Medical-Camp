import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";
import Heading from "../../components/Heading/Heading";
import { MdDateRange, MdLibraryAdd } from "react-icons/md";
import { IoLocation, IoTimer } from "react-icons/io5";
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import CampJoinForm from "../../components/CampJoinForm/CampJoinForm";

const CampDetails = () => {
  const { campId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [joinCamp, setJoinCamp] = useState({});

  const {
    data: camp = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["camp", campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camp/${campId}`);
      return res.data;
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  // console.log(camp);

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const participantData = {
        image: camp?.image,
        campName: camp?.campName,
        campFees: camp?.fees,
        location: camp?.location,
        healthCareProfessional: camp?.professionalName,
        participantName: user?.displayName,
        participantEmail: user?.email,
        ...data,
        paymentStatus: "Pending",
        confirmationStatus: "Pending",
      };
      // console.log(participantData);

      const response = await axiosSecure.post("/participants", participantData);
      if (response.data.insertedId) {
        await axiosSecure.patch(`/participant-count/${campId}`);
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user?.displayName} is joined to the camp`,
          showConfirmButton: false,
          timer: 3000,
        });
        reset();
        document.getElementById("join_camp_01").close();
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 3000,
      });
      document.getElementById("join_camp_01").close();
    }
  };

  const handleModalOpen = (camp) => {
    setJoinCamp(camp);

    document.getElementById("join_camp_01").showModal();
  };

  if (isPending) return <Loading />;

  return (
    <div className="pt-6 pb-12 lg:w-4/5 w-11/12 mx-auto">
      <Heading title={"Camp Details"} />

      <div className="flex lg:flex-row flex-col justify-between lg:gap-8 gap-4 items-center bg-base-100 shadow-md rounded-box p-4">
        <figure className="lg:w-1/2 w-full">
          <img
            src={camp?.image}
            alt={camp?.campName}
            className="rounded-lg w-full lg:h-96 md:h-72 object-cover"
          />
        </figure>

        <div className="lg:w-1/2 pb-2 space-y-2">
          <h3 className="lg:text-2xl text-gray-800 md:text-xl font-bold mb-2">
            <span className="text-gray-900 font-extrabold">Camp Name:</span>{" "}
            {camp?.campName}
          </h3>

          <p className="text-gray-700 font-semibold flex gap-2 items-center">
            <span className="text-gray-800 font-bold">Camp Fees: </span>
            <span className="flex gap-1 items-center">
              <TbCoinTakaFilled className="text-xl" /> {camp?.fees}
            </span>
          </p>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold flex gap-2 items-center">
              <span className="text-gray-900 font-bold">Date: </span>
              <span className="flex gap-1 items-center">
                <MdDateRange className="text-xl" />
                {new Date(camp?.dateTime).toLocaleDateString("en-UK")}
              </span>
            </p>
            <p className="text-gray-700 flex gap-2 items-center font-semibold">
              <span className="text-gray-900 font-bold">Time: </span>
              <span className="flex gap-1 items-center">
                <IoTimer className="text-xl" />
                {new Date(camp?.dateTime).toLocaleTimeString("en-US")}
              </span>
            </p>
          </div>

          <p className="text-gray-700 font-semibold flex gap-1 items-center">
            <span className="text-gray-900 font-bold">Location: </span>
            <span className="flex gap-1 items-center">
              <IoLocation className="text-xl" />
              {camp?.location}
            </span>
          </p>

          <p className="text-gray-700 font-semibold flex gap-2 items-center">
            <span className="text-gray-900 font-bold">
              Healthcare Professional:{" "}
            </span>
            <span className="flex gap-1 items-center">
              <FaUserDoctor className="text-base" />
              {camp?.professionalName}
            </span>
          </p>

          <p className="text-gray-700 font-semibold flex gap-2 items-center">
            <span className="text-gray-900 font-bold">Participant: </span>
            <span className="flex gap-1 items-center">
              {camp?.participantCount}
              <FaUsers className="text-base" />
            </span>
          </p>

          <p className="text-gray-700 font-medium">{camp?.description}</p>

          <div className="pt-4">
            <Link>
              <button
                onClick={() => handleModalOpen(camp)}
                disabled={!user}
                className="btn bg-indigo-500 border-none rounded text-white font-bold flex gap-2 items-center px-6"
              >
                <span className="text-lg">Join Camp</span>{" "}
                <MdLibraryAdd className="text-2xl" />
              </button>
            </Link>

            <p className={`mt-3 ${user ? "hidden" : "block"} text-teal-600 font-bold`}>Only logged in participants can join this camp</p>
          </div>
        </div>
      </div>

      <dialog id="join_camp_01" className="modal modal-middle">
        {joinCamp && (
          <div className="w-full flex justify-center items-center">
            <div className="modal-box">
              <h2 className="md:text-4xl text-3xl -mb-3 font-extrabold text-center">
                Join The Camp
              </h2>
              <div className="divider"></div>

              <CampJoinForm
                joinCamp={joinCamp}
                user={user}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                register={register}
                errors={errors}
              />
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default CampDetails;

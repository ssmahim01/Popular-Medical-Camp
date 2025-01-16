import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading/Loading";
import Heading from "../../components/Heading/Heading";
import { MdDateRange, MdGroupAdd, MdLibraryAdd } from "react-icons/md";
import { IoLocation, IoTimer } from "react-icons/io5";
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { GiCancel } from "react-icons/gi";
import Swal from "sweetalert2";

const CampDetails = () => {
  const { campId } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [joinCamp, setJoinCamp] = useState({});

  const {
    data: camp = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["camp", campId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/camp/${campId}`);
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
        campName: camp?.campName,
        campFees: camp?.fees,
        location: camp?.location,
        healthCareProfessional: camp?.professionalName,
        participantName: user?.displayName,
        participantEmail: user?.email,
        ...data,
      };
      // console.log(participantData);

      const response = await axiosPublic.post("/participants", participantData);
      if (response.data.insertedId) {
        await axiosPublic.patch(`/participant-count/${campId}`);
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
        title: `Failed to join the camp`,
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
            className="rounded-lg w-full lg:h-96 md:h-80 object-cover"
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
                className="btn bg-indigo-500 border-none rounded text-white font-bold flex gap-2 items-center px-6"
              >
                <span className="text-lg">Join Camp</span>{" "}
                <MdLibraryAdd className="text-2xl" />
              </button>
            </Link>
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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Camp Name */}
                <div className="form-control">
                  <label className="label-text font-bold">Camp Name</label>
                  <input
                    type="text"
                    value={joinCamp?.campName}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Camp Fees */}
                <div className="form-control">
                  <label className="label-text font-bold">Camp Fees</label>
                  <input
                    type="number"
                    value={joinCamp?.fees}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Location */}
                <div className="form-control">
                  <label className="label-text font-bold">Location</label>
                  <input
                    type="text"
                    value={joinCamp?.location}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Healthcare Professional Name */}
                <div className="form-control">
                  <label className="label-text font-bold">
                    Healthcare Professional Name
                  </label>
                  <input
                    type="text"
                    value={joinCamp?.professionalName}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Participant Name */}
                <div className="form-control">
                  <label className="label-text font-bold">
                    Participant Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Participant Email */}
                <div className="form-control">
                  <label className="label-text font-bold">
                    Participant Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Age */}
                <div className="form-control">
                  <label className="label-text font-bold">Age</label>
                  <input
                    type="number"
                    {...register("age", {
                      required: "Age is required",
                    })}
                    className="input input-bordered w-full"
                  ></input>
                  {errors.age && (
                    <p className="text-rose-500 font-semibold mt-2">
                      {errors.age.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="form-control">
                  <label className="label-text font-bold">Phone Number</label>
                  <input
                    type="number"
                    {...register("number", {
                      required: true,
                      maxLength: 11,
                    })}
                    className="input input-bordered w-full"
                  ></input>

                  {errors.number?.type === "required" && (
                    <p className="text-rose-500 font-semibold mt-2">
                      Phone number is required
                    </p>
                  )}

                  {errors.number?.type === "maxLength" && (
                    <p className="text-rose-500 font-semibold mt-2">
                      Phone number limit is 11 digit
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div className="form-control">
                  <select
                    className="select select-info w-full max-w-xs"
                    {...register("gender", { required: "Gender is required" })}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Other"}>Other</option>
                  </select>

                  {errors.gender && (
                    <p className="text-rose-500 font-semibold mt-2">
                      Please select a gender
                    </p>
                  )}
                </div>

                {/* Emergency Contact */}
                <div className="form-control">
                  <label className="label-text font-bold">
                    Emergency Contact
                  </label>
                  <input
                    type="number"
                    {...register("emergencyContact", {
                      required: true,
                      maxLength: 11,
                    })}
                    className="input input-bordered w-full"
                  ></input>

                  {errors.emergencyContact?.type === "required" && (
                    <p className="text-rose-500 font-semibold mt-2">
                      Emergency contact is required
                    </p>
                  )}

                  {errors.emergencyContact?.type === "maxLength" && (
                    <p className="text-rose-500 font-semibold mt-2">
                      Emergency contact limit is 11 digit
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="py-3 flex gap-4 justify-center items-center">
                  <button className="form-control flex gap-2 items-center md:px-14 px-6 btn bg-indigo-500 hover:bg-teal-600 rounded text-white font-bold">
                    <span className="text-lg">Join Now</span>{" "}
                    <MdGroupAdd className="text-xl" />
                  </button>

                  <button
                    onClick={() =>
                      document.getElementById("join_camp_01").close()
                    }
                    className="flex gap-2 items-center md:px-14 px-6 btn btn-error text-white font-bold rounded"
                  >
                    <span className="text-lg">Cancel</span>
                    <GiCancel className="text-xl" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default CampDetails;

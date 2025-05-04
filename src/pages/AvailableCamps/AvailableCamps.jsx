import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import { useState } from "react";
import { IoLocation, IoTimer } from "react-icons/io5";
import { MdDateRange, MdReadMore } from "react-icons/md";
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AvailableCamps = () => {
  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState("");
  const axiosPublic = useAxiosPublic();
  const [layout, setLayout] = useState("three-column");

  const { data: camps = [] } = useQuery({
    queryKey: ["camps", search, sorted],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/camps?search=${search}&sorted=${sorted}`
      );
      return res.data;
    },
  });

  return (
    <div className="pt-6 pb-12 lg:w-4/5 w-11/12 mx-auto">
      <Heading title={"Available Camps"} center />

      {/* Search Bar */}
      <div className="flex md:flex-row flex-col-reverse md:justify-between justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search camps by name..."
          className="input input-bordered lg:w-2/5 md:mt-0 mt-5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4 items-center justify-end">
          {/* Sort Dropdown */}
          <select
            className="select select-bordered *:font-bold *:w-full"
            value={sorted}
            onChange={(e) => setSorted(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="participantCount">Most Registered</option>
            <option value="fees">Camp Fees</option>
            <option value="campName">Alphabetical Order</option>
          </select>

          {/* Layout Toggle */}
          <button
            className="md:block hidden btn bg-violet-600 text-base font-bold text-white px-8"
            onClick={() =>
              setLayout((prev) =>
                prev === "three-column" ? "two-column" : "three-column"
              )
            }
          >
            {layout === "three-column" ? "Change Layout" : "Current Layout"}
          </button>
        </div>
      </div>

      {/* Camp Cards */}
      <div
        className={`grid gap-6 ${
          layout === "three-column"
            ? "lg:grid-cols-3"
            : "lg:grid-cols-2 md:grid-cols-1"
        } md:grid-cols-2 grid-cols-1 gap-7`}
      >
        {camps.map((camp) => (
          <div
            key={camp?._id}
            className="card bg-base-100 shadow-md rounded-lg"
          >
            <img
              src={camp?.image}
              alt={camp?.campName}
              className="rounded-t-lg w-full h-56 object-cover"
            />
            <div className="px-3 py-4 space-y-3">
              <h3 className="lg:text-xl text-gray-900 md:text-lg font-bold mb-2">
                {camp?.campName}
              </h3>
              <div className="flex justify-between items-center">
                <p className="text-gray-700 font-semibold flex gap-2 items-center">
                  <span>
                    <MdDateRange className="text-xl" />
                  </span>{" "}
                  {new Date(camp?.dateTime).toLocaleDateString("en-UK")}
                </p>
                <p className="text-gray-700 flex gap-2 items-center font-semibold">
                  <span>
                    <IoTimer className="text-xl" />
                  </span>{" "}
                  {new Date(camp?.dateTime).toLocaleTimeString("en-US")}
                </p>
              </div>

              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700 font-semibold flex gap-1 items-center">
                  <span>
                    <IoLocation className="text-xl" />
                  </span>{" "}
                  {camp?.location}
                </p>
                <p className="text-gray-700 font-semibold flex gap-2 items-center">
                  <span>
                    <FaUsers className="text-lg" />
                  </span>{" "}
                  {camp?.participantCount}
                </p>
              </div>

              <p className="text-gray-600 font-medium">
                {camp?.description.slice(0, 70)}...
              </p>

              <div className="flex justify-between items-center">
                <p className="text-gray-700 font-semibold flex gap-2 items-center">
                  <span>
                    <FaUserDoctor className="text-base" />
                  </span>{" "}
                  {camp?.professionalName}
                </p>

                <Link to={`/camp-details/${camp?._id}`}>
                  <button className="btn bg-cyan-600 border-none rounded text-white font-bold flex gap-2 items-center px-6">
                    <span className="text-lg">Details</span>{" "}
                    <MdReadMore className="text-2xl" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;

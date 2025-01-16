import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import useCamps from "../../hooks/useCamps";
import { IoLocation, IoTimer } from "react-icons/io5";
import { MdDateRange, MdReadMore } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";

const AvailableCamps = () => {
  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState("");
  const [layout, setLayout] = useState("three-column");
  const [camps, , isPending] = useCamps();
  console.log(camps);

  if (isPending) return <Loading />;

  return (
    <div className="pt-6 pb-12 w-11/12 mx-auto">
      <Heading title={"Available Camps"} />

      {/* Search Bar */}
      <div className="flex md:flex-row flex-col-reverse md:justify-between justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search camps by name..."
          className="input input-bordered lg:w-2/5 md:mt-0 mt-5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="justify-end space-x-4">
          {/* Sort Dropdown */}
          <select
            className="select select-bordered"
            value={sorted}
            onChange={(e) => setSorted(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="most-registered">Most Registered</option>
            <option value="fees">Camp Fees</option>
            <option value="alphabetical">Alphabetical Order</option>
          </select>

          {/* Layout Toggle */}
          <button
            className="btn bg-violet-600 text-white"
            onClick={() =>
              setLayout((prev) =>
                prev === "three-column" ? "two-column" : "three-column"
              )
            }
          >
            {layout === "three-column" ? "Two Column" : "Three Column"}
          </button>
        </div>
      </div>

      {/* Camp Cards */}
      <div
        className={`grid gap-6 ${
          layout === "three-column" ? "lg:grid-cols-3" : "lg:grid-cols-2"
        } md:grid-cols-2 grid-cols-1`}
      >
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="card bg-base-100 shadow-md rounded-lg"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="rounded-t-lg w-full h-52 object-cover"
            />
            <div className="px-3 py-4 space-y-3">
              <h3 className="lg:text-xl text-gray-900 md:text-lg font-bold mb-2">{camp.campName}</h3>
             <div className="flex justify-between items-center">
             <p className="text-gray-700 font-semibold flex gap-2 items-center">
                <span><MdDateRange className="text-xl" /></span> {new Date(camp.dateTime).toLocaleDateString("en-UK")}
              </p>
              <p className="text-gray-700 flex gap-2 items-center font-semibold">
                <span><IoTimer className="text-xl" /></span> {new Date(camp.dateTime).toLocaleTimeString("en-US")}
              </p>
             </div>

             <div className="flex justify-between items-center mb-2">
             <p className="text-gray-700 font-semibold flex gap-1 items-center">
                <span><IoLocation className="text-xl" /></span> {camp.location}
              </p>
              <p className="text-gray-700 font-semibold flex gap-1 items-center">
                <span className="text-gray-900 font-bold">Participant: </span> {camp.participantCount}
              </p>
             </div>

              <p className="text-gray-600 font-medium">{camp.description.slice(0, 80)}...</p>

             <div className="flex justify-between items-center">
             <p className="text-gray-700 font-semibold flex gap-2 items-center">
                <span><FaUserDoctor className="text-base" /></span>{" "}
                {camp.professionalName}
              </p>

              <Link to={`/camp/${camp._id}`}>
                <button className="btn bg-cyan-600 border-none rounded text-white font-bold flex gap-2 items-center px-6">
                  <span className="text-lg">Details</span> <MdReadMore className="text-2xl" />
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

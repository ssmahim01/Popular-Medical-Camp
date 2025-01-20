import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../Loading/Loading";
import Heading from "../Heading/Heading";
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import { IoLocation, IoTimer } from "react-icons/io5";
import { MdDateRange, MdReadMore } from "react-icons/md";
import { TbCoinTakaFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

const PopularCamps = () => {
  const axiosPublic = useAxiosPublic();

  const { data: popularCamps = [], isLoading } = useQuery({
    queryKey: ["popularCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/popular-camps");
      return res.data;
    },
  });

  // console.log(popularCamps);
  if (isLoading) return <Loading />;

  return (
    <div className="pt-6 pb-12">
      <div className="lg:w-4/5 w-11/12 mx-auto">
        <Heading title={"Popular Camps"} />

        {/* Popular Camp Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-11">
          {popularCamps.map((camp) => (
            <div
              key={camp?._id}
              className="card bg-base-100 shadow-md rounded-xl p-4 overflow-hidden transition-shadow hover:shadow-xl duration-200"
            >
              <img
                src={camp?.image}
                alt={camp?.campName}
                className="rounded-lg w-full h-52 object-cover"
              />
              <div className="pt-3 space-y-3">
                <h3 className="text-gray-900 text-xl font-bold">
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

                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-semibold flex gap-2 items-center">
                    <span>
                      <FaUserDoctor className="text-base" />
                    </span>{" "}
                    {camp?.professionalName}
                  </p>

                  <p className="text-gray-700 font-semibold flex gap-2 items-center">
                    <span className="text-gray-800 font-bold">Camp Fees: </span>
                    <span className="flex gap-1 items-center">
                      <TbCoinTakaFilled className="text-xl" /> {camp?.fees}
                    </span>
                  </p>
                </div>

                <Link to={`/camp-details/${camp?._id}`} className="block pt-2">
                  <button className="w-full btn bg-cyan-600 border-none rounded text-white font-bold flex gap-2 items-center px-6">
                    <span className="text-lg">Details</span>{" "}
                    <MdReadMore className="text-2xl" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* See All Camps Button */}
        <button className="block mx-auto btn rounded-none border-none bg-violet-600 text-white font-bold px-6">
          <Link to="/available-camps" className="flex gap-2 items-center">
            <span className="text-lg">See All Camps</span>{" "}
            <FaArrowAltCircleRight className="text-xl" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default PopularCamps;

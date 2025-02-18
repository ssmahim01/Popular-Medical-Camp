import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import Heading from "../Heading/Heading";
import { FaUserDoctor } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";

const AffordableCamps = () => {
  const axiosPublic = useAxiosPublic();
  const { data: affordableCamps = [] } = useQuery({
    queryKey: ["affordableCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/affordable-camps");
      return res.data;
    },
  });
  return (
    <div className="pb-14">
      <div className="lg:w-4/5 w-11/12 mx-auto">
        <Heading title={"Affordable Medical Camps"} />

        {/* Popular Camp Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {affordableCamps.map((camp) => (
            <div
              key={camp?._id}
              className="card bg-base-100 shadow-md rounded-xl overflow-hidden transition-shadow hover:shadow-xl duration-200"
            >
              <img
                src={camp?.image}
                alt={camp?.campName}
                className="rounded-t-lg w-full h-52 object-cover"
              />
              <div className="pt-3 space-y-2 p-4">
                <h3 className="text-gray-900 text-xl font-bold">
                  {camp?.campName}
                </h3>

                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-semibold flex gap-2 items-center">
                    <span>
                      <FaUserDoctor className="text-base" />
                    </span>{" "}
                    {camp?.professionalName}
                  </p>

                  <p className="text-gray-700 font-semibold">
                    <span className="flex gap-1 items-center">
                      <TbCoinTakaFilled className="text-xl" /> {camp?.fees}
                    </span>
                  </p>
                </div>

                <div>
                    <p className="text-gray-600 font-medium">{camp?.description.slice(0, 80)}...</p>
                </div>

                <Link to={`/camp-details/${camp?._id}`} className="block pt-2">
                  <button className="w-full btn bg-purple-600 border-none rounded text-white font-bold flex gap-2 items-center px-6">
                    <span className="text-lg">See More</span>{" "}
                    <MdReadMore className="text-2xl" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AffordableCamps;

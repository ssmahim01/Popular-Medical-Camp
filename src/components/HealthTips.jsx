import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Heading from "./Heading/Heading";
import { BiSolidCategory } from "react-icons/bi";
import { MdHealthAndSafety } from "react-icons/md";

const HealthTips = () => {
  const { data: healthTips = [] } = useQuery({
    queryKey: ["healthTips"],
    queryFn: async () => {
      const response = await axios.get("tips.json");
      return response.data;
    },
  });

  return (
    <section className="pb-14">
      <div className="lg:w-4/5 w-11/12 mx-auto">
        <Heading title={"Health Tips & Awareness"} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-base-100 rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-xl duration-200"
            >
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-52 object-cover border-b-8 border-cyan-600 rounded-t-md"
              />
              <div className="p-3">
              <h3 className="text-2xl font-bold text-gray-800">
                {tip.title}
              </h3>
              <div className="mt-2 flex justify-between flex-wrap items-center pr-2">
                <p className="flex gap-1 items-center font-semibold">
                  <BiSolidCategory className="text-xl" />{" "}
                  <span className="text-gray-600">{tip.category}</span>
                </p>
                <p className="flex gap-1 items-center font-semibold">
                  <MdHealthAndSafety className="text-xl" />
                  <span className="text-gray-600">{tip.importance_level} </span>
                </p>
              </div>
              <p className="text-gray-600 font-medium mt-2">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthTips;

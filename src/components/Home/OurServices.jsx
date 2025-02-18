import { useQuery } from "@tanstack/react-query";
import Heading from "../Heading/Heading";
import axios from "axios";

const OurServices = () => {
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axios.get("services.json");
      return response.data;
    },
  });

  return (
    <section className="pb-14">
      <div className="lg:w-4/5 w-11/12 mx-auto">
        <Heading title={"Our Medical Services"} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-base-100 rounded-xl shadow-md p-4 text-center hover:shadow-xl overflow-hidden transition-all duration-200"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="lg:text-xl text-lg font-bold text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 lg:text-base text-sm font-medium mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;

import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { MdDateRange, MdWork } from "react-icons/md";
import { FaPersonCircleCheck, FaUserDoctor } from "react-icons/fa6";
import Heading from "../Heading/Heading";

const Doctors = () => {
  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await axios.get("doctors.json");
      return response.data;
    },
  });

  return (
    <div className="pt-4 pb-12">
      <div className="lg:w-4/5 w-11/12 mx-auto">
        {/* {JSON.stringify(volunteers)} */}
        <Heading title={"Meet Our Doctors"} />

        {/* Swiper for only large devices */}
        <Swiper
          spaceBetween={30}
          freeMode={true}
          slidesPerView={2}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="w-full pb-10 lg:block hidden"
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor.id}>
              <div className="card bg-opacity-60 bg-base-100 shadow-md rounded-xl p-4 overflow-hidden transition-shadow hover:shadow-xl duration-200">
                <div className="flex flex-row-reverse justify-between items-center">
                  <img
                    className="w-20 object-cover h-20 rounded-md border-4 border-violet-500"
                    referrerPolicy="no-referrer"
                    src={doctor?.photo}
                    alt={doctor?.name}
                  />

                  <div className="flex flex-col gap-1">
                    <h4 className="text-2xl text-gray-800 flex gap-2 items-center font-semibold">
                      <FaUserDoctor className="text-xl" />{" "}
                      <span>{doctor?.name}</span>
                    </h4>
                    <p className="text-gray-600 flex gap-2 items-center font-semibold">
                      <MdWork className="text-xl" />{" "}
                      <span>{doctor?.role}</span>
                    </p>
                  </div>
                </div>
                <div className="pt-1 space-y-3">
                  <div className="flex flex-col gap-y-3">
                    <p className="text-gray-700 font-semibold flex gap-2 items-center">
                      <span className="text-gray-800 font-bold">
                        Experience:{" "}
                      </span>
                      <MdDateRange className="text-xl" />
                      <span>{doctor?.experience}</span>
                    </p>
                    <p className="text-gray-700 font-semibold flex gap-2 items-center">
                      <span className="text-gray-800 font-bold">
                        Specialty:
                      </span>{" "}
                      <FaPersonCircleCheck className="text-xl" />
                      <span>{doctor?.specialty}</span>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600 font-medium">
                      {doctor?.bio}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper for Medium and Small devices */}
        <Swiper
          spaceBetween={30}
          freeMode={true}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="w-full pb-10 lg:hidden block"
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor.id}>
              <div className="card bg-opacity-60 bg-base-100 shadow-md rounded-md p-4 overflow-hidden transition-shadow hover:shadow-xl duration-200">
                <div className="flex flex-row-reverse justify-between items-center">
                  <img
                    className="w-20 object-cover h-20 rounded-md border-4 border-violet-500"
                    referrerPolicy="no-referrer"
                    src={doctor?.photo}
                    alt={doctor?.name}
                  />

                  <div className="flex flex-col gap-1">
                    <h4 className="text-2xl text-gray-800 flex gap-2 items-center font-semibold">
                      <FaUserDoctor className="text-xl" />{" "}
                      <span>{doctor?.name}</span>
                    </h4>
                    <p className="text-gray-600 flex gap-2 items-center font-semibold">
                      <MdWork className="text-xl" />{" "}
                      <span>{doctor?.role}</span>
                    </p>
                  </div>
                </div>
                <div className="pt-1 space-y-3">
                  <div className="flex flex-col gap-y-3">
                    <p className="text-gray-700 font-semibold flex gap-2 items-center">
                      <span className="text-gray-800 font-bold">
                        Experience:{" "}
                      </span>
                      <MdDateRange className="text-xl" />
                      <span>{doctor?.experience}</span>
                    </p>
                    <p className="text-gray-700 font-semibold flex gap-2 items-center">
                      <span className="text-gray-800 font-bold">
                        Specialty:
                      </span>{" "}
                      <FaPersonCircleCheck className="text-xl" />
                      <span>{doctor?.specialty}</span>
                    </p>
                  </div>

                  <div>
                    <p className="md:block hidden text-gray-600 font-medium">
                      {doctor?.bio}
                    </p>
                    <p className="md:hidden block text-gray-600 font-medium">
                      {doctor?.bio.slice(0, 70)}...
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Doctors;

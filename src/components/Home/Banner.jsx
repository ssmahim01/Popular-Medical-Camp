// import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  // const [stories, setStories] = useState([]);

  // useEffect(() => {
  //   fetch("stories.json")
  //     .then((res) => res.json())
  //     .then((data) => setStories(data));
  // }, []);

  const {
    data: stories = [],
  } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get(`stories.json`);
      return res.data;
    },
  });

  return (
    <div className="pb-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{clickable: true}}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full lg:h-[500px] md:h-96 h-80"
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id}>
            <div className="relative w-full h-full">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-white/90 md:text-4xl text-2xl font-bold mb-4">
                  {story.title}
                </h3>
                <p className="text-white/90 font-medium md:text-lg w-4/5">
                  {story.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

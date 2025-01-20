import { Link } from "react-router-dom";
import Heading from "../Heading/Heading";
import MedicalCare from "../../assets/images/medical-care.jpg";
import { FaUserPlus } from "react-icons/fa6";

const OurImpact = () => {
  return (
    <div className="pb-14 lg:w-4/5 w-11/12 mx-auto">
        <Heading title={"Our Impacts"} />
      <div className="card border border-gray-200 flex lg:flex-row flex-col justify-between items-center md:gap-x-2 gap-6 shadow-lg">
        <figure className="lg:w-1/2 w-full lg:h-[22rem] md:h-72">
          <img
            className="w-full h-full"
            src={MedicalCare}
            alt="Image of Medical Care"
          />
        </figure>

        <div className="lg:w-1/2 lg:space-y-5 space-y-3 lg:pr-14 px-4 md:pb-0 pb-6">
          <h2 className="md:text-[34px] text-2xl text-gray-900 font-extrabold">
            Transforming Lives Through Medical Care
          </h2>

          <p className="text-gray-700 md:text-base text-sm font-medium">
            We should stay healthy for get ability to do something. Most peoples want to keep their self with healthy and fresh. I have organized few camps. Also provided treatments, and lot of participants registered in the platform. So, any people can easily explore and registration with their information on their needed camp. This platform has the best or nearest camps for the participants.
          </p>

          <Link to="/available-camps">
            <button className="lg:mt-6 md:my-6 mt-5 btn btn-outline border-2 border-purple-500 hover:border-none hover:bg-purple-600 hover:text-white text-purple-500 font-bold rounded px-6 flex gap-2 items-center">
              <FaUserPlus className="text-xl" /> <span className="text-lg">Register Today</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OurImpact;

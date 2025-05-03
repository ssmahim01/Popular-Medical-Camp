import { FaCalendarCheck } from "react-icons/fa";
import { TbCategoryFilled, TbPrompt } from "react-icons/tb";

const GenerateSkeleton = () => {
  return (
    <div
      className="lg:w-1/2 md:w-4/5 w-11/12 mx-auto card bg-gray-100 shadow-md rounded-xl overflow-hidden transition-shadow hover:shadow-xl duration-200"
    >
      <figure className="w-full h-full">
        <div className="skeleton w-full h-96 rounded-t-lg animate-pulse bg-gray-300"></div>
      </figure>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="skeleton w-16 h-16 rounded-full animate-pulse bg-gray-300"></div>
          <div className="flex flex-col space-y-1">
            <div className="skeleton h-6 w-24 rounded animate-pulse bg-gray-200"></div>
            <div className="skeleton h-4 w-32 rounded animate-pulse bg-gray-200 flex items-center gap-1">
              <FaCalendarCheck className="text-transparent" />
            </div>
          </div>
        </div>

        <div className="pt-1 flex flex-col space-y-2">
          <div className="skeleton h-6 w-40 rounded animate-pulse bg-gray-200 flex items-center gap-2">
            <TbCategoryFilled className="text-transparent" />
          </div>
          <div className="skeleton h-6 w-full rounded animate-pulse bg-gray-200 flex items-center gap-2">
            <TbPrompt className="text-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateSkeleton;

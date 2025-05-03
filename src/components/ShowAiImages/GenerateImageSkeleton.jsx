import { FaCalendarCheck } from "react-icons/fa";
import { TbCategoryFilled, TbPrompt } from "react-icons/tb";

const GenerateImageSkeleton = () => {
  return (
    <>
      {/* Doctor Image Placeholder */}
      <div className="flex justify-center py-5">
        <div className="skeleton w-32 h-32 rounded-full animate-pulse bg-gray-300"></div>
      </div>

      {/* Form Skeleton */}
      <form className="join w-full md:flex-row flex-col justify-center flex-wrap">
        <div className="md:flex-1 w-full">
          <div>
            <div className="border mr-2 skeleton h-12 w-full rounded-md animate-pulse bg-gray-200"></div>
          </div>
        </div>
        <div className="md:mt-0 mt-2 md:mx-0 mx-auto flex items-center">
            <div className="border join-item skeleton h-12 w-32 rounded-md animate-pulse bg-gray-200"></div>
          <div className="border join-item skeleton h-12 w-32 rounded-md animate-pulse bg-emerald-300"></div>
        </div>
      </form>

      {/* Image Cards Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:pt-10 md:pt-8 pt-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="card bg-gray-100 shadow-md rounded-xl overflow-hidden transition-shadow hover:shadow-xl duration-200"
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
        ))}
      </div>
    </>
  );
};

export default GenerateImageSkeleton;
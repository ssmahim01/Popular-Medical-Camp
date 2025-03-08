import { FaCalendarCheck } from "react-icons/fa";
import useImages from "../../hooks/useImages";
import { TbCategoryFilled, TbPrompt } from "react-icons/tb";

const ShowImages = () => {
  const [aiImages, isPending] = useImages();
  if (isPending) {
    return (
      <div className="flex justify-center items-center pt-20">
        <div className="flex lg:w-[420px] w-96 h-96 flex-col gap-4">
        <div className="skeleton h-44 w-full"></div>
        <div className="skeleton h-7 w-28"></div>
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-6 w-full"></div>
      </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:pt-10 md:pt-8 pt-5">
      {aiImages.map((image) => (
        <div
          key={image?._id}
          className="card bg-gray-100 shadow-md rounded-xl overflow-hidden transition-shadow hover:shadow-xl duration-200"
        >
          <figure className="w-full h-full">
            <img
              className="w-full h-full object-cover rounded-t-lg"
              src={image?.originalImg}
              alt={image?.prompt}
            />
          </figure>

          <div className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <figure>
                <img
                  className="w-16 h-16 rounded-full border-4 border-cyan-600"
                  referrerPolicy="no-referrer"
                  src={image?.userImg}
                  alt="Image of Participant"
                />
              </figure>

              <div className="flex flex-col">
                <h4 className="text-lg text-gray-800 font-semibold">
                  {image?.username}
                </h4>
                <p className="text-gray-600 font-semibold flex gap-1 items-center">
                  <FaCalendarCheck />
                  {new Date(image?.createdAt).toLocaleDateString("en-UK")}
                </p>
              </div>
            </div>

            <div className="pt-1 flex flex-col">
              <p className="text-lg text-gray-700 font-semibold flex gap-2 items-center">
                <span className="text-gray-900 font-bold">Category: </span>
                <TbCategoryFilled className="text-xl text-gray-800" />
                <span>{image?.category}</span>
              </p>

              <p className="mt-2 flex gap-2 items-center font-semibold text-gray-700">
              <TbPrompt className="md:text-xl text-3xl text-gray-800" />
                <span className="text-lg">{image?.prompt}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowImages;

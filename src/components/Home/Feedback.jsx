import { useQuery } from "@tanstack/react-query";
import Heading from "../Heading/Heading";
import Loading from "../Loading/Loading";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import ReactStars from "react-rating-stars-component";

const Feedback = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedbacks, isPending } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const response = await axiosPublic.get("/feedbacks");
      return response.data;
    },
  });

  if (isPending) return <Loading />;

  return (
    <div className="pb-4">
      <div className="lg:w-4/5 w-11/12 mx-auto">
        <Heading title={"Participants Feedback"} />

        {/* Feedback Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-11">
          {feedbacks.map((feedback) => (
            <div
              key={feedback?._id}
              className="card bg-base-100 shadow-md rounded-xl p-4 overflow-hidden transition-shadow hover:shadow-xl duration-200"
            >
              <div className="flex gap-4 items-center">
                <figure>
                  <img
                    className="w-16 h-16 rounded-full border-4 border-emerald-500"
                    referrerPolicy="no-referrer"
                    src={feedback?.participantImage}
                    alt="Image of Participant"
                  />
                </figure>

                <div className="flex flex-col">
                  <h4 className="text-lg text-gray-800 font-semibold">
                    {feedback?.participantName}
                  </h4>
                  <p className="text-sm text-gray-600 font-semibold">
                    {new Date(feedback?.date).toLocaleDateString("en-UK")}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex gap-2 items-center">
                    <p className="text-gray-700 text-base font-semibold">{feedback?.rating}.5</p>
                  <ReactStars
                    count={5}
                    size={22}
                    value={feedback?.rating}
                    edit={false}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                </div>

                <p className="text-gray-600 font-medium mt-2">
                  {feedback?.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;

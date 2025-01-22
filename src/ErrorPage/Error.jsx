import { Link } from "react-router-dom";
import errorBG from "../assets/images/error.jpg";

const Error = () => {
  return (
    <>
      <section className="min-h-screen">
        <div className="container mx-auto">
          <div className="lg:px-16 lg:pt-16 pt-0 pb-10 flex lg:flex-row flex-col justify-between items-center">
            <figure className="lg:w-1/2 lg:h-[510px] md:w-11/12 md:h-[480px] w-full h-full">
              <img className="w-full h-full" src={errorBG} alt="Image of Error" />
            </figure>

            <div className="flex-1 px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-gray-900 sm:text-[80px] md:text-[100px]">
                  404
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-gray-800">
                  Oops! That page can’t be found
                </h4>
                <p className="mb-8 text-lg text-gray-800">
                  The page you are looking for it maybe deleted
                </p>
                <Link
                  to="/"
                  className="inline-block btn btn-outline rounded-lg border border-gray-300 px-8 py-3 text-center text-base font-semibold text-indigo-600 transition hover:bg-indigo-500 hover:text-white hover:border-none"
                >
                  Go To Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;

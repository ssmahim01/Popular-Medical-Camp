import { MdFindInPage } from "react-icons/md";

const Pagination = ({pages, currentPage, setCurrentPage, count, handleNext, handlePrev}) => {

  return (
    <div className="mt-6 flex md:flex-row justify-between items-center flex-col md:gap-0 gap-2">
      <div className="justify-start flex gap-2 items-center">
      <MdFindInPage className="text-2xl" /> <p className="text-lg text-gray-700 font-bold">Showing 1 to {count} rows</p>
      </div>
      <div className="justify-end">
        <button
          onClick={handlePrev}
          className="btn btn-outline border border-gray-300 shadow-md text-secondary font-bold mr-1"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            className={
              currentPage === page
                ? "btn ml-2 font-bold bg-cyan-600 text-white"
                : "btn bg-gray-200 ml-2 font-bold"
            }
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          className="btn btn-outline border border-gray-300 shadow-md text-cyan-600 font-bold ml-3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

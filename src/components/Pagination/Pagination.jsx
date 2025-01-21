const Pagination = ({pages, currentPage, setCurrentPage, handleNext, handlePrev}) => {

  return (
    <div className="mt-5 flex md:flex-col justify-center items-center flex-col-reverse">
      <div>
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
                ? "btn ml-2 font-bold bg-indigo-500 text-white"
                : "btn ml-2 font-bold"
            }
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          className="btn btn-outline border border-gray-300 shadow-md text-indigo-600 font-bold ml-3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

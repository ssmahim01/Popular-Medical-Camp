import Swal from "sweetalert2";

const handleFeedbackModal = async (camp, axiosSecure) => {
  // console.table(camp);
  Swal.fire({
    title: `Feedback for ${camp?.campName}`,
    html: `
          <div>
            <input type="number" id="rating" class="swal2-input" placeholder="Enter rating (1-5)" min="1" max="5" style="width: 95%; margin: 15px auto;" />
            
            <textarea id="feedback" class="swal2-textarea" placeholder="Write your feedback here..." style="width: 95%; margin: 0 auto;"></textarea>
          </div>
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Submit",
    confirmButtonColor: "#3085d6",
    preConfirm: () => {
      const rating = document.getElementById("rating").value;
      const feedback = document.getElementById("feedback").value;

      // Validate input field and textarea
      if (!rating || rating < 1 || rating > 5) {
        Swal.showValidationMessage(
          "Please provide a valid rating between 1 and 5."
        );
      } else if (!feedback.trim()) {
        Swal.showValidationMessage("Feedback cannot be empty.");
      } else {
        return { rating, feedback };
      }
    },
  })
  .then(async (result) => {
    if (result.isConfirmed) {
      const { rating, feedback } = result.value;
      try {
        const response = await axiosSecure.post("/feedback-data", {
          campId: camp?._id,
          participantEmail: camp?.participantEmail,
          rating,
          feedback,
        });

        if (response.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your feedback has been successfully submitted",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to submit your feedback",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    }
  });
};

export default handleFeedbackModal;
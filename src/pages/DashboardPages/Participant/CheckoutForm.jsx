import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { TbCoinTakaFilled } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";
import Loading from "../../../components/Loading/Loading";
import { MdPayment } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { BiTrash } from "react-icons/bi";

const CheckoutForm = ({ campId }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: campData, isPending, refetch } = useQuery({
    queryKey: ["campData", campId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/participant/${campId}`);
      return response.data;
    },
  });

  const { data: clientSecret } = useQuery({
    queryKey: ["clientSecret", campData?.campFees],
    enabled: campData?.campFees > 0,
    queryFn: async () => {
      const response = await axiosSecure.post("/create-payment-intent", {
        campFee: campData?.campFees,
      });
      return response.data.clientSecret;
    },
  });

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Anonymous",
          },
        },
      });

    if (confirmError) {
      //   console.log("confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        setInterval(() => {
          navigate("/dashboard/registered-camps")            
        }, 3000);
        
        const paymentInfo = {
          transactionId: paymentIntent.id,
          participantName: user?.displayName,
          email: user?.email,
          campName: campData?.campName,
          campFees: campData?.campFees,
          campId: campData?._id,
          paymentStatus: campData?.paymentStatus,
          date: new Date().toISOString(),
          status: "Pending",
        };

        const response = await axiosSecure.post("/payments", paymentInfo);
        console.log(response.data, transactionId);
        refetch();

        if(response.data.insertResult.insertedId){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment Successful",
            text: `Transaction Id: ${transactionId}`,
            showConfirmButton: true,
            confirmButtonText: "Okay",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    }
  };

  if (isPending) return <Loading />;

  return (
    <div>
      <div className="md:w-4/5 w-11/12 mx-auto card rounded-box p-4 shadow-md bg-gray-100 bg-opacity-60 border border-gray-200">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-3">
          <figure className="lg:w-1/2 w-full">
            <img
              className="w-full md:h-64 h-52 rounded-xl object-cover"
              src={campData?.image}
              alt={campData?.campName}
            />
          </figure>

          <div className="lg:w-1/2 space-y-3 lg:ml-8">
            <h3 className="lg:text-2xl text-gray-800 md:text-xl font-bold mb-2">
              {campData?.campName}
            </h3>

            <p className="text-gray-700 font-semibold flex gap-2 items-center">
              <span className="text-gray-800 font-bold">Camp Fees: </span>
              <span className="flex gap-1 items-center">
                <TbCoinTakaFilled className="text-xl" /> {campData?.campFees}
              </span>
            </p>

            <p className="text-gray-700 font-semibold flex gap-1 items-center">
              <span className="text-gray-900 font-bold">Location: </span>
              <span className="flex gap-1 items-center">
                <IoLocation className="text-xl" />
                {campData?.location}
              </span>
            </p>

            <form className="pt-4" onSubmit={handlePayment}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              <div className="mt-6 flex gap-4 items-center">
                <button
                  className="btn bg-emerald-500 border-none btn-sm text-white font-bold rounded flex gap-2 items-center"
                  type="submit"
                  disabled={!stripe}
                >
                  <MdPayment className="text-lg" /> <span>Pay</span>
                </button>

                <Link to="/dashboard/registered-camps">
                  <button
                    className="btn bg-rose-500 border-none btn-sm text-white font-bold rounded flex gap-1 items-center"
                  >
                    <BiTrash className="text-lg" /> <span>Cancel</span>
                  </button>
                </Link>
              </div>

              <p className="text-rose-500 font-semibold mt-2">{error}</p>

              {transactionId && (
                <p className="text-emerald-500 font-semibold mt-2">
                  Your Transaction Id: {transactionId}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

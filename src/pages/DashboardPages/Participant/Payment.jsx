import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Heading from "../../../components/Heading/Heading";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const {campId} = useParams();
    // console.log(campId);

  return (
    <div className="py-6">
     <Heading title={"Payment"} center={true} />

      <Elements stripe={stripePromise}>
        {/* Payment Form */}
        <CheckoutForm campId={campId} />
      </Elements>
    </div>
  );
};

export default Payment;

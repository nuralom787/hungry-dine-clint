import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaArrowRight } from "react-icons/fa";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();



    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('Payment Error', error);
        } else {
            console.log('Payment Method', paymentMethod);
        }

    };



    return (
        <form onSubmit={handlePayment}>
            <div className="flex justify-between items-center gap-4 my-12">
                <div className="w-full border border-[#151515] dark:border-white p-4 rounded-lg">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button className="flex items-center gap-2 font-Inter font-semibold text-xl text-white bg-green-700 hover:bg-green-500 duration-500 px-6 py-3 border border-green-700 hover:border-green-500 rounded-lg" type="submit" disabled={!stripe}>
                    Pay <FaArrowRight />
                </button>
            </div>
        </form>
    );
};

export default PaymentForm;
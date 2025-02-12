import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useCart from "../../../../Hooks/useCart";
import { AuthContext } from "../../../../Providers/AuthProvider";

const PaymentForm = () => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionID, setTransactionID] = useState("");
    const [cart] = useCart();
    const { user } = useContext(AuthContext);
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    // 
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, totalPrice]);



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
            setError(error.message);
        } else {
            console.log('Payment Method', paymentMethod);
            setError("");
        }


        const { paymentIntent, error: err } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                }
            }
        });

        if (err) {
            console.log("Payment Err", err.message);
        }
        else {
            console.log("paymentIntent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("Transaction ID:", paymentIntent.id);
                setTransactionID(paymentIntent.id);
            }
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
                <button
                    disabled={!stripe || !clientSecret}
                    className="flex items-center gap-2 font-Inter font-semibold text-xl text-white bg-green-700 hover:bg-green-500 duration-500 px-6 py-3 border border-green-700 hover:border-green-500 rounded-lg" type="submit">
                    Pay <FaArrowRight />
                </button>
            </div>
            <div>
                {error && <p className="text-red-700">{error}</p>}
                {transactionID && <p className="text-green-600 text-2xl">
                    Your Payment Is Successful and Your Transaction ID Is:   <span className="font-bold hover:underline">{transactionID}</span></p>
                }
            </div>
        </form>
    );
};

export default PaymentForm;
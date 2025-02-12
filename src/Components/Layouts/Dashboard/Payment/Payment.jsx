import { Helmet } from "react-helmet-async";
import card from '../../../../assets/others/card-payment.png';
import bkash from '../../../../assets/others/bkash.svg';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import './Payment.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import useCart from "../../../../Hooks/useCart";
const stripe_pk = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
const stripePromise = loadStripe(stripe_pk);


const Payment = () => {
    const [tabIndex, setTabIndex] = useState("Card");
    const [cart] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <section className="min-h-screen px-10 bg-gray-300 dark:bg-base-300">
            <section className="max-h-screen overflow-y-auto">
                <Helmet>
                    <title>Hungry Dine | Payment</title>
                </Helmet>
                <div className="text-center">
                    <h1 className="uppercase font-Inter font-bold text-4xl text-[#151515] dark:text-white my-10">Payment</h1>
                </div>
                <div className="text-center my-4">
                    <h1 className="font-Inter text-2xl text-[#151515] dark:text-white">Total Payable Amount: <span className="font-bold">${totalPrice.toFixed(2)}</span></h1>
                </div>
                <div>
                    <fieldset className="border-2 border-gray-700 dark:border-white py-8 px-4 rounded-lg">
                        <legend className="uppercase px-3 font-Inter font-bold text-2xl">Select Your Payment Method</legend>
                        <div className="flex items-center gap-6">
                            <Tabs className="min-w-full payment-tab-list" defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                                <TabList>
                                    <Tab><img className="w-28 h-20 bg-white p-4" src={card} alt="" /></Tab>
                                    <Tab><img className="w-28 h-20 bg-white p-4" src={bkash} alt="" /></Tab>
                                </TabList>
                                <TabPanel>
                                    <div>
                                        <Elements stripe={stripePromise}>
                                            <PaymentForm />
                                        </Elements>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div>
                                        <button className="btn btn-outline">Pay With Bkash</button>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </fieldset>
                </div>
            </section>
        </section>
    );
};

export default Payment;
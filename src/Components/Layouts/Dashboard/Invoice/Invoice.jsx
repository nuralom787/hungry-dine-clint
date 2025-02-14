import { Helmet } from "react-helmet-async";
import usePayments from "../../../../Hooks/usePayments";
import { useParams } from "react-router";
import logo from '../../../../assets/hd-logo-transprent.png';

const Invoice = () => {
    const { trId } = useParams();
    const [payments, refetch, isPending] = usePayments();
    const payment = payments?.find(payment => payment.transactionID === trId);



    return (
        <section className='min-h-screen px-2 md:px-10 mt-4 md:mt-0 rounded-t-xl md:rounded-none bg-gray-300 dark:bg-base-300'>
            <Helmet>
                <title>Hungry Dine | Invoice</title>
            </Helmet>
            <section className='max-h-screen overflow-y-auto'>
                <div className="mt-6 pt-4 pb-2">
                    <h1 className="uppercase font-Inter font-bold text-2xl text-[#151515] dark:text-white">Invoice</h1>
                </div>
                <div className="divider before:bg-black dark:before:bg-white after:bg-black dark:after:bg-white"></div>
                <div className="overflow-x-auto border border-[#151515] dark:border-white bg-gray-200 dark:bg-base-100 rounded-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="font-Inter font-semibold uppercase">
                            <h1 className="text-4xl text-[#151515] dark:text-white">Invoice</h1>
                            <p className="text-base text-[#151515] dark:text-white">Status: {payment?.status}</p>
                        </div>
                        <div className="text-end font-Inter font-semibold text-[#151515] dark:text-white">
                            <div className="w-60 mb-4">
                                <img src={logo} alt="" />
                            </div>
                            <p>Girja Moholla, Beside Medinova</p>
                            <p>Barisal-8200, Bangladesh.</p>
                        </div>
                    </div>
                    <div className="divider before:bg-black dark:before:bg-white after:bg-black dark:after:bg-white"></div>
                    <div>
                        <h3 className="font-Inter font-bold text-2xl text-[#151515] dark:text-white">Order Summery</h3>
                        <p className="font-medium font-Inter text-lg text-[#151515] dark:text-white">
                            Your order <span className="font-bold">#hd5464</span> placed on <span className="font-bold">{new Date().toDateString(payment?.date)}.</span>
                        </p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Invoice;
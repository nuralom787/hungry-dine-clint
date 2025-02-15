import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { IoIosArrowDown } from "react-icons/io";
import usePayments from "../../../../Hooks/usePayments";
import logo from '../../../../assets/hd-logo-transprent.png';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Invoice = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const [payments, refetch] = usePayments();
    const payment = payments?.find(payment => payment._id === id);

    const { data: cartItems, isPending } = useQuery({
        queryKey: ["cartItems"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/menus/cart/items/${id}`,);
            return res.data;
        }
    });


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
                        <div className="overflow-x-auto bg-gray-200 dark:bg-base-100 rounded-xl pt-8">
                            <h2 className="font-Inter font-semibold text-xl text-[#151515] dark:text-white py-2">Ordered Product Summery</h2>
                            {isPending ?
                                <div className="flex items-center gap-1">
                                    <div className="skeleton w-1/6 h-6 my-8"></div>
                                    <div className="skeleton w-5/6 h-6 my-8"></div>
                                    <div className="skeleton w-1/6 h-6 my-8"></div>
                                    <div className="skeleton w-1/6 h-6 my-8"></div>
                                </div>
                                :
                                <table className="table static">
                                    <thead>
                                        <tr className="bg-base-content dark:bg-base-300">
                                            <th className="font-Inter text-[#151515] dark:text-white">SI <IoIosArrowDown className="inline-flex" /></th>
                                            <th className="font-Inter text-[#151515] dark:text-white">Item <IoIosArrowDown className="inline-flex" /></th>
                                            <th className="font-Inter text-[#151515] dark:text-white">Product ID <IoIosArrowDown className="inline-flex" /></th>
                                            <th className="font-Inter text-[#151515] dark:text-white">Price <IoIosArrowDown className="inline-flex" /></th>
                                            <th className="font-Inter text-[#151515] dark:text-white text-center">Quantity <IoIosArrowDown className="inline-flex" /></th>
                                            <th className="font-Inter text-[#151515] dark:text-white text-end">Subtotal <IoIosArrowDown className="inline-flex" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.map((item, idx) => <tr key={item._id} className="border-t border-b-base-300 dark:border-b-white my-6">
                                                <th className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{idx + 1}</p></th>
                                                <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{item.name}</p></td>
                                                <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{item._id}</p></td>
                                                <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>${item.price.toFixed(2)}</p></td>
                                                <td className="font-Inter font-semibold text-[#151515] dark:text-white text-center"><p>1x</p></td>
                                                <td className="font-Inter font-semibold text-[#151515] dark:text-white text-end"><p>${item.price.toFixed(2)}</p></td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            }
                            <div className="flex justify-end items-center gap-14 text-end font-Inter font-bold text-base text-[#151515] dark:text-white pr-4 py-4">
                                <div className="space-y-2">
                                    <p>Subtotal: </p>
                                    <p>Shipping & Handling: </p>
                                    <p>Discount: </p>
                                    <p>Grand Total: </p>
                                </div>
                                <div className="space-y-2">
                                    {payment?.price ? <p>${payment?.price.toFixed(2)}</p> : <p>${`00.00`}</p>}
                                    <p>${`00.00`}</p>
                                    <p>${`00.00`}</p>
                                    {payment?.price ? <p>${payment?.price.toFixed(2)}</p> : <p>${`00.00`}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Invoice;
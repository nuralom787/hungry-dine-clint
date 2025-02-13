import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../SharedLayout/SectionTitle/SectionTitle';
import { IoIosArrowDown } from 'react-icons/io';
import { FaFileInvoice } from 'react-icons/fa';
import { Link } from 'react-router';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: payments, refetch, isPending } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/payment-history?email=${user?.email}`);
            return res.data;
        }
    });
    console.log(payments)


    return (
        <section className='min-h-screen px-2 md:px-10 mt-4 md:mt-0 rounded-t-xl md:rounded-none bg-gray-300 dark:bg-base-300'>
            <Helmet>
                <title>Hungry Dine | Payment History</title>
            </Helmet>
            <section className='max-h-screen overflow-y-auto'>
                <div className='text-center'>
                    <SectionTitle heading="payment history" subHeading="---At a Glance!---"></SectionTitle>
                </div>
                <div>
                    <h1 className="font-Inter font-bold text-3xl text-[#151515] dark:text-white py-4 uppercase text-center md:text-start">Total Payments: {payments?.length}</h1>
                    <div className="overflow-x-auto bg-gray-200 dark:bg-base-100 rounded-xl p-8 mb-8">
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
                                        <th className="font-Inter text-[#151515] dark:text-white">Email<IoIosArrowDown className="inline-flex" /></th>
                                        <th className="font-Inter text-[#151515] dark:text-white">Category <IoIosArrowDown className="inline-flex" /></th>
                                        <th className="font-Inter text-[#151515] dark:text-white text-end">Total PRICE <IoIosArrowDown className="inline-flex" /></th>
                                        <th className="font-Inter text-[#151515] dark:text-white text-end">Paying Date <IoIosArrowDown className="inline-flex" /></th>
                                        <th className="font-Inter text-[#151515] dark:text-white text-center">ACTION <IoIosArrowDown className="inline-flex" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payments.map((payment, idx) => <tr key={payment._id} className="border-t border-b-base-300 dark:border-b-white my-6">
                                            <th className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{idx + 1}</p></th>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{payment.email}</p></td>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>Food</p></td>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white text-end"><p>${payment.price.toFixed(2)}</p></td>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white text-end"><p>{new Date().toDateString(payment.date)}</p></td>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white flex justify-center">
                                                <Link to="/" className="bg-green-500 p-2 rounded-md block w-fit tooltip" data-tip="View Invoice">
                                                    <FaFileInvoice className="text-white text-2xl" />
                                                </Link>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </section>
        </section>
    );
};

export default PaymentHistory;
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../SharedLayout/SectionTitle/SectionTitle';
import { IoIosArrowDown } from 'react-icons/io';
import { FaFileInvoice } from 'react-icons/fa';
import { Link } from 'react-router';
import usePayments from '../../../../Hooks/usePayments';

const PaymentHistory = () => {
    const [payments, refetch, isPending] = usePayments();


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
                                        <th className="font-Inter text-[#151515] dark:text-white">Total Price <IoIosArrowDown className="inline-flex" /></th>
                                        <th className="font-Inter text-[#151515] dark:text-white">Paying Date <IoIosArrowDown className="inline-flex" /></th>
                                        <th className="font-Inter text-[#151515] dark:text-white text-center">Status <IoIosArrowDown className="inline-flex" /></th>
                                        <th className="font-Inter text-[#151515] dark:text-white text-center">ACTION <IoIosArrowDown className="inline-flex" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payments.map((payment, idx) => <tr key={payment._id} className="border-t border-b-base-300 dark:border-b-white my-6">
                                            <th className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{idx + 1}</p></th>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{payment.email}</p></td>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>${payment.price.toFixed(2)}</p></td>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{new Date().toDateString(payment.date)}</p></td>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white capitalize">
                                                {payment.status === "pending" && <p className='p-1 rounded-full text-center text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600'>{payment.status}</p>}
                                                {payment.status === "processing" && <p className='p-1 rounded-full text-center text-blue-800 bg-blue-100 dark:text-white dark:bg-blue-800'>{payment.status}</p>}
                                                {payment.status === "on-the-way" && <p className='p-1 rounded-full text-center text-cyan-600 bg-cyan-100 dark:text-white dark:bg-cyan-600'>{payment.status}</p>}
                                                {payment.status === "delivered" && <p className='p-1 rounded-full text-center text-green-800 bg-green-100 dark:text-white dark:bg-green-800'>{payment.status}</p>}
                                                {payment.status === "cancel" && <p className='p-1 rounded-full text-center text-red-600 bg-red-100 dark:text-white dark:bg-red-600'>{payment.status}</p>}
                                            </td>
                                            <td className="font-Inter font-semibold text-[#151515] dark:text-white flex justify-center">
                                                <Link to={`/dashboard/invoice/${payment.email}/${payment.transactionID}`} className="bg-green-500 p-2 rounded-md block w-fit tooltip" data-tip="View Invoice">
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
import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaBook, FaHome, FaListUl, FaUsers, FaUtensils } from "react-icons/fa";
import { FaCalendarDays, FaWallet, FaBagShopping } from "react-icons/fa6";
import { RiShoppingCartLine, RiShieldStarLine } from "react-icons/ri";
import { LuCalendarPlus } from "react-icons/lu";
import { HiMenu } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import './Dashboard.css';
import useAdmin from '../../../../Hooks/useAdmin';


const Dashboard = () => {
    const [isAdmin, adminLoading] = useAdmin();


    // Scroll To Top.
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth', });
    }, []);


    return (
        <section className='max-w-7xl mx-auto px-2'>
            <section className='flex'>
                <div className='w-1/4 min-h-screen bg-[#D1A054]'>
                    {adminLoading ?
                        <div className='space-y-4 mt-6 px-4'>
                            {/* <span className="loading bg-white loading-ring loading-lg"></span> */}
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className='divider before:bg-white after:bg-white'></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                            <div className="skeleton h-8 w-full"></div>
                        </div>
                        :
                        <ul className='dashboard p-0'>
                            {isAdmin ?
                                <>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/admin-home'}><FaHome className='text-2xl' /> ADMIN HOME</NavLink></li>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/add-item'}><FaUtensils className='text-2xl' /> ADD ITEMS</NavLink></li>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/manage-item'}><FaListUl className='text-2xl' /> MANAGE ITEMS</NavLink></li>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/manage-booking'}><FaBook className='text-2xl' /> MANAGE BOOKINGS</NavLink></li>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/all-users'}><FaUsers className='text-2xl' /> ALL USERS</NavLink></li>
                                </>
                                :
                                <>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/home'}><FaHome className='text-2xl' /> USER HOME</NavLink></li>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/reservation'}><FaCalendarDays className='text-2xl' /> RESERVATION</NavLink></li>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/payment-history'}><FaWallet className='text-2xl' /> PAYMENT HISTORY</NavLink></li>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/cart'}><RiShoppingCartLine className='text-2xl' /> MT CART</NavLink></li>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/review'}><RiShieldStarLine className='text-2xl' /> ADD REVIEW</NavLink></li>
                                    <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/booking'}><LuCalendarPlus className='text-2xl' /> MY BOOKING</NavLink></li>
                                </>
                            }
                            <div className="divider before:bg-white after:bg-white px-4"></div>
                            <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/'}><FaHome className='text-2xl' /> HOME</NavLink></li>
                            <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/menus'}><HiMenu className='text-2xl' /> MENU</NavLink></li>
                            <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/our-shop'}><FaBagShopping className='text-2xl' /> SHOP</NavLink></li>
                            <li><NavLink className="flex items-center gap-3 px-5 py-4 font-Inter font-extrabold text-xl" to={'/contact'}><MdEmail className='text-2xl' /> CONTACT</NavLink></li>
                        </ul>
                    }
                </div>
                <div className='w-4/5 min-h-full'>
                    <Outlet />
                </div>
            </section>
        </section>
    );
};

export default Dashboard;
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
            <section className='md:flex relative'>
                <div className='md:w-2/6 lg:w-1/4 min-h-screen bg-[#D1A054] absolute md:static -left-80 md:-left-0'>
                    {adminLoading ?
                        <div className='space-y-4 mt-6 px-4'>
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
                <div className='w-full md:w-4/5 min-h-full'>
                    <div className='md:hidden bg-gray-300 dark:bg-base-200 px-2 py-3 rounded-b-xl'>
                        <div className="drawer">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label
                                    htmlFor="my-drawer"
                                    className="btn btn-circle swap swap-rotate drawer-button bg-gray-300 dark:bg-base-200 border-gray-300 dark:border-base-200">
                                    {/* this hidden checkbox controls the state */}
                                    <input type="checkbox" />

                                    {/* hamburger icon */}
                                    <svg
                                        className="swap-off fill-base-200 dark:fill-gray-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 512 512">
                                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                                    </svg>

                                    {/* close icon */}
                                    <svg
                                        className="swap-on fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 512 512">
                                        <polygon
                                            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                                    </svg>
                                </label>
                            </div>
                            <div className="drawer-side">
                                <div className='w-5/6 min-h-screen bg-[#D1A054]'>
                                    <label
                                        htmlFor="my-drawer"
                                        aria-label="close sidebar"
                                        className="absolute right-3 top-3 text-red-600 bg-white rounded-full p-1">
                                        <svg
                                            className="swap-on fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="28"
                                            height="28"
                                            viewBox="0 0 512 512">
                                            <polygon
                                                points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                                        </svg>
                                    </label>
                                    {adminLoading ?
                                        <div className='space-y-4 mt-6 px-4'>
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
                            </div>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </section>
        </section>
    );
};

export default Dashboard;
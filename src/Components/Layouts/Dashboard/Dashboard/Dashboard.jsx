import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome } from "react-icons/fa";
import { FaCalendarDays, FaWallet, FaBagShopping } from "react-icons/fa6";
import { RiShoppingCartLine, RiShieldStarLine } from "react-icons/ri";
import { LuCalendarPlus } from "react-icons/lu";
import { HiMenu } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import './Dashboard.css';


const Dashboard = () => {

    // Scroll To Top.
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth', });
    }, []);


    return (
        <section className='max-w-7xl mx-auto px-2'>
            <section className='flex'>
                <div className='w-1/4 min-h-screen bg-[#D1A054]'>
                    <ul className='dashboard p-0'>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/home'}><FaHome /> USER HOME</NavLink></li>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/reservation'}><FaCalendarDays /> RESERVATION</NavLink></li>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/payment-history'}><FaWallet /> PAYMENT HISTORY</NavLink></li>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/cart'}><RiShoppingCartLine /> MT CART</NavLink></li>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/review'}><RiShieldStarLine /> ADD REVIEW</NavLink></li>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/dashboard/booking'}><LuCalendarPlus /> MY BOOKING</NavLink></li>
                        <div className="divider before:bg-white after:bg-white px-4"></div>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/'}><FaHome /> HOME</NavLink></li>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/'}><HiMenu /> MENU</NavLink></li>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/'}><FaBagShopping /> SHOP</NavLink></li>
                        <li><NavLink className="flex items-center gap-3 px-3 py-4 font-Inter font-extrabold text-xl" to={'/'}><MdEmail /> CONTACT</NavLink></li>
                    </ul>
                </div>
                <div className='w-4/5 min-h-full'>
                    <Outlet />
                </div>
            </section>
        </section>
    );
};

export default Dashboard;
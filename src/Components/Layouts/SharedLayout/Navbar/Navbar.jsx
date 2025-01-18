import React from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css';

const Navbar = () => {

    const navLinks = <>
        <li><NavLink to={'/'} className='font-Inter font-extrabold text-base'>HOME</NavLink></li>
        <li><NavLink to={'/contact'} className='font-Inter font-extrabold text-base'>CONTACT US</NavLink></li>
        <li><NavLink to={'/dashboard'} className='font-Inter font-extrabold text-base'>DASHBOARD</NavLink></li>
        <li><NavLink to={'/menu'} className='font-Inter font-extrabold text-base'>OUR MENU</NavLink></li>
        <li><NavLink to={'/shop'} className='font-Inter font-extrabold text-base'>OUR SHOP</NavLink></li>
    </>


    return (
        <div className='relative'>
            <div className="navbar bg-base-100 bg-opacity-20 py-6 absolute z-10 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <h1 className="text-2xl font-extrabold">Hungry Dine</h1>
                </div>
                <div className="navbar-end gap-6 font-bold">
                    <ul className="hidden lg:flex justify-between items-center gap-6">
                        {navLinks}
                    </ul>
                    <Link to={'/'}>SIGN-IN</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
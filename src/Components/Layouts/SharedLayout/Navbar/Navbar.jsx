import { Link, NavLink } from 'react-router';
import './Navbar.css';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    const navLinks = <>
        <li><NavLink to={'/'} className='font-Inter font-extrabold text-sm'>HOME</NavLink></li>
        <li><NavLink to={'/contact'} className='font-Inter font-extrabold text-sm'>CONTACT US</NavLink></li>
        <li><NavLink to={'/dashboard'} className='font-Inter font-extrabold text-sm'>DASHBOARD</NavLink></li>
        <li><NavLink to={'/menus'} className='font-Inter font-extrabold text-sm'>OUR MENU</NavLink></li>
        <li><NavLink to={'/shop'} className='font-Inter font-extrabold text-sm'>OUR SHOP</NavLink></li>
    </>


    // Set Dark Mode.
    const changeDarkMode = () => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            localStorage.setItem('theme', 'light');
            setTheme('light');
        } else {
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        }
    }

    // Monitor Dark Mode.
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        }
    }, [theme]);


    return (
        <div className='relative'>
            <div className="navbar bg-base-100 bg-opacity-20 py-4 absolute z-10 text-white">
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
                    {/* <input onClick={handleTheme} type="checkbox" className="toggle border-gray-800 bg-gray-500 [--tglbg:#15151566]" /> */}
                    <label title='Change Theme' className="grid cursor-pointer place-items-center">
                        <input
                            title='Change Theme'
                            type="checkbox"
                            onClick={changeDarkMode}
                            defaultChecked={theme === "light" ? false : true}
                            className="toggle hover:bg-white duration-500 theme-controller bg-white col-span-2 col-start-1 row-start-1" />
                        <svg
                            title='Change Theme'
                            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <path
                                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                        <svg
                            title='Change Theme'
                            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </label>
                    <Link to={'/'}>SIGN-IN</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
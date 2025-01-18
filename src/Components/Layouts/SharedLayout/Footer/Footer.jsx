import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='mt-10'>
            <div className="footer bg-neutral text-neutral-content grid-cols-1 md:grid-cols-2 gap-0">
                <div className="bg-[#1F2937] w-full h-full">
                    <div className="ms-auto items-center p-20 space-y-10">
                        <h1 className='uppercase font-medium font-Inter text-3xl text-white border-b-2 border-white pb-6'>Contact US</h1>
                        <div>
                            <p className="font-Inter font-medium text-xl text-white">123 ABS Street, Uni 21, Bangladesh</p>
                            <p className="font-Inter font-medium text-xl text-white">+88 123456789</p>
                            <p className="font-Inter font-medium text-xl text-white">Mon - Fri: 08:00 - 22:00</p>
                            <p className="font-Inter font-medium text-xl text-white">Sat - Sun: 10:00 - 23:00</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#111827] w-full h-full">
                    <div className="p-20 space-y-10">
                        <h1 className="font-Inter font-medium text-3xl text-white border-b-2 border-white pb-6">Flow US</h1>
                        <p className="font-Inter font-medium text-xl text-white">Join us on social media</p>
                        <div className="flex justify-center items-center gap-8">
                            <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="text-3xl text-white" />
                            </a>
                            <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-3xl text-white" />
                            </a>
                            <a href="http://x.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-3xl text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer footer-center bg-[#151515] text-base-content p-4">
                <aside>
                    <p className="font-Inter font-medium text-xl text-white">Copyright © {new Date().getFullYear()} | All right reserved by <strong className="hover:underline cursor-pointer">Hungry Dine.</strong></p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;
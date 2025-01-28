import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import './Cart.css';


const Cart = () => {
    const [cart, refetch, isPending] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <section className="px-10 bg-gray-300 dark:bg-base-300">
            <Helmet>
                <title>Hungry Dine | Cart</title>
            </Helmet>
            <section className="max-h-screen overflow-y-auto">
                <div className="flex justify-around items-center py-5 mt-6">
                    <h1 className="font-Cinzel font-bold text-3xl text-[#151515] dark:text-white">Total Orders: {cart.length}</h1>
                    <h1 className="font-Cinzel font-bold text-3xl text-[#151515] dark:text-white">Total Price: ${totalPrice.toFixed(2)}</h1>
                    <Link className="font-Cinzel font-bold text-2xl text-white bg-[#D1A054] px-5 py-2 rounded-md cursor-pointer flex items-center gap-2" to={'/'}>Pay <FaArrowRight /></Link>
                </div>
                <div className="overflow-x-auto bg-gray-200 dark:bg-base-100 rounded-xl p-8 mb-8">
                    {/* <h1 className="uppercase font-Inter font-extrabold text-start text-2xl text-[#151515] dark:text-white pb-3 mb-3 border-b-2 border-b-[#151515] dark:border-b-white">my cart</h1> */}
                    {isPending ?
                        <div className="flex items-center gap-1">
                            <div className="skeleton w-1/6 h-6 my-8"></div>
                            <div className="skeleton w-5/6 h-6 my-8"></div>
                            <div className="skeleton w-1/6 h-6 my-8"></div>
                            <div className="skeleton w-1/6 h-6 my-8"></div>
                        </div>
                        :
                        <table className="table">
                            <thead>
                                <tr className="bg-base-content dark:bg-base-300">
                                    <th className="font-Inter text-[#151515] dark:text-white">SI <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">ITEM IMAGE<IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">ITEM NAME <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">PRICE <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">ACTION <IoIosArrowDown className="inline-flex" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item, idx) => <tr key={item._id} className="border-t border-b-base-300 dark:border-b-white my-6">
                                        <th className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{idx + 1}</p></th>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><img className="w-20 rounded-lg" src={item.image} alt="" /></td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><Link className="hover:underline" to={'/'}><h1>{item.name}</h1></Link></td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>${item.price.toFixed(2)}</p></td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><button className="bg-red-600 p-2 rounded-md"><MdDelete className="text-white text-2xl" /></button></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    }
                </div>
                {/* <div className="w-2/5 bg-gray-200 dark:bg-base-100 rounded-xl p-8">
                    <h1 className="uppercase font-Inter font-extrabold text-start text-2xl text-[#151515] dark:text-white pb-3 mb-3 border-b-2 border-b-[#151515] dark:border-b-white">cart summary</h1>
                    <div className="relative">
                        <div className="mt-6">
                            <input id="name" type="text" placeholder=" " className="cart_input font-Inter px-4 py-3 rounded-lg" />
                            <label htmlFor="name" className="cart_label font-Inter font-bold uppercase dark:bg-base-100">Name</label>
                        </div>
                    </div>
                </div> */}
            </section>
        </section>
    );
};

export default Cart;
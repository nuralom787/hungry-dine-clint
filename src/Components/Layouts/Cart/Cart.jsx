import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";


const Cart = () => {
    const [cart, refetch, isPending] = useCart();

    return (
        <section className="py-24 px-10 bg-gray-300 dark:bg-base-300">
            <Helmet>
                <title>Hungry Dine | Cart</title>
            </Helmet>
            <section className="flex justify-between items-start gap-6">
                <div className="w-3/5 overflow-x-auto bg-gray-200 dark:bg-base-100 rounded-xl p-8">
                    <h1 className="uppercase font-Inter font-extrabold text-start text-2xl text-[#151515] dark:text-white pb-3 mb-3 border-b-2 border-b-[#151515] dark:border-b-white">my cart</h1>
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
                                    <th className="font-Inter text-[#151515] dark:text-white">ITEM <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white"></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">QUANTITY <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">PRICE <IoIosArrowDown className="inline-flex" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item, idx) => <tr key={item._id} className="border-t border-b-base-300 dark:border-b-white my-6">
                                        <th className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{idx + 1}</p></th>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><img className="w-20 rounded-lg" src={item.image} alt="" /></td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><Link className="hover:underline" to={'/'}><h1>{item.name}</h1></Link></td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>${item.price.toFixed(2)}</p></td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>${item.price.toFixed(2)}</p></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    }
                </div>
                <div className="w-2/5 bg-gray-200 dark:bg-base-100 rounded-xl p-8">
                    <h1 className="uppercase font-Inter font-extrabold text-start text-2xl text-[#151515] dark:text-white pb-3 mb-3 border-b-2 border-b-[#151515] dark:border-b-white">cart summary</h1>
                    <div className="">
                        <h1>Name</h1>
                        <input type="text" placeholder="Name" defaultValue={'Name'} className="px-4 py-2 rounded-lg" />
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Cart;
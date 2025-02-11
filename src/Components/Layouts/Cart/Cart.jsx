import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRight, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";
import './Cart.css';
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Cart = () => {
    const [cart, refetch, isPending] = useCart();
    const axiosSecure = useAxiosSecure();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);


    // Handle Item Delete.
    const handleDelete = (id) => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "If you delete it, you can't revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Item Deleted Successfully.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
        });
    };


    return (
        <section className="min-h-screen px-10 bg-gray-300 dark:bg-base-300">
            <Helmet>
                <title>Hungry Dine | Cart</title>
            </Helmet>
            <section className="max-h-screen overflow-y-auto">
                <div className="flex justify-around items-center py-5 mt-6">
                    <h1 className="font-Cinzel font-bold text-3xl text-[#151515] dark:text-white">Total Orders: {cart.length}</h1>
                    <h1 className="font-Cinzel font-bold text-3xl text-[#151515] dark:text-white">Total Price: ${totalPrice.toFixed(2)}</h1>
                    {cart.length ?
                        <Link
                            className="font-Cinzel font-bold text-2xl text-white bg-[#D1A054B3] hover:bg-[#D1A054] duration-500 px-5 py-2 rounded-md cursor-pointer flex items-center gap-2"
                            to={'/dashboard/cart/payment'}>
                            Pay <FaArrowRight />
                        </Link>
                        :
                        ""
                    }
                </div>
                <div className="overflow-x-auto bg-gray-200 dark:bg-base-100 rounded-xl p-8 mb-8">
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
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><button onClick={() => handleDelete(item._id)} className="bg-red-600 p-2 rounded-md"><FaTrashAlt className="text-white text-2xl" /></button></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    }
                    {cart.length ?
                        ""
                        :
                        <div className="text-center my-20">
                            <h1 className="font-Inter font-bold text-[#151515] dark:text-white text-3xl uppercase">Your Cart Is Empty!!</h1>
                        </div>
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
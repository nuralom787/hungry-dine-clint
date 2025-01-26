import 'react-tabs/style/react-tabs.css';
import './OurShop.css';
import Cover from "../SharedLayout/Cover/Cover";
import shopImg from '../../../assets/shop/banner2.jpg';
import useMenu from "../../../Hooks/useMenu";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCart';

const OurShop = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category || 'salad')
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menus, loading] = useMenu();
    const salad = menus.filter(menu => menu.category === "salad");
    const pizza = menus.filter(menu => menu.category === "pizza");
    const soup = menus.filter(menu => menu.category === "soup");
    const dessert = menus.filter(menu => menu.category === "dessert");
    const drinks = menus.filter(menu => menu.category === "drinks");


    // Scroll To Top.
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth', });
    }, []);



    // Handle Add To Cart Item.
    const handleAddToCart = (item) => {
        const { _id, name, image, price } = item;

        if (user) {
            // console.log(item._id, user?.email)
            const cartItem = {
                email: user.email,
                menuId: _id,
                price,
                name,
                image,
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertedId) {
                        toast.success(`${name} Add To Cart Successfully`, {
                            position: 'top-center',
                            autoClose: 2500
                        });
                        // Update Cart Length.
                        refetch();
                    }
                })
                .catch(err => {
                    toast.error(err.message)
                })
        }
        else {
            Swal.fire({
                title: "Your Are Not Logged-In",
                text: "Please Login Your Account",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }




    return (
        <section>
            <Helmet>
                <title>Hungry Dine | Shop</title>
            </Helmet>
            <Cover bgImage={shopImg} title={"our shop"} subtitle={"would you like to try a dish?"} />
            <section>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className="max-w-xl mx-auto px-2 flex justify-between items-center gap-8 my-20 overflow-x-auto">
                        <Tab className="uppercase font-Inter font-bold text-2xl text-white border-b-4 border-b-transparent pb-2 cursor-pointer">Salad</Tab>
                        <Tab className="uppercase font-Inter font-bold text-2xl text-white border-b-4 border-b-transparent pb-2 cursor-pointer">Pizza</Tab>
                        <Tab className="uppercase font-Inter font-bold text-2xl text-white border-b-4 border-b-transparent pb-2 cursor-pointer">Soup</Tab>
                        <Tab className="uppercase font-Inter font-bold text-2xl text-white border-b-4 border-b-transparent pb-2 cursor-pointer">Dessert</Tab>
                        <Tab className="uppercase font-Inter font-bold text-2xl text-white border-b-4 border-b-transparent pb-2 cursor-pointer">Drink</Tab>
                    </TabList>
                    {loading ?
                        <span className="loading loading-ring loading-lg"></span>
                        :
                        <div>
                            <TabPanel>
                                <div className="max-w-5xl mx-auto px-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {
                                        salad.map(item => <div key={item._id} className="space-y-4 flex flex-col pb-8 bg-[#F3F3F3]">
                                            <div className="relative space-y-4 grow">
                                                <figure>
                                                    <img className="w-full" src={item.image} alt="" />
                                                </figure>
                                                <p className="absolute top-1 right-2 rounded-lg py-2 px-3 bg-[#151515] text-white font-Inter font-semibold text-lg">${item.price.toFixed(2)}</p>
                                                <h1 className="font-Inter text-2xl font-semibold text-[#151515] px-5">{item.name}</h1>
                                                <p className="font-Inter text-base font-normal text-[#151515] px-5">{item.recipe}</p>
                                            </div>
                                            <button onClick={() => handleAddToCart(item)} className="uppercase w-fit mx-auto font-Inter font-medium text-xl text-[#BB8506] px-6 py-2 rounded-lg border-b-2 border-[#BB8506] hover:border-b-2 hover:border-[#1F2937] bg-[#F3F3F3] hover:bg-[#1F2937] duration-300">Add To Cart</button>
                                        </div>)
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="max-w-5xl mx-auto px-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {
                                        pizza.map(item => <div key={item._id} className="space-y-4 flex flex-col pb-8 bg-[#F3F3F3]">
                                            <div className="relative space-y-4 grow">
                                                <figure>
                                                    <img className="w-full" src={item.image} alt="" />
                                                </figure>
                                                <p className="absolute top-1 right-2 rounded-lg py-2 px-3 bg-[#151515] text-white font-Inter font-semibold text-lg">${item.price.toFixed(2)}</p>
                                                <h1 className="font-Inter text-2xl font-semibold text-[#151515] px-5">{item.name}</h1>
                                                <p className="font-Inter text-base font-normal text-[#151515] px-5">{item.recipe}</p>
                                            </div>
                                            <button onClick={() => handleAddToCart(item)} className="uppercase w-fit mx-auto font-Inter font-medium text-xl text-[#BB8506] px-6 py-2 rounded-lg border-b-2 border-[#BB8506] hover:border-b-2 hover:border-[#1F2937] bg-[#F3F3F3] hover:bg-[#1F2937] duration-300">Add To Cart</button>
                                        </div>)
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="max-w-5xl mx-auto px-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {
                                        soup.map(item => <div key={item._id} className="space-y-4 flex flex-col pb-8 bg-[#F3F3F3]">
                                            <div className="relative space-y-4 grow">
                                                <figure>
                                                    <img className="w-full" src={item.image} alt="" />
                                                </figure>
                                                <p className="absolute top-1 right-2 rounded-lg py-2 px-3 bg-[#151515] text-white font-Inter font-semibold text-lg">${item.price.toFixed(2)}</p>
                                                <h1 className="font-Inter text-2xl font-semibold text-[#151515] px-5">{item.name}</h1>
                                                <p className="font-Inter text-base font-normal text-[#151515] px-5">{item.recipe}</p>
                                            </div>
                                            <button onClick={() => handleAddToCart(item)} className="uppercase w-fit mx-auto font-Inter font-medium text-xl text-[#BB8506] px-6 py-2 rounded-lg border-b-2 border-[#BB8506] hover:border-b-2 hover:border-[#1F2937] bg-[#F3F3F3] hover:bg-[#1F2937] duration-300">Add To Cart</button>
                                        </div>)
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="max-w-5xl mx-auto px-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {
                                        dessert.map(item => <div key={item._id} className="space-y-4 flex flex-col pb-8 bg-[#F3F3F3]">
                                            <div className="relative space-y-4 grow">
                                                <figure>
                                                    <img className="w-full" src={item.image} alt="" />
                                                </figure>
                                                <p className="absolute top-1 right-2 rounded-lg py-2 px-3 bg-[#151515] text-white font-Inter font-semibold text-lg">${item.price.toFixed(2)}</p>
                                                <h1 className="font-Inter text-2xl font-semibold text-[#151515] px-5">{item.name}</h1>
                                                <p className="font-Inter text-base font-normal text-[#151515] px-5">{item.recipe}</p>
                                            </div>
                                            <button onClick={() => handleAddToCart(item)} className="uppercase w-fit mx-auto font-Inter font-medium text-xl text-[#BB8506] px-6 py-2 rounded-lg border-b-2 border-[#BB8506] hover:border-b-2 hover:border-[#1F2937] bg-[#F3F3F3] hover:bg-[#1F2937] duration-300">Add To Cart</button>
                                        </div>)
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="max-w-5xl mx-auto px-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {
                                        drinks.map(item => <div key={item._id} className="space-y-4 flex flex-col pb-8 bg-[#F3F3F3]">
                                            <div className="relative space-y-4 grow">
                                                <figure>
                                                    <img className="w-full" src={item.image} alt="" />
                                                </figure>
                                                <p className="absolute top-1 right-2 rounded-lg py-2 px-3 bg-[#151515] text-white font-Inter font-semibold text-lg">${item.price.toFixed(2)}</p>
                                                <h1 className="font-Inter text-2xl font-semibold text-[#151515] px-5">{item.name}</h1>
                                                <p className="font-Inter text-base font-normal text-[#151515] px-5">{item.recipe}</p>
                                            </div>
                                            <button onClick={() => handleAddToCart(item)} className="uppercase w-fit mx-auto font-Inter font-medium text-xl text-[#BB8506] px-6 py-2 rounded-lg border-b-2 border-[#BB8506] hover:border-b-2 hover:border-[#1F2937] bg-[#F3F3F3] hover:bg-[#1F2937] duration-300">Add To Cart</button>
                                        </div>)
                                    }
                                </div>
                            </TabPanel>
                        </div>
                    }
                </Tabs>
            </section>
        </section>
    );
};

export default OurShop;
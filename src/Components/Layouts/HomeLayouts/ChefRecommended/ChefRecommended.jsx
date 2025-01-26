import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../SharedLayout/SectionTitle/SectionTitle";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useCart from "../../../../Hooks/useCart";

const ChefRecommended = () => {
    const [recommended, setRecommended] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();


    // Load Menus Data.
    useEffect(() => {
        fetch("http://localhost:5000/menus")
            .then(res => res.json())
            .then(data => {
                const sort = data.slice(0, 3);
                setRecommended(sort);
            })
    }, []);



    // Handle Add To Cart Function.
    const handleAddToCart = (item) => {
        const { _id, name, image, price } = item;

        if (user) {
            // console.log(item, user?.email)
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
                    navigate('/login')
                }
            });
        }
    }


    return (
        <section className="max-w-5xl mx-auto px-2">
            <SectionTitle subHeading={'---Should Try---'} heading={'CHEF RECOMMENDS'} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    recommended.map(item => <div key={item._id} className="space-y-4 flex flex-col pb-8 bg-[#F3F3F3]">
                        <div className="space-y-4 grow">
                            <img className="w-full" src={item.image} alt="" />
                            <h1 className="font-Inter text-2xl font-semibold text-[#151515] px-5">{item.name}</h1>
                            <p className="font-Inter text-base font-normal text-[#151515] px-5">{item.recipe}</p>
                        </div>
                        <button onClick={() => handleAddToCart(item)} className="uppercase w-fit mx-auto font-Inter font-medium text-xl text-[#BB8506] px-6 py-2 rounded-lg border-b-2 border-[#BB8506] hover:border-b-2 hover:border-[#1F2937] bg-[#F3F3F3] hover:bg-[#1F2937] duration-300">Add To Cart</button>
                    </div>)
                }
            </div>
        </section>
    );
};

export default ChefRecommended;
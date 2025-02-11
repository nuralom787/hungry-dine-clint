import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../SharedLayout/SectionTitle/SectionTitle';
import { FaUtensils } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useMenu from '../../../../Hooks/useMenu';
import { useParams } from 'react-router';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [upImg, setUpImg] = useState("");
    const { id } = useParams();
    const [menus] = useMenu();
    const filterMenu = menus.filter(menu => menu._id === id);



    // Preview Image Before Upload.
    const PreviewImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            const imageData = reader.result.split(",")[1];
            setUpImg(imageData);
        };
    };





    // Update Item Function.
    const onSubmit = async (data) => {
        setLoading(true);

        if (!data.recipeImage.length) {
            const findMenu = menus.find(menu => menu._id === id);
            data.recipeImage = findMenu.image;
            // console.log('with old image', data);


            // Store Item Data In Database.
            const menuItem = {
                name: data.recipeName,
                recipe: data.recipeDetails,
                image: data.recipeImage,
                category: data.recipeCategory,
                price: parseFloat(data.recipePrice)

            };

            // Call Server Api Using Axios.
            const menuRes = await axiosSecure.patch(`/menus/upItem/${id}`, menuItem);
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0 || menuRes.data.matchedCount > 0) {
                // reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.recipeName} Item Updated Successfully`,
                    showConfirmButton: false,
                    timer: 2500
                });
                setLoading(false);
            };

        }
        else {
            // console.log('with new selected image', data);
            // Store Image In Image BB And Get Image Link.
            const imageFile = { image: data.recipeImage[0] }
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {

                // Store Item Data In Database.
                const menuItem = {
                    name: data.recipeName,
                    recipe: data.recipeDetails,
                    image: res.data.data.image.url,
                    category: data.recipeCategory,
                    price: parseFloat(data.recipePrice)

                };

                // Call Server Api Using Axios.
                const menuRes = await axiosSecure.patch(`/menus/upItem/${id}`, menuItem);
                // console.log(menuRes.data);
                if (menuRes.data.modifiedCount > 0) {
                    // reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${data.recipeName} Item Updated Successfully`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    setLoading(false);
                };
            }
        }

    };



    return (
        <section className="min-h-screen px-10 bg-gray-300 dark:bg-base-300">
            <section className="max-h-screen overflow-y-auto">
                <Helmet>
                    <title>Hungry Dine | Update Item</title>
                </Helmet>
                {!filterMenu.length ?
                    <div className='flex justify-center min-h-screen'>
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
                    :
                    <div>
                        <div className="text-center">
                            <SectionTitle heading="Update an item"></SectionTitle>
                        </div>
                        <div className="bg-gray-200 dark:bg-base-100 rounded-xl p-8 mb-8">
                            {filterMenu.map(menu => <form key={menu._id} onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control mb-5">
                                    <label className="label">
                                        <span className="font-semibold text-xl text-[#151515] dark:text-white font-Inter">Recipe Name <span className="text-red-600 text-xl">*</span></span>
                                    </label>
                                    <input
                                        {...register("recipeName", { required: true })}
                                        defaultValue={menu.name}
                                        type="text"
                                        placeholder="Recipe Name"
                                        className="px-4 py-3 rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-transparent dark:bg-base-100 text-[#151515] dark:text-white font-Inter font-semibold text-lg outline-0"
                                    />
                                    {errors.recipeName && <p className="text-red-700 font-Inter font-semibold" role="alert">{"This field id required *"}</p>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control mb-5">
                                        <label className="label">
                                            <span className="font-semibold text-xl text-[#151515] dark:text-white font-Inter">Recipe Category <span className="text-red-600 text-xl">*</span></span>
                                        </label>
                                        <select
                                            {...register("recipeCategory", { required: true })}
                                            className="uppercase h-full px-4 py-3 rounded-md border border-[#151515] focus:border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-transparent dark:bg-base-100 text-[#151515] dark:text-white font-Inter font-semibold text-lg outline-0 focus:outline-0 select">
                                            <option className="uppercase" value={menu.category} hidden>{menu.category}</option>
                                            <option className="uppercase" value="salad">salad</option>
                                            <option className="uppercase" value="pizza">pizza</option>
                                            <option className="uppercase" value="soup">soup</option>
                                            <option className="uppercase" value="dessert">dessert</option>
                                            <option className="uppercase" value="drink">drink</option>
                                            <option className="uppercase" value="popular">popular</option>
                                        </select>
                                        {errors.recipeCategory && <p className="text-red-700 font-Inter font-semibold">{"This field id required *"}</p>}
                                    </div>
                                    <div className="form-control mb-5">
                                        <label className="label">
                                            <span className="font-semibold text-xl text-[#151515] dark:text-white font-Inter">Recipe Price <span className="text-red-600 text-xl">*</span></span>
                                        </label>
                                        <input
                                            {...register("recipePrice", { required: true })}
                                            defaultValue={menu.price.toFixed(2)}
                                            type="number"
                                            placeholder="Recipe Price"
                                            className="px-4 py-3 rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-transparent dark:bg-base-100 text-[#151515] dark:text-white font-Inter font-semibold text-lg outline-0"
                                        />
                                        {errors.recipePrice && <p className="text-red-700 font-Inter font-semibold" role="alert">{"This field id required *"}</p>}
                                    </div>
                                </div>
                                <div className="form-control mb-5">
                                    <label className="label">
                                        <span className="font-semibold text-xl text-[#151515] dark:text-white font-Inter">Recipe Details <span className="text-red-600 text-xl">*</span></span>
                                    </label>
                                    <textarea
                                        {...register("recipeDetails", { required: true })}
                                        defaultValue={menu.recipe}
                                        rows="5"
                                        placeholder="Recipe Details"
                                        className="px-4 py-3 rounded-md border border-[#151515] dark:border-gray-500 dark:focus:border-gray-100 bg-transparent dark:bg-base-100 text-[#151515] dark:text-white font-Inter font-semibold text-lg outline-0"
                                    >
                                    </textarea>
                                    {errors.recipeDetails && <p className="text-red-700 font-Inter font-semibold" role="alert">{"This field id required *"}</p>}
                                </div>
                                <div className="mt-6">
                                    <div>
                                        <input
                                            {...register("recipeImage")}
                                            onChange={e => PreviewImg(e)}
                                            type="file"
                                            className="file-input file-input-bordered w-full max-w-xs"
                                        />
                                        {errors.recipeImage && <p className="text-red-700 font-Inter font-semibold" role="alert">{"This field id required *"}</p>}
                                    </div>
                                    <div className='w-40 mt-4'>
                                        {upImg ?
                                            <img className='rounded-lg' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                            :
                                            <img className='rounded-lg' src={menu.image} alt="" id='ProfileImg' />
                                        }
                                    </div>
                                </div>
                                <div className="divider before:bg-[#151515] dark:before:bg-white after:bg-[#151515] dark:after:bg-white"></div>
                                <div className="flex justify-end">
                                    {loading ?
                                        <div className="w-40 flex justify-center items-center gap-4 font-Inter font-bold text-xl text-white px-6 py-4 rounded-lg bg-gradient-to-r from-[#835D23] to-[#B58130]">
                                            <span className="loading loading-spinner loading-md"></span>
                                        </div>
                                        :
                                        <button
                                            type="submit"
                                            className="flex items-center gap-4 font-Inter font-bold text-xl text-white px-6 py-3 rounded-lg bg-gradient-to-r from-[#835D23] to-[#B58130]">
                                            Update Item
                                            <FaUtensils />
                                        </button>}
                                </div>
                            </form>)
                            }
                        </div>
                    </div>
                }
            </section>
        </section>
    );
};

export default UpdateItem;
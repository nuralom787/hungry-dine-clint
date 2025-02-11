import { Helmet } from "react-helmet-async";
import SectionTitle from "../../SharedLayout/SectionTitle/SectionTitle";
import useMenu from "../../../../Hooks/useMenu";
import { IoIosArrowDown } from "react-icons/io";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const ManageItem = () => {
    const [menus, isPending, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();


    // Handle Item Delete.
    const handleDelete = (menu) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menus/deleteItem/${menu._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: `${menu.name} has been deleted.`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    refetch();
                }
            }
        });
    };


    return (
        <section className="min-h-screen px-10 bg-gray-300 dark:bg-base-300">
            <section className="max-h-screen overflow-y-auto">
                <Helmet>
                    <title>Hungry Dine | Manage Item</title>
                </Helmet>
                <div className="text-center">
                    <SectionTitle heading="Manage All Items" subHeading="--- Hurry Up! ---"></SectionTitle>
                </div>
                <div className="flex justify-around items-center py-5 mt-6">
                    <h1 className="font-Cinzel font-bold text-3xl text-[#151515] dark:text-white">Total Items: {menus.length}</h1>
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
                                    <th className="font-Inter text-[#151515] dark:text-white">IMAGE<IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">NAME <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">PRICE <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="text-center font-Inter text-[#151515] dark:text-white">ACTION <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="text-center font-Inter text-[#151515] dark:text-white">ACTION <IoIosArrowDown className="inline-flex" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    menus.map((menu, idx) => <tr key={menu._id} className="border-t border-b-base-300 dark:border-b-white my-6">
                                        <th className="font-Inter font-semibold text-[#151515] dark:text-white">
                                            <p>{idx + 1}</p>
                                        </th>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white">
                                            <img className="w-24 rounded-lg" src={menu.image} alt="" />
                                        </td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white uppercase">
                                            <p>{menu.name}</p>
                                        </td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white">
                                            <p>${menu.price.toFixed(2)}</p>
                                        </td>
                                        <td className="flex justify-center font-Inter font-semibold text-[#151515] dark:text-white">
                                            <Link to={`/dashboard/manage-item/update-item/${menu.name}/${menu._id}`} className="bg-green-600 p-4 m-1 rounded-md block w-fit"><FaRegEdit className="text-white text-2xl" /></Link>
                                        </td>
                                        <td className="text-center font-Inter font-semibold text-[#151515] dark:text-white">
                                            <button onClick={() => handleDelete(menu)} className="bg-red-600 p-4 rounded-md"><FaTrashAlt className="text-white text-2xl" /></button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </section>
        </section>
    );
};

export default ManageItem;
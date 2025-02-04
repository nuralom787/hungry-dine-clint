import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { IoIosArrowDown } from 'react-icons/io';
import { FaTrashAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import profile from '../../../../assets/others/profile.png';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);


    // Load Data
    const { refetch, isPending, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    });


    const filteredUser = users.filter(fUser => fUser.email !== user.email);


    // Delete User Function.
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "If you delete it, you can't revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete User!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User Deleted Successfully.",
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


    // Update User Role.
    const updateRole = (e, role = 'User', id) => {
        // console.log(e.target.value);
        const newRole = e.target.value;

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to update this user role from ${role} to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${id}`, { role: newRole })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: "Updated!",
                                text: "User Role Updated Successfully.",
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
        <section className='min-h-screen px-10 bg-gray-300 dark:bg-base-300'>
            <section className="max-h-screen overflow-y-auto">
                <Helmet>
                    <title>Hungry Dine | Users</title>
                </Helmet>
                <div className="flex justify-around items-center py-5 mt-6">
                    <h1 className="font-Cinzel font-bold text-3xl text-[#151515] dark:text-white">Total Users: {users.length}</h1>
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
                                    <th className="font-Inter text-[#151515] dark:text-white">EMAIL <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">ROLE <IoIosArrowDown className="inline-flex" /></th>
                                    <th className="font-Inter text-[#151515] dark:text-white">ACTION <IoIosArrowDown className="inline-flex" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredUser.map((user, idx) => <tr key={user._id} className="border-t border-b-base-300 dark:border-b-white my-6">
                                        <th className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{idx + 1}</p></th>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><img className="w-14 rounded-full" src={user?.image || profile} alt="" /></td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white uppercase"><p>{user?.name}</p></td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><p>{user?.email}</p></td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white">
                                            <select onChange={() => updateRole(event, user.role, user._id)} name="role" id="role" className='uppercase bg-gray-100 dark:bg-gray-800 p-1 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 focus:border-gray-500 outline-0 text-sm rounded-md items-center'>
                                                <option defaultValue={user?.role} hidden>{user?.role || 'user'}</option>
                                                <option value="admin" hidden={user.role === 'admin' && true}>ADMIN</option>
                                                <option value="moderator" hidden={user.role === 'moderator' && true}>MODERATOR</option>
                                                <option value="user" hidden={user.role === 'user' && true}>USER</option>
                                            </select>
                                            {/* <p>{user?.role || 'USER'}</p> */}
                                        </td>
                                        <td className="font-Inter font-semibold text-[#151515] dark:text-white"><button onClick={() => handleDelete(user._id)} className="bg-red-600 p-2 rounded-md"><FaTrashAlt className="text-white text-2xl" /></button></td>
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

export default AllUsers;
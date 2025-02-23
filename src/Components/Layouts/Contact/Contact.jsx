import { Helmet } from "react-helmet-async";
import Cover from "../SharedLayout/Cover/Cover";
import contactImg from '../../../assets/contact/banner.jpg';
import SectionTitle from "../SharedLayout/SectionTitle/SectionTitle";
import { FiPhoneCall } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form"

const Contact = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <section>
            <Helmet>
                <title>Hungry Dine | Contact</title>
            </Helmet>
            <Cover bgImage={contactImg} title={"Contact Us"} subtitle={"would you like to try a dish?"} />
            <section className="max-w-5xl mx-auto px-2">
                <SectionTitle heading={"Our Location"} subHeading={"---Visit Us---"}></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-16">
                    <div className="flex flex-col">
                        <div className="flex justify-center p-5 text-white bg-[#D1A054]">
                            <FiPhoneCall className="font-extrabold text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 grow bg-gray-200 dark:bg-white p-8">
                            <h2 className="font-Inter font-medium text-2xl text-[#151515] uppercase">Phone</h2>
                            <p className="font-normal font-Inter text-base text-[#151515]">+38 (012) 34 56 789</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-center p-5 text-white bg-[#D1A054]">
                            <FaLocationDot className="font-extrabold text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 grow bg-gray-200 dark:bg-white p-8">
                            <h2 className="font-Inter font-medium text-2xl text-[#151515] uppercase">Address</h2>
                            <p className="font-normal font-Inter text-base text-[#151515]">+38 (012) 34 56 789</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-center p-5 text-white bg-[#D1A054]">
                            <IoTime className="font-extrabold text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 grow bg-gray-200 dark:bg-white p-8">
                            <h2 className="font-Inter font-medium text-2xl text-[#151515] uppercase">Working Hours</h2>
                            <p className="font-normal font-Inter text-base text-[#151515]">Mon - Fri: 08:00 - 22:00</p>
                            <p className="font-normal font-Inter text-base text-[#151515]">Sat - Sun: 10:00 - 23:00</p>
                        </div>
                    </div>
                </div>
                <SectionTitle heading={"CONTACT FORM"} subHeading={"---Send Us a Message---"}></SectionTitle>
                <div className="bg-gray-200 dark:bg-base-300 p-24 my-20 rounded-xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-xl text-[#151515] dark:text-white">Name <span className="text-red-700">*</span></span>
                                    </label>
                                    <input
                                        placeholder="Enter your name"
                                        className="placeholder:text-[#A1A1A1] font-semibold font-Inter text-xl text-[#151515] dark:text-white bg-white dark:bg-[#121212] py-3 px-6 rounded-lg outline-0"
                                        name="name" type="text" {...register("name")} />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-xl text-[#151515] dark:text-white">Email <span className="text-red-700">*</span></span>
                                    </label>
                                    <input
                                        placeholder="Enter your email"
                                        className="placeholder:text-[#A1A1A1] font-semibold font-Inter text-xl text-[#151515] dark:text-white bg-white dark:bg-[#121212] py-3 px-6 rounded-lg outline-0"
                                        name="email" type="email" {...register("email")} />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold font-Inter text-xl text-[#151515] dark:text-white">Phone <span className="text-red-700">*</span></span>
                                </label>
                                <input
                                    placeholder="Enter your phone number"
                                    className="w-full placeholder:text-[#A1A1A1] font-semibold font-Inter text-xl text-[#151515] dark:text-white bg-white dark:bg-[#121212] py-3 px-6 rounded-lg outline-0"
                                    name="number" type="number" {...register("phone")} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold font-Inter text-xl text-[#151515] dark:text-white">Message <span className="text-red-700">*</span></span>
                                </label>
                                <textarea
                                    placeholder="Wright your message here"
                                    className="w-full placeholder:text-[#A1A1A1] font-semibold font-Inter text-xl text-[#151515] dark:text-white bg-white dark:bg-[#121212] py-3 px-6 rounded-lg outline-0"
                                    name="message" id="message" cols="30" rows="5" {...register("message")}></textarea>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#835D23] to-[#B58130] text-white font-bold font-Inter text-xl py-3 px-6 mt-16 text-center mx-auto flex items-center gap-2"
                        >
                            Send Message
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </section>
        </section>
    );
};

export default Contact;
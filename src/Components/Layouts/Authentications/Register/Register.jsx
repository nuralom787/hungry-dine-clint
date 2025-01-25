import { Helmet } from "react-helmet-async";
import './Register.css';
import loginImg from '../../../../assets/others/authentication2.png';
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";

const Register = () => {
    // HookForm.
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const currentTheme = localStorage.getItem('theme');
    const { CreateUser, UpdateUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    // Captcha Code.
    useEffect(() => {
        loadCaptchaEnginge(6)
    }, []);


    // React Hook Form.
    const onSubmit = (data) => {
        if (validateCaptcha(data.captcha, false)) {
            CreateUser(data.email, data.password)
                .then(result => {
                    // const user = result.user;
                    const info = { name: data.name }
                    UpdateUserInfo(info)
                        .then(() => {
                            // console.log('User Profile Updated Successfully')
                            navigate('/');
                            toast.success('New User Created Successfully', {
                                position: 'top-center',
                                autoClose: 2500
                            })
                            // console.log(user);
                        })
                        .catch(err => {
                            toast.error(err.message, {
                                position: 'top-center',
                                autoClose: 5000
                            });
                        })
                })
                .catch(err => {
                    toast.error(err.message, {
                        position: 'top-center',
                        autoClose: 5000
                    });
                })
        } else {
            toast.error('Captcha Not Match', {
                position: 'top-center',
                autoClose: 5000
            })
        }
    };


    return (
        <section className={`mx-auto px-2 ${currentTheme === 'light' ? 'register-bg' : 'bg-[#151515]'} min-h-screen`}>
            <Helmet>
                <title>Hungry Dine | Register</title>
            </Helmet>
            <div className="max-w-6xl mx-auto py-10">
                <div className={`md:hero ${currentTheme === 'light' ? 'bg-transparent' : 'bg-base-100'} shadow-xl rounded-2xl max-h-fit py-10`}>
                    <div className="hero-content p-0 flex flex-row-reverse justify-between items-center gap-0">
                        <div className="hidden md:block text-center w-2/4">
                            <img src={loginImg} alt="" />
                        </div>
                        <div className="card gap-3 md:gap-0 bg-transparent py-10 px-8 w-full md:w-2/4">
                            <h1 className={`text-center font-Inter font-bold text-4xl ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'}`}>Register</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="md:card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className={`font-semibold font-Inter ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'}`}>Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="text" placeholder="Enter Your Name" className={`px-5 py-3 font-Inter font-semibold text-base ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'} rounded-lg outline-0 border border-gray-500 bg-transparent`} />
                                    {errors.name?.type === 'required' && <span className="font-Inter text-red-600 font-semibold text-base py-2">Name field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className={`font-semibold font-Inter ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'}`}>Email</span>
                                    </label>
                                    <input {...register("email", { required: true })} type="email" placeholder="Enter Your Email" className={`px-5 py-3 font-Inter font-semibold text-base ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'} rounded-lg outline-0 border border-gray-500 bg-transparent`} />
                                    {errors.email && <span className="font-Inter text-red-600 font-semibold text-base py-2">Email field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className={`font-semibold font-Inter ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'}`}>Password</span>
                                    </label>
                                    <input {...register("password", { required: true, minLength: 6, maxLength: 20 })} type="password" placeholder="Enter Your Password" className={`px-5 py-3 font-Inter font-semibold text-base ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'} rounded-lg outline-0 border border-gray-500 bg-transparent`} />
                                    {errors.password?.type === 'required' && <span className="font-Inter text-red-600 font-semibold text-base py-2">Password field is required</span>}
                                    {errors.password?.type === 'minLength' && <span className="font-Inter text-red-600 font-semibold text-base py-2">Password Must Be Higher Then 6 Character.</span>}
                                    {errors.password?.type === 'maxLength' && <span className="font-Inter text-red-600 font-semibold text-base py-2">Password Must Be Lower Then 20 Character. </span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input {...register("captcha", { required: true })} type="text" placeholder="Enter Captcha Text" className={`px-5 py-3 font-Inter font-semibold text-base ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'} rounded-lg outline-0 border border-gray-500 bg-transparent`} />
                                    {errors.captcha && <span className="font-Inter text-red-600 font-semibold text-base py-2">Captcha field is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" value="Register" className="px-5 py-3 bg-[#D1A05499] hover:bg-[#D1A054] duration-500 text-white font-Inter font-bold text-xl rounded-lg cursor-pointer" />
                                </div>
                            </form>
                            <div className="text-center space-y-3">
                                <p className="font-Inter text-base font-medium text-[#D1A054]">Already Registered? <Link to={'/login'} className="font-bold hover:underline">Go to Login</Link></p>
                                <p className={`font-Inter font-medium ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'}`}>Or Register With</p>
                                <div className="flex justify-center items-center gap-10">
                                    <button className={`border-2 border-[#444444] ${currentTheme === 'dark' && 'border-white'} rounded-full p-3`}><FaFacebookF className={`text-2xl  ${currentTheme === 'light' ? 'text-[#444444]' : 'text-white'}`} /></button>
                                    <button className={`border-2 border-[#444444] ${currentTheme === 'dark' && 'border-white'} rounded-full p-3`}><FaGoogle className={`text-2xl  ${currentTheme === 'light' ? 'text-[#444444]' : 'text-white'}`} /></button>
                                    <button className={`border-2 border-[#444444] ${currentTheme === 'dark' && 'border-white'} rounded-full p-3`}><FaGithub className={`text-2xl  ${currentTheme === 'light' ? 'text-[#444444]' : 'text-white'}`} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
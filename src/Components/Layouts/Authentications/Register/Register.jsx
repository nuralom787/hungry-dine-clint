import { Helmet } from "react-helmet-async";
import './Register.css';
import loginImg from '../../../../assets/others/authentication2.png';
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const Register = () => {
    // HookForm.
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const { CreateUser, UpdateUserInfo, GoogleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const currentTheme = localStorage.getItem('theme');
    // console.log(location);


    const from = location.state?.from?.pathname || '/';

    // Captcha Code.
    useEffect(() => {
        loadCaptchaEnginge(6)
    }, []);


    // React Hook Form.
    const onSubmit = (data) => {
        if (validateCaptcha(data.captcha, false)) {
            CreateUser(data.email, data.password)
                .then(result => {
                    const info = { name: data.name }
                    UpdateUserInfo(info)
                        .then(() => {
                            const userInfo = {
                                name: data.name,
                                email: data.email
                            };
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    console.log(res.data);
                                    if (res.data.insertedId) {
                                        toast.success('New User Created Successfully', {
                                            position: 'top-center',
                                            autoClose: 2500
                                        })
                                        navigate('/');
                                    }
                                })
                                .catch(err => {
                                    console.log(err.message);
                                })
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


    // Handle Login With Google Function.
    const handleGoogleLogin = () => {
        GoogleLogin()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate(from, { replace: true });
                        toast.success('User Login Successfully', {
                            position: 'top-right',
                            autoClose: 2500
                        })
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            })
            .catch(err => {
                toast.error(err.message);
            })
    };




    return (
        <section className={`mx-auto px-2 ${currentTheme === 'light' ? 'register-bg' : 'bg-[#151515]'} min-h-screen`}>
            <Helmet>
                <title>Hungry Dine | Register</title>
            </Helmet>
            <div className="max-w-6xl mx-auto py-10">
                <div className="md:hero bg-transparent dark:bg-base-100 shadow-xl dark:shadow-none rounded-2xl max-h-fit py-10">
                    <div className="hero-content p-0 flex flex-row-reverse justify-between items-center gap-0">
                        <div className="hidden md:block text-center w-2/4">
                            <img src={loginImg} alt="" />
                        </div>
                        <div className="card gap-3 md:gap-0 bg-transparent py-10 px-8 w-full md:w-2/4">
                            <h1 className="text-center font-Inter font-bold text-4xl text-[#151515] dark:text-white">Register</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="md:card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-[#151515] dark:text-white">Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="text" placeholder="Enter Your Name" className="px-5 py-3 font-Inter font-semibold text-base text-[#151515] dark:text-white rounded-lg outline-0 border border-gray-500 bg-transparent" />
                                    {errors.name?.type === 'required' && <span className="font-Inter text-red-600 font-semibold text-base py-2">Name field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-[#151515] dark:text-white">Email</span>
                                    </label>
                                    <input {...register("email", { required: true })} type="email" placeholder="Enter Your Email" className="px-5 py-3 font-Inter font-semibold text-base text-[#151515] dark:text-white rounded-lg outline-0 border border-gray-500 bg-transparent" />
                                    {errors.email && <span className="font-Inter text-red-600 font-semibold text-base py-2">Email field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-[#151515] dark:text-white">Password</span>
                                    </label>
                                    <input {...register("password", { required: true, minLength: 6, maxLength: 20 })} type="password" placeholder="Enter Your Password" className="px-5 py-3 font-Inter font-semibold text-base text-[#151515] dark:text-white rounded-lg outline-0 border border-gray-500 bg-transparent" />
                                    {errors.password?.type === 'required' && <span className="font-Inter text-red-600 font-semibold text-base py-2">Password field is required</span>}
                                    {errors.password?.type === 'minLength' && <span className="font-Inter text-red-600 font-semibold text-base py-2">Password Must Be Higher Then 6 Character.</span>}
                                    {errors.password?.type === 'maxLength' && <span className="font-Inter text-red-600 font-semibold text-base py-2">Password Must Be Lower Then 20 Character. </span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input {...register("captcha", { required: true })} type="text" placeholder="Enter Captcha Text" className="px-5 py-3 font-Inter font-semibold text-base text-[#151515] dark:text-white rounded-lg outline-0 border border-gray-500 bg-transparent" />
                                    {errors.captcha && <span className="font-Inter text-red-600 font-semibold text-base py-2">Captcha field is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" value="Register" className="px-5 py-3 bg-[#D1A05499] hover:bg-[#D1A054] duration-500 text-white font-Inter font-bold text-xl rounded-lg cursor-pointer" />
                                </div>
                            </form>
                            <div className="text-center space-y-3">
                                <p className="font-Inter text-base font-medium text-[#D1A054]">Already Registered? <Link to={'/login'} className="font-bold hover:underline">Go to Login</Link></p>
                                <div className="divider before:bg-[#151515] dark:before:bg-white after:bg-[#151515] dark:after:bg-white text-[#D1A054] font-Inter font-bold text-sm">Or Continue With</div>
                                <div className="flex justify-center items-center gap-10">
                                    <button className="border-2 border-[#444444] dark:border-white rounded-full p-3"><FaFacebookF className="text-2xl text-[#444444] dark:text-white" /></button>
                                    <button onClick={handleGoogleLogin} className="border-2 border-[#444444] dark:border-white rounded-full p-3"><FaGoogle className="text-2xl text-[#444444] dark:text-white" /></button>
                                    <button className="border-2 border-[#444444] dark:border-white rounded-full p-3"><FaGithub className="text-2xl text-[#444444] dark:text-white" /></button>
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
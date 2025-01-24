import { Helmet } from "react-helmet-async";
import loginImg from '../../../../assets/others/authentication2.png';
import { Link } from "react-router";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import './Login.css';
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

const Login = () => {
    const currentTheme = localStorage.getItem('theme');
    const { LoginUser } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6)
    }, []);

    const handleLogin = e => {
        e.preventDefault();

        const formData = e.target;
        const email = formData.email.value;
        const password = formData.password.value;
        const captcha = formData.captcha.value;

        // console.log(email, password, captcha);

        if (validateCaptcha(captcha, false)) {
            LoginUser(email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                })
                .catch(err => {
                    console.log(err.message);
                })
        } else {
            alert('Captcha Not Match')
        }
    };


    return (
        <section className={`mx-auto px-2 ${currentTheme === 'light' ? 'login-bg' : 'bg-[#151515]'} min-h-screen`}>
            <Helmet>
                <title>Hungry Dine | Login</title>
            </Helmet>
            <div className="max-w-6xl mx-auto py-10">
                <div className={`md:hero ${currentTheme === 'light' ? 'bg-transparent' : 'bg-base-100'} shadow-xl rounded-2xl max-h-fit py-10`}>
                    <div className="hero-content p-0 flex justify-between items-center gap-8">
                        <div className="hidden md:block text-center w-2/4">
                            <img src={loginImg} alt="" />
                        </div>
                        <div className="card gap-3 md:gap-0 bg-transparent py-10 px-8 w-full md:w-2/4">
                            <h1 className="text-center font-Inter font-bold text-4xl text-[#151515] dark:text-white">Login</h1>
                            <form onSubmit={handleLogin} className="md:card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-[#151515] dark:text-white">Email</span>
                                    </label>
                                    <input name="email" type="email" placeholder="Enter Your Email" className={`px-5 py-3 font-Inter font-semibold text-base ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'} rounded-lg outline-0 border border-gray-500 bg-transparent`} required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-[#151515] dark:text-white">Password</span>
                                    </label>
                                    <input name="password" type="password" placeholder="Enter Your Password" className={`px-5 py-3 font-Inter font-semibold text-base ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'} rounded-lg outline-0 border border-gray-500 bg-transparent`} required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input name="captcha" type="text" placeholder="Enter Captcha Text" className={`px-5 py-3 font-Inter font-semibold text-base ${currentTheme === 'light' ? 'text-[#151515]' : 'text-white'} rounded-lg outline-0 border border-gray-500 bg-transparent`} required />
                                </div>
                                <Link to={'/'} className="w-fit label-text-alt link link-hover text-[#151515] dark:text-white hover:text-[#151515]">Forgot password?</Link>
                                <div className="form-control mt-6">
                                    <input type="submit" value="Login" className="px-5 py-3 bg-[#D1A05499] hover:bg-[#D1A054] duration-500 text-white font-Inter font-bold text-xl rounded-lg cursor-pointer" />
                                </div>
                            </form>
                            <div className="text-center space-y-3">
                                <p className="font-Inter text-base font-medium text-[#D1A054]">New Here? <Link to={'/register'} className="font-bold hover:underline">Create a New Account</Link></p>
                                <p className="font-Inter font-medium text-[#444444] dark:text-white">Or Login With</p>
                                <div className="flex justify-center items-center gap-10">
                                    <button className="border-2 border-[#444444] dark:border-white rounded-full p-3"><FaFacebookF className="text-2xl text-[#444444] dark:text-white" /></button>
                                    <button className="border-2 border-[#444444] dark:border-white rounded-full p-3"><FaGoogle className="text-2xl text-[#444444] dark:text-white" /></button>
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

export default Login;
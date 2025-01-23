import { Helmet } from "react-helmet-async";
import loginImg from '../../../../assets/others/authentication2.png';
import './Login.css';

const Login = () => {
    return (
        <section className="max-w-7xl mx-auto px-2 login-bg dark:bg-base-200 min-h-screen">
            <Helmet>
                <title>Hungry Dine | Login</title>
            </Helmet>
            <div className="max-w-6xl mx-auto py-10">
                <div className="md:hero bg-transparent shadow-xl rounded-2xl max-h-fit py-24">
                    <div className="hero-content p-0 flex justify-between items-center gap-8">
                        <div className="hidden md:block text-center w-2/4">
                            <img src={loginImg} alt="" />
                        </div>
                        <div className="card gap-3 md:gap-0 bg-transparent py-10 px-8 w-full md:w-2/4">
                            <h1 className="text-center font-Inter font-bold text-4xl text-[#151515]">Login</h1>
                            <form className="md:card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-[#151515] dark:text-white">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="px-5 py-3 font-Inter font-semibold text-base text-[#151515] dark:text-white rounded-lg outline-0 border border-gray-500 bg-transparent" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-[#151515] dark:text-white">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="px-5 py-3 font-Inter font-semibold text-base text-[#151515] dark:text-white rounded-lg outline-0 border border-gray-500 bg-transparent" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold font-Inter text-[#151515] dark:text-white">Captcha</span>
                                    </label>
                                    <input type="text" placeholder="Captcha" className="px-5 py-3 font-Inter font-semibold text-base text-[#151515] dark:text-white rounded-lg outline-0 border border-gray-500 bg-transparent" required />
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" value="Login" className="btn btn-outline" />
                                </div>
                            </form>
                            <label className="hover:text-[#151515] text-lg my-2">
                                <a href="#" className="label-text-alt link link-hover text-[#151515] dark:text-white hover:text-[#151515]">Forgot password?</a>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
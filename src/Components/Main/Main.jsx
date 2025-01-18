import { Outlet } from "react-router";
import Navbar from "../Layouts/SharedLayout/Navbar/Navbar";
import Footer from "../Layouts/SharedLayout/Footer/Footer";

const Main = () => {
    return (
        <div className="max-w-7xl mx-auto text-center">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;
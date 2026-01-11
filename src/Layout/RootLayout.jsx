// import { Outlet } from "react-router-dom";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="pt-10 md:pt-20 ">
                <Outlet /> 
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
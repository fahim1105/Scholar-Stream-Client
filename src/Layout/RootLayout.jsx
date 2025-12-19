// import { Outlet } from "react-router-dom";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet /> 
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
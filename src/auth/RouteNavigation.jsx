import { BrowserRouter, Route, Routes } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Home from "../components/Home.jsx";
import Login from "../components/Login.jsx";
import { ToastContainer } from "react-toastify";
import Logout from "../components/Logout.jsx";

const RouteNavigation = () => {
    const refreshToken = secureLocalStorage.getItem("refreshToken");
    const buildNav = () => {
        if (refreshToken) {
            return (
                <>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </BrowserRouter>
                </>
            );
        } else {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            );
        }
    };
    return (
        <>
            {buildNav()}
            <ToastContainer />
        </>
    )
};

export default RouteNavigation;
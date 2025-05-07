import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminGuard() {

    const { isLoggedIn, user } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && user?.role !== "admin") {
            navigate(window.location.pathname);
        }
    }, [isLoggedIn, navigate, user?.role])

    return <Outlet />
}

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthGuard() {

    const { isLoggedIn } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/sign-in");
        }
    }, [isLoggedIn, navigate])

    return <Outlet />;
}

import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminGuard({ children }: { children: React.ReactNode }) {

    const { isLoggedIn, user } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && user?.role !== "admin") {
            navigate(window.location.pathname);
        }
    }, [isLoggedIn, navigate, user?.role])

    return (
        <>
            {children}
        </>
    )
}

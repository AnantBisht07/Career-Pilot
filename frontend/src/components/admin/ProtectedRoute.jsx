import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const ProtectedRoute = ({ children }) => {
    const {user} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if(user === null || user.role !== 'recruiter') {
            navigate('/');
        }
    }, []);

    return (
        <>
        {children}  
         {/* If the user is authorized, it renders whatever component is inside ProtectedRoute. */}
        </>
    )
}

export default ProtectedRoute;
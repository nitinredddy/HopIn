import React, { useEffect, useState } from 'react'
import { Navigate,Outlet } from 'react-router'

const ProtectedRoute = () => {
    const [authStatus,setAuthStatus] = useState("checking")

    useEffect(()=>{
        const verifyJWT = async()=>{
            try {
                const response = await fetch("http://localhost:3000/api/v1/users/get-user",{
                    method:"GET",
                    credentials:"include"
                })

                const jsonResponse = await response.json()

                if(!response.ok){
                    setAuthStatus("unauthorized")
                } else{
                    setAuthStatus("authorized")
                }
            } catch (error) {
                setAuthStatus("unauthorized")
            }
        }

        verifyJWT()
    },[])
    
    if(authStatus==="checking"){
        return (<div>Loading...</div>)
    }
    if(authStatus==="unauthorized"){
        return (<Navigate to={"/login"} replace/>)
    }

    return <Outlet/>
}

export default ProtectedRoute

import React,{useState} from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const Home = () => {
    const navigate = useNavigate()

    const [data,setData] = useState({})

    const handleLogout = async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/v1/users/logout",{
                method:"GET",
                credentials:"include"
            })

            const jsonResponse = await response.json()

            if(response.ok){
                navigate("/login")
                toast.success("Logged out successfully")
            } else{
                toast.error(jsonResponse.message || "Log out failed.Please try again")
            }
        } catch (error) {
            console.log("An error occurred", error)
            toast.error("Something went wrong")
        }
    }

    const handleApiData = async(e)=>{
        try {
            const apiData = await fetch("http://localhost:3000/api/v1/users/get-user",{
                method:"GET",
                credentials:"include"
            })

            const jsonResponse = await apiData.json()

            setData(jsonResponse)
        } catch(error){
            console.log("Some error occurred while fetching user data",error)
        }
    }
  return (
    <div>
        <div className='relative flex bg-white size-full overflow-x-hidden border-black'>
            <div className=''>

            </div>
        </div>
    </div>
  )
}

export default Home

import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const UserDetails = () => {
    const [form,setForm] = useState({
        name:"",
        contact:""
    })

    const handleInputChange = (e)=>{
        const {name,value} = e.target
        setForm((prev)=>({
            ...prev,[name]:value
        }))
    }

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:3000/api/v1/users/user-details",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(form),
                credentials:"include"
            })

            const jsonResponse = await response.json()

            if(response.ok){
                navigate("/home")
            } else{
                toast.error(jsonResponse.message || "Some error occurred")
            }
        } catch (error) {
            toast.error("Something went wrong" || error.message)
        }
    }
  return (
    <div>
        <div className="min-h-screen bg-white flex flex-col px-4 py-6">

        <h2 className="text-center text-lg font-bold text-[#111418]">Tell me about yourself</h2>
        <label className="pt-4">
        <p className="pb-1 font-medium">Name</p>
        <input
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full rounded-xl p-3 bg-[#f0f2f4] text-[#111418]"
            required
        />
        </label>
        <label className="pt-4">
        <p className="pb-1 font-medium">Contact</p>
        <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleInputChange}
            placeholder="Contact No."
            className="w-full rounded-xl p-3 bg-[#f0f2f4] text-[#111418]"
            required
        />
        </label>
        <button
        onClick={handleSubmit}
        className="mt-6 bg-[#1980e6] text-white py-3 rounded-xl font-bold"
        >
        Submit
        </button>
        <br />
        </div>
    </div>
  )
}

export default UserDetails

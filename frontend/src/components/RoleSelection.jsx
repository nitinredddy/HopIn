import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const RoleSelection = () => {
  const [role, setRole] = useState("")

  const handleChange = (e) => {
    setRole(e.target.value)
  }

  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {
        const response = await fetch("http://localhost:3000/api/v1/users/role",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({role})
        })

        const jsonResponse = await response.json()

        if(response.ok){
            navigate("/user-details")
        } else{
            toast.error(jsonResponse.message || "Role selection failed.Please try again")
        }
    } catch (error) {
        toast.error("Something went wrong while submitting your role")
        console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm p-6 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">Select Your Role</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Role</span>
          <select
            value={role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a role</option>
            <option value="pilot">Pilot</option>
            <option value="backpacker">Backpacker</option>
          </select>
        </label>

        {role && (
          <p className="text-center text-sm text-gray-600 mt-2">
            You selected: <span className="font-bold">{role}</span>
          </p>
        )}

        <button onClick={handleSubmit}>submit role</button>
      </div>
    </div>
  )
}

export default RoleSelection

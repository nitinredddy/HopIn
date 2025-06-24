import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value} = e.target
    setForm((prev) => ({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
        credentials: "include"
      })

      const jsonResponse = await response.json()

      if (response.ok) {
        toast.success("SignUp successful")
        setForm({
          email: '',
          password: ''
        })
        navigate("/user-role")
      } else {
        toast.error(jsonResponse.message || "SignUp failed")
      }

    } catch (error) {
      console.log("An error occurred", error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div>

      <div className="min-h-screen bg-white flex flex-col px-4 py-6">

        <h2 className="text-center text-lg font-bold text-[#111418]">Sign up</h2>
        <label className="pt-4">
          <p className="pb-1 font-medium">Email</p>
          <input
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full rounded-xl p-3 bg-[#f0f2f4] text-[#111418]"
            required
          />
        </label>
        <label className="pt-4">
          <p className="pb-1 font-medium">Password</p>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full rounded-xl p-3 bg-[#f0f2f4] text-[#111418]"
            required
          />
        </label>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-[#1980e6] text-white py-3 rounded-xl font-bold"
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default SignUp

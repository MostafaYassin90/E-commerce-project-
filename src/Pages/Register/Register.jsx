import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().nonempty("Name Is Required").min(2, "Name Must Be At Least 2 Characters").max(100),
    email: z.email("InValid Email").nonempty("Email Is Required"),
    password: z.string().nonempty("Password Is Required").min(6, "Password Must Be At Least 6 Characters").max(100),
    rePassword: z.string("").nonempty("RePassword Is Required"),
    phone: z.string().nonempty("Phone Is Required").regex(/^(01[0125][0-9]{8})$/, "We Accept Egyptian Number Only")
  }).refine((data) => {
    return data.password === data.rePassword
  }, {
    path: ["rePassword"],
    error: "RePassword Does'nt Match Password"
  })


  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(schema),
    mode: "onTouched"
  });

  const { register, handleSubmit, formState: { errors } } = form;


  async function handleRegister(data) {
    try {
      setIsLoading(true)
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      if (response.data.message === "success") {
        toast.success(response.data.message)
        console.log(response)
        navigate("/login")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message)
        setErrorMessage(error.response?.data?.message)
      }
    } finally {
      setIsLoading(false)
    }
  }




  return (
    <div className="min-h-[70vh]">
      <div className="container min-h-[70vh] mx-auto flex items-center justify-center">

        <div className="w-full sm:w-125 border-2 p-5 border-gray-200 rounded-md shadow">
          <h2 className="text-center mb-3 text-2xl font-semibold">Register</h2>
          <form onSubmit={handleSubmit(handleRegister)}>

            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold text-gray-800">Name</label>
              <input {...register("name")} type="text" id="name" placeholder="Type Your Name" className="block w-full border-2 border-gray-400 py-1.5 px-3 outline-0 rounded-md placeholder:text-gray-600 placeholder:font-semibold placeholder:text-sm" />
              {errors.name && <p className="text-sm font-semibold text-red-600">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold text-gray-800">Email</label>
              <input {...register("email")} type="email" id="email" placeholder="Email Address" className="block w-full border-2 border-gray-400 py-1.5 px-3 outline-0 rounded-md placeholder:text-gray-600 placeholder:font-semibold placeholder:text-sm" />
              {errors.email && <p className="text-sm font-semibold text-red-600">{errors.email.message}</p>}
            </div>

            {/* password */}
            <div className="mb-4">
              <label htmlFor="password" className="block font-semibold text-gray-800">Password</label>
              <input {...register("password")} type="password" id="password" placeholder="Type Your Password" className="block w-full border-2 border-gray-400 py-1.5 px-3 outline-0 rounded-md placeholder:text-gray-600 placeholder:font-semibold placeholder:text-sm" />
              {errors.password && <p className="text-sm font-semibold text-red-600">{errors.password.message}</p>}
            </div>

            {/* rePassword */}
            <div className="mb-4">
              <label htmlFor="rePassword" className="block font-semibold text-gray-800">Confirm Password</label>
              <input {...register("rePassword")} type="password" id="rePassword" placeholder="Type Your Confirm Password" className="block w-full border-2 border-gray-400 py-1.5 px-3 outline-0 rounded-md placeholder:text-gray-600 placeholder:font-semibold placeholder:text-sm" />
              {errors.rePassword && <p className="text-sm font-semibold text-red-600">{errors.rePassword.message}</p>}
            </div>

            {/* phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block font-semibold text-gray-800">Phone</label>
              <input {...register("phone")} type="number" id="phone" placeholder="Type Your Confirm Password" className="block w-full border-2 border-gray-400 py-1.5 px-3 outline-0 rounded-md placeholder:text-gray-600 placeholder:font-semibold placeholder:text-sm" />
              {errors.phone && <p className="text-sm font-semibold text-red-600">{errors.phone.message}</p>}
            </div>

            {/* Register Btn */}
            <button type="submit" disabled={isLoading} className={`flex items-center justify-center gap-3 w-full bg-black text-white font-semibold py-2 px-4 rounded-md cursor-pointer ${isLoading && "cursor-not-allowed opacity-50"}`}>
              {isLoading && <CgSpinner className="animate-spin text-2xl" />}
              Register
            </button>

          </form>
          {
            errorMessage && 
            <div className="mt-3 p-3 text-center bg-gray-400 rounded-md">
              <p className="text-red-700 font-semibold">{errorMessage}</p>
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default Register
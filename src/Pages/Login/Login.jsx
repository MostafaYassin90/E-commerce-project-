import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {setToken} = useContext(AppContext)
  
  const navigate = useNavigate();

  const schema = z.object({
    email: z.email("InValid Email").nonempty("Email Is Required"),
    password: z.string().nonempty("Password Is Required").min(6, "Password Must Be At Least 6 Characters").max(100),
  })


  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched"
  });

  const { register, handleSubmit, formState: { errors } } = form;


  async function handleRegister(data) {
    try {
      setIsLoading(true)
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      if (response.data.message === "success") {
        toast.success(response.data.message)
        setToken(response.data.token)
        window.localStorage.setItem("token", response.data.token)
        navigate("/")
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
          <h2 className="text-center mb-3 text-2xl font-semibold">Login</h2>
          <form onSubmit={handleSubmit(handleRegister)}>


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



            {/* Login Btn */}
            <button type="submit" disabled={isLoading} className={`flex items-center justify-center gap-3 w-full bg-black text-white font-semibold py-2 px-4 rounded-md cursor-pointer ${isLoading && "cursor-not-allowed opacity-50"}`}>
              {isLoading && <CgSpinner className="animate-spin text-2xl" />}
              Login
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

export default Login
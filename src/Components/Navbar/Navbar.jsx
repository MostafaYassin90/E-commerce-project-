import { Link, NavLink, useNavigate } from "react-router-dom"
import { LuMenu } from "react-icons/lu";
import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";


function Navbar() {
  const [showMenuLinks, setShowMenuLinks] = useState(false);
  const [showDropMenu, setShowDropMenu] = useState(false);
  const { token, setToken , cart } = useContext(AppContext);

  const navigate = useNavigate();


  // Logout Handler
  function logoutHandler() {
    setToken("")
    window.localStorage.removeItem("token")
    setShowMenuLinks(false)
    navigate("/login")
  }


  return (
    <div className="py-3 px-[3vw] xl:px-[7vw] bg-[#111] relative">
      <div className="container mx-auto flex items-center justify-between">

        <Link to={"/"} className="text-white text-2xl font-semibold">Shop Mart</Link>


        <ul className="hidden md:flex md:items-center md:gap-2">
          <li><NavLink to={"/"} className="block py-2 px-3 text-white font-semibold">Home</NavLink></li>
          <li><NavLink to={"/products"} className="block py-2 px-3 text-white font-semibold">Products</NavLink></li>
          <li><NavLink to={"/categories"} className="block py-2 px-3 text-white font-semibold">Categories</NavLink></li>
          <li><NavLink to={"/brands"} className="block py-2 px-3 text-white font-semibold">Brands</NavLink></li>
          <li><NavLink to={"/about"} className="block py-2 px-3 text-white font-semibold">About</NavLink></li>
          <li><NavLink to={"/contact"} className="block py-2 px-3 text-white font-semibold">Contact</NavLink></li>
        </ul>


        <div className="flex items-center gap-4">

          <div className="relative">
            <FaUser onClick={() => { setShowDropMenu(!showDropMenu) }} className="text-xl text-white cursor-pointer" />
            {
              showDropMenu &&
              <div className="bg-[#111] text-white border-2 border-gray-400 rounded-md shadow-2xl absolute w-40 top-10 right-0 py-2">
                <ul className="flex flex-col gap-2">
                  {
                    token
                      ?
                      <>
                        <li><Link to={"/profile"} className="block w-full py-1.5 px-3 hover:bg-gray-600">Profile</Link></li>
                        <li><Link to={"/wishlist"} className="block w-full py-1.5 px-3 hover:bg-gray-600">WishList</Link></li>
                        <li><Link to={"/allorders"} className="block w-full py-1.5 px-3 hover:bg-gray-600">orders</Link></li>
                        <li onClick={() => { logoutHandler() }} className="block w-full py-1.5 px-3 hover:bg-gray-600 cursor-pointer">Logout</li>
                      </>
                      :
                      <>
                        <li><Link to={"/register"} className="block w-full py-1.5 px-3 hover:bg-gray-600">Register</Link></li>
                        <li><Link to={"/login"} className="block w-full py-1.5 px-3 hover:bg-gray-600">Login</Link></li>
                      </>
                  }
                </ul>
              </div>
            }
          </div>

          {
            token &&
            <Link to={"/cart"} className="relative">
              <span className="flex items-center justify-center text-black absolute bg-white border-2 border-white w-5 h-5 rounded-full -top-3 -right-3">{cart?.numOfCartItems}</span>
              <FaShoppingCart className="text-xl text-white cursor-pointer" />
            </Link>
          }

          <LuMenu onClick={() => { setShowMenuLinks(!showMenuLinks) }} className="text-white text-4xl cursor-pointer md:hidden" />
        </div>

      </div>

      {/* Responsive Menu */}
      <div className={`bg-[#111] absolute transition-all duration-300 z-9999 ${showMenuLinks ? "w-full" : "w-0"} h-auto top-full left-0 border-t-2 border-gray-400 overflow-hidden md:hidden`}>
        <ul className="flex flex-col gap-3 py-3">
          <li><Link to={"/"} className="block py-2 px-3 text-white font-semibold" onClick={() => { setShowMenuLinks(false) }}>Home</Link></li>
          <li><Link to={"/products"} className="block py-2 px-3 text-white font-semibold" onClick={() => { setShowMenuLinks(false) }}>Products</Link></li>
          <li><Link to={"/gallery"} className="block py-2 px-3 text-white font-semibold" onClick={() => { setShowMenuLinks(false) }}>Gallery</Link></li>
          <li><Link to={"/about"} className="block py-2 px-3 text-white font-semibold" onClick={() => { setShowMenuLinks(false) }}>About</Link></li>
          <li><Link to={"/contact"} className="block py-2 px-3 text-white font-semibold" onClick={() => { setShowMenuLinks(false) }}>Contact</Link></li>
        </ul>
      </div>



    </div>
  )
}

export default Navbar





/*
<button className="block text-white py-1.5 px-3 bg-gray-700 rounded-md cursor-pointer"> <Link to={"/register"}>Register</Link> </button>
<button className="block text-white py-1.5 px-3 bg-gray-700 rounded-md cursor-pointer"> <Link to={"/login"}>Login</Link> </button>
*/
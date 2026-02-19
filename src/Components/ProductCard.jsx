import { FaRegHeart, FaStar } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";


function ProductCard(props) {
  const { token, getCart } = useContext(AppContext);
  const { product, wishlist, getWishlistProducts } = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()


  // Add To Cart
  async function addToCart(productId, token) {
    if (token) {
      try {
        setIsLoading(true)
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productId }, {
          headers: {
            token: token
          }
        })
        if (response.data.status === "success") {
          toast.success(response.data.message)
          getCart()
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      navigate("/login")
    }
  }

  // Add To Wishlist
  async function addToWishlist(productId) {
    if (token) {
      try {
        const response = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId: productId }, {
          headers: { token: token }
        })
        if (response.data.status === "success") {
          toast.success(response.data.message)
        }
      } catch (error) {
        console.log(error.response?.data.message || error.message)
      }
    } else {
      navigate("/login")
    }

  }

  // Remove Product From WishList
  async function deleteProductFromWishlist(productId) {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: token }
      })
      if (response.data.status === "success") {
        toast.success(response.data.message)
        getWishlistProducts()
      }
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }
  }

  return (
    <div className="border-2 border-gray-200 shadow rounded-xl overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <img src={product.imageCover} alt={product.title} />
        <div className="p-5 border-t-2 border-gray-200 flex flex-col gap-1.5">
          <p className="text-sm font-normal text-gray-600">
            {product.brand.name}
          </p>
          <h3 className="text-[20px] font-semibold line-clamp-1">{product.title}</h3>
          <p className="text-sm font-normal text-gray-600">
            {product.category.name}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-[18px]">
              <FaStar className="text-yellow-600" />
              <FaStar className="text-yellow-600" />
              <FaStar className="text-yellow-600" />
              <FaStar className="text-yellow-600" />
              <FaStar className="text-yellow-600" />
            </div>
            <p className="text-gray-600 font-semibold">
              ({product.ratingsAverage})
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-5 mt-2 px-5 mb-3">
        <button disabled={isLoading} onClick={() => { addToCart(product.id, token) }} className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-md bg-black text-white flex-1 cursor-pointer ${isLoading && "opacity-50 cursor-not-allowed"}`}>
          {isLoading && <CgSpinner className="animate-spin" />}
          <HiOutlineShoppingCart />
          Add To Cart
        </button>
        {
          wishlist ?
            <button onClick={() => { deleteProductFromWishlist(product.id) }} className="border-2 border-gray-400 flex items-center justify-center rounded-md w-10 h-9 cursor-pointer">
              <RiDeleteBin6Line />
            </button>
            :
            <button onClick={() => { addToWishlist(product.id) }} className="border-2 border-gray-400 flex items-center justify-center rounded-md w-10 h-9 cursor-pointer">
              <FaRegHeart />
            </button>
        }
      </div>

    </div>
  );
}

export default ProductCard;

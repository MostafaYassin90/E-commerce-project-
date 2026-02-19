import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext";
import { CgSpinner } from "react-icons/cg";
import ProductCard from "../../Components/ProductCard";
import { Link } from "react-router-dom";


function WishList() {
  const { token } = useContext(AppContext);
  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getWishlistProducts() {
    try {
      setIsLoading(true)
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: token }
      })
      if (response.data.status === "success") {
        console.log(response)
        setWishlistProducts(response.data)
      }
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getWishlistProducts()
  }, [])

  return isLoading || wishlistProducts === null ? (
    <div className="h-[70vh] flex items-center justify-center"> <CgSpinner className="text-6xl animate-spin" /> </div>
  ) : wishlistProducts.count > 0 ? (
    <div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold">WishList</h2>
        <p className="text-sm font-semibold text-gray-600">{wishlistProducts.count} items in your Wishlist</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {
          wishlistProducts.data.map((product) => {
            return (
              <ProductCard product={product} key={product.id} wishlist={"wishlist"} getWishlistProducts={getWishlistProducts} />
            )
          })
        }
      </div>
    </div>
  ) : (
    <div className='h-[70vh] flex items-center justify-center'>
      <div>
        <h2 className='text-2xl font-bold'>Your Wishlist Is Empty</h2>
        <button className='bg-black text-white py-1.5 px-4 rounded-md mx-auto block mt-3 cursor-pointer'><Link to={"/products"}>Go To Shooping</Link></button>
      </div>
    </div>
  )
}

export default WishList
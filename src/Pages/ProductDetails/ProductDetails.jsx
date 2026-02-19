import axios from 'axios';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaRegHeart, FaStar } from 'react-icons/fa6';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  async function getSingleProduct() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(response.data.data)
      setMainImage(response.data.data.imageCover)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message || error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSingleProduct()
  }, [])

  console.log(product)

  return isLoading || !product ? (
    <div className="h-[70vh] flex items-center justify-center"> <CgSpinner className="text-6xl animate-spin" /> </div>
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
     
      {/* Image */}
      <div className='lg:col-span-1 border-2 border-gray-200 rounded-xl overflow-hidden p-2'>
        <img src={mainImage} alt='main image' className='h-125 w-full' />
        <div className='grid grid-cols-4 gap-2 mt-2'>
          {
            product?.images?.map((img,index) => {
              return <img src={img} key={index} onClick={() => { setMainImage(img) }} className='max-w-full shadow cursor-pointer' />
            })
          }
        </div>
      </div>

      {/* Content */}
      <div className='lg:col-span-2'>
        <div className="p-5 flex flex-col gap-1.5">
          <p className="text-sm font-normal text-gray-600">
            {product.brand.name}
          </p>
          <h3 className="text-[20px] font-semibold ">{product.title}</h3>
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
        <div className="flex items-center gap-5 mt-2 px-5 mb-3">
          <button className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-md bg-black text-white flex-1 cursor-pointer">
            <HiOutlineShoppingCart />
            Add To Cart
          </button>
          <button className="border-2 border-gray-400 flex items-center justify-center rounded-md w-10 h-9 cursor-pointer">
            <FaRegHeart />
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductDetails
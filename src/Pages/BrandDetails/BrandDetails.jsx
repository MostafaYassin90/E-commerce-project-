import axios from "axios";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useParams } from "react-router-dom"
import ProductCard from "../../Components/ProductCard";


function BrandDetails() {
  const { id } = useParams();
  const [brandName, setBrandName] = useState("");
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get Single Category
  async function getSingleBrand() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      console.log(response.data.data.name)
      setBrandName(response.data.data.name)
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }
  }

  // Get All Products
  async function getAllProducts() {
    try {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      console.log(response.data.data);
      setProducts(response.data.data)
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }
  }

  useEffect(() => {
    async function tigger() {
      await getSingleBrand()
      await getAllProducts()
    }
    tigger()
  }, [id])

  useEffect(() => {
    setIsLoading(true)
    if (brandName === "" || products.length === 0) return;

    const filtred = products.filter((product) => product.brand.name === brandName);
    setFiltredProducts(filtred)
    setIsLoading(false)
  }, [brandName, products])

  console.log(filtredProducts)



  return isLoading ? (
    <div className="h-[70vh] flex items-center justify-center"> <CgSpinner className="text-6xl animate-spin" /> </div>
  ) : (
    <div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">{brandName}</h2>
        <p className="text-sm font-semibold text-gray-600">Products in this category</p>
      </div>

      {
        filtredProducts.length > 0
          ?
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {
              filtredProducts.map((product) => {
                return (
                  <ProductCard product={product} key={product.id} />
                )
              })
            }
          </div>
          :
          <div className="h-[56vh] flex items-center justify-center">
            <h2 className="text-2xl font-semibold text-gray-600">No products found in this category.</h2>
          </div>
      }
    </div>
  )
}

export default BrandDetails;
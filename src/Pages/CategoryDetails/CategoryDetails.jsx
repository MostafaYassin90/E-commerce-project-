import axios from "axios";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useParams } from "react-router-dom"
import ProductCard from "../../Components/ProductCard";


function CategoryDetails() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get Single Category
  async function getSingleCategory() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      console.log(response.data.data.name)
      setCategoryName(response.data.data.name)
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
      await getSingleCategory()
      await getAllProducts()
    }
    tigger()
  }, [id])

  useEffect(() => {
    setIsLoading(true)
    if (categoryName === "" || products.length === 0) return;

    const filtred = products.filter((product) => product.category.name === categoryName);
    setFiltredProducts(filtred)
    setIsLoading(false)
  }, [categoryName, products])

  console.log(filtredProducts)



  return isLoading ? (
    <div className="h-[70vh] flex items-center justify-center"> <CgSpinner className="text-6xl animate-spin" /> </div>
  ) : (
    <div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">{categoryName}</h2>
        <p className="text-sm font-semibold text-gray-600">Products in this category</p>
      </div>

      {
        filtredProducts.length > 0 
        ? 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {
            filtredProducts.map((product) => {
              return (
                <ProductCard product={product} key={product.id}/>
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

export default CategoryDetails
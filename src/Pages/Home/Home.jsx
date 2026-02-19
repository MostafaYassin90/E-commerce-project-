import { useEffect, useState } from "react";
import Hero from "../../Components/Hero/Hero";
import { getAllProductsAction } from "../../Actions/productsAction";
import ProductCard from "../../Components/ProductCard";


function Home() {
  const [productsList, setProductsList] = useState([]);


  async function getAllProducts() {
    const response = await getAllProductsAction();
    setProductsList(response)
  }

  useEffect(() => {
    getAllProducts()
  }, [])


  return (
    <div className="min-h-[70vh]">
      <Hero />
      <div className="mt-5">
        <h2 className="mb-3 text-2xl font-semibold">Products List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {
            productsList?.map((product) => {
              return (
                <ProductCard product={product} key={product.id} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
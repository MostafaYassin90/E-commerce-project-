import { useEffect, useState } from "react";
import { getAllProductsAction } from "../../Actions/productsAction";
import { CgSpinner } from "react-icons/cg";
import ProductCard from "../../Components/ProductCard";

function Products() {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllProducts() {
    setIsLoading(true);
    const response = await getAllProductsAction();
    setProductsList(response);
    setIsLoading(false);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

 

  return isLoading ? (
    <div className="h-[70vh] flex items-center justify-center"> <CgSpinner className="text-6xl animate-spin" /> </div>
  ) : (
    <div>
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
  );
}

export default Products;

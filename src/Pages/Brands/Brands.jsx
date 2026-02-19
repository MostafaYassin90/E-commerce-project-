import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";


function Brands() {
  const [brandsList, setBrandsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  async function getAllBrands() {
    try {
      setIsLoading(true)
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      console.log(response.data.data)
      setBrandsList(response.data.data)
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllBrands()
  }, [])

  return isLoading || brandsList.length == 0
    ?
    (
      <div className="h-[70vh] flex items-center justify-center"> <CgSpinner className="text-6xl animate-spin" /> </div>
    )
    :
    (
      <div>
        <h2 className="text-2xl font-bold mb-10">Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {
            brandsList.map((brand) => {
              return (
                <Link to={`/brands/${brand._id}`} key={brand._id}>
                  <div className="border-2 border-gray-200 shadow rounded-xl overflow-hidden">
                    <img src={brand.image} alt={brand.name} className="block w-full h-87.5" />
                    <h3 className="text-center py-3 font-semibold">{brand.name}</h3>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    )
}

export default Brands
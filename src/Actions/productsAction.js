import axios from "axios";

export async function getAllProductsAction() {
  try {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    const data = response.data.data;
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message)
      return []
    }
  }
}
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [token, setToken] = useState(window.localStorage.getItem("token") || "");
  const [cart, setCart] = useState(null)


  async function getCart() {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: {token: token}
        })
        setCart(response.data)
        if (response.data.data.cartOwner) {
          window.localStorage.setItem("cartOwner", response.data.data.cartOwner)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      getCart()
    }
  }, [token])

  const value = {
    token: token,
    setToken: setToken,
    cart:cart,
    setCart:setCart,
    getCart:getCart
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export default AppContextProvider;

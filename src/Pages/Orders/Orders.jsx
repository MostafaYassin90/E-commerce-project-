import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Orders() {
  const [cartOwner, setCartOwner] = useState(window.localStorage.getItem("cartOwner") || "")
  const [ordersList, setOrdersList] = useState([])

  async function getUserOrders() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
      setOrdersList(response.data)
    } catch (error) {
      console.log(error.response?.data.message)
    }
  }

  useEffect(() => {
    if (cartOwner) {
      getUserOrders()
    }
  }, [cartOwner])

  return cartOwner === "" ?
    <div className='h-[70vh] flex items-center justify-center'>
      <div>
        <h2 className='text-2xl font-semibold'>Your Orders Is Empty</h2>
        <button className='block w-fit mx-auto bg-black text-white py-1.5 px-3 rounded-md mt-4 cursor-pointer'><Link to={"/products"}>Go To Shopping</Link></button>
      </div>
    </div> : ordersList.length > 0 ? (
      <div className='min-h-[70vh] flex flex-col gap-10'>
        {
          ordersList.map((order) => {
            return (
              <div key={order.id} className='border-2 border-gray-400 rounded-xl p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-5'>
                {/* Address */}
                <div>
                  <h3>Address: </h3>
                  <p>City: {order.shippingAddress.city}</p>
                  <p>Details: {order.shippingAddress.details}</p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                </div>
                {/* User Details */}
                <div>
                  <h3>User Details: </h3>
                  <p>Name: {order.user.name}</p>
                  <p>Email: {order.user.email}</p>
                </div>
                {/* Price */}
                <div>
                  <p>ShippingPrice: {order.shippingPrice}</p>
                  <p>taxPrice: {order.taxPrice}</p>
                  <p>Total: {order.totalOrderPrice}</p>
                </div>
                {/* Order Details */}
                <div>
                  <p>PaymentMethod: {order.paymentMethodType}</p>
                  <p>isPaid: {order.isPaid ? "Paid" : "Not Paid"}</p>
                  <p>isDelivered: {order.isDelivered ? "Delivered" : "Not Delivered"}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    ) : <div className='h-[70vh] flex items-center justify-center'>
      <div>
        <h2 className='text-2xl font-semibold'>Your Orders Is Empty</h2>
        <button className='block w-fit mx-auto bg-black text-white py-1.5 px-3 rounded-md mt-4 cursor-pointer'><Link to={"/products"}>Go To Shopping</Link></button>
      </div>
    </div>
}

export default Orders
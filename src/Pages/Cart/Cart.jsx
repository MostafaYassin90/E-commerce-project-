import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import CheckOutDialog from '../../Components/CheckOutDialog/CheckOutDialog';

function Cart() {
  const { token, cart, setCart } = useContext(AppContext);
  const [showDialog, setShowDialog] = useState(false);

  // Update Product Cart
  async function updateProductCart(productId, count) {
    try {
      const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: count }, {
        headers: { token: token }
      })
      if (response.data.status === "success") {
        toast.success("Cart Updated Successfully")
        setCart(response.data)
      }
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }
  }

  // Remove Product From Cart
  async function removeProductCart(productId) {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: { token: token }
      })
      if (response.data.status === "success") {
        toast.success("Product Deleted Successflly.")
        setCart(response.data)
      }
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }
  }

  // Clear Cart
  async function clearCart() {
    try {
      const response = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: token }
      })
      if (response.data.message === "success") {
        toast.success("Cart Has been cleared")
        setCart(null)
      }

    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }
  }

  console.log(cart)

  return cart == null ? (
    <div className="h-[70vh] flex items-center justify-center"> <CgSpinner className="text-6xl animate-spin" /> </div>
  ) : cart.numOfCartItems > 0 ? (
    <div>
      {showDialog && <CheckOutDialog cartId={cart.cartId} setShowDialog={setShowDialog}/>}
      <div className='mb-10'>
        <h2 className='text-2xl font-bold'>Shopping Cart</h2>
        <p className='text-sm font-semibold text-gray-600'>{cart.numOfCartItems} items in your cart</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 items-start'>

        <div className='col-span-2'>
          {
            cart.data.products.map((product) => {
              return (
                <div key={product._id} className='mb-5 border-2 border-gray-200 rounded-xl shadow-md overflow-hidden p-5 flex items-start justify-between gap-10'>

                  <div className='flex gap-4'>
                    <img src={product.product.imageCover} className='w-30 h-30 border-2 border-gray-200 rounded-md' />
                    <div>
                      <h3 className='font-bold'>{product.product.title}</h3>
                      <p className='text-gray-600 text-sm'>{product.product.brand.name} - {product.product.category.name}</p>
                      <div className='flex items-center gap-3 mt-5'>
                        <button onClick={() => { updateProductCart(product.product.id, product.count - 1) }} className='flex items-center justify-center border border-gray-400 w-8 h-8 text-2xl rounded-md cursor-pointer'>-</button>
                        <button className='font-bold'>{product.count}</button>
                        <button onClick={() => { updateProductCart(product.product.id, product.count + 1) }} className='flex items-center justify-center border border-gray-400 w-8 h-8 text-2xl rounded-md cursor-pointer'>+</button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <h3 className='font-semibold'>EGP{product.price}.00</h3>
                      <p className='text-gray-600 text-sm'>Each</p>
                    </div>
                    <button onClick={() => { removeProductCart(product.product.id) }} className='text-red-600 cursor-pointer font-semibold mt-10'>Remove</button>
                  </div>

                </div>
              )
            })
          }
        </div>

        <div className='col-span-1 '>
          <div className='border border-gray-200 p-5 flex flex-col gap-5 rounded-xl'>
            <h3 className='text-xl font-semibold'>Order Summary</h3>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-semibold text-gray-600'>Subtotal ({cart.numOfCartItems} items)</p>
              <p className='font-semibold'>EGP {cart.data.totalCartPrice}.00</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-semibold text-gray-600'>Shipping</p>
              <p className='font-semibold text-green-700'>Free</p>
            </div>
            <hr />
            <div className='flex items-center justify-between'>
              <p className='font-semibold'>Total</p>
              <p className='font-semibold'>{cart.data.totalCartPrice}.00</p>
            </div>
            <button className='block w-full bg-white border-2 border-gray-200 py-1.5 px-4 rounded-md text-black cursor-pointer hover:bg-gray-200'>Continue Shopping</button>
            <button onClick={() => { setShowDialog(true) }} className='block w-full bg-black py-1.5 px-4 rounded-md text-white cursor-pointer hover:bg-gray-800'>Proceed To Checkout</button>
          </div>
          <button onClick={() => { clearCart() }} className='flex items-center gap-2 ms-auto mt-4 border-2 border-gray-200 py-1.5 px-2 rounded-md cursor-pointer text-red-700 font-semibold'> <RiDeleteBin6Line /> Clear Cart</button>
        </div>

      </div>
    </div>
  ) : (
    <div className='h-[70vh] flex items-center justify-center'>
      <div>
        <h2 className='text-2xl font-bold'>Your Cart Is Empty</h2>
        <button className='bg-black text-white py-1.5 px-4 rounded-md mx-auto block mt-3 cursor-pointer'><Link to={"/products"}>Go To Shooping</Link></button>
      </div>
    </div>
  )



}

export default Cart
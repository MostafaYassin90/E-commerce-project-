import { useContext, useRef } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";


function CheckOutDialog(props) {
  const { token } = useContext(AppContext);
  const { cartId, setShowDialog } = props;

  const details = useRef(null);
  const phone = useRef(null);
  const city = useRef(null);

  async function checkOutHandler() {
    const shippingAddress = {
      details: details.current.value,
      phone: phone.current.value,
      city: city.current.value
    }

    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${import.meta.env.VITE_BASE_URL}`, { shippingAddress: shippingAddress }, {
        headers: { token: token }
      })
      if (response.data.status === "success") {
        window.location.href = response.data.session.url
      }
      console.log(response)
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }

  }


  return (
    <div className='h-screen w-full fixed px-[3vw] top-0 left-0 bg-black/70 z-9999 flex items-center justify-center'>
      <div className='w-full sm:w-110 bg-white p-5 shadow-xl rounded-xl'>

        <div className='mb-5'>
          <h2 className='font-bold'>Add Address</h2>
          <p className='text-sm font-semibold text-gray-600'>Add a shipping address for your deliveries.</p>
        </div>

        <div className="flex flex-col gap-4">

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-gray-800 mb-1 font-semibold">City</label>
            <input ref={city} type="text" id="city" className="block w-full py-2 px-3 border border-gray-400 rounded-md outline-[#0075ff]" />
          </div>

          {/* Details */}
          <div>
            <label htmlFor="details" className="block text-gray-800 mb-1 font-semibold">Details</label>
            <input ref={details} type="text" id="details" className="block w-full py-2 px-3 border border-gray-400 rounded-md outline-[#0075ff]" />
          </div>

          {/* phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-800 mb-1 font-semibold">Phone Number</label>
            <input ref={phone} type="number" id="phone" className="block w-full py-2 px-3 border border-gray-400 rounded-md outline-[#0075ff]" />
          </div>

          {/* Btns */}
          <div className="flex items-center justify-end gap-5">
            <button onClick={() => { setShowDialog(false) }} className="block w-fit bg-white text-black border-2 border-gray-200 py-1.5 px-3 rounded-md cursor-pointer hover:bg-gray-200">Cancel</button>
            <button onClick={() => { checkOutHandler() }} className="block w-fit bg-black text-white py-1.5 px-3 rounded-md cursor-pointer hover:bg-gray-800">CheckOut</button>
          </div>

        </div>


      </div>
    </div>
  )
}

export default CheckOutDialog
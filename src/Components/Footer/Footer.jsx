import { MdLocationOn } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
function Footer() {
  return (
    <div className="bg-black py-12 px-[3vw] xl:px-[7vw]">
      <div className="container mx-auto">
        <div className="text-white grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

          {/* Fisrt */}
          <div>
            <h2 className="text-base font-semibold mb-5"> <span className="inline-block py-1 px-3 text-2xl font-bold rounded-xl bg-white text-black">S</span> Shop Mart</h2>
            <p className="text-sm text-gray-200 mb-3">Your one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
            <div className="flex items-center gap-3 text-sm text-gray-200 mb-3"><MdLocationOn /><p>123 Shop Street, Octoper City, DC 12345</p></div>
            <div className="flex items-center gap-3 text-sm text-gray-200 mb-3"><FaPhoneAlt /><p>(+20) 01093333333</p></div>
            <div className="flex items-center gap-3 text-sm text-gray-200 mb-3"><FaMessage /><p>support@shopmart.com</p></div>
          </div>

          {/* Second */}
          <div className="md:flex md:justify-center">
            <div>
              <h2 className="text-base font-semibold mb-5">SHOP</h2>
              <ul className="flex flex-col gap-3">
                <li className="text-gray-200 cursor-pointer">Electronics</li>
                <li className="text-gray-200 cursor-pointer">Fashion</li>
                <li className="text-gray-200 cursor-pointer">Home & Garden</li>
                <li className="text-gray-200 cursor-pointer">Sports</li>
                <li className="text-gray-200 cursor-pointer">Deals</li>
              </ul>
            </div>
          </div>

          {/* third */}
          <div className="md:flex md:justify-center">
            <div>
              <h2 className="text-base font-semibold mb-5">CUSTOMER SERVICE</h2>
              <ul className="flex flex-col gap-3">
                <li className="text-gray-200 cursor-pointer">Contact Us</li>
                <li className="text-gray-200 cursor-pointer">Help Center</li>
                <li className="text-gray-200 cursor-pointer">Track Your Order</li>
                <li className="text-gray-200 cursor-pointer">Returns & Exchanges</li>
                <li className="text-gray-200 cursor-pointer">Size Guide</li>
              </ul>
            </div>
          </div>

          {/* fourth */}
          <div className="md:flex md:justify-center">
            <div>
              <h2 className="text-base font-semibold mb-5">ABOUT</h2>
              <ul className="flex flex-col gap-3">
                <li className="text-gray-200 cursor-pointer">About shopmart</li>
                <li className="text-gray-200 cursor-pointer">Careers</li>
                <li className="text-gray-200 cursor-pointer">Press</li>
                <li className="text-gray-200 cursor-pointer">Investor Relations</li>
                <li className="text-gray-200 cursor-pointer">Sustainability</li>
              </ul>
            </div>
          </div>

          {/* fifth */}
          <div className="md:flex md:justify-center">
            <div>
              <h2 className="text-base font-semibold mb-5">POLICIES</h2>
              <ul className="flex flex-col gap-3">
                <li className="text-gray-200 cursor-pointer">Privacy Policy</li>
                <li className="text-gray-200 cursor-pointer">Terms of Service</li>
                <li className="text-gray-200 cursor-pointer">Cookie Policy</li>
                <li className="text-gray-200 cursor-pointer">Shipping Policy</li>
                <li className="text-gray-200 cursor-pointer">Refund Policy</li>
              </ul>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Footer
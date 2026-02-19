


function About() {

  return (
    <div className="min-h-[70vh] py-12 px-[3vw] xl:px-[7vw]">
      <div className="container mx-auto">

        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 overflow-hidden w-full xl:w-200 mx-auto flex flex-col gap-10">

          <div>
            <h2 className="text-3xl font-bold mb-3">About ShopMart</h2>
            <p className="text-gray-600">ShopMart is your one-stop destination for the latest technology, fashion, and lifestyle products. We are committed to providing quality products with fast shipping and excellent customer service.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-600">ShopMart is your one-stop destination for the latest technology, fashion, and lifestyle products. We are committed to providing quality products with fast shipping and excellent customer service.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Our Values</h2>
            <ul className="list-disc list-inside">
              <li className="text-gray-600 mb-1">Quality: We only sell products that meet our high standards</li>
              <li className="text-gray-600 mb-1">Customer Service: Your satisfaction is our priority</li>
              <li className="text-gray-600 mb-1">Innovation: We stay ahead of trends to bring you the latest products</li>
              <li className="text-gray-600">Trust: We build lasting relationships with our customers</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Why Choose ShopMart?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h3 className="font-semibold">Fast Shipping</h3>
                <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
              </div>
              <div>
                <h3 className="font-semibold">Quality Guarantee</h3>
                <p className="text-gray-600">All products are carefully selected and tested</p>
              </div>
              <div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-gray-600">Our customer service team is always here to help</p>
              </div>
              <div>
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-gray-600">Hassle-free return policy for your peace of mind</p>
              </div>

            </div>
          </div>


        </div>

      </div>
    </div>
  )
}

export default About
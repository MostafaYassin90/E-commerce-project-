import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='py-16 min-h-[50vh] flex items-start justify-center'>

      <div className='text-center flex flex-col gap-10'>
        <h2 className='text-6xl font-bold'>Welcome to ShopMart</h2>
        <p className='w-full md:w-[60%] mx-auto font-semibold text-gray-600 text-[20px]'>Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
        <div className='flex items-center gap-10 justify-center'>
          <button className='block py-3 px-6 bg-black text-white rounded-md'> <Link to={"/products"}>Shop Now</Link> </button>
          <button className='block py-3 px-6 bg-white text-black rounded-md border-2 border-black font-semibold'> <Link to={"/products"}>Browse Categories</Link> </button>
        </div>
      </div>

    </div>
  )
}

export default Hero
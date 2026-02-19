import { Outlet } from "react-router-dom"
import Footer from "../../Components/Footer/Footer"
import Navbar from "../../Components/Navbar/Navbar"
import ScrollToTop from "../../Components/ScrollToTop"


function Layout() {
  return (
    <div>
      <ScrollToTop/>
      <Navbar />

      <div className="container mx-auto py-12 px-[3vw] xl:px-[7vw]">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Layout
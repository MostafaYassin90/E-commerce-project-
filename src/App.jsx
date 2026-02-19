import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Pages/Home/Home"
import Products from "./Pages/Products/Products"
import About from "./Pages/About/About"
import Contact from "./Pages/Contact/Contact"
import Layout from './Pages/Layout/Layout';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import { Toaster } from 'react-hot-toast';
import AppContextProvider from './context/AppContext';
import Categories from './Pages/Categories/Categories';
import Brands from './Pages/Brands/Brands';
import Profile from './Pages/Profile/Profile';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import ProtectRoute from './Components/ProtectRoute';
import ProtuctedAuth from './Components/ProtuctedAuth';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import CategoryDetails from './Pages/CategoryDetails/CategoryDetails';
import BrandDetails from './Pages/BrandDetails/BrandDetails';
import WishList from './Pages/WishList/WishList';

const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: "/register", element: <ProtuctedAuth><Register /></ProtuctedAuth> },
      { path: "/login", element: <ProtuctedAuth><Login /></ProtuctedAuth> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/categories", element: <Categories /> },
      { path: "/categories/:id", element: <CategoryDetails /> },
      { path: "/brands", element: <Brands /> },
      { path: "/brands/:id", element: <BrandDetails /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/profile", element: <ProtectRoute><Profile /></ProtectRoute> },
      { path: "/allorders", element: <ProtectRoute><Orders /></ProtectRoute> },
      { path: "/cart", element: <ProtectRoute><Cart /> </ProtectRoute> },
      { path: "/wishlist", element: <ProtectRoute><WishList /> </ProtectRoute> },
      { path: "*", element: <NotFound /> }
    ]
  }
])

function App() {

  return (
    <>
      <AppContextProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
        />
      </AppContextProvider>
    </>
  )
}

export default App

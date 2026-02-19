import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Navigate } from "react-router-dom";


function ProtectRoute({children}) {
  const {token} = useContext(AppContext);

  return token ? <>{children}</> : <Navigate to={"/login"}/>
  
}

export default ProtectRoute
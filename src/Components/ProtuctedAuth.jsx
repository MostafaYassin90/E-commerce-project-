import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Navigate } from "react-router-dom";

function ProtuctedAuth({ children }) {
  const { token } = useContext(AppContext);

  return token ? <Navigate to={"/"} /> : <>{ children }</>
}

export default ProtuctedAuth
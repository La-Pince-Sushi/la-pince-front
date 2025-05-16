import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import logo from "../../assets/logo-la-pince.png";

export function LogoLink() {
  const token = useAuthStore(state => state.token)
  return(
    <Link to={token ? "/dashboard" : "/"}>
      <img src={logo} alt="logo La Pince" />
    </Link>
  )
}
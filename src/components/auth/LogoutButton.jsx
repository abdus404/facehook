import { useNavigate } from "react-router-dom";
import Logout from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAuth";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  function handleLogout() {
    setAuth({});
    navigate("/login");
  }
  return (
    <button onClick={handleLogout} className="icon-btn">
      <img src={Logout} alt="Logout" />
    </button>
  );
}

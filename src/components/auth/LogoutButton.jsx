import { useNavigate } from "react-router-dom";
import Logout from "../../assets/icons/logout.svg";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/login");
  }
  return (
    <button onClick={handleLogout} className="icon-btn">
      <img src={Logout} alt="Logout" />
    </button>
  );
}

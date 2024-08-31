import { Link } from "react-router-dom";
import HomeIcon from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import useAuth from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import Logout from "../auth/LogoutButton";

export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;

  // Function to create a placeholder with initials
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    return `${firstInitial}`;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <span className="text-2xl font-semibold">FaceHook</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={Notification} alt="Notification" />
          </button>
          <Logout />
          <Link to="/me" className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {user?.firstName} {""} {user?.lastName}
            </span>
            {user.avatar ? (
              <img
                className="h-8 w-8 lg:h-11 lg:w-11 rounded-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`}
                alt={user?.firstName}
              />
            ) : (
              <div className="h-8 w-8 lg:h-11 lg:w-11 flex items-center justify-center bg-gray-600 text-white rounded-full text-sm lg:text-base">
                {getInitials(user?.firstName)}
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

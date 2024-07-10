import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <>
      <h1>HomePage</h1>
      <Link to="/me">Profile Page</Link>
    </>
  );
}

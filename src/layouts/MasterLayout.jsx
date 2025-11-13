import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MasterLayout() {
  const { logout } = useAuth();
  return (
    <>
      <Navbar onLogout={logout} />
      <div>
        <Outlet />
      </div>
    </>
  );
}

import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const handleLogout = (): void => {
    try {
      auth.signOut();
      toast.success("logout successful");
      navigate("/");
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="navbar">
      <p className="logo">Fin-Track</p>
      {user && (
        <p className="logo link" onClick={handleLogout}>
          Logout
        </p>
      )}
      {/* <p>{user?.displayName}</p> */}
    </div>
  );
}

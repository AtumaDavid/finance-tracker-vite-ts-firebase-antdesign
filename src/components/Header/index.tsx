import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg";

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
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            alt=""
            style={{ borderRadius: "50%", height: "2rem", width: "2rem" }}
          />
          <p className="logo link" onClick={handleLogout}>
            Logout
          </p>
        </div>
      )}
      {/* <p>{user?.displayName}</p> */}
    </div>
  );
}

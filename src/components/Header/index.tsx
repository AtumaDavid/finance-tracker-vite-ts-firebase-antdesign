import "./style.css";

export default function Header() {
  const handleLogout = (): void => {
    alert("logout");
  };
  return (
    <div className="navbar">
      <p className="logo">Fin-Track</p>
      <p className="logo link" onClick={handleLogout}>
        Logout
      </p>
    </div>
  );
}

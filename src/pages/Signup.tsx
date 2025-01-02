import AuthComponent from "../components/Auth";
import Header from "../components/Header";

export default function Signup() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <AuthComponent />
      </div>
    </div>
  );
}

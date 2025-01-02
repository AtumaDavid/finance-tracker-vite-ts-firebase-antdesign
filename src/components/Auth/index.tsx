import { useState } from "react";
import Input from "../Input/Input";
import "./styles.css";
import Button from "../Button/Button";

export default function AuthComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="auth-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Fin-Track</span>
      </h2>
      <form>
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
        />
        <Input
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"Johndoe@gmail.com"}
        />
        <Input
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"password"}
        />
        <Input
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"confirm password"}
        />
        <Button text={"Sign Up Using Email and Password"} />
        <p style={{ textAlign: "center", margin: 0 }}>or</p>
        <Button text={"Sign Up Using google"} blue={true} />
      </form>
    </div>
  );
}

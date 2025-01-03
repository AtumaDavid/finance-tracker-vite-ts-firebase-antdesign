import { useState } from "react";
import Input from "../Input/Input";
import "./styles.css";
import Button from "../Button/Button";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AuthComponent() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loginForm, setLoginForm] = useState<boolean>(false);
  const navigate = useNavigate();

  // SIGNUP
  const signupWithEmail = () => {
    setLoading(true);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password !== confirmPassword) {
        toast.error("passwords do not match");
        setLoading(false);
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((useCredential) => {
          const user = useCredential.user;
          console.log(user);
          toast.success("User created");
          setLoading(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          // create a document with userId as the following Id
          createDoc(user);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("input all fields");
      setLoading(false);
    }
  };

  const createDoc = async (user: User) => {
    // create a document with userId as the following Id
    // this is where you would create a document in your firestore database
    if (!user) return;

    const userRef = doc(db, "user", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          // Add your user data here
          name: user.displayName || name,
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });
        console.log("Document created successfully");
      } catch (error) {
        console.error("Error occurred", error);
      }
    } else {
      console.log("Document already exists");
    }
  };

  // LOGIN
  const loginWithEmail = () => {
    setLoading(true);
    if (email != "" && password != "") {
      console.log("login");
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user);

          toast.success("login successful");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      setLoading(false);
      toast.error("input all fields");
    }
  };

  return (
    <>
      {loginForm ? (
        <div className="auth-wrapper">
          <h2 className="title">
            Log In to <span style={{ color: "var(--theme)" }}>Fin-Track</span>
          </h2>
          <form>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Johndoe@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"password"}
            />

            <Button
              disabled={loading}
              text={loading ? "loading..." : "Log In Using Email and Password"}
              onClick={loginWithEmail}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              disabled={loading}
              text={loading ? "loading..." : "Login Using google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(false)}>
              You dont have an account? Click here
            </p>
          </form>
        </div>
      ) : (
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
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Johndoe@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"password"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"confirm password"}
            />
            <Button
              disabled={loading}
              text={loading ? "loading..." : "Sign Up Using Email and Password"}
              onClick={signupWithEmail}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              disabled={loading}
              text={loading ? "loading..." : "Sign Up Using google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(true)}>
              Already have an account? Click here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

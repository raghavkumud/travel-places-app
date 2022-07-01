import "./login.css";
import { useRef, useState } from "react";
import axios from "axios";
export default function Login({
  setUserStatus,
  bLocalStorage,
  setCurrentUser,
}) {
  const [loginFaluire, setLoginFailure] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    console.log("trying to log in ....");
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    setCurrentUser(nameRef.current.value);
    try {
      const res = await axios.post(
        "api/users/login",
        newUser
      );
      console.log(res);
      bLocalStorage.setItem("user", res.data.username);
      setUserStatus(true);
    } catch (err) {
      setLoginFailure(true);
    }
  };
  function LoginErrorMessage() {
    return (
      <h5 className="loginErrorMessage"
      >
        Something went wrong!
      </h5>
    );
  }
  return (
    <div className='card'>
      <form onSubmit={(e) => handleSubmit(e)} className="box">
        <input type="text" autoComplete="off" placeholder="Username" ref={nameRef} />
        <input type="password" autoComplete="off" placeholder="Password" ref={passwordRef} />
        <button className="logInButton" type="submit">Login </button>
      </form>
      {loginFaluire && <LoginErrorMessage />}
    </div>
  );
}

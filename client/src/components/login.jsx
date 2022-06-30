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
      bLocalStorage.setItem("user", res.data.username);
      setUserStatus(true);
    } catch (err) {
      setLoginFailure(true);
    }
  };
  function LoginErrorMessage() {
    return (
      <h3
        style={{
          color: "red",
          fontFamily: "Poppins",
        }}
      >
        Something went wrong!
      </h3>
    );
  }
  return (
    <div className="loginBox">
      <form onSubmit={handleSubmit} className="ctn">
        <label for="username" className="flabel">
          Username
        </label>
        <input id="username" name="username" ref={nameRef} type="text"></input>
        <label for="password" className="flabel">
          Password
        </label>
        <input
          id="password"
          name="password"
          ref={passwordRef}
          type="password"
        ></input>
        <input id="logButton" type="submit"></input>
      </form>
      {loginFaluire && <LoginErrorMessage />}
    </div>
  );
}

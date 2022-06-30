import axios from "axios";
import "./register.css";
import { useState, useRef } from "react";
export default function Register() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const registerUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post(
        "api/users/register",
        registerUser
      );
      setSuccess(true);
    } catch (err) {
      setFailure(true);
    }
  };
  function SuccessMessage() {
    return (
      <h3
        style={{
          color: "green",
          fontFamily: "Poppins",
        }}
      >
        Successful, you can login now!
      </h3>
    );
  }
  function ErrorMessage() {
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
    <div className="registerBox">
      <form onSubmit={handleRegisterSubmit} className="registerCtn">
        <label>Username</label>
        <input
          class="regInput"
          ref={nameRef}
          name="username"
          type="text"
        ></input>
        <label>Email</label>
        <input class="regInput" ref={emailRef} name="email" type="text"></input>
        <label>Password</label>
        <input
          class="regInput"
          ref={passwordRef}
          name="password"
          type="password"
        ></input>
        <input id="regButton" type="submit"></input>
      </form>
      {success && <SuccessMessage />}
      {failure && <ErrorMessage />}
    </div>
  );
}

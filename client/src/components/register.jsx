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
      <h5 className="headingSuccess">
        Successful, you can login now!
      </h5>
    );
  }
  function ErrorMessage() {
    return (
      <h5 className="headingError">
        Something went wrong!
      </h5>
    );
  }

  return (
    <div className="card">
      <form onSubmit={(e) => handleRegisterSubmit(e)} className="box">
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="registerButton" type="submit">Register</button>
      </form>
      {success && <SuccessMessage />}
      {failure && <ErrorMessage />}
    </div>
  );
}

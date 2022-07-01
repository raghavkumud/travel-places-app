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
      <h3 className="headingText">
        Successful, you can login now!
      </h3>
    );
  }
  function ErrorMessage() {
    return (
      <h3 className="headingError">
        Something went wrong!
      </h3>
    );
  }

  return (
    <div className="card">
              <form className="box">
                <input type="text" placeholder="Username" ref={nameRef}/>
                <input type="email"  placeholder="Email" ref = {emailRef} />
                <input type="password" placeholder="Password" ref = {passwordRef}/>
                <button type="submit" onSubmit={handleRegisterSubmit}/>
              </form>
              {success && <SuccessMessage/>}
              {failure && <ErrorMessage/>}
            </div>

        );
}

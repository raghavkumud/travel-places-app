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
    <div className='card'>
              <form className="box">
                <input type="text" placeholder="Username" ref={nameRef}/>
                <input type="password" placeholder="Password" ref={passwordRef}/>
                <button type="submit"  onSubmit={() => handleSubmit()}>Submit </button>
              </form>
              {loginFaluire && <LoginErrorMessage/>}
          </div>
  );
}

import { useState } from "react";
import Login from "./login";
import Register from "./register";
import { Room } from "@material-ui/icons";
import "./landingpage.css";
export default function LandingPage({
  setUserStatus,
  bLocalStorage,
  setCurrentUser,
}) {
  const [logIn, setLogIn] = useState(true);
  return (
    <div className="mainCtn">
      <Room
        style={{
          fontSize: "40px",
        }}
      />
      <div className="navbar">
        <h3 onClick={() => setLogIn(true)}>LogIn</h3>
        <h3 onClick={() => setLogIn(false)}>Register</h3>
      </div>
      {logIn && (
        <Login
          setUserStatus={setUserStatus}
          bLocalStorage={bLocalStorage}
          setCurrentUser={setCurrentUser}
        />
      )}
      {logIn === false && <Register />}
    </div>
  );
}

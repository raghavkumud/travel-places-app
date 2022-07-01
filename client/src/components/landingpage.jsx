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
      <div className="title">
        <Room className="logo" />
        <h4>Explore tourist destinations around the world</h4>
      </div>
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

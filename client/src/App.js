import { useState, useEffect, useRef } from "react";
import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet";
import { Star } from "@material-ui/icons";
import "./app.css";
import axios from "axios";
import "leaflet-easybutton";
import { format } from "timeago.js";
import CreatePin from "./components/createpin";
import LandingPage from "./components/landingpage";
import { blueIcon, greenIcon } from "./components/marker-icons";
import DoubleClickHandler from "./doubleclickhandler";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const bLocalStorage = window.localStorage;
  const [userStatus, setUserStatus] = useState(false);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    axios
      .get("api/pins/")
      .then((res) => {
        console.log(res);
        setPins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    const user = localStorage.getItem("user");
    if (user) {
      //setUserStatus(true);
      setCurrentUser(user);
    }
  }, []);
  function createStars(x) {
    const starsList = [];
    for (let cnt = 0; cnt < x; cnt++) {
      starsList.push(<Star key={cnt.toString()} className="star" />);
    }
    return starsList;
  }
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    console.log("It is there");
  };
  function logOutUser() {
    setUserStatus(false);
    bLocalStorage.removeItem("user");
    setCurrentUser(null);
    return;
  }

  return userStatus === true ? (
    <>
      <MapContainer
        ref={mapRef}
        className = "mapContainer"
        center={[28.6139, 77.209]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <DoubleClickHandler setNewPlace={setNewPlace} />
        {newPlace && (
          <Marker position={newPlace}>
            <Popup>
              <CreatePin location={newPlace} currentUser={currentUser} />
            </Popup>
          </Marker>
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((p) => {
          return (
            <>
              <Marker
                onClick={() => handleMarkerClick(p._id)}
                position={[p.lat, p.long]}
                icon={p.username === currentUser ? greenIcon : blueIcon}
              >
                <Popup>
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">{createStars(p.rating)}</div>
                    <label>Information</label>
                    <span className="username">
                      <i>
                        Created by <b>{p.username}</b>
                      </i>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              </Marker>
            </>
          );
        })}
      </MapContainer>
      {userStatus && (
        <>
          <button className = "logOutButton" onClick={() => logOutUser()} >
            LogOut
          </button>
        </>
      )}
    </>
  ) : (
    <LandingPage
      setUserStatus={setUserStatus}
      bLocalStorage={bLocalStorage}
      setCurrentUser={setCurrentUser}
    />
  );
}
export default App;

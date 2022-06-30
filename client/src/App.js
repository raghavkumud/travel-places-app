import { useState, useEffect, useRef } from "react";
import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet";
import { Star } from "@material-ui/icons";
import { useMap, useMapEvent } from "react-leaflet/hooks";
import * as L from "leaflet";
import "./app.css";
import axios from "axios";
import "leaflet-easybutton";
import { format } from "timeago.js";
import CreatePin from "./components/createpin";
import LandingPage from "./components/landingpage";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const bLocalStorage = window.localStorage;
  const [userStatus, setUserStatus] = useState(true);
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
  const LeafIcon = L.Icon.extend({
    options: {},
  });
  const greenIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const blueIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  function MyComponent({ setNewPlace }) {
    const map = useMap();
    useMapEvent("dblclick", (e) => {
      try {
        console.log("map center:", map.getCenter());
        console.log(e.latlng);
        const lat = e.latlng.lat;
        const long = e.latlng.lng;
        console.log(lat);
        console.log(long);
        console.log(e);
        setNewPlace(e.latlng);
      } catch (err) {
        console.log(err);
      }
    });
    return null;
  }
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
        style={{
          width: "100vw",
          height: "95vh",
        }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <MyComponent setNewPlace={setNewPlace} />
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
          <button
            style={{
              color: "white",
              backgroundColor: "black",
              position: "absolute",
              bottom: "10px",
              right: "2px",
              fontFamily: "Poppins",
            }}
            onClick={() => logOutUser()}
          >
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

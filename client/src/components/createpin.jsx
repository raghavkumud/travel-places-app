import "./createpin.css";
import { useRef, useState } from "react";
import axios from "axios";

export default function CreatePin({ location, currentUser }) {
  const [pinSuccess, setPinSuccess] = useState(false);
  const [pinError, setPinError] = useState(false);
  const nameRef = useRef();
  const reviewRef = useRef();
  const ratingRef = useRef();
  const lat = location.lat;
  const long = location.lng;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      title: nameRef.current.value,
      rating: ratingRef.current.value,
      desc: reviewRef.current.value,
      lat: lat,
      long: long,
      username: currentUser,
    };
    try {
      const res = await axios.post("api/pins/", newPin);
      setPinSuccess(true);
    } catch (err) {
      setPinError(true);
      return;
    }
  };
  function PinSuccess() {
    return (
      <>
        <h3
          style={{
            color: "green",
            fontFamily: "Poppins",
          }}
        >
          Pin created successfully
        </h3>
      </>
    );
  }
  function PinErrorMessage() {
    return (
      <>
        <h3
          style={{
            color: "red",
            fontFamily: "Poppins",
          }}
        >
          Oops, something went wrong!
        </h3>
      </>
    );
  }

  return (
    <div className="pinBox">
      <h2>New Pin</h2>
      <form className="pinFormCtn">
        <label id="labTitle">Title</label>
        <input id="inputTitle" ref={nameRef} type="text"></input>
        <label id="labDesc">Description</label>
        <textarea id="inputDesc" ref={reviewRef} type="text"></textarea>
        <label id="labRating">Rating</label>
        <input
          ref={ratingRef}
          id="ratingBox"
          min="0"
          max="5"
          type="number"
        ></input>
        <button onClick={handleSubmit} id="pinSubmit">
          Submit
        </button>
      </form>
      {pinSuccess && <PinSuccess />}
      {pinError && <PinErrorMessage />}
    </div>
  );
}

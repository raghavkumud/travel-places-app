import { useMap, useMapEvent } from "react-leaflet/hooks";

  export default function DoubleClickHandler({ setNewPlace }) {
    const map = useMap();
    useMapEvent("dblclick", (e) => {
      try {
        const lat = e.latlng.lat;
        const long = e.latlng.lng;
        setNewPlace(e.latlng);
      } catch (err) {
        console.log(err);
      }
    });
    return null;
  }


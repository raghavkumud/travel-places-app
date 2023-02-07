import { useMap, useMapEvent } from "react-leaflet/hooks";

export default function DoubleClickHandler({ setNewPlace }) {
  const map = useMap();
  useMapEvent("dblclick", (e) => {
    try {
      const lat = e.latlng.lat;
      const long = e.latlng.lng;
      console.log(e);
      if (isNaN(lat)) lat = 28.6139;
      if (isNaN(long)) long = 77.209;
      setNewPlace([lat, long]);
    } catch (err) {
      console.log(err);
    }
  });
  return null;
}

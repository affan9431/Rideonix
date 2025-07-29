import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function ChangeMapView({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position.length === 2) {
      map.flyTo(position, 13); // smooth fly, or use map.setView(position, 13)
    }
  }, [position]);

  return null;
}

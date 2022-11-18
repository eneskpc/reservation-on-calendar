import Event from "models/EtkinlikIO/Event";

export default interface ILatLngLiteral extends google.maps.LatLngLiteral {
  isCurrent: boolean;
  onClick: (event: Event) => void;
}

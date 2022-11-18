import { useEffect, useRef, useState } from "react";

import EventMarker from "assets/images/event-marker.png";
import ILatLngLiteral from "models/common/ILatLngLiteral";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import PeopleMarker from "assets/images/people-marker.png";

type Props = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  locations: ILatLngLiteral[];
};

const Map = ({ center, zoom, locations }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    if (!map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
        })
      );
    }
  });

  const markers = locations.map((position, i) => {
    const marker = new google.maps.Marker({
      position,
      icon: position.isCurrent ? PeopleMarker : EventMarker,
    });

    marker.addListener("click", position.onClick);

    return marker;
  });

  new MarkerClusterer({ markers, map });

  return <div ref={ref} className="h-full w-full"></div>;
};

export default Map;

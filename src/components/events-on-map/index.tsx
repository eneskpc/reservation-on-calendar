import {
  BanknotesIcon,
  MapPinIcon,
  TagIcon
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "store";
import { useEffect, useState } from "react";

import CustomAlert from "components/custom-alert";
import Event from "models/EtkinlikIO/Event";
import ILatLngLiteral from "models/common/ILatLngLiteral";
import MapRender from "./MapRender";
import { Wrapper } from "@googlemaps/react-wrapper";
import { addFavouriteEvent } from "store/slices/reservations/etkinlikIOSlice";
import { googleMapAPIKey } from "../../constants";
import { setCurrentLocation } from "store/slices/options/optionsSlice";

const EventsOnMap = () => {
  const dispatch = useAppDispatch();

  const favouriteEvents = useAppSelector(
    (state) => state.ETKINLIK_IO.favouriteEvents
  );
  const [events, currentLocation] = useAppSelector((state) => [
    state.ETKINLIK_IO.eventCollection,
    state.OPTIONS.currentLocation,
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        dispatch(setCurrentLocation(position));
      });
    }
  }, []);

  if (!events || events.length === 0) {
    return null;
  }

  let eventsWithCurrentLocation = events
    .map((e) => {
      if (!e.venue.lat || !e.venue.lng) {
        return null;
      }
      return {
        lat: parseFloat(e.venue.lat),
        lng: parseFloat(e.venue.lng),
        isCurrent: false,
        onClick: () => setSelectedEvent(e),
      } as ILatLngLiteral;
    })
    .filter((e) => e !== null) as ILatLngLiteral[];

  if (currentLocation) {
    eventsWithCurrentLocation = [
      ...eventsWithCurrentLocation,
      {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
        isCurrent: true,
        onClick: () => {},
      },
    ];
  }

  return (
    <>
      {selectedEvent && (
        <CustomAlert
          title={selectedEvent.name}
          buttons={[
            {
              clickAction: () => alert("Go to"),
              content: (
                <div className="bg-purple-700 text-white px-4 py-2 rounded-md transition-all">
                  Satın Al
                </div>
              ),
            },
            {
              clickAction: () => setSelectedEvent(null),
              content: (
                <div className="bg-slate-200 px-4 py-2 rounded-md transition-all">
                  Kapat
                </div>
              ),
            },
            {
              clickAction: () => dispatch(addFavouriteEvent(selectedEvent)),
              content: (
                <div className="bg-purple-900 text-white px-4 py-2 rounded-md transition-all">
                  Favorilere Ekle
                </div>
              ),
            },
          ]}
        >
          <div>
            <div className="grid grid-cols-3 gap-2">
              <img src={selectedEvent.poster_url} className="w-full" />
              <div className="col-span-2">
                <div className="flex leading-none pb-2">
                  <MapPinIcon className="w-5 h-5" />
                  <strong>{selectedEvent.venue.address}</strong>
                </div>
                <div className="flex leading-none pb-2">
                  <TagIcon className="w-5 h-5 inline-block" />
                  <strong>
                    {selectedEvent.tags.map((t) => t.name).join(",")}
                  </strong>
                </div>
                <div className="flex leading-none">
                  <BanknotesIcon className="w-5 h-5 inline-block" />
                  <strong>
                    {selectedEvent.is_free ? "Ücretsiz" : "Ücretli"} Etkinlik
                  </strong>
                </div>
              </div>
            </div>
            <p
              className="overflow-x-hidden overflow-y-auto max-h-96"
              dangerouslySetInnerHTML={{ __html: selectedEvent.content }}
            ></p>
          </div>
        </CustomAlert>
      )}
      <Wrapper
        apiKey={googleMapAPIKey}
        render={(status) => (
          <MapRender status={status} locations={eventsWithCurrentLocation} />
        )}
      />
    </>
  );
};

export default EventsOnMap;

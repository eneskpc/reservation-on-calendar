import { ClockIcon, MapPinIcon, TagIcon } from "@heroicons/react/24/outline";
import {
  addFavouriteEvent,
  removeFavouriteEvent
} from "store/slices/reservations/etkinlikIOSlice";
import { useAppDispatch, useAppSelector } from "store";

import Event from "models/EtkinlikIO/Event";
import moment from "moment-timezone";

type Props = {
  self: Event;
};

const EventItem = ({ self }: Props) => {
  const dispatch = useAppDispatch();

  const favouriteEvents = useAppSelector(
    (state) => state.ETKINLIK_IO.favouriteEvents
  );

  const addEventToFavourite = () => {
    dispatch(addFavouriteEvent(self));
  };

  const removeEventToFavourite = () => {
    dispatch(removeFavouriteEvent(self));
  };

  if (favouriteEvents.some((fe) => fe.id === self.id)) {
    return (
      <div className="group h-56 scale-110 transition-all">
        <div
          key={self.id}
          className="w-full bg-indigo-200 shadow-lg p-3 transition-all"
        >
          <div className="relative flex items-center overflow-hidden w-full h-32 bg-black">
            <img src={self.poster_url} alt={self.name} />
            <div className="absolute p-4 flex flex-col justify-center items-center w-full h-full bg-black/70 ">
              <button
                onClick={removeEventToFavourite}
                className="transition-all mb-1 bg-red-700 w-full text-white py-1 px-2 rounded-md text-sm whitespace-nowrap"
              >
                Favorilerden Çıkar
              </button>
              <a href={self.ticket_url} className="text-center transition-all bg-purple-900 w-full text-white py-1 px-2 rounded-md">
                Bilet Satın Al
              </a>
            </div>
          </div>
          <h5
            className="text-purple-700 text-ellipsis whitespace-nowrap overflow-hidden"
            title={self.name}
          >
            {self.name}
          </h5>
          <small className="flex items-center leading-none">
            <MapPinIcon className="w-3 h-3 text-purple-700" />
            {self.venue.district.name}, {self.venue.city.name}
          </small>
          <small className="flex items-center leading-none">
            <TagIcon className="w-3 h-3 text-purple-700" />
            {self.category.name}
          </small>
          <small className="flex items-center leading-none">
            <ClockIcon className="w-3 h-3 text-purple-700" />
            {moment(self.start).format("MMM DD, YYYY HH:SS")}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="group h-56 hover:scale-110 transition-all">
      <div
        key={self.id}
        className="w-full bg-purple-100 shadow-md group-hover:shadow-lg p-3 transition-all"
      >
        <div className="relative flex items-center overflow-hidden w-full h-32 bg-black">
          <img src={self.poster_url} alt={self.name} />
          <div className="absolute hidden p-4  flex-col justify-center items-center w-full h-full bg-black/70 group-hover:flex">
            <button
              onClick={addEventToFavourite}
              className="transition-all mb-1 bg-purple-700 w-full text-white py-1 px-2 rounded-md"
            >
              Favorilere Ekle
            </button>
            <a href={self.ticket_url} className="text-center transition-all bg-purple-900 w-full text-white py-1 px-2 rounded-md">
              Bilet Satın Al
            </a>
          </div>
        </div>
        <h5
          className="text-purple-700 text-ellipsis whitespace-nowrap overflow-hidden"
          title={self.name}
        >
          {self.name}
        </h5>
        <small className="flex items-center leading-none">
          <MapPinIcon className="w-3 h-3 text-purple-700" />
          {self.venue.district.name}, {self.venue.city.name}
        </small>
        <small className="flex items-center leading-none">
          <TagIcon className="w-3 h-3 text-purple-700" />
          {self.category.name}
        </small>
        <small className="flex items-center leading-none">
          <ClockIcon className="w-3 h-3 text-purple-700" />
          {moment(self.start).format("MMM DD, YYYY HH:SS")}
        </small>
      </div>
    </div>
  );
};

export default EventItem;

import { useAppDispatch, useAppSelector } from "store";
import { useEffect, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import CustomAlert from "components/custom-alert";
import EventItem from "components/events-as-list/EventItem";
import { motion } from "framer-motion";
import { setSelectedCategory } from "store/slices/reservations/etkinlikIOSlice";
import { useGetCategoriesMutation } from "store/slices/reservations/etkinlikIOActions";

const MobileMenu = () => {
  const [favouriteEvents, categories, selectedCategory] = useAppSelector(
    (state) => [
      state.ETKINLIK_IO.favouriteEvents,
      state.ETKINLIK_IO.categories,
      state.ETKINLIK_IO.selectedCategory,
    ]
  );

  const dispatch = useAppDispatch();
  const [getAllCategories] = useGetCategoriesMutation();
  const [isFavouriteEvents, toggleFavouriteEvents] = useState<boolean>(false);

  useEffect(() => {
    getAllCategories()
      .unwrap()
      .then((resp) => {
        if (resp.data.length > 0) {
          dispatch(setSelectedCategory(resp.data[0]));
        }
      });
  }, [getAllCategories, dispatch]);
  return (
    <>
      {isFavouriteEvents && (
        <CustomAlert
          title="Favourite Events"
          buttons={[
            {
              clickAction: () => {},
              content: <span></span>,
            },
            {
              clickAction: () => toggleFavouriteEvents(!isFavouriteEvents),
              content: (
                <div className="bg-slate-200 px-3 py-2 rounded-md">Kapat</div>
              ),
            },
          ]}
        >
          <div className="grid grid-cols-3 p-3 gap-8 max-h-96 overflow-x-hidden overflow-y-auto">
            {favouriteEvents.map((fe) => (
              <EventItem key={fe.id} self={fe} />
            ))}
          </div>
        </CustomAlert>
      )}
      <div className="col-span-4 xl:hidden">
        <div className="flex justify-between items-center">
          <div className="w-full"></div>
          <div className="w-full text-white text-center py-2 text-lg font-extrabold">
            E-vents.info
          </div>
          <div className="w-full text-right text-white">
            <button
              onClick={() => toggleFavouriteEvents(!isFavouriteEvents)}
              className="bg-gradient-to-r from-purple-400 to-purple-700 p-3"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="horizontal-scroll bg-purple-900 block whitespace-nowrap overflow-y-hidden overflow-x-auto w-screen">
          {categories.map((c, index) => {
            const color = selectedCategory?.id === c.id ? "bg-purple-700" : "";
            return (
              <motion.button
                className={`${color} text-white py-3 px-5 inline-flex justify-between items-center transition-all`}
                onClick={() => dispatch(setSelectedCategory(c))}
                key={index}
              >
                <strong className="text-left">{c.name}</strong>{" "}
                <small>({29})</small>
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

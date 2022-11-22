import { AnimationProps, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "store";

import { CakeIcon } from "@heroicons/react/24/outline";
import { setSelectedCategory } from "store/slices/reservations/etkinlikIOSlice";
import { useEffect } from "react";
import { useGetCategoriesMutation } from "store/slices/reservations/etkinlikIOActions";

const SideBar = () => {
  const container: AnimationProps["variants"] = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.15,
      },
    },
  };

  const [categories, selectedCategory] = useAppSelector((state) => [
    state.ETKINLIK_IO.categories,
    state.ETKINLIK_IO.selectedCategory,
  ]);
  const dispatch = useAppDispatch();
  const [getAllCategories] = useGetCategoriesMutation();

  useEffect(() => {
    getAllCategories()
      .unwrap()
      .then((resp) => {
        if (resp.data.length > 0) {
          dispatch(setSelectedCategory(resp.data[0]));
        }
      });
  }, [getAllCategories, dispatch]);

  if (categories.length === 0 || !selectedCategory) {
    return <div className="bg-purple-700 text-white rounded-l-none xl:rounded-l-md"></div>;
  }

  return (
    <div className="bg-purple-700 text-white rounded-l-none xl:rounded-l-md hidden xl:block">
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-end items-center p-5 bg-purple-900 rounded-tl-full">
          <CakeIcon className="w-7 h-7" />
          <strong className="text-3xl whitespace-nowrap">E-vents.INFO</strong>
        </div>
        <div className="relative h-full">
          <motion.div
            initial="hidden"
            animate="visible"
            className="absolute w-full h-full overflow-x-hidden overflow-y-auto"
            variants={container}
          >
            {categories.map((c, index) => {
              const color =
                selectedCategory?.id === c.id
                  ? "bg-gradient-to-r to-transparent from-purple-800"
                  : "";
              return (
                <motion.button
                  className={`${color} py-3 px-5 flex justify-between w-full items-center transition-all`}
                  onClick={() => dispatch(setSelectedCategory(c))}
                  key={index}
                >
                  <strong className="text-left">{c.name}</strong>{" "}
                  <small>({29})</small>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

import { AnimationProps, motion } from "framer-motion";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

import { ReactElement } from "react";

export enum CustomIconType {
  QUESTION,
  ERROR,
  WARNING,
}

type Button = {
  content: ReactElement;
  clickAction: React.MouseEventHandler<HTMLButtonElement>;
};

type Props = {
  icon: CustomIconType;
  title: string;
  children: ReactElement;
  buttons: Button[];
};

const GetIconByType = (type: CustomIconType) => {
  switch (type) {
    case CustomIconType.ERROR:
      return <ExclamationTriangleIcon className="text-red-900 w-20 h-20" />;
    case CustomIconType.WARNING:
      return <ExclamationCircleIcon className="text-yellow-600 w-20 h-20" />;
    case CustomIconType.QUESTION:
      return <QuestionMarkCircleIcon className="text-blue-800 w-20 h-20" />;
    default:
      return null;
  }
};

const CustomAlert = ({ children, title, buttons, icon }: Props) => {
  const initialMotion: AnimationProps["initial"] = {
    x: -1500,
  };
  const animation: AnimationProps["animate"] = {
    x: 0,
  };

  return (
    <div className="fixed bg-black/30 w-full h-full flex justify-center items-center">
      <motion.div
        initial={initialMotion}
        animate={animation}
        className="bg-white rounded-md w-full max-w-2xl"
      >
        <div className="p-4 text-4xl flex flex-col justify-center items-center">
          {GetIconByType(icon)}
          {title}
        </div>
        <div className="p-4 flex justify-center items-center">{children}</div>
        <div className="p-4 flex justify-between items-center">
          {buttons.map((button, index) => {
            return (
              <button onClick={button.clickAction} key={index}>
                {button.content}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CustomAlert;

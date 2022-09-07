import { ReactElement } from "react";

type Button = {
  content: ReactElement;
  clickAction: React.MouseEventHandler<HTMLButtonElement>;
};

type Props = {
  icon: string;
  title: string;
  children: ReactElement;
  buttons: Button[];
};

function CustomAlert({ children, title, buttons }: Props) {
  return (
    <div className="fixed bg-black/30 w-full h-full flex justify-center items-center">
      <div className="bg-white rounded-md w-full max-w-2xl">
        <div className="p-4 border-b border-slate-300">{title}</div>
        <div className="p-4 border-b border-slate-300">{children}</div>
        <div className="p-4 border-b border-slate-300">
          {buttons.map((button, index) => {
            return (
              <button onClick={button.clickAction} key={index}>
                {button.content}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;

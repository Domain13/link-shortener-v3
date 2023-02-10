import { createContext } from "react";
import { PopupType } from "../types/popup";

export type PopupContextType = {
  popup: PopupType;
  setPopup: React.Dispatch<React.SetStateAction<PopupType>>;
};

export const PopupContext = createContext<PopupContextType>(null);

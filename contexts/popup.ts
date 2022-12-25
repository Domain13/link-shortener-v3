import { createContext } from "react";

export type PopupType =
  | "CreateDomain"
  | "CreateToken"
  | "CreateUser"
  | "ChangePassword"
  | "RedirectConfig"
  | null;

export type PopupContextType = {
  popup: PopupType;
  setPopup: React.Dispatch<React.SetStateAction<PopupType>>;
};

export const PopupContext = createContext<PopupContextType>(null);

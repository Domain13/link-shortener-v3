import { createContext } from "react";

export type CurrentRedirectLinkContextType = {
  currentRedirectLink: string;
  setCurrentRedirectLink: React.Dispatch<React.SetStateAction<string>>;
};

export const CurrentRedirectLinkContext =
  createContext<CurrentRedirectLinkContextType | null>(null);

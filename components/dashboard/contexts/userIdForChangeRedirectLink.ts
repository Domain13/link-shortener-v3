import { createContext } from "react";

export type UserIdForChangeRedirectLinkContextType = {
  userIdForChangeRedirectLink: string;
  setUserIdForChangeRedirectLink: React.Dispatch<React.SetStateAction<string>>;
};

export const UserIdForChangeRedirectLinkContext =
  createContext<UserIdForChangeRedirectLinkContextType | null>(null);

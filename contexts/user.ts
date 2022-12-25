import { createContext } from "react";
import React from "react";

export type UserType = {
  _id: string;
  username: string;
  role: string;
};

export type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

import { createContext } from "react";
import React from "react";
import { UserType } from "../types/user";

export type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

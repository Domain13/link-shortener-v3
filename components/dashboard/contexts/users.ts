import { createContext } from "react";
import { UserType } from "../../../types/user";

export type UsersContextType = {
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
};

export const UsersContext = createContext<UsersContextType | null>(null);

import { createContext } from "react";
import { TokenType } from "../../../types/token";

export type TokenContextType = {
  token: TokenType;
  setToken: React.Dispatch<React.SetStateAction<TokenType>>;
};

export const TokenContext = createContext<TokenContextType | null>(null);

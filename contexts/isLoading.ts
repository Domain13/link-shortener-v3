import { createContext } from "react";

export const IsLoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

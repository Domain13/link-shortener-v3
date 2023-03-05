import { createContext } from "react";

export type NoticeContextType = {
  notice: string;
  setNotice: React.Dispatch<React.SetStateAction<string>>;
};

export const NoticeContext = createContext<NoticeContextType>(null);

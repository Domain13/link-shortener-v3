import { createContext } from "react";

export type UserInfoForChangeDomainType = {
  domainForChange: string;
  setDomainForChange: (domain: string) => void;
  userIdForDomainChange: string;
  setUserIdForDomainChange: (id: string) => void;
  usernameForDomainChange: string;
  setUsernameForDomainChange: (username: string) => void;
};

export const UserInfoForChangeDomainContext =
  createContext<UserInfoForChangeDomainType | null>(null);

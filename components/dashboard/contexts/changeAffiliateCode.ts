import { createContext } from "react";

export type ChangeAffiliateCodesContextType = {
  userIdForChangeAffiliateCodes: string;
  setUserIdForChangeAffiliateCodes: (userId: string) => void;
  affiliateCodesForChange: string[];
  setAffiliateCodesForChange: (affiliateCodes: string[]) => void;
  usernameForChangeAffiliateCodes: string;
  setUsernameForChangeAffiliateCodes: (username: string) => void;
};

export const ChangeAffiliateCodesContext =
  createContext<ChangeAffiliateCodesContextType>({
    userIdForChangeAffiliateCodes: "",
    setUserIdForChangeAffiliateCodes: () => {},
    affiliateCodesForChange: [],
    setAffiliateCodesForChange: () => {},
    usernameForChangeAffiliateCodes: "",
    setUsernameForChangeAffiliateCodes: () => {},
  });

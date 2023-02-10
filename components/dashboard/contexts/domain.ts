import { DomainType } from "../../../types/domain";
import { createContext } from "react";

export type DomainContextType = {
  domains: DomainType[];
  setDomains: React.Dispatch<React.SetStateAction<DomainType[]>>;
};

export const DomainContext = createContext<DomainContextType | null>(null);

import React from "react";
import { useState } from "react";
import { UserContext } from "../contexts/user";
import { useContext } from "react";
import { useEffect } from "react";
import Head from "next/head";
import Popup from "../components/dashboard/popup/Popup";
import { UserType } from "../types/user";
import { DomainType } from "../types/domain";
import { DomainContext } from "../components/dashboard/contexts/domain";
import { UserIdForChangeRedirectLinkContext } from "../components/dashboard/contexts/userIdForChangeRedirectLink";
import { CurrentRedirectLinkContext } from "../components/dashboard/contexts/currentRedirectLink";
import { UsersContext } from "../components/dashboard/contexts/users";
import { TokenContext } from "../components/dashboard/contexts/tokens";
import { UserInfoForChangeDomainContext } from "../components/dashboard/contexts/userInfoForChangeDomain";
import { ChangeAffiliateCodesContext } from "../components/dashboard/contexts/changeAffiliateCode";
import Table from "../components/dashboard/table/Table";

const get = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export default function Dashboard() {
  //  ********* getting the contexts *************** //
  const userContext = useContext(UserContext);

  // ********* getting the states from the contexts *************** //
  const user = userContext.user;

  // ********* local states *************** //
  const [users, setUsers] = useState<UserType[]>([]);
  const [domains, setDomains] = useState<DomainType[]>([]);
  const [token, setToken] = useState({
    youtubeToken: "",
  });
  const [currentRedirectLink, setCurrentRedirectLink] = useState("");
  const [userIdForChangeRedirectLink, setUserIdForChangeRedirectLink] =
    useState("");
  const [domainForChange, setDomainForChange] = useState("");
  const [userIdForDomainChange, setUserIdForDomainChange] = useState("");
  const [usernameForDomainChange, setUsernameForDomainChange] = useState("");
  const [userIdForChangeAffiliateCodes, setUserIdForChangeAffiliateCodes] =
    useState("");
  const [affiliateCodesForChange, setAffiliateCodesForChange] = useState<
    string[]
  >([]);
  const [usernameForChangeAffiliateCodes, setUsernameForChangeAffiliateCodes] =
    useState("");

  useEffect(() => {
    if (!user) return;

    const users = get("/api/get_users");
    const domains = get("/api/get_domains");
    const tokens = get("/api/get_tokens");

    Promise.all([users, domains, tokens]).then((values) => {
      setUsers(values[0].data);
      setDomains(values[1].data);
      setToken(values[2].data);
    });
  }, [user]);

  return (
    <>
      <Head>
        <title>Admin Pannel</title>
      </Head>

      <DomainContext.Provider value={{ domains, setDomains }}>
        <UserIdForChangeRedirectLinkContext.Provider
          value={{
            userIdForChangeRedirectLink,
            setUserIdForChangeRedirectLink,
          }}
        >
          <CurrentRedirectLinkContext.Provider
            value={{ currentRedirectLink, setCurrentRedirectLink }}
          >
            <UsersContext.Provider value={{ users, setUsers }}>
              <TokenContext.Provider value={{ token, setToken }}>
                <UserInfoForChangeDomainContext.Provider
                  value={{
                    domainForChange,
                    setDomainForChange,
                    userIdForDomainChange,
                    setUserIdForDomainChange,
                    usernameForDomainChange,
                    setUsernameForDomainChange,
                  }}
                >
                  <ChangeAffiliateCodesContext.Provider
                    value={{
                      userIdForChangeAffiliateCodes,
                      setUserIdForChangeAffiliateCodes,
                      affiliateCodesForChange,
                      setAffiliateCodesForChange,
                      usernameForChangeAffiliateCodes,
                      setUsernameForChangeAffiliateCodes,
                    }}
                  >
                    <div className="Admin">
                      <h1 className="header-text">ADMIN PANNEL</h1>
                      <Popup />
                      <Table />
                    </div>
                  </ChangeAffiliateCodesContext.Provider>
                </UserInfoForChangeDomainContext.Provider>
              </TokenContext.Provider>
            </UsersContext.Provider>
          </CurrentRedirectLinkContext.Provider>
        </UserIdForChangeRedirectLinkContext.Provider>
      </DomainContext.Provider>
    </>
  );
}

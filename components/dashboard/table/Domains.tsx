import React, { useContext, useEffect, useState } from "react";
import { DomainContext } from "../contexts/domain";
import { PopupContext } from "../../../contexts/popup";
import { CurrentRedirectLinkContext } from "../contexts/currentRedirectLink";
import { UserIdForChangeRedirectLinkContext } from "../contexts/userIdForChangeRedirectLink";
import PostButton from "../../utils/PostButton";
import { ReturnedJsonType } from "../../../types/json";
import SearchDomain from "./SearchDomain";

export default function Domains() {
  const { domains, setDomains } = useContext(DomainContext);
  const { setPopup } = useContext(PopupContext);
  const { setCurrentRedirectLink } = useContext(CurrentRedirectLinkContext);
  const { setUserIdForChangeRedirectLink } = useContext(
    UserIdForChangeRedirectLinkContext
  );

  const [domainsToShow, setDomainsToShow] = useState([]);

  useEffect(() => {
    setDomainsToShow(domains);
  }, [domains]);

  async function afterDeleteDomain(json: ReturnedJsonType, body: any) {
    if (json.type === "SUCCESS") {
      console.log("json", json);
      // update the state
      setDomains(domains.filter((domain) => domain._id !== body._id));
    }
  }

  return (
    <div className="table">
      <SearchDomain domains={domains} setDomainsToShow={setDomainsToShow} />

      <div className="data domains">
        <h4 className="header">Domains</h4>
        <table>
          <thead>
            <tr>
              <th>Domain</th>
              <th>Error page</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {domainsToShow.map((domain, index) => (
              <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                <td>{domain.domain}</td>
                <td>
                  {domain.errorPage} <br />
                </td>
                <td>
                  <div className="options">
                    <button
                      className="btn green"
                      onClick={() => {
                        setUserIdForChangeRedirectLink(domain._id);
                        setCurrentRedirectLink(domain.errorPage);
                        setPopup("ChangeRedirectLink");
                      }}
                    >
                      Edit
                    </button>
                    <PostButton
                      path="/api/delete_domain"
                      body={{
                        _id: domain._id,
                      }}
                      afterPost={afterDeleteDomain}
                      className="btn red"
                    >
                      Delete
                    </PostButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

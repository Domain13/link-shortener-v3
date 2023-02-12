import React, { useContext, useState } from "react";
import { DomainContext } from "../contexts/domain";
import { PopupContext } from "../../../contexts/popup";
import { CurrentRedirectLinkContext } from "../contexts/currentRedirectLink";
import { UserIdForChangeRedirectLinkContext } from "../contexts/userIdForChangeRedirectLink";
import PostButton from "../../utils/PostButton";
import { ReturnedJsonType } from "../../../types/json";

export default function Domains() {
  const { domains, setDomains } = useContext(DomainContext);
  const { setPopup } = useContext(PopupContext);
  const { setCurrentRedirectLink } = useContext(CurrentRedirectLinkContext);
  const { setUserIdForChangeRedirectLink } = useContext(
    UserIdForChangeRedirectLinkContext
  );

  const [domainsToShow, setDomainsToShow] = useState(domains);
  const [domainSearch, setDomainSearch] = useState("");

  async function afterDeleteDomain(json: ReturnedJsonType, body: any) {
    if (json.type === "SUCCESS") {
      console.log("json", json);
      // update the state
      setDomains(domains.filter((domain) => domain._id !== body._id));
    }
  }

  async function handleSearchDomain(e: any) {
    e.preventDefault();

    if (domainSearch.length === 0) {
      setDomainsToShow(domains);
    } else {
      setDomainsToShow(
        domains.filter((domain) =>
          domain.domain.toLowerCase().includes(domainSearch.toLowerCase())
        )
      );
    }
  }

  return (
    <div className="table">
      <form className="search form" onSubmit={handleSearchDomain}>
        <div className="form-wrapper label-input">
          <input
            type="text"
            placeholder="Search"
            value={domainSearch}
            onChange={(e) => setDomainSearch(e.target.value)}
          />
          <div
            className="cancel"
            onClick={() => {
              setDomainSearch("");
              setDomainsToShow(domains);
            }}
          >
            X
          </div>
        </div>
        <button className="btn green">Search</button>
      </form>

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

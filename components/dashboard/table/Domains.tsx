import React, { useContext } from "react";
import { DomainContext } from "../contexts/domain";
import { PopupContext } from "../../../contexts/popup";
import { CurrentRedirectLinkContext } from "../contexts/currentRedirectLink";
import { UserIdForChangeRedirectLinkContext } from "../contexts/userIdForChangeRedirectLink";
import PostButton from "../../utils/PostButton";
import { ReturnedJsonType } from "../../../types/json";

export default function Domains() {
  // ********* getting the contexts *************** //
  const domainContext = useContext(DomainContext);
  const popupContext = useContext(PopupContext);
  const currentRedirectLinkContext = useContext(CurrentRedirectLinkContext);
  const userIdForChangeRedirectLinkContext = useContext(
    UserIdForChangeRedirectLinkContext
  );

  // ********* getting the states from the contexts *************** //
  const domains = domainContext.domains;
  const setDomains = domainContext.setDomains;

  const setPopup = popupContext.setPopup;

  const setCurrentRedirectLink =
    currentRedirectLinkContext.setCurrentRedirectLink;

  const setUserIdForChangeRedirectLink =
    userIdForChangeRedirectLinkContext.setUserIdForChangeRedirectLink;

  // ************************** //

  async function afterDeleteDomain(json: ReturnedJsonType, body: any) {
    if (json.type === "SUCCESS") {
      console.log("json", json);
      // update the state
      setDomains(domains.filter((domain) => domain._id !== body._id));
    }
  }

  return (
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
          {domains.map((domain, index) => (
            <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
              <td>{domain.domain}</td>
              <td>
                {domain.errorPage} <br />
              </td>
              <td>
                <div className="options">
                  <button
                    // style={{
                    //   // TODO
                    //   fontSize: ".8rem",
                    //   padding: "8px 15px",
                    //   marginBottom: "5px",
                    // }}
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
                    // extra={{
                    //   style: {
                    //     fontSize: "0.8rem",
                    //     wordBreak: "keep-all",
                    //   },
                    // }}
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
  );
}

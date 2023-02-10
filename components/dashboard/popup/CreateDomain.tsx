import React, { useContext, useState } from "react";
import { isURL } from "validator";
import { DomainContext } from "../contexts/domain";
import PopupForm from "../../utils/PopupForm";
import { SendType } from "../../utils/Form";

export default function CreateDomain() {
  const { domains, setDomains } = useContext(DomainContext);

  const [domain, setDomain] = useState("");
  const [errorPage, setErrorPage] = useState("");

  // Create a domain
  const handleCreateDomain = async (send: SendType) => {
    // Check if the domain is valid
    if (
      !isURL(domain, { require_protocol: true }) &&
      domain !== "http://localhost:3000"
    ) {
      alert("You need to give a valid url");
      return;
    }

    // Check if the error page is valid
    if (errorPage !== "" && !isURL(errorPage, { require_protocol: true })) {
      alert("You need to give a valid url");
      return;
    }

    const json = await send("/api/create_domain", {
      domain,
      errorPage,
    });

    if (json.type === "ALREADY") {
      alert("Domain already exists");
    } else if (json.type === "SUCCESS") {
      // remove the input values
      setDomain("");
      setErrorPage("");

      // update the root domains state
      setDomains([...domains, json.data]);
    }
  };

  return (
    <>
      <PopupForm submitHandler={handleCreateDomain}>
        <h1 className="header">Create Custom Domain</h1>

        <div className="form-wrapper label-input">
          <label htmlFor="domain">Custom Domain</label>
          <input
            type="text"
            name="domain"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <div className="form-wrapper label-input">
          <label htmlFor="errorPage">Error Page</label>
          <input
            type="text"
            name="errorPage"
            id="errorPage"
            value={errorPage}
            onChange={(e) => setErrorPage(e.target.value)}
          />
        </div>

        <button className="btn green" type="submit">
          Create
        </button>
      </PopupForm>
    </>
  );
}

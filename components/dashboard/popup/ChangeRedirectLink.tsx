import React, { useContext, useState } from "react";
import { isURL } from "validator";
import { PopupContext } from "../../../contexts/popup";
import { IsLoadingContext } from "../../../contexts/isLoading";
import { DomainContext } from "../contexts/domain";
import { UserIdForChangeRedirectLinkContext } from "../contexts/userIdForChangeRedirectLink";
import { CurrentRedirectLinkContext } from "../contexts/currentRedirectLink";
import { SendType } from "../../utils/Form";
import PopupForm from "../../utils/PopupForm";

export default function ChangeRedirectLink() {
  // ********* getting the contexts *************** //
  const popupContext = useContext(PopupContext);
  const isLoadingContext = useContext(IsLoadingContext);
  const domainContext = useContext(DomainContext);
  const userIdForChangeRedirectLinkContext = useContext(
    UserIdForChangeRedirectLinkContext
  );
  const currentRedirectLinkContext = useContext(CurrentRedirectLinkContext);

  // ********* getting the states from the contexts *************** //
  const setPopup = popupContext.setPopup;

  const setIsLoading = isLoadingContext.setIsLoading;

  const domains = domainContext.domains;
  const setDomains = domainContext.setDomains;

  const userIdForChangeRedirectLink =
    userIdForChangeRedirectLinkContext.userIdForChangeRedirectLink;
  const currentRedirectLink = currentRedirectLinkContext.currentRedirectLink;

  // *************** Local State ***************** //
  const [errorPage, setErrorPage] = useState(currentRedirectLink);

  async function handleChangeRedirectLink(send: SendType) {
    // e.preventDefault();

    // const errorPage = e.target[0].value;

    if (
      !isURL(errorPage, { require_protocol: true }) &&
      errorPage !== "http://localhost:3000"
    ) {
      alert("You need to give a valid url");
      return;
    }

    // setIsLoading(true);
    // const res = await fetch("/api/change_redirect_link", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     errorPage,
    //     _id: userIdForChangeRedirectLink,
    //   }),
    // });
    // const datas = await res.json();

    const json = await send("/api/change_redirect_link", {
      errorPage,
      _id: userIdForChangeRedirectLink,
    });

    if (json.type === "SUCCESS") {
      // update the domain state
      setDomains(
        domains.map((domain) => {
          if (domain._id === userIdForChangeRedirectLink) {
            return { ...domain, errorPage };
          }
          return domain;
        })
      );
    }

    setPopup(null);
    setIsLoading(false);
  }

  return (
    <>
      <PopupForm submitHandler={handleChangeRedirectLink}>
        <h1 className="header">Change Redirect link</h1>

        <div className="form-wrapper label-input">
          <label htmlFor="errorPage">Error page</label>
          <input
            type="text"
            name="errorPage"
            id="errorPage"
            value={errorPage}
            onChange={(e) => {
              setErrorPage(e.target.value);
            }}
          />
        </div>

        <button className="btn green" type="submit">
          Change
        </button>
      </PopupForm>
    </>
  );
}

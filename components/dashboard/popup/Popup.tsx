import React, { useContext } from "react";
import CreateDomain from "./CreateDomain";
import ChangeYoutubeToken from "./ChangeYoutubeToken";
import CreateUser from "./CreateUser";
import ChangePassword from "./ChangePassword";
import ChangeRedirectLink from "./ChangeRedirectLink";
import ChangeDomain from "./ChangeDomain";
import ChangeAffiliateCode from "./ChangeAffiliateCodes";
import ChangeNotice from "./ChangeNotice";
import { PopupContext } from "../../../contexts/popup";

export default function Popup() {
  const popupContext = useContext(PopupContext);
  const popup = popupContext.popup;

  return (
    <>
      {popup === "CreateDomain" && <CreateDomain />}
      {popup === "ChangeYoutubeToken" && <ChangeYoutubeToken />}
      {popup === "ChangePassword" && <ChangePassword />}
      {popup === "CreateUser" && <CreateUser />}
      {popup === "ChangeRedirectLink" && <ChangeRedirectLink />}
      {popup === "ChangeDomain" && <ChangeDomain />}
      {popup === "ChangeAffiliateCode" && <ChangeAffiliateCode />}
      {popup === "ChangeNotice" && <ChangeNotice />}
    </>
  );
}

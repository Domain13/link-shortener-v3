import { useContext } from "react";
import Users from "./Users";
import Domains from "./Domains";
import { PopupContext } from "../../../contexts/popup";

export default function Table() {
  const popupContext = useContext(PopupContext);
  const popup = popupContext.popup;

  return (
    <div
      className="data-table"
      style={{
        opacity: popup ? 0.2 : 1,
      }}
    >
      <Users />
      <Domains />
    </div>
  );
}

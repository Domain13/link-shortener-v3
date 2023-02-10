import { useContext } from "react";
import Users from "./Users";
import Domains from "./Domains";
import { PopupContext } from "../../../contexts/popup";

export default function Table() {
  const { popup } = useContext(PopupContext);

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

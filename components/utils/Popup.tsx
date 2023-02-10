import React, { useContext } from "react";
import { PopupContext } from "../../contexts/popup";

export default function Popup({ children }: { children: React.ReactNode }) {
  // ********* getting the contexts *************** //
  const popupContext = useContext(PopupContext);

  // ********* getting the states from the contexts *************** //
  const setPopup = popupContext.setPopup;

  return (
    <>
      <div className="popup">
        {children}
        <button
          className="cancel-button btn red"
          onClick={() => {
            setPopup(null);
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

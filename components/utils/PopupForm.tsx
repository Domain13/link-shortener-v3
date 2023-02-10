import React, { useContext } from "react";
import Popup from "./Popup";
import Form from "./Form";
import { SendType } from "./Form";
import { PopupContext } from "../../contexts/popup";
import { ReturnedJsonType } from "../../types/json";

export default function PopupForm({
  className,
  submitHandler,
  children,
}: {
  className?: string;
  submitHandler: (send: SendType) => void;
  children: React.ReactNode;
}) {
  // This component is just a wrapper for the Form component
  // It just adds the popup component

  // ********* getting the contexts *************** //
  const popupContext = useContext(PopupContext);

  // ********* getting the states from the contexts *************** //
  const setPopup = popupContext.setPopup;

  const handleSubmit = async (send) => {
    submitHandler(send);
    setPopup(null);
  };

  return (
    <Popup>
      <Form submitHandler={handleSubmit} className={className}>
        {children}
      </Form>
    </Popup>
  );
}

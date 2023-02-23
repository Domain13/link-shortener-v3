import React, { useState, useContext } from "react";
import PopupForm from "../../utils/PopupForm";
import { SendType } from "../../utils/Form";
import { NoticeContext } from "../contexts/notice";

export default function ChangeNotice() {
  const { notice, setNotice } = useContext(NoticeContext);
  const [noticeText, setNoticeText] = useState(notice);

  // Change the notice
  async function handleChangeNotice(send: SendType) {
    if (noticeText === "") {
      alert("The value you provided is empty!");
      return;
    }

    const json = await send("/api/change_notice", {
      notice: noticeText,
    });

    if (json.type === "SUCCESS") {
      setNotice(noticeText);
    }
  }

  return (
    <PopupForm submitHandler={handleChangeNotice}>
      <h1 className="header">Change Notice</h1>

      <div className="form-wrapper label-input">
        <label htmlFor="notice">Notice</label>
        <textarea
          name="notice"
          id="notice"
          value={noticeText}
          onChange={(e) => {
            setNoticeText(e.target.value);
          }}
        />
      </div>

      <button className="btn green" type="submit">
        Change
      </button>
    </PopupForm>
  );
}

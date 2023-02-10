import React, { useState, useContext } from "react";
import { SendType } from "../../utils/Form";
import PopupForm from "../../utils/PopupForm";
import { ChangeAffiliateCodesContext } from "../contexts/changeAffiliateCode";
import { UsersContext } from "../contexts/users";

export default function ChangeAffiliateCodes() {
  const { setUsers, users } = useContext(UsersContext);
  const {
    userIdForChangeAffiliateCodes,
    usernameForChangeAffiliateCodes,
    affiliateCodesForChange,
  } = useContext(ChangeAffiliateCodesContext);

  const [affiliateCodes, setAffiliateCodes] = useState(
    affiliateCodesForChange.join(", ")
  );

  async function handleChangeAffiliateCode(send: SendType) {
    if (affiliateCodes === "") {
      alert("The value you provided is empty!");
      return;
    }

    const separatedAffiliateCodes = affiliateCodes.split(",").map((code) => {
      return code.trim();
    });

    const json = await send("/api/change_affiliate_code", {
      affiliateCodes: separatedAffiliateCodes,
      _id: userIdForChangeAffiliateCodes,
    });

    if (json.type === "SUCCESS") {
      // update the state
      setUsers(
        users.map((user) => {
          if (user._id === userIdForChangeAffiliateCodes) {
            user.affiliateCodes = separatedAffiliateCodes;
          }

          return user;
        })
      );
    }
  }

  return (
    <PopupForm submitHandler={handleChangeAffiliateCode}>
      <h1 className="header">Change Affiliate Code</h1>

      <p className="text">
        Username: <b>{usernameForChangeAffiliateCodes}</b>
      </p>

      <div className="form-wrapper label-input">
        <label htmlFor="affiliateCode">Affiliate Code</label>
        <textarea
          name="affiliateCode"
          id="affiliateCode"
          value={affiliateCodes}
          onChange={(e) => {
            setAffiliateCodes(e.target.value);
          }}
        />
      </div>

      <button className="btn green" type="submit">
        Change
      </button>
    </PopupForm>
  );
}

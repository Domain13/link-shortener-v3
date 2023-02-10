import React, { useContext, useState } from "react";
import { UsersContext } from "../contexts/users";
import { DomainContext } from "../contexts/domain";
import { SendType } from "../../utils/Form";
import { UserInfoForChangeDomainContext } from "../contexts/userInfoForChangeDomain";
import PopupForm from "../../utils/PopupForm";

export default function ChangeDomain() {
  const { setUsers, users } = useContext(UsersContext);
  const { domains } = useContext(DomainContext);

  const {
    domainForChange,
    setDomainForChange,
    userIdForDomainChange,
    usernameForDomainChange,
  } = useContext(UserInfoForChangeDomainContext);

  async function handleChangeDomain(send: SendType) {
    const json = await send("/api/change_domain", {
      domain: domainForChange,
      _id: userIdForDomainChange,
    });

    if (json.type === "SUCCESS") {
      // update the state
      setUsers(
        users.map((user) => {
          if (user._id === userIdForDomainChange) {
            user.domain = domainForChange;
          }

          return user;
        })
      );
    }
  }

  return (
    <PopupForm submitHandler={handleChangeDomain}>
      <h1 className="header">Change Domain</h1>

      <p className="text">
        Username: <b>{usernameForDomainChange}</b>
      </p>

      <div className="form-wrapper select">
        <label htmlFor="domain">Domain</label>
        <select
          name="domain"
          id="domain"
          value={domainForChange}
          onChange={(e) => setDomainForChange(e.target.value)}
        >
          {domains.map((domain, index) => (
            <option key={index} value={domain.domain}>
              {domain.domain}
            </option>
          ))}
        </select>
        <button className="btn green" type="submit">
          Change
        </button>
      </div>
    </PopupForm>
  );
}

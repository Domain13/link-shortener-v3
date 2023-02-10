import React, { useState, useContext, useEffect } from "react";
import { DomainContext } from "../contexts/domain";
import { UsersContext } from "../contexts/users";
import PopupForm from "../../utils/PopupForm";
import { ReturnedJsonType } from "../../../types/json";
import { SendType } from "../../utils/Form";

export default function CreateUser() {
  const { domains } = useContext(DomainContext);
  const { users, setUsers } = useContext(UsersContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRedirectOnLimit, setShouldRedirectOnLimit] = useState(false);
  const [domainForUserInput, setDomainForUserInput] = useState("");
  const [affiliateCodes, setAffiliateCodes] = useState("");

  useEffect(() => {
    if (domains.length > 0) {
      setDomainForUserInput(domains[0].domain);
    }
  }, [domains]);

  // Create a user
  async function handleCreateUser(send: SendType) {
    // Separate the affiliate codes
    // also trim the spaces
    const separatedAffiliateCodes = affiliateCodes
      .split(",")
      .map((code) => code.trim());

    // Check if all the fields are filled
    if (username === "" || password === "" || domainForUserInput === "") {
      alert(
        "You need to provide valid username and password and domain and first token"
      );
      return;
    }

    const json = await send("/api/register", {
      username,
      password,
      domain: domainForUserInput,
      affiliateCodes: separatedAffiliateCodes,
      shouldRedirectOnLimit,
    });

    if (json.type === "SUCCESS") {
      // remove the input values
      setUsername("");
      setPassword("");
      setAffiliateCodes("");
      setShouldRedirectOnLimit(false);

      // update the users state
      setUsers([...users, json.data]);
    } else if (json.type === "ALREADY") {
      alert("User already exists");
    } else if (json.type === "NOTFOUND") {
      alert("Domain does not exist");
    }
  }

  return (
    <>
      <PopupForm submitHandler={handleCreateUser}>
        <h1 className="header">Create User</h1>

        <div className="form-wrapper label-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            // placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-wrapper label-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            // placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-wrapper label-input">
          <label htmlFor="affiliateCodes">Affiliate Codes</label>
          <input
            type="text"
            // placeholder="Affiliate profile code"
            value={affiliateCodes}
            onChange={(e) => setAffiliateCodes(e.target.value)}
          />
        </div>

        <div className="form-wrapper checkbox">
          <label htmlFor="check">Redirect to Error page</label>
          <input
            type="checkbox"
            id="check"
            checked={shouldRedirectOnLimit}
            onChange={(e) => setShouldRedirectOnLimit(e.target.checked)}
          />
        </div>

        <div className="form-wrapper select">
          <label htmlFor="domain">Domain</label>
          <select
            name="domain"
            id="domain"
            value={domainForUserInput}
            onChange={(e) => setDomainForUserInput(e.target.value)}
          >
            {domains.map((domain, index) => (
              <option key={index} value={domain.domain}>
                {domain.domain}
              </option>
            ))}
          </select>
        </div>

        <button className="btn green" type="submit">
          Create
        </button>
      </PopupForm>
    </>
  );
}

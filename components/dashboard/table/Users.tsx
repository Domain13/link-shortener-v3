import React, { useContext, useState } from "react";
import { UsersContext } from "../contexts/users";
import { PopupContext } from "../../../contexts/popup";
import { UserInfoForChangeDomainContext } from "../contexts/userInfoForChangeDomain";
import { ChangeAffiliateCodesContext } from "../contexts/changeAffiliateCode";
import PostButton from "../../utils/PostButton";
import { ReturnedJsonType } from "../../../types/json";
import Form from "../../utils/Form";

export default function Users() {
  const { users, setUsers } = useContext(UsersContext);
  const {
    setDomainForChange,
    setUserIdForDomainChange,
    setUsernameForDomainChange,
  } = useContext(UserInfoForChangeDomainContext);
  const {
    setUserIdForChangeAffiliateCodes,
    setAffiliateCodesForChange,
    setUsernameForChangeAffiliateCodes,
  } = useContext(ChangeAffiliateCodesContext);
  const { setPopup } = useContext(PopupContext);

  const [usersToShow, setUsersToShow] = useState(users);
  const [usernameSearch, setUsernameSearch] = useState("");

  // After the user is deleted, update the state
  async function afterDeleteUser(json: ReturnedJsonType, body: any) {
    if (json.type === "SUCCESS") {
      setUsers(users.filter((user) => user._id !== body._id));
    }
  }

  // After the user's redirect config is changed, update the state
  async function afterChangeRedirectConfig(json: ReturnedJsonType, body: any) {
    if (json.type === "SUCCESS") {
      setUsers(
        users.map((user) => {
          if (user._id === body._id) {
            user.shouldRedirectOnLimit = !user.shouldRedirectOnLimit;
          }

          return user;
        })
      );
    }
  }

  // After the user's always redirect config is changed, update the state
  async function afterChangeAlwaysRedirectConfig(
    json: ReturnedJsonType,
    body: any
  ) {
    if (json.type === "SUCCESS") {
      setUsers(
        users.map((user) => {
          if (user._id === body._id) {
            user.shouldAlwaysRedirect = !user.shouldAlwaysRedirect;
          }

          return user;
        })
      );
    }
  }

  async function handleSearchUser(e: any) {
    e.preventDefault();

    if (usernameSearch === "") {
      setUsersToShow(users);
    } else {
      setUsersToShow(
        users.filter((user) =>
          user.username.toLowerCase().includes(usernameSearch.toLowerCase())
        )
      );
    }
  }

  return (
    <div className="table">
      <form className="search form" onSubmit={handleSearchUser}>
        <div className="form-wrapper label-input">
          <input
            type="text"
            placeholder="Search"
            value={usernameSearch}
            onChange={(e) => setUsernameSearch(e.target.value)}
          />
          <div
            className="cancel"
            onClick={() => {
              setUsernameSearch("");
              setUsersToShow(users);
            }}
          >
            X
          </div>
        </div>
        <button className="btn green">Search</button>
      </form>

      <div className="data users">
        <h4 className="header">Users</h4>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Domain</th>
              <th>Code</th>
              <th>Redirect</th>
              <th>Always Redirect</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersToShow.map((user, index) => (
              <tr key={user._id} className={index % 2 === 0 ? "even" : "odd"}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  {
                    <div className="text-with-button">
                      <p className="text">{user.domain}</p>
                      <button
                        className="btn green"
                        onClick={() => {
                          setDomainForChange(user.domain);
                          setUserIdForDomainChange(user._id);
                          setUsernameForDomainChange(user.username);
                          setPopup("ChangeDomain");
                        }}
                      >
                        Change
                      </button>
                    </div>
                  }
                </td>
                <td>
                  {
                    <div className="text-with-button">
                      <p className="text">{user.affiliateCodes.join(", ")}</p>
                      <button
                        className="btn green"
                        onClick={() => {
                          setUserIdForChangeAffiliateCodes(user._id);
                          setAffiliateCodesForChange(user.affiliateCodes);
                          setUsernameForChangeAffiliateCodes(user.username);
                          setPopup("ChangeAffiliateCode");
                        }}
                      >
                        Change
                      </button>
                    </div>
                  }
                </td>
                <td>
                  <div className="text-with-button">
                    <p className="text">
                      Status: <b>{user.shouldRedirectOnLimit ? "On" : "Off"}</b>
                    </p>
                    <PostButton
                      path="/api/change_redirect_config"
                      body={{
                        _id: user._id,
                      }}
                      afterPost={afterChangeRedirectConfig}
                      className="btn green"
                    >
                      Turn {user.shouldRedirectOnLimit ? "Off" : "On"}
                    </PostButton>
                  </div>
                </td>
                <td>
                  <div className="text-with-button">
                    <p className="text">
                      Status: <b>{user.shouldAlwaysRedirect ? "On" : "Off"}</b>
                    </p>
                    <PostButton
                      path="/api/change_always_redirect_config"
                      body={{
                        _id: user._id,
                      }}
                      afterPost={afterChangeAlwaysRedirectConfig}
                      className="btn green"
                    >
                      Turn {user.shouldAlwaysRedirect ? "Off" : "On"}
                    </PostButton>
                  </div>
                </td>
                <td>
                  <div className="options">
                    {user.role !== "admin" && (
                      <PostButton
                        path="/api/delete_user"
                        body={{
                          _id: user._id,
                        }}
                        afterPost={afterDeleteUser}
                        className="btn red"
                      >
                        Delete
                      </PostButton>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

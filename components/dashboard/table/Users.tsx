import React, { useContext } from "react";
import { UsersContext } from "../contexts/users";
import { PopupContext } from "../../../contexts/popup";
import { UserInfoForChangeDomainContext } from "../contexts/userInfoForChangeDomain";
import PostButton from "../../utils/PostButton";
import { ReturnedJsonType } from "../../../types/json";

export default function Users() {
  const { users, setUsers } = useContext(UsersContext);
  const {
    setDomainForChange,
    setUserIdForDomainChange,
    setUsernameForDomainChange,
  } = useContext(UserInfoForChangeDomainContext);

  const { setPopup } = useContext(PopupContext);

  // ************************** //

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

  return (
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
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
              <td>{user.affiliateCodes.join(", ")}</td>
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
  );
}

// COMPLETE

import React from "react";
import { useState } from "react";
import { UserContext } from "../contexts/user";
import { useContext } from "react";
import { PopupContext } from "../contexts/popup";
import { useEffect } from "react";
import { isURL } from "validator";

export default function Dashboard() {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const popupContext = useContext(PopupContext);
  const popup = popupContext.popup;
  const setPopup = popupContext.setPopup;

  const [shortUrls, setShortUrls] = useState([]);
  const [users, setUsers] = useState([]);
  const [domains, setDomains] = useState([]);
  const [token, setToken] = useState({ token: "" });
  const [shouldRedirectOnLimit, setShouldRedirectOnLimit] = useState(false);

  useEffect(() => {
    const getShortUrls = async () => {
      const res = await fetch("/api/get_short_urls");
      const datas = await res.json();

      if (datas.type === "SUCCESS") {
        setShortUrls(datas.data);
      }
    };

    const getUsers = async () => {
      const res = await fetch("/api/get_users");
      const datas = await res.json();

      if (datas.type === "SUCCESS") {
        setUsers(datas.data);
      }
    };

    const getDomains = async () => {
      const res = await fetch("/api/get_domains");
      const datas = await res.json();

      if (datas.type === "SUCCESS") {
        setDomains(datas.data);
      }
    };

    const getToken = async () => {
      const res = await fetch("/api/get_token");
      const datas = await res.json();

      if (datas.type === "SUCCESS") {
        setToken(datas.data);
      }
    };

    const getShouldRedirectOnLimit = async () => {
      const res = await fetch("/api/get_should_redirect_on_limit");
      const datas = await res.json();

      if (datas.type === "SUCCESS") {
        setShouldRedirectOnLimit(datas.data);
      }
    };

    if (user) {
      getShortUrls();
      getUsers();
      getDomains();
      getToken();
      getShouldRedirectOnLimit();
    }
  }, [user]);

  async function handleCreateDomain(e) {
    e.preventDefault();
    const domain = e.target[0].value;
    let errorPage = e.target[1].value;

    if (
      !isURL(domain, { require_protocol: true }) &&
      domain !== "http://localhost:3000"
    ) {
      alert("You need to give a valid url");
      return;
    }

    // if the errorPage starts with / remove that
    if (errorPage.startsWith("/")) {
      errorPage = errorPage.substring(1);
    }

    const res = await fetch("/api/create_domain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain,
        errorPage,
      }),
    });
    const datas = await res.json();

    if (datas.type === "ALREADY") {
      alert("Domain already exists");
    } else if (datas.type === "SUCCESS") {
      // remove the input values
      e.target[0].value = "";
      e.target[1].value = "";

      // close the popup
      setPopup(null);

      // update the domains state
      setDomains([...domains, datas.data]);
    }
  }

  async function handleCreateToken(e) {
    e.preventDefault();
    const token = e.target[0].value;

    if (token === "") {
      alert("The value you provided is empty!");
      return;
    }

    const res = await fetch("/api/create_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });

    const datas = await res.json();

    if (datas.type === "SUCCESS") {
      setToken({ token });
    }

    setPopup(null);
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    if (username === "" || password === "") {
      alert("You need to provide valid username and password");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();

    if (data.type === "SUCCESS") {
      // remove the input values
      e.target[0].value = "";
      e.target[1].value = "";

      // close the popup
      setPopup(null);

      // update the users state
      setUsers([...users, data.data]);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    const username = "admin";
    const password = e.target[0].value;
    const newPassword = e.target[1].value;

    if (password === "" || newPassword === "") {
      alert("You need to provide valid passwords");
      return;
    }

    const res = await fetch("/api/change_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        newPassword,
      }),
    });
    const datas = await res.json();

    if (datas.type === "SUCCESS") {
      // remove the input values
      e.target[0].value = "";
      e.target[1].value = "";

      // close the popup
      setPopup(null);
    } else {
      alert("Wrong password");
    }
  }

  async function handleChangeRedirectConfig(e) {
    // the input has only one value
    // it is a checkbox
    e.preventDefault();

    const res = await fetch("/api/change_redirect_config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.type === "SUCCESS") {
      // update the state
      setShouldRedirectOnLimit(!shouldRedirectOnLimit);
    }
  }

  async function handleDeleteDomain(_id) {
    const res = await fetch("/api/delete_domain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    });

    const datas = await res.json();

    if (datas.type === "SUCCESS") {
      // update the state
      setDomains(domains.filter((domain) => domain._id !== _id));
    }
  }

  return (
    <>
      {/* <Navbar user={users} dashboard={true} setPopup={setPopup} /> */}
      <div className="App">
        <h1>ADMIN PANNEL</h1>

        {popup === "CreateDomain" && (
          <form action="#" onSubmit={handleCreateDomain}>
            <h1>Create Custom Domain</h1>
            <input type="text" placeholder="custom domain" />
            <input type="text" placeholder="Error page" />
            <button className="btn" type="submit">
              Create
            </button>
            <button
              onClick={() => {
                setPopup(null);
              }}
            >
              Cancel
            </button>
          </form>
        )}
        {popup === "CreateToken" && (
          <form action="#" onSubmit={handleCreateToken}>
            <h1>Create/Change Token</h1>
            <textarea
              placeholder="Change/Create Token"
              defaultValue={token.token}
            />
            <button className="btn" type="submit">
              Create/Change
            </button>
            <button
              onClick={() => {
                setPopup(null);
              }}
            >
              Cancel
            </button>
          </form>
        )}
        {popup === "CreateUser" && (
          <form action="#" onSubmit={handleCreateUser}>
            <h1>Create User</h1>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button className="btn" type="submit">
              Create
            </button>
            <button
              onClick={() => {
                setPopup(null);
              }}
            >
              Cancel
            </button>
          </form>
        )}
        {popup === "ChangePassword" && (
          <form action="#" onSubmit={handleChangePassword}>
            <h1>Change Password</h1>
            <input type="text" placeholder="Old Password" />
            <input type="text" placeholder="New Password" />
            <button className="btn" type="submit">
              Change
            </button>
            <button
              onClick={() => {
                setPopup(null);
              }}
            >
              Cancel
            </button>
          </form>
        )}
        {popup === "RedirectConfig" && (
          <form action="#" onSubmit={handleChangeRedirectConfig}>
            <h1>Redirect after 4 clicks? On/Off</h1>
            <p>
              Current Status: <b>{shouldRedirectOnLimit ? "On" : "Off"}</b>
            </p>
            <input type="submit" value={shouldRedirectOnLimit ? "Off" : "On"} />
          </form>
        )}

        <div className="datas">
          <div className="data urls">
            <h4>Links</h4>
            <table>
              <thead>
                <tr>
                  <th>Short Code</th>
                  <th>Original Url</th>
                  <th>Clicks</th>
                  <th>Created By</th>
                  <th>Custom Domain</th>
                </tr>
              </thead>
              <tbody>
                {shortUrls.map((url) => (
                  <tr key={url._id}>
                    <td>{url.shortCode}</td>
                    <td>{url.originalUrl}</td>
                    <td>{url.clicks}</td>
                    <td>{url.createdBy}</td>
                    <td>{url.customDomain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="data users">
            <h4>Users</h4>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="data domains">
            <h4>Domains</h4>
            <table>
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Error page</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((domain, index) => (
                  <tr key={index}>
                    <td>{domain.domain}</td>
                    <td>{domain.errorPage}</td>
                    <td>
                      <button
                        className="btn"
                        style={{ fontSize: "13px", padding: "10px", margin: 0 }}
                        onClick={() => {
                          handleDeleteDomain(domain._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

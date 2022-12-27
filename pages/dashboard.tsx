// COMPLETE

import React from "react";
import { useState } from "react";
import { UserContext } from "../contexts/user";
import { useContext } from "react";
import { PopupContext } from "../contexts/popup";
import { useEffect } from "react";
import { isURL } from "validator";
import Head from "next/head";
import { IsLoadingContext } from "../contexts/isLoading";

export default function Dashboard() {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const popupContext = useContext(PopupContext);
  const popup = popupContext.popup;
  const setPopup = popupContext.setPopup;
  const isLoadingContext = useContext(IsLoadingContext);
  const setIsLoading = isLoadingContext.setIsLoading;

  const [shortUrls, setShortUrls] = useState([]);
  const [users, setUsers] = useState([]);
  const [domains, setDomains] = useState([]);
  const [token, setToken] = useState({ youtubeToken: "", googleToken: "" });
  const [shouldRedirectOnLimit, setShouldRedirectOnLimit] = useState(false);
  const [domainForUserInput, setDomainForUserInput] = useState("");

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
      const res = await fetch("/api/get_tokens");
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

  useEffect(() => {
    if (domains.length > 0) {
      setDomainForUserInput(domains[0].domain);
    }
  }, [domains]);

  async function handleCreateDomain(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const domain = e.target[0].value;
    const errorPage = e.target[1].value;

    if (
      !isURL(domain, { require_protocol: true }) &&
      domain !== "http://localhost:3000"
    ) {
      alert("You need to give a valid url");
      return;
    }

    if (errorPage !== "" && !isURL(errorPage, { require_protocol: true })) {
      alert("You need to give a valid url");
      return;
    }

    setIsLoading(true);
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

      // alert("Success");
    }

    setIsLoading(false);
  }

  async function handleChangeYoutubeToken(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const yttoken = e.target[0].value;

    if (yttoken === "") {
      alert("The value you provided is empty!");
      return;
    }

    setIsLoading(true);
    const res = await fetch("/api/change_youtube_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: yttoken,
      }),
    });

    const datas = await res.json();

    if (datas.type === "SUCCESS") {
      // update the token state
      setToken({ ...token, youtubeToken: yttoken });
    }

    setPopup(null);
    setIsLoading(false);
  }

  async function handleChangeGoogleToken(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const gtoken = e.target[0].value;

    if (gtoken === "") {
      alert("The value you provided is empty!");
      return;
    }

    setIsLoading(true);
    const res = await fetch("/api/change_google_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: gtoken,
      }),
    });

    const datas = await res.json();

    if (datas.type === "SUCCESS") {
      // update the token state
      setToken({ ...token, googleToken: gtoken });
    }

    setPopup(null);
    setIsLoading(false);
  }

  async function handleCreateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;
    const code = e.target[2].value;

    if (username === "" || password === "" || domainForUserInput === "") {
      alert(
        "You need to provide valid username and password and domain and code"
      );
      return;
    }

    setIsLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        domain: domainForUserInput,
        code,
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
    } else if (data.type === "ALREADY") {
      alert("User already exists");
    } else if (data.type === "NOTFOUND") {
      alert("Domain does not exist");
    }

    setIsLoading(false);
  }

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = "admin";
    const password = e.target[0].value;
    const newPassword = e.target[1].value;

    if (password === "" || newPassword === "") {
      alert("You need to provide valid passwords");
      return;
    }

    setIsLoading(true);
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

    setIsLoading(false);
  }

  async function handleChangeRedirectConfig(
    e: React.FormEvent<HTMLFormElement>
  ) {
    // the input has only one value
    // it is a checkbox
    e.preventDefault();
    setIsLoading(true);
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

    setIsLoading(false);
  }

  async function handleDeleteDomain(_id: string) {
    setIsLoading(true);
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

    setIsLoading(false);
  }

  async function handleDeleteUser(_id: string) {
    setIsLoading(true);

    const res = await fetch("/api/delete_user", {
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
      setUsers(users.filter((user) => user._id !== _id));
    }

    setIsLoading(false);
  }

  async function handleDeleteShortUrl(_id: string) {
    setIsLoading(true);
    const res = await fetch("/api/delete_url", {
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
      setShortUrls(shortUrls.filter((shortUrl) => shortUrl._id !== _id));
    }

    setIsLoading(false);
  }

  return (
    <>
      <Head>
        <title>Admin Pannel</title>
      </Head>

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
        {popup === "ChangeYoutubeToken" && (
          <form action="#" onSubmit={handleChangeYoutubeToken}>
            <h1>Change Youtube Token</h1>
            <textarea
              placeholder="Change Youtube Token"
              defaultValue={token.youtubeToken}
            />
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
        {popup === "ChangeGoogleToken" && (
          <form action="#" onSubmit={handleChangeGoogleToken}>
            <h1>Change Google Token</h1>
            <input
              type="text"
              defaultValue={token.googleToken}
              placeholder="Change Youtube Token"
            />
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
        {popup === "CreateUser" && (
          <form action="#" onSubmit={handleCreateUser}>
            <h1>Create User</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Affiliate profile code" />
            <select
              value={domainForUserInput}
              onChange={(e) => setDomainForUserInput(e.target.value)}
            >
              {domains.map((domain, index) => (
                <option key={index} value={domain.domain}>
                  {domain.domain}
                </option>
              ))}
            </select>
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
            <input type="password" placeholder="Old Password" />
            <input type="password" placeholder="New Password" />
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
            <button className="btn" type="submit">
              {shouldRedirectOnLimit ? "Off" : "On"}
            </button>
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
                  <th>Custom Domain</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {shortUrls.map((url) => (
                  <tr key={url._id}>
                    <td>{url.shortCode}</td>
                    <td>{url.originalUrl}</td>
                    <td>{url.clicks}</td>
                    <td>{url.domain}</td>
                    <td>
                      <button
                        style={{
                          fontSize: "0.8rem",
                          wordBreak: "keep-all",
                        }}
                        className="btn red"
                        onClick={() => {
                          handleDeleteShortUrl(url._id);
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

          <div className="data users">
            <h4>Users</h4>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Domain</th>
                  <th>Code</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.domain}</td>
                    <td>{user.code}</td>
                    <td>
                      {user.role !== "admin" && (
                        <button
                          style={{
                            fontSize: "0.8rem",
                            wordBreak: "keep-all",
                          }}
                          className="btn red"
                          onClick={() => {
                            handleDeleteUser(user._id);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
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
                        className="btn red"
                        style={{
                          fontSize: "0.8rem",
                          wordBreak: "keep-all",
                        }}
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

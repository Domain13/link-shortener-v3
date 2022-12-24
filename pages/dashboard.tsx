// COMPLETE

// await fetch("/api/register", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     username: "admin",
//     password: "admin",
//   }),
// });

import React from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Dashboard({
  shortUrls,
  users,
  domains,
  token,
  shouldRedirectOnLimit,
}) {
  const router = useRouter();
  // const [createDomainOpen, setCreateDomainOpen] = useState(false);
  // const [createTokenOpen, setCreateTokenOpen] = useState(false);
  // const [createUserOpen, setCreateUserOpen] = useState(false);
  // const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [popup, setPopup] = useState<
    | "CreateDomain"
    | "CreateToken"
    | "CreateUser"
    | "ChangePassword"
    | "RedirectConfig"
    | null
  >(null);

  async function handleCreateDomain(e) {
    e.preventDefault();
    const domain = e.target[0].value;
    const errorPage = e.target[1].value;

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
    const data = await res.json();

    if (data.type === "SUCCESS") {
      // remove the input values
      // e.target[0].value = "";
      // e.target[1].value = "";

      // close the popup
      // setPopup(null);

      // reload the page
      router.reload();
    }
  }

  async function handleCreateToken(e) {
    e.preventDefault();
    const token = e.target[0].value;

    const res = await fetch("/api/create_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const data = await res.json();

    setPopup(null);
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

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
      // e.target[0].value = "";
      // e.target[1].value = "";

      // close the popup
      // setPopup(null);

      // reload the page
      router.reload();
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    const username = "admin";
    const password = e.target[0].value;
    const newPassword = e.target[1].value;

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
    const data = await res.json();

    if (data.type === "SUCCESS") {
      // remove the input values
      // e.target[0].value = "";
      // e.target[1].value = "";

      // close the popup
      // setPopup(null);

      // reload the page
      router.reload();
    } else {
      alert("Wrong password");
    }
  }

  async function handleChangeRedirectConfig(e) {
    // the input has only one value
    // it is a checkbox
    e.preventDefault();
    const redirectConfig = e.target[0].checked;

    const res = await fetch("/api/change_redirect_config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.type === "SUCCESS") {
      // reload the page
      router.reload();
    }
  }

  return (
    <>
      <Navbar user={users} dashboard={true} setPopup={setPopup} />
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
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
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
                </tr>
              </thead>
              <tbody>
                {domains.map((domain) => (
                  <tr key={domain._id}>
                    <td>{domain.domain}</td>
                    <td>{domain.errorPage}</td>
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

// Get all urls
// Get all users
// Get all domains
export async function getServerSideProps(context) {
  const ShortUrl = require("../models/ShortUrl").default;
  const User = require("../models/User").default;
  const Domain = require("../models/Domain").default;
  const Token = require("../models/Token").default;
  const State = require("../models/State").default;

  await dbConnect();

  const { req, res } = context;
  const jwtToken = req.cookies.token;

  if (!jwtToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);

  // check if the user is in the database
  const userInDatabase = await User.findOne({ username: decode.username });
  if (!userInDatabase || userInDatabase.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const shortUrls = await ShortUrl.find({});
  const users = await User.find({});
  const domains = await Domain.find({});
  const token = await Token.findOne({});
  const state = await State.findOne({});
  const shouldRedirectOnLimit = state.shouldRedirectOnLimit;

  return {
    props: {
      shortUrls: JSON.parse(JSON.stringify(shortUrls)),
      users: JSON.parse(JSON.stringify(users)),
      domains: JSON.parse(JSON.stringify(domains)),
      token: JSON.parse(JSON.stringify(token)),
      shouldRedirectOnLimit: JSON.parse(JSON.stringify(shouldRedirectOnLimit)),
    },
  };
}

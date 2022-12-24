// COMPLETE

// In the serversideprops, check if the user is logged in
// If the user is logged in, and if the user is "admin", show him the link to the admin page
// If the user is not logged in, redirect him to the login page

import Link from "next/link";
import { useState, useEffect } from "react";
// import User from "../models/User";
import jwt from "jsonwebtoken";
import Home from "../components/Home";
import dbConnect from "../lib/dbConnect";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

// TODO: the backend api codes uses repeated code, make it into a function
// TODO: Input validation
// TODO: Store the token inside the State model

export default function home({ user, domains }) {
  const router = useRouter();

  async function logout() {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.type === "SUCCESS") {
      router.push("/login");
    }
  }

  return (
    <>
      <Navbar user={user} dashboard={false} />
      <div className="App">
        {/* <div>
        {user.role === "admin" && (
          <Link href="/dashboard">
            <a className="btn">Dashboard</a>
          </Link>
        )}
        {user && (
          <button className="btn" onClick={logout}>
            Logout
          </button>
        )}
      </div> */}
        {user && <Home domains={domains} />}
      </div>
    </>
  );
}

// There will be a token inside the cookie
// There will be a user inside the token
// There will be a role inside the user
export async function getServerSideProps(context) {
  const User = require("../models/User").default;
  const Domain = require("../models/Domain").default;

  const { req, res } = context;
  const { token } = req.cookies;

  await dbConnect();

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  // check if the user is in the database
  const userInDatabase = await User.findOne({ username: decode.username });
  if (!userInDatabase) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Get all domains
  const domains = await Domain.find({});

  return {
    props: {
      user: {
        username: decode.username,
        role: userInDatabase.role,
      },
      domains: JSON.parse(JSON.stringify(domains)),
    },
  };
}

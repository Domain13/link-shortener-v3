// COMPLETE

import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Link from "next/link";
import Login from "../components/Login";
import dbConnect from "../lib/dbConnect";

export default function ({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <div className="App">
        <h1>You are already logged in</h1>
        <Link href="/">
          <a className="btn">Go to home</a>
        </Link>
      </div>
    );
  }

  return <Login />;
}

// get the cookies and check if the user is logged in
// check the username inside the cookie's tokens.
export async function getServerSideProps(context) {
  const User = require("../models/User").default;
  const { req, res } = context;
  const { cookies } = req;
  const { token } = cookies;

  await dbConnect();

  if (!token) {
    return {
      props: {
        isLoggedIn: false,
      },
    };
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ username: decoded.username });
  if (!user) {
    return {
      props: {
        isLoggedIn: false,
      },
    };
  }

  return {
    props: {
      isLoggedIn: true,
    },
  };
}

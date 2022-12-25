// COMPLETE

import React from "react";
import Link from "next/link";
import Login from "../components/Login";
import { UserContext } from "../contexts/user";
import { useContext } from "react";

export default function () {
  const userContext = useContext(UserContext);

  if (userContext.user) {
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

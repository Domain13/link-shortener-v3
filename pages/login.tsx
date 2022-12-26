// COMPLETE

import React from "react";
import Link from "next/link";
import Login from "../components/Login";
import { UserContext } from "../contexts/user";
import { useContext } from "react";
import Head from "next/head";

export default function LoginPage() {
  const userContext = useContext(UserContext);

  if (userContext.user) {
    return (
      <>
        <Head>
          <title>Login</title>
        </Head>

        <div className="App">
          <h1>You are already logged in</h1>
          <Link href="/">
            <a href="/" className="btn">
              Go to home
            </a>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Login />
    </>
  );
}

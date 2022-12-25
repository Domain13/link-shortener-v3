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
import { UserType } from "../contexts/user";
import { UserContext } from "../contexts/user";
import { useContext } from "react";

// TODO: the backend api codes uses repeated code, make it into a function
// TODO: Input validation
// TODO: Store the token inside the State model

export default function HomePage() {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  return (
    <>
      <div className="App">{user && <Home />}</div>
    </>
  );
}

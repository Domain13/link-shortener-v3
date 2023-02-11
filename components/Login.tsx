import React, { useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/user";
import { IsLoadingContext } from "../contexts/isLoading";
import { useContext } from "react";
import Form, { SendType } from "./utils/Form";
import AdminInfo from "./AdminInfo";

export default function Login() {
  const userContext = useContext(UserContext);
  const isLoadingContext = useContext(IsLoadingContext);

  const setUser = userContext.setUser;
  const setIsLoading = isLoadingContext.setIsLoading;

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Login the user
  async function handleSubmit(send: SendType) {
    if (username === "" || password === "") {
      alert("You need to provide valid username and password");
      return;
    }

    const json = await send("/api/login", {
      username,
      password,
    });

    if (json.type === "SUCCESS") {
      setUser(json.data);
      // redirect to the home page
      router.push("/");
    } else if (json.type === "UNAUTHORIZED") {
      alert("Username or password is incorrect");
    }
  }

  return (
    <div className="App">
      <Form submitHandler={handleSubmit} className="form-style">
        <h1 className="header">Login</h1>

        <AdminInfo />

        <div className="form-wrapper label-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-wrapper label-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn green" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
}

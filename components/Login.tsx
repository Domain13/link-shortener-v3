import React from "react";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/user";
import { IsLoadingContext } from "../contexts/isLoading";
import { useContext } from "react";

export default function Login() {
  const userContext = useContext(UserContext);
  const isLoadingContext = useContext(IsLoadingContext);
  // const { user, setUser } = userContext;
  const setUser = userContext.setUser;
  // const { isLoading, setIsLoading } = isLoadingContext;
  const setIsLoading = isLoadingContext.setIsLoading;

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "" || password === "") {
      alert("You need to provide valid username and password");
      return;
    }

    setIsLoading(true);

    const res = await fetch("api/login", {
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
      setUser(data.data);
      // redirect to the home page
      router.push("/");
    } else if (data.type === "UNAUTHORIZED") {
      alert("Username or password is incorrect");
    }

    setIsLoading(false);
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <form action="#" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

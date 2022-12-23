import React from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

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

    if (data.type !== "SUCCESS") {
      alert(data.message);
      return;
    }

    // redirect to the home page
    router.push("/");
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

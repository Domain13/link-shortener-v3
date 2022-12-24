import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({
  user,
  dashboard,
  setPopup,
}: {
  user: { username: string; role: string } | null;
  dashboard: boolean;
  setPopup?: React.Dispatch<
    "CreateDomain" | "CreateToken" | "CreateUser" | "ChangePassword" | null
  >;
}) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = React.useState(false);

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
    <nav>
      <div className="logo">
        <h1>Url Shortener</h1>
      </div>
      <div className="links">
        {user || dashboard ? (
          <>
            <Link href="/">
              <a className="link">Home</a>
            </Link>
            <button className="link" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="msg">You need to login first</p>
          </>
        )}

        {user && user.role === "admin" && (
          <Link href="/dashboard">
            <a className="link">Dashboard</a>
          </Link>
        )}

        {dashboard && (
          <>
            <button
              className="menu-button"
              onClick={() => setOpenMenu(!openMenu)}
            >
              Menu
            </button>
            <div className="menu">
              <div
                className="menu-div"
                style={{
                  transform: `scaleY(${openMenu ? 1 : 0})`,
                }}
              >
                <button
                  className="option"
                  onClick={() => {
                    setPopup?.("CreateDomain");
                    setOpenMenu(false);
                  }}
                >
                  Add Custom Domain
                </button>
                <button
                  className="option"
                  onClick={() => {
                    setPopup?.("CreateToken");
                    setOpenMenu(false);
                  }}
                >
                  Change Token
                </button>
                <button
                  className="option"
                  onClick={() => {
                    setPopup?.("CreateUser");
                    setOpenMenu(false);
                  }}
                >
                  Create User
                </button>
                <button
                  className="option"
                  onClick={() => {
                    setPopup?.("ChangePassword");
                    setOpenMenu(false);
                  }}
                >
                  Change Password
                </button>
                <button
                  className="option"
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Close X
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

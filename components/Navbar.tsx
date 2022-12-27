/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/user";
import { PopupContext } from "../contexts/popup";
import { useContext } from "react";
import { IsLoadingContext } from "../contexts/isLoading";

export default function Navbar() {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const popupContext = useContext(PopupContext);
  const setPopup = popupContext.setPopup;
  const isLoadingContext = useContext(IsLoadingContext);
  const setIsLoading = isLoadingContext.setIsLoading;

  const router = useRouter();
  const [openMenu, setOpenMenu] = React.useState(false);
  const isDashboard = router.pathname === ("/dashboard" || "/admin");

  async function logout() {
    setOpenMenu(false);
    setIsLoading(true);

    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.type === "SUCCESS") {
      userContext.setUser(null);
      setIsLoading(false);
    }
  }

  return (
    <nav>
      <div className="logo">
        <h1>Url Shortener</h1>
      </div>

      <div className="links">
        {user ? (
          <>
            <>
              <Link href="/">
                <a className="link">Home</a>
              </Link>
            </>

            {user.role === "admin" && (
              <Link href="/dashboard">
                <a className="link">Dashboard</a>
              </Link>
            )}

            {isDashboard && (
              <>
                <div className="menu">
                  <button
                    className="menu-button link"
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    Menu <p className="down-arrow">^</p>
                  </button>

                  <div
                    className="menu-div"
                    style={{
                      transform: `scaleY(${openMenu ? 1 : 0})`,
                    }}
                  >
                    <button
                      className="option"
                      onClick={() => {
                        setPopup("CreateDomain");
                        setOpenMenu(false);
                      }}
                    >
                      Add Custom Domain
                    </button>
                    <button
                      className="option"
                      onClick={() => {
                        setPopup("ChangeYoutubeToken");
                        setOpenMenu(false);
                      }}
                    >
                      Change Youtube Token
                    </button>
                    <button
                      className="option"
                      onClick={() => {
                        setPopup("ChangeGoogleToken");
                        setOpenMenu(false);
                      }}
                    >
                      Change Google Token
                    </button>
                    <button
                      className="option"
                      onClick={() => {
                        setPopup("CreateUser");
                        setOpenMenu(false);
                      }}
                    >
                      Create User
                    </button>
                    <button
                      className="option"
                      onClick={() => {
                        setPopup("ChangePassword");
                        setOpenMenu(false);
                      }}
                    >
                      Change Password
                    </button>
                    {/* 
                    <button
                      className="option"
                      onClick={() => {
                        setPopup("RedirectConfig");
                        setOpenMenu(false);
                      }}
                    >
                      Redirect Config
                    </button> */}

                    <button
                      className="option red"
                      onClick={() => {
                        setOpenMenu(false);
                      }}
                    >
                      ^
                    </button>
                  </div>
                </div>
              </>
            )}

            <>
              <button className="link red" onClick={logout}>
                Logout
              </button>
            </>
          </>
        ) : (
          <p className="msg">You need to login first</p>
        )}
      </div>
    </nav>
  );
}

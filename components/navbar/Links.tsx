import React from "react";
import { UserType } from "../../types/user";
import Link from "next/link";
import Logout from "./Logout";
import Menu from "./Menu";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../contexts/user";

export default function Links() {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  const router = useRouter();
  const isDashboard = router.pathname === ("/dashboard" || "/admin");

  return (
    <div className="links">
      {user ? (
        <>
          <div className="links-without-logout">
            {user.role === "admin" && (
              <>
                <Link href="/" className="link">
                  Home
                </Link>

                <Link href="/dashboard" className="link">
                  Dashboard
                </Link>
              </>
            )}

            {isDashboard && <Menu />}
          </div>

          <Logout />
        </>
      ) : (
        <p className="msg">You need to login first</p>
      )}
    </div>
  );
}

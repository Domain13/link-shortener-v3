/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/user";
import { UserType } from "../contexts/user";
import { IsLoadingContext } from "../contexts/isLoading";
import Navbar from "../components/Navbar";
import { PopupContext, PopupType } from "../contexts/popup";

function MyApp({ Component, pageProps }) {
  // make a post request to "/api/whoami" to get the user's info
  // if the user is not logged in, redirect to the login page
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [popup, setPopup] = useState<PopupType>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/whoami", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const datas = await res.json();

      if (datas.type === "SUCCESS") {
        setUser(datas.data);
      } else {
        router.push("/login");
      }

      setIsLoading(false);
    };

    if (!user) {
      setIsLoading(true);
      fetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <PopupContext.Provider value={{ popup, setPopup }}>
          <Navbar />
          {isLoading ? (
            <div id="preloader">
              <div className="spinner"></div>
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </PopupContext.Provider>
      </IsLoadingContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;

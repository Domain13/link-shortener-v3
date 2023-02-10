import React from "react";
import Image from "next/image";
import UserLogo from "../../public/user.png";
import { useContext } from "react";
import { UserContext } from "../../contexts/user";

export default function Logo() {
  const { user } = useContext(UserContext);

  return (
    <div className="logo">
      {user && (
        <div className="user-logo">
          <Image
            className="user-image"
            src={UserLogo}
            alt="user icon"
            width={25}
            height={25}
          />
          <p className="user-name">{user.username}</p>
        </div>
      )}
    </div>
  );
}

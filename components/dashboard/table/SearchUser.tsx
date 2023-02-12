import React, { useState } from "react";
import { UserType } from "../../../types/user";

export default function SearchUser({
  setUsersToShow,
  users,
}: {
  setUsersToShow: Function;
  users: UserType[];
}) {
  const [usernameSearch, setUsernameSearch] = useState("");

  async function handleSearchUser(e: any) {
    e.preventDefault();

    if (usernameSearch === "") {
      setUsersToShow(users);
    } else {
      setUsersToShow(
        users.filter((user) =>
          user.username.toLowerCase().includes(usernameSearch.toLowerCase())
        )
      );
    }
  }

  return (
    <form className="search form" onSubmit={handleSearchUser}>
      <div className="form-wrapper label-input">
        <input
          type="text"
          placeholder="Search"
          value={usernameSearch}
          onChange={(e) => setUsernameSearch(e.target.value)}
        />
        <div
          className="cancel"
          onClick={() => {
            setUsernameSearch("");
            setUsersToShow(users);
          }}
        >
          X
        </div>
      </div>
      <button className="btn green">Search</button>
    </form>
  );
}

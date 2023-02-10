import React, { useContext, useState } from "react";
import { SendType } from "../../utils/Form";
import PopupForm from "../../utils/PopupForm";

export default function ChangePassword() {
  // *************** Local State ***************** //
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Change the password
  async function handleChangePassword(send: SendType) {
    // username is admin, because the admin is the only one who can change the password
    const username = "admin";

    // Check if the passwords are valid
    if (password === "" || newPassword === "") {
      alert("You need to provide valid passwords");
      return;
    }

    const json = await send("/api/change_password", {
      username,
      password,
      newPassword,
    });

    if (json.type === "SUCCESS") {
      // remove the input values
      setPassword("");
      setNewPassword("");
    } else {
      alert("Wrong password");
    }
  }

  return (
    <>
      <PopupForm submitHandler={handleChangePassword}>
        <h1 className="header">Change Password</h1>

        <div className="form-wrapper label-input">
          <label htmlFor="password">Old Password</label>
          <input
            type="password"
            // placeholder="Old Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-wrapper label-input">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            // placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button className="btn green" type="submit">
          Change
        </button>
      </PopupForm>
    </>
  );
}

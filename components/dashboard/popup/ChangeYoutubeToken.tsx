import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../contexts/tokens";
import PopupForm from "../../utils/PopupForm";
import { SendType } from "../../utils/Form";

export default function ChangeYoutubeToken() {
  const { token, setToken } = useContext(TokenContext);

  const [youtubeToken, setYoutubeToken] = useState("");

  useEffect(() => {
    if (token.youtubeToken) {
      setYoutubeToken(token.youtubeToken);
    }
  }, [token.youtubeToken]);

  // Change the youtube token
  async function handleChangeYoutubeToken(send: SendType) {
    if (youtubeToken === "") {
      alert("The value you provided is empty!");
      return;
    }

    const json = await send("/api/change_youtube_token", {
      token: youtubeToken,
    });

    if (json.type === "SUCCESS") {
      // update the token state
      setToken({ youtubeToken: youtubeToken });
    }
  }

  return (
    <>
      <PopupForm submitHandler={handleChangeYoutubeToken}>
        <h1 className="header">Change Youtube Token</h1>

        <div className="form-wrapper label-input">
          <label htmlFor="youtubeToken">Youtube Token</label>
          <textarea
            name="youtubeToken"
            id="youtubeToken"
            value={youtubeToken}
            onChange={(e) => {
              setYoutubeToken(e.target.value);
            }}
          />
        </div>

        <button className="btn green" type="submit">
          Change
        </button>
      </PopupForm>
    </>
  );
}

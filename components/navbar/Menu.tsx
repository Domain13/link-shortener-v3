import { useContext, useState } from "react";
import { PopupContext } from "../../contexts/popup";

export default function Menu() {
  const { setPopup } = useContext(PopupContext);

  const [openMenu, setOpenMenu] = useState(false);

  return (
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
  );
}

import { useContext } from "react";
import { ReturnedJsonType } from "../../types/json";
import PostButton from "../utils/PostButton";
import { UserContext } from "../../contexts/user";

export default function Logout() {
  const { setUser } = useContext(UserContext);

  function afterLogout(json: ReturnedJsonType) {
    if (json.type === "SUCCESS") {
      setUser(null);
    }
  }

  return (
    <>
      <PostButton
        className="link btn red logout-button"
        path="/api/logout"
        body={{}}
        afterPost={afterLogout}
      >
        Logout
      </PostButton>
    </>
  );
}

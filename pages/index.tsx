import Home from "../components/Home";
import { UserContext } from "../contexts/user";
import { useContext } from "react";

export default function HomePage() {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  return <>{user && <Home />}</>;
}

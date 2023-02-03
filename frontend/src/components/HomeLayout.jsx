import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import FooterBar from "./footer/FooterBar";
import { FolderContext } from "../contexts/Folder";

export default function HomeLayout() {
  const { pages } = useContext(FolderContext);
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user.email) {
    return <Navigate to="/" />;
  }
  let location = "";
  if (!document.cookie.match(import.meta.env.VITE_NAME_COOKIE)) {
    localStorage.setItem("location", "/login");
  }
  if (
    localStorage.getItem("location") !== "/" &&
    localStorage.getItem("location") !== "/login" &&
    localStorage.getItem("location") !== "/register"
  ) {
    location = localStorage.getItem("location");
  } else {
    location = "";
  }
  // Si connecté redirige vers profile page
  if (user.email) {
    return <Navigate to={location || "/user/profile"} replace />;
  }

  // Creation pages
  let menu = [];
  Object.keys(pages.Home).forEach((item) => {
    const addmenu = {
      label: item,
      path: `${item.replace("Home", "/").toLowerCase()}`,
    };
    menu = [...menu, addmenu];
  });

  return (
    <>
      <header>
        <AppBar menu={menu} />
      </header>
      <main>{outlet}</main>
      <footer>
        <FooterBar />
      </footer>
    </>
  );
}

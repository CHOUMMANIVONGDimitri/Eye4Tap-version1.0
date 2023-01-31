import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import FooterBar from "./footer/FooterBar";
import { FolderContext } from "../contexts/Folder";

export default function ProtectedLayout() {
  const { pages } = useContext(FolderContext);
  const { user, logout } = useAuth();
  const outlet = useOutlet();

  // Si pas de cookies go login
  if (!document.cookie.match(import.meta.env.VITE_NAME_COOKIE)) {
    logout();
    return <Navigate to="/login" />;
  }
  // Si NON connecté redirige vers Home
  if (!user.email) {
    return <Navigate to="/login" />;
  }

  // Creation pages
  let menu = [];
  Object.keys(pages.Protected).forEach((item) => {
    const labelpage = item.toLowerCase();
    const addmenu = {
      label: labelpage ? item.toLowerCase() : `${item}`,
      path: `/user/${item.toLowerCase()}`,
    };
    menu = [...menu, addmenu];
  });

  if (user.admin)
    // Pages add admin
    Object.keys(pages.Admin).forEach((item) => {
      const labelpage = item.toLowerCase();
      const addmenu = {
        label: labelpage ? item.toLowerCase() : `${item}`,
        path: `/admin/${item.toLowerCase()}`,
      };
      menu = [...menu, addmenu];
    });

  return (
    <>
      <header>
        <AppBar menu={menu} />
      </header>
      <main>{outlet}</main>
      <footer className="">
        <FooterBar />
      </footer>
    </>
  );
}

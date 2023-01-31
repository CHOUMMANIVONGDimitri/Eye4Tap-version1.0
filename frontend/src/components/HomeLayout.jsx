import { useContext } from "react";
import { useOutlet } from "react-router-dom";
import AppBar from "./header/AppBar";
import FooterBar from "./footer/FooterBar";
import { FolderContext } from "../contexts/Folder";
import "../assets/css/Layout.scss";

export default function HomeLayout() {
  const { pages } = useContext(FolderContext);
  const outlet = useOutlet();

  // Creation pages
  let menu = [];
  Object.keys(pages.Home).forEach((item) => {
    const addmenu = {
      item,
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

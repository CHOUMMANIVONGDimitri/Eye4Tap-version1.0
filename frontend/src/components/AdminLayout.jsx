import { useContext, Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AdminBar from "@components/container/Admin/AdminBar";
import { useAuth } from "../contexts/useAuth";
import AppBar from "./header/AppBar";
import FooterBar from "./footer/FooterBar";
import { FolderContext } from "../contexts/Folder";
import Loader from "../services/Loader";
import Spinner from "./Spinner";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { pages, components } = useContext(FolderContext);

  const URLParam = useLocation().search;
  const tools = new URLSearchParams(URLParam).get("tools") ?? "Dashboard";

  if (!document.cookie.match(import.meta.env.VITE_NAME_COOKIE)) {
    logout();
    return <Navigate to="/login" />;
  }
  if (!user.email) {
    return <Navigate to="/" />;
  }
  if (user.email && !user.admin) {
    return <Navigate to="../user/profile" />;
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
  Object.keys(pages.Admin).forEach((item) => {
    const labelpage = item.toLowerCase();
    const addmenu = {
      label: labelpage ? item.toLowerCase() : `${item}`,
      path: `/admin/${item.replace("Home", "").toLowerCase()}`,
    };
    menu = [...menu, addmenu];
  });

  // Creation menuadmin
  let menuadmin = [];
  Object.keys(components.container.Admin)
    .filter((item) => item !== "AdminBar")
    .forEach((item) => {
      const labelcomponents = item.toLowerCase();
      const addmenuadmin = {
        label: labelcomponents ? item.toLowerCase() : `${item}`,
        path: `/admin/dashboard?tools=${item}`,
      };
      menuadmin = [...menuadmin, addmenuadmin];
    });

  return (
    <>
      <header>
        <AppBar menu={menu} />
      </header>
      <main>
        <AdminBar menuadmin={menuadmin} tools={tools} />
        <div className="admin-wrapper">
          <Suspense fallback={<Spinner />}>
            <Loader foldername="components/container/Admin" filename={tools} />
          </Suspense>
        </div>
      </main>
      <footer>
        <FooterBar />
      </footer>
    </>
  );
}

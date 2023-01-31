import PropTypes from "prop-types";
import { useAuth } from "../../contexts/useAuth";
import "../../assets/css/header/AppBar.scss";
import "../../assets/js/header/AppBar";

function AppBar({ menu }) {
  // CONST //
  const { user, logout } = useAuth();

  // RETURN //
  return (
    <>
      <nav id="navbar" className="">
        <div className="nav-wrapper">
          {/* <!-- Navbar Logo --> */}
          <div className="logo">
            {/* <!-- Logo Placeholder for Inlustration --> */}
            <a href="/">
              <b>&lt;/&gt;</b> Logo
            </a>
          </div>

          {/* <!-- Navbar Links --> */}
          <ul id="menu">
            {!user.email && (
              <>
                <li>
                  <a href="/login">Connexion</a>
                </li>
                <li>
                  <a href="/register">S'enregistrer</a>
                </li>
              </>
            )}
            {user.email && (
              <>
                {menu?.map((page) => (
                  <li key={`li-desktop${page.label}`}>
                    <a href={page.path} key={page.label} id={page.label}>
                      {page.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/login" onClick={() => logout()}>
                    Déconnexion
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* <!-- Menu Icon --> */}
      <div className="menuIcon">
        <span className="icon icon-bars" />
        <span className="icon icon-bars overlay" />
      </div>

      <div className="overlay-menu">
        <ul id="menu">
          {menu?.map((page) => (
            <li key={`li-mobile${page.label}`}>
              <a href={page.path} key={page.label} id={page.label}>
                {page.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default AppBar;

AppBar.propTypes = {
  menu: PropTypes.instanceOf(Array).isRequired,
};

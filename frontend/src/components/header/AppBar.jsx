// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../assets/css/header/AppBar.scss";

function AppBar({ menu }) {
  // CONST //
  // const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  // Handle (Toogle) Menu Open Close //
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleCloseNavMenu = (path) => {
    // setAnchorElNav(null);
    if (path) {
      navigate(path);
    }
  };

  // RETURN //
  return (
    <div className="wrap-header">
      <div className="menu">
        {menu?.map((page) => (
          <div className="wrapper-menu" key={`wrapper-${page.item}`}>
            <button
              type="button"
              key={page.item}
              id={page.item}
              onClick={() => {
                handleCloseNavMenu(page.path);
              }}
            >
              {page.item}
            </button>
            <div key={`bean${page.item}`} className="bean" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default AppBar;

AppBar.propTypes = {
  menu: PropTypes.instanceOf(Array).isRequired,
};

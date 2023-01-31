import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function AdminBar({ menuadmin, tools }) {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="md:flex md:w-64 md:flex-col static bottom-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <nav className="pb-4 flex flex-col flex-grow">
          <div className="flex-grow mt-5 fixed">
            {menuadmin.map((page) => (
              <button
                className={
                  page.label === tools
                    ? "font-bold text-xl text-calypso border-l-4 border-broom pl-5 py-5"
                    : "font-bold text-m border-transparent text-gray-600 hover:text-calypso border-l-4 py-2 px-3 flex items-center py-5"
                }
                type="button"
                key={page.label}
                id={page.label}
                onClick={() => {
                  navigate(page.path);
                }}
              >
                {page.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
export default AdminBar;

AdminBar.propTypes = {
  tools: PropTypes.string.isRequired,
  menuadmin: PropTypes.instanceOf(Array).isRequired,
};

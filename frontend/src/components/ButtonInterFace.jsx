import PropTypes from "prop-types";

function ButtonInterface({ method, name }) {
  return (
    <button
      className="border-4 hover:border-[#2f4555] bg-[#2f4555] h-fit w-fit text-2xl font-medium px-4 py-2 hover:bg-[#AF28EE] hover:text-[#2f4555] -rotate-45 text-white rounded-xl hover:scale-150 transition ease-in duration-150"
      type="button"
      onClick={method}
    >
      {name}
    </button>
  );
}

export default ButtonInterface;

ButtonInterface.propTypes = {
  method: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

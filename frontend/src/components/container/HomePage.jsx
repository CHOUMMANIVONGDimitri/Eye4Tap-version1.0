import React from "react";
import PropTypes from "prop-types";

function HomePage({ title }) {
  return (
    <div className="z-0 bg-[#2F4555] h-screen w-screen min-w-[540px]">
      <div className="wrapper flex flex-col">
        <h1 className="glitch">{title}</h1>
        <div className="animate-appear text-white font-light text-3xl border-2 py-4 px-2 rounded-md flex overflow-none">
          <p className="animate-goUp text-[#AF28EE] font-bold text-4xl uppercase">
            play
          </p>{" "}
          and{" "}
          <p className="animate-goDown text-[#AF28EE] font-bold text-2xl uppercase">
            destroy
          </p>{" "}
          your{" "}
          <p className="animate-goUp text-[#AF28EE] font-bold text-4xl uppercase">
            keyboard
          </p>
        </div>
      </div>
    </div>
  );
}
export default HomePage;

HomePage.propTypes = {
  title: PropTypes.string.isRequired,
};

import React, { useState } from "react";
import PropTypes from "prop-types";

function HomePage({ title }) {
  const [showDisplaimer, setShowDisplaimer] = useState(true);
  return (
    <div>
      {showDisplaimer ? (
        <div className=" bg-[#2F4555] z-0 fixed top-12 bottom-0 left-0 right-0 flex justify-center md:items-center">
          <article className="animate-appear overflow-y-scroll md:overflow-auto bg-gray-400 text-gray-700 w-full md:w-2/3  mx-auto md:px-10 md:py-20 flex flex-col gap-10 px-4 py-10 border-2 rounded-lg">
            <h1 className="text-2xl font-extrabold text-rose-600 text-center">
              WARNINGS: READ BEFORE PLAYING
            </h1>
            <section className="flex flex-col text-lg gap-4">
              <h2 className="text-xl font-bold underline">
                Photosensitivity / epileptic seizures:
              </h2>
              <p>
                A very small percentage of individuals may experience epileptic
                seizures when exposed to certain light patterns or flashing
                lights. Exposure to certain patterns or backgrounds on a
                computer screen, or while playing video games, may induce an
                epileptic seizure in these individuals. Certain conditions may
                induce previously undetected epileptic symptoms even in persons
                who have no history of prior seizures or epilepsy. If you, or
                anyone in your family, have an epileptic condition, consult your
                physician prior to playing. If you experience any of the
                following symptoms while playing a video or computer game --
                dizziness, altered vision, eye or muscle twitches, loss of
                awareness, disorientation, any involuntary movement, or
                convulsions - IMMEDIATELY discontinue use and consult your
                physician before resuming play.
              </p>
            </section>
            <section className="flex flex-col text-lg gap-4">
              <h2 className="text-xl font-bold underline">
                Tips for use of video games to reduce epileptic seizures and
                other health concerns:
              </h2>

              <ul>
                <li>
                  Consult your doctor before playing if you have serious medical
                  conditions, if you are pregnant or elderly, or if you have an
                  implanted medical device
                </li>
                <li>
                  Avoid playing when you are sick, tired, and/or under the
                  influence of medicine or drugs
                </li>
                <li>Keep your eyes as far away as possible from the screen</li>
                <li>
                  Do not use earphones at a high volume as hearing loss may
                  occur
                </li>
                <li>
                  Play in a comfortable posture to avoid numbness, stiffness or
                  other discomfort
                </li>
                <li>
                  Take regular breaks during play sessions. The length and
                  frequency of necessary breaks may vary from one person to
                  another
                </li>
                <li>Stop playing if you are experiencing any discomfort</li>
              </ul>
            </section>
            <button
              className="border-4 w-fit mx-auto px-10 py-2 rounded-lg bg-rose-500 text-rose-800 border-rose-800 text-xl hover:text-white hover:bg-rose-800"
              type="button"
              onClick={() => {
                setShowDisplaimer(false);
              }}
            >
              Close
            </button>
          </article>
        </div>
      ) : (
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
      )}
    </div>
  );
}
export default HomePage;

HomePage.propTypes = {
  title: PropTypes.string.isRequired,
};
